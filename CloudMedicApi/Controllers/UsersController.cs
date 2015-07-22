﻿using System.Data.Entity;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Http.Results;
using CloudMedicApi.DAL;
using CloudMedicApi.Models;
using Crypteron.CipherCore.Entropy;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Linq;
using Omu.ValueInjecter;
using System.Collections.Generic;
using System.Net.Mail;
using System;

namespace CloudMedicApi.Controllers
{
    [RoutePrefix("Users")]
    public class UsersController : ApiController
    {
        private readonly ApplicationUserManager _userManager;
        private readonly MyDbContext _db;

        public UsersController()
        {
            _db = new MyDbContext();
            _userManager = new ApplicationUserManager(new UserStore<ApplicationUser>(_db));

        }
      
        // GET: users
        [Route("")]
        public async Task<IHttpActionResult> GetUsers(string role = null)
        {
            List<ApplicationUser> users;
            
            // If no role specified, just query the last 30 users
            if (string.IsNullOrWhiteSpace(role))
            {
                users = await  _db.Users
                    .Include(u => u.Roles)
                    .Take(30)
                    .ToListAsync();
            }
            else
            {
                // If role is specified, we have to do a more complicated query to get the users
                // based on the role
               var query = from roleObj in _db.Roles
                        where roleObj.Name == role
                        from userRoles in roleObj.Users
                        join user in _db.Users
                        on userRoles.UserId equals user.Id
                        select user;

                users = await query
                    .Take(30)
                    .ToListAsync();
            }
            
            // Convert the user objects to a list of serializable data transfer objects
            var usersDto = new List<UserDto>();

            // Build a Dictionary Lookup of role objects by ID
            var roles = await _db.Roles.ToDictionaryAsync(r => r.Id);
            foreach (var user in users)
            {   
                usersDto.Add(UserToDto(user, roles));
            }

            return Ok(usersDto);
        }

        // GET: users/5
        [Route("{id}")]
        [ResponseType(typeof(ApplicationUser))]
        public async Task<IHttpActionResult> GetUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            var roles = await _db.Roles.ToDictionaryAsync(r => r.Id);
            return Ok(UserToDto(user, roles));
        }

        // PUT: users/5
        [Route("{id}")]
        public async Task<IHttpActionResult> PutUser(string id, ApplicationUser user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (string.IsNullOrWhiteSpace(id) || !id.Equals(user.Id))
            {
                return BadRequest();
            }

            var identityResult = await _userManager.UpdateAsync(user);
            if (!identityResult.Succeeded)
                return BuildErrorResult(identityResult);

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: users
        [Route("Add")]
        public async Task<IHttpActionResult> PostUser(UserDto userDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var password = Randomizer.GetRandomString(10);
            var user = new ApplicationUser();
            user.InjectFrom(userDto);
            
            var identityResult = await _userManager.CreateAsync(user, password);

            if (!identityResult.Succeeded)
                return BuildErrorResult(identityResult);

            Crypteron.CipherDb.Session.Unseal(user);
            identityResult = await _userManager.AddToRolesAsync(user.Id, userDto.Roles.ToArray());
            
            if (!identityResult.Succeeded)
                return BuildErrorResult(identityResult);

            SmtpClient client = new SmtpClient("smtp-mail.outlook.com");
            client.Port = 587;
            client.DeliveryMethod = SmtpDeliveryMethod.Network;
            client.UseDefaultCredentials = false;
            System.Net.NetworkCredential credentials = new System.Net.NetworkCredential("crypterondummytest@outlook.com", "cloudmedicrocks!");
            client.EnableSsl = true;
            client.Credentials = credentials;
            MailMessage mail = new MailMessage();
            mail.From = new MailAddress("crypterondummytest@outlook.com", "no_repy_cloudmedic");
            mail.To.Add(new MailAddress(user.Email));
            mail.Subject = "Invitation to join CloudMedic";
            mail.Body = "Dear " + userDto.FirstName + " " + userDto.LastName + ", you have been added to CloudMedic by an administor. Your password is: \n" + password + "\nPlease login and change your password under the profile tab.";

            client.Send(mail);

            return Created("users/" + user.Id, userDto);       
        }

        // DELETE: users/5
        [Route("")]
        public async Task<IHttpActionResult> DeleteUser(string id)
        {
            if (string.IsNullOrWhiteSpace(id))
            {
                return NotFound();
            }
            else
            {
                var patient = await _userManager.FindByIdAsync(id);
                if (patient == null)
                {
                    return NotFound();
                }

                await _userManager.DeleteAsync(patient);

                return Ok(patient);
            }
        }

        private IHttpActionResult BuildErrorResult(IdentityResult identityResult)
        {
            var errMsg = "Encountered the following errors: " + string.Join(", ", identityResult.Errors);
            {
                return new BadRequestErrorMessageResult(errMsg, this);
            }
        }

        public static UserDto UserToDto(ApplicationUser user, Dictionary<string, IdentityRole> roles = null)
        {
            var userDto = new UserDto();
            userDto.InjectFrom(user);
            userDto.Roles = new List<string>();
            if (roles != null)
            {
                foreach (var role in user.Roles)
                {
                    userDto.Roles.Add(roles[role.RoleId].Name);
                }
            }
            userDto.UserId = user.Id;
            return userDto;
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _userManager.Dispose();
                _db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PrescriptionAssigned(Prescription p, ApplicationUser user)
        {
            return user.Prescriptions.Contains(p);
        }
    }
}