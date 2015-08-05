using System.Data.Entity;
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
using System.Security.Permissions;
using CloudMedicApi.BLL;

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
        [PrincipalPermission(SecurityAction.Demand, Role = "SysAdmin")]
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
                usersDto.Add(ToDto.UserToDto(user, roles));
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
            return Ok(ToDto.UserToDto(user, roles));
        }

        // GET: users/patients
        [Route("Patients")]
        [ResponseType(typeof(List<UserDto>))]
        [PrincipalPermission(SecurityAction.Demand, Role = "Physician")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Nurse")]
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
                patients.Add(careTeam.Patient);
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
        [ResponseType(typeof(List<UserDto>))]
        public async Task<IHttpActionResult> GetProvidersByName(string id) {
            if (id == null)
            {
                return BadRequest();
            }
            string[] name = id.Split(' ');
            if (name.Length >= 3)
            {
                return NotFound();
            }

            List<ApplicationUser> providers;
            var search = from roleObj in _db.Roles
                        where roleObj.Name == "Physician" || roleObj.Name == "Nurse"
                        from userRoles in roleObj.Users
                        join user in _db.Users
                        on userRoles.UserId equals user.Id
                        select user;

            providers = await search.ToListAsync();
            List<UserDto> results = new List<UserDto>();
            var roles = await _db.Roles.ToDictionaryAsync(r => r.Id);

            if (name.Length > 1)
                for (int i = 0; i <= 6; i++)
                {
                    foreach (var provider in providers)
                    {
                        if (EditDistance(id, provider.FirstName + " " + provider.LastName) == i)
                            results.Add(ToDto.UserToDto(provider, roles));
                    }
                }
            else
                for (int i = 0; i <= 3; i++)
                {
                    foreach (var provider in providers)
                    {
                        if (EditDistance(id, provider.LastName) == i || EditDistance(id, provider.FirstName) == i)
                            results.Add(ToDto.UserToDto(provider, roles));
                    }
                }

            return Ok(results);
        }

        // GET: users/supporters
        [Route("Supporters")]
        [ResponseType(typeof(List<UserDto>))]
        public async Task<IHttpActionResult> GetSupportersByName(string id)
        {
            if (id == null)
            {
                return BadRequest();
            }
            string[] name = id.Split(' ');
            if (name.Length >= 3)
            {
                return NotFound();
            }

            List<ApplicationUser> providers;
            var search = from roleObj in _db.Roles
                         where roleObj.Name == "Supporter"
                         from userRoles in roleObj.Users
                         join user in _db.Users
                         on userRoles.UserId equals user.Id
                         select user;

            providers = await search.ToListAsync();
            List<UserDto> results = new List<UserDto>();
            var roles = await _db.Roles.ToDictionaryAsync(r => r.Id);

            if (name.Length > 1)
                for (int i = 0; i <= 6; i++)
                {
                    foreach (var provider in providers)
                    {
                        if (EditDistance(id, provider.FirstName + " " + provider.LastName) == i)
                            results.Add(ToDto.UserToDto(provider, roles));
                    }
                }
            else
                for (int i = 0; i <= 3; i++)
                {
                    foreach (var provider in providers)
                    {
                        if (EditDistance(id, provider.LastName) == i || EditDistance(id, provider.FirstName) == i)
                            results.Add(ToDto.UserToDto(provider, roles));
                    }
                }

            return Ok(results);
        }

        // GET: users/prescriptions/5
        [Route("Prescriptions")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Patient")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Physician")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Nurse")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Supporter")]
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

        // GET: users/provider/5
        [Route("Provider")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Physician")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Nurse")]
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
                careTeamsDto.Add(ToDto.CareTeamToDto(careTeam, roles));
            }

            return Ok(careTeamsDto);
        }

        // GET: users/patient/5
        [Route("Patient")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Patient")]
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
        [PrincipalPermission(SecurityAction.Demand, Role = "SysAdmin")]
        public async Task<IHttpActionResult> PostUser(CreateUserBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var password = Randomizer.GetRandomString(10);

            var user = new ApplicationUser()
            {
                UserName = model.FirstName + model.LastName + Randomizer.GetRandomInt(),
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

            Crypteron.CipherDb.Session.Unseal(user);
            identityResult = await _userManager.AddToRolesAsync(user.Id, model.Roles.ToArray());


            Crypteron.CipherDb.Session.Unseal(user);

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
            mail.From = new MailAddress("crypterondummytest@outlook.com", "no_reply_cloudmedic");
            mail.To.Add(new MailAddress(user.Email));
            mail.Subject = "Invitation to join CloudMedic";
            mail.Body = "Dear " + user.FirstName + " " + user.LastName + ", you have been added to CloudMedic by an administrator.\n\nPlease login with your assigned username and password:\n\nUsername: " + user.UserName + "\nPassword: " + password + "\n\n After logging in, change your password under the profile tab.";

            client.Send(mail);

            return Created("users/" + user.Id, ToDto.UserToDto(user));       
        }

        // DELETE: users/5
        [Route("")]
        [PrincipalPermission(SecurityAction.Demand, Role = "SysAdmin")]
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

        public static Boolean isPatient(ApplicationUser user)
        {
            foreach (var role in user.Roles)
            {
                if (role.RoleId == "0")
                    return true;
            }
            return false;
        }

        public static int EditDistance(String StrA, String StrB)
        {
            int[,] matrix = new int[StrA.Length+1, StrB.Length + 1];
            char[] ArrayA = StrA.ToCharArray();
            char[] ArrayB = StrB.ToCharArray();
            int current;
            for (int i = 0; i <= StrA.Length; i++)
                matrix[i, 0] = i;
            for (int i = 0; i <= StrB.Length; i++)
                matrix[0, i] = i;
	        for (int i = 1;i <= StrA.Length; i++)
	    	  for(int j = 1;j <= StrB.Length; j++)
	    	  {
	    		  current = 1;
	    		  if (Char.ToLower(ArrayA[i-1]) == Char.ToLower(ArrayB[j-1]))
	    		     current = 0;
	    		  matrix[i,j] = matrix[i - 1,j - 1] + current;
                  if (matrix[i, j] > matrix[i - 1, j] + 1)
                      matrix[i, j] = matrix[i - 1, j] + 1;
                  if (matrix[i, j] > matrix[i , j-1] + 1)
                      matrix[i, j] = matrix[i, j-1] + 1;
	    	  }
            return matrix[StrA.Length, StrB.Length];
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