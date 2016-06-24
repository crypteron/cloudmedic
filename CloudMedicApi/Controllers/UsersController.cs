using System.Data.Entity;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Http.Results;
using CloudMedicApi.DAL;
using CloudMedicApi.Models;
using Crypteron.Entropy;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Linq;
using System.Collections.Generic;
using System;
using CloudMedicApi.Utility;
using CloudMedicApi.BLL;
using CloudMedicApi.Models.DTOs;

namespace CloudMedicApi.Controllers
{
    [RoutePrefix("api/users")]
    public class UsersController : ApiController
    {
        private readonly ApplicationUserManager _userManager;
        private readonly MyDbContext _db;
        private const int pageSize = 20;

        public UsersController()
        {
            _db = new MyDbContext();
            _userManager = new ApplicationUserManager(new UserStore<ApplicationUser>(_db));
        }
      
        // GET: users
        [Route("")]
        [Authorize(Roles = "SysAdmin")]
        public async Task<IHttpActionResult> GetUsers(int page = 1, string role = null)
        {
            List<ApplicationUser> users;

            // Variables initialized depending on whether role specified
            int totalUsers;
            int maxPage;
            int skipUsers;

            // If no role specified, just query the last 30 users
            if (string.IsNullOrWhiteSpace(role))
            {
                totalUsers = await _db.Users.CountAsync();
                // The maximum number of pages, rounded up
                maxPage = ((totalUsers + pageSize + 1) / pageSize);
                page = Math.Max(1, page);
                page = Math.Min(maxPage, page);
                skipUsers = (page - 1) * pageSize;

                users = await  _db.Users
                    .OrderBy(u => u.Id)
                    .Include(u => u.Roles)
                    .Skip(skipUsers)
                    .Take(pageSize)
                    .ToListAsync();
            }
            else
            {
                var roleId = RoleManager.GetRoleIdFromRoleName(role);

                totalUsers = await _db.Users
                    .Where(u => u.Roles.Any(r => r.RoleId == roleId))
                    .CountAsync();

                // The maximum number of pages, rounded up
                maxPage = ((totalUsers + pageSize - 1) / pageSize);
                page = Math.Max(1, page);
                page = Math.Min(maxPage, page);
                skipUsers = (page - 1) * pageSize;

                users = await _db.Users
                    .Where(u => u.Roles.Any(r => r.RoleId == roleId))
                    .OrderBy(u=> u.Id)
                    .Include(u => u.Roles)
                    .Skip(skipUsers)
                    .Take(pageSize)
                    .ToListAsync();
            }

            UsersPageDto result = new UsersPageDto()
            {
                Users = new List<UserDto>(),
                HasNext = (page < maxPage),
                HasPrev = (page > 1),
                NumPages = maxPage,
                CurrentCount = totalUsers
            };

            // Convert the user objects to a list of serializable data transfer objects
            foreach (var user in users)
            {   
                result.Users.Add(ToDto.UserToDto(user));
            }

            return Ok(result);
        }

        // GET: users/5
        [Route("{id}")]
        [ResponseType(typeof(ApplicationUser))]
        public async Task<IHttpActionResult> GetUser(string id)
        {
            var user = await _db.Users.Where(u => u.Id.Equals(id, StringComparison.InvariantCultureIgnoreCase))
                .Include(u => u.Roles)
                .FirstOrDefaultAsync();

            if (user == null)
            {
                return NotFound();
            }

            return Ok(ToDto.UserToDto(user));
        }

        // GET: users/patients
        [Route("Patients")]
        [ResponseType(typeof(List<UserDto>))]
        [Authorize(Roles = "Physician, Nurse")]
        public async Task<IHttpActionResult> GetAssignedPatients(string providerId)

        {
            var user = await _userManager.FindByIdAsync(providerId);
            if (user == null)
            {
                return NotFound();
            }

            List<ApplicationUser> patients = new List<ApplicationUser>();

            foreach (var careTeam in user.ProviderCareTeams)
            {
                if (careTeam.Active)
                {
                    patients.Add(careTeam.Patient);
                }
            }
            if (patients == null)
            {
                return NotFound();
            }

            var usersDto = new List<UserDto>();

            foreach (var patient in patients)
            {
                usersDto.Add(ToDto.UserToDto(patient));
            }

            return Ok(usersDto);
        }

        // GET: users/providers
        [Route("Providers")]
        [ResponseType(typeof(UserDto))]
        [Authorize(Roles = "SysAdmin")]
        public async Task<IHttpActionResult> GetProvidersByEmail(string email)
        {
            var roleIdStrList = new List<string>();
            roleIdStrList.Add(((int)RoleId.Physician).ToString());
            roleIdStrList.Add(((int)RoleId.Nurse).ToString());

            return await GetUsersByRoleIds(email, roleIdStrList);
        }

        // GET: users/supporters
        [Route("Supporters")]
        [ResponseType(typeof(List<UserDto>))]
        [Authorize(Roles = "SysAdmin")]
        public async Task<IHttpActionResult> GetSupportersByEmail(string email)
        {
            var roleIdStrList = new List<string>();
            roleIdStrList.Add(((int)RoleId.Supporter).ToString());

            return await GetUsersByRoleIds(email, roleIdStrList);
        }

        // GET: users/prescriptions/5
        [Route("Prescriptions")]
        [Authorize(Roles = "Patient, Physician, Nurse, Supporter")]
        public async Task<IHttpActionResult> GetPrescriptions(string id) {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            var prescriptionsDto = new List<PrescriptionDto>();

            foreach (var prescription in user.Prescriptions)
            {
                prescriptionsDto.Add(ToDto.PrescriptionToDto(prescription));
            }

            return Ok(prescriptionsDto);
        }

        // GET: supporters/careteams
        [Route("CareTeams")]
        [Authorize(Roles = "Supporter")]
        public async Task<IHttpActionResult> GetSupporterCareTeams(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            var careTeamsDto = new List<CareTeamDto>();
            var roles = await _db.Roles.ToDictionaryAsync(r => r.Id);

            foreach (var careTeam in user.SupporterCareTeams)
            {
                if (careTeam.Active)
                {
                    careTeamsDto.Add(ToDto.CareTeamToDto(careTeam, roles));
                }
            }

            return Ok(careTeamsDto);
        }

        // GET: users/provider/5
        [Route("Provider")]
        [Authorize(Roles = "Physician, Nurse")]
        public async Task<IHttpActionResult> GetProviderCareTeams(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            var careTeamsDto = new List<CareTeamDto>();
            var roles = await _db.Roles.ToDictionaryAsync(r => r.Id);

            foreach (var careTeam in user.ProviderCareTeams)
            {
                if (careTeam.Active)
                {
                    careTeamsDto.Add(ToDto.CareTeamToDto(careTeam, roles));
                }
            }

            return Ok(careTeamsDto);
        }

        // GET: users/patient/5
        [Route("Patient")]
        [Authorize(Roles = "Patient")]
        public async Task<IHttpActionResult> GetPatientCareTeams(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            var careTeamsDto = new List<CareTeamDto>();
            var roles = await _db.Roles.ToDictionaryAsync(r => r.Id);

            foreach (var careTeam in user.PatientCareTeams)
            {
                careTeamsDto.Add(ToDto.CareTeamToDto(careTeam, roles));
            }

            return Ok(careTeamsDto);
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
        [Authorize(Roles = "SysAdmin")]
        public async Task<IHttpActionResult> PostUser(CreateUserBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var password = Randomizer.GetRandomString(10);

            var user = new ApplicationUser()
            {
                UserName = model.FirstName + model.LastName + Randomizer.GetRandom(100000),
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName,
                Gender = model.Gender,
                DOB = model.DOB,
                PhoneNumber = model.PhoneNumber,
                Specialty = model.Specialty
            };
            
            var identityResult = await _userManager.CreateAsync(user, password);

            if (!identityResult.Succeeded)
                return BuildErrorResult(identityResult);
            
            Crypteron.CipherDb.Session.Unseal(user, _db);
            identityResult = await _userManager.AddToRolesAsync(user.Id, model.Roles.ToArray());


            Crypteron.CipherDb.Session.Unseal(user, _db);

            if (!identityResult.Succeeded)
                return BuildErrorResult(identityResult);

            // Send an invitation to login and change password
            MailSender sender = new MailSender();
            string mailBody = "Dear " + user.FirstName + " " + user.LastName + ", you have been added to CloudMedic by an administrator.\n\nPlease login with your assigned username and password:\n\nUsername: " + user.UserName + "\nPassword: " + password + "\n\n After logging in, change your password under the profile tab.";

            sender.SendInvite(mailBody, user.Email);

            return Created("users/" + user.Id, ToDto.UserToDto(user));       
        }

        // DELETE: users/5
        [Route("")]
        [Authorize(Roles = "SysAdmin")]
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

                while (patient.PatientCareTeams.Count != 0)
                {
                    _db.CareTeam.Remove(patient.PatientCareTeams.ElementAt(0));
                }

                while (patient.Prescriptions.Count != 0)
                {
                    _db.Prescription.Remove(patient.Prescriptions.ElementAt(0));
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

        public static bool IsPatient(ApplicationUser user)
        {
            foreach (var role in user.Roles)
            {
                if (RoleManager.IsRole(role, RoleId.Patient))
                    return true;
            }
            return false;
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

        private async Task<IHttpActionResult> GetUsersByRoleIds(string email, List<string> roleIdStrList)
        {
            if (email == null)
            {
                return BadRequest();
            }

            var proxyCreation = _db.Configuration.ProxyCreationEnabled;
            _db.Configuration.ProxyCreationEnabled = false;

            List<ApplicationUser> providers;

            providers = await _db.Users
                .Where(u => u.Roles.Any(r => roleIdStrList.Any(rid => rid == r.RoleId)))
                .Include(u => u.Roles)
                .ToListAsync();

            _db.Configuration.ProxyCreationEnabled = proxyCreation;

            providers = providers.Distinct().ToList();

            foreach (var provider in providers)
            {
                if (email == provider.Email)
                {
                    return Ok(ToDto.UserToDto(provider));
                }
            }
            return NotFound();
        }

    }
}