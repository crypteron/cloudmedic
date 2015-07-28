﻿using System;
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

            foreach (var careTeam in careTeams)
            {
                careTeamsDto.Add(CareTeamToDto(careTeam));
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

            return Ok(CareTeamToDto(careTeam));
        }

        // PUT: CareTeams/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutCareTeams(Guid id, CareTeam careTeam)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != careTeam.Id)
            {
                return BadRequest();
            }

            db.Entry(careTeam).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CareTeamExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
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
            return Created("CareTeams/" + careTeam.Id, CareTeamToDto(careTeam));
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

        public static CareTeamDto CareTeamToDto(CareTeam careTeam)
        {
            var careTeamDto = new CareTeamDto();
            careTeamDto.InjectFrom(careTeam);
            careTeamDto.PatientId = careTeam.Patient.Id;
            careTeamDto.ProviderIds = new List<string>();
            foreach (var provider in careTeam.Providers)
            {
                careTeamDto.ProviderIds.Add(provider.Id);

            }
            return careTeamDto;
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