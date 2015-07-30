using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using Omu.ValueInjecter;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using CloudMedicApi.DAL;
using CloudMedicApi.Models;
using CloudMedicApi.Controllers;
using Microsoft.AspNet.Identity.EntityFramework;

namespace CloudMedicApi.Controllers
{
    [Authorize]
    [RoutePrefix("CareTeams")]
    public class CareTeamsController : ApiController
    {
        private MyDbContext db = new MyDbContext();
        private ApplicationUserManager userManager;

        public CareTeamsController()
        {
            db = new MyDbContext();
            userManager = new ApplicationUserManager(new UserStore<ApplicationUser>(db));
        }

        // GET: CareTeams
        [Route("")]
        public async Task<IHttpActionResult> GetCareTeams()
        {
            List<CareTeam> careTeams;

            careTeams = await db.CareTeam
                .Take(30)
                .ToListAsync();

            var careTeamsDto = new List<CareTeamDto>();

            var roles = await db.Roles.ToDictionaryAsync(r => r.Id);

            foreach (var careTeam in careTeams)
            {
                careTeamsDto.Add(ToDto.CareTeamToDto(careTeam, roles));
            }

            return Ok(careTeamsDto);
        }

        // GET: CareTeams/5
        [Route("")]
        [ResponseType(typeof(CareTeamDto))]
        public async Task<IHttpActionResult> GetCareTeam(Guid id)
        {
            CareTeam careTeam = await db.CareTeam.FindAsync(id);
            if (careTeam == null)
            {
                return NotFound();
            }

            var roles = await db.Roles.ToDictionaryAsync(r => r.Id);

            return Ok(ToDto.CareTeamToDto(careTeam, roles));
        }

        // POST: CareTeams/Update
        [Route("Update")]
        public async Task<IHttpActionResult> AddProvider(UpdateTeamBindingModel model)
        {
            CareTeam careTeam = await db.CareTeam.FindAsync(model.TeamId);
            if (careTeam == null)
            {
                return NotFound();
            }

            var providers = new List<ApplicationUser>();
            foreach (var providerId in model.ProviderIds)
            {
                var provider = await userManager.FindByIdAsync(providerId);
                if (provider == null)
                {
                    return NotFound();
                }

                if (!careTeam.Providers.Contains(provider))
                {
                    careTeam.Providers.Add(provider);
                }
            }

            careTeam.Name = model.TeamName;

            await db.SaveChangesAsync();
            return Ok();
        }

        // POST: CareTeams/Update/Add
        [Route("Update/Add")]
        public async Task<IHttpActionResult> AddProvider(UpdateProviderBindingModel model)
        {
            CareTeam careTeam = await db.CareTeam.FindAsync(model.TeamId);
            if (careTeam == null)
            {
                return NotFound();
            }

            var provider = await userManager.FindByIdAsync(model.ProviderId);
            if (provider == null)
            {
                return NotFound();
            }

            careTeam.Providers.Add(provider);
            await db.SaveChangesAsync();
            return Ok();
        }

        // POST: CareTeams/Update/Remove
        [Route("Update/Remove")]
        public async Task<IHttpActionResult> RemoveProvider(UpdateProviderBindingModel model)
        {
            CareTeam careTeam = await db.CareTeam.FindAsync(model.TeamId);
            if (careTeam == null)
            {
                return NotFound();
            }

            var provider = await userManager.FindByIdAsync(model.ProviderId);
            if (provider == null)
            {
                return NotFound();
            }
            if (careTeam.Providers.Contains(provider))
            {
                return NotFound();
            }
            else
            {
                careTeam.Providers.Remove(provider);
            }

            await db.SaveChangesAsync();
            return Ok();
        }

        // POST: CareTeams/Update/Name
        [Route("Update/Name")]
        public async Task<IHttpActionResult> ChangeName(UpdateNameBindingModel model)
        {
            CareTeam careTeam = await db.CareTeam.FindAsync(model.TeamId);
            if (careTeam == null)
            {
                return NotFound();
            }

            careTeam.Name = model.TeamName;
            await db.SaveChangesAsync();
            return Ok();
        }

        // POST: CareTeams/Add
        [Route("Add")]
        [ResponseType(typeof(Prescription))]
        public async Task<IHttpActionResult> PostCareTeam(CareTeamBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var patient = await userManager.FindByIdAsync(model.PatientId);
            if (patient == null)
            {
                return NotFound();
            }

            List<ApplicationUser> providers = new List<ApplicationUser>();
            foreach (string ProviderId in model.ProviderIds)
            {
                var provider = await userManager.FindByIdAsync(ProviderId);
                if (provider == null)
                {
                    return NotFound();
                }
                providers.Add(provider);
            }

            var careTeam = new CareTeam()
            {
                Id = Guid.NewGuid(),
                Name = model.Name,
                Active = false,
                Providers = providers,
                Patient = patient
            };

            db.CareTeam.Add(careTeam);
            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (CareTeamExists(careTeam.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return Created("CareTeams/" + careTeam.Id, ToDto.CareTeamToDto(careTeam));
        }

        // DELETE: CareTeam/5
        [Route("")]
        [ResponseType(typeof(CareTeam))]
        public async Task<IHttpActionResult> DeleteCareTeam(Guid id)
        {
            CareTeam careTeam = await db.CareTeam.FindAsync(id);
            if (careTeam == null)
            {
                return NotFound();
            }

            db.CareTeam.Remove(careTeam);
            await db.SaveChangesAsync();

            return Ok(careTeam);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CareTeamExists(Guid id)
        {
            return db.CareTeam.Count(e => e.Id == id) > 0;
        }
    }
}