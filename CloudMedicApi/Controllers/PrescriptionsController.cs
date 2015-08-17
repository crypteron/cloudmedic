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
using Microsoft.AspNet.Identity.EntityFramework;
using System.Security.Permissions;

namespace CloudMedicApi.Controllers
{
    [Authorize]
    [RoutePrefix("api/prescriptions")]
    public class PrescriptionsController : ApiController
    {
        private MyDbContext db = new MyDbContext();
        private ApplicationUserManager userManager;

        public PrescriptionsController()
        {
            db = new MyDbContext();
            userManager = new ApplicationUserManager(new UserStore<ApplicationUser>(db));
        }

        // GET: Prescriptions
        [Route("")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Physician")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Nurse")]
        public async Task<IHttpActionResult> GetPrescriptions(string providerId)
        {
            var provider = await userManager.FindByIdAsync(providerId);
            if (provider == null)
            {
                return NotFound();
            }

            List<PrescriptionDto> prescriptionsDto = new List<PrescriptionDto>();

            foreach (var careTeam in provider.ProviderCareTeams)
            {
                foreach (var prescription in careTeam.Patient.Prescriptions)
                {
                    prescriptionsDto.Add(ToDto.PrescriptionToDto(prescription));
                }
            }        
            return Ok(prescriptionsDto);
        }

        // GET: Prescriptions/5
        [Route("")]
        [ResponseType(typeof(Prescription))]
        public async Task<IHttpActionResult> GetPrescription(Guid id)
        {
            Prescription prescription = await db.Prescription.FindAsync(id);
            if (prescription == null)
            {
                return NotFound();
            }

            return Ok(prescription);
        }
        
        // POST: Prescriptions/Add
        [Route("Add")]
        [ResponseType(typeof(Prescription))]
        [PrincipalPermission(SecurityAction.Demand, Role = "Physician")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Nurse")]
        public async Task<IHttpActionResult> PostPrescription(PrescribeBindingModel model)
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

            var medication = await db.Medication.FindAsync(new Guid(model.MedicationId));
            if (medication == null)
            {
                return NotFound();
            }

            var prescription = new Prescription()
            {
                PrescriptionId = Guid.NewGuid(),
                Medication = medication,
                Dosage = model.Dosage,
                Frequency = model.Frequency,
                StartDate = model.StartDate,
                EndDate = model.EndDate,
                Notes = model.Notes,
                Patient = patient
            };

            db.Prescription.Add(prescription);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (PrescriptionExists(prescription.PrescriptionId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }
            return Created("prescriptions/" + prescription.PrescriptionId, ToDto.PrescriptionToDto(prescription));
        }

        // POST: Prescriptions/Update
        [Route("Update")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Physician")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Nurse")]
        public async Task<IHttpActionResult> UpdatePrescription(UpdatePrescriptionBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var prescription = await db.Prescription.FindAsync(new Guid(model.PrescriptionId));
            if (prescription == null)
            {
                return NotFound();
            }

            prescription.Notes = model.Notes;
            prescription.EndDate = model.EndDate;
            await db.SaveChangesAsync();
            return Ok();
        }

        // DELETE: Prescriptions/5
        [Route("")]
        [ResponseType(typeof(Prescription))]
        [PrincipalPermission(SecurityAction.Demand, Role = "Physician")]
        [PrincipalPermission(SecurityAction.Demand, Role = "Nurse")]
        public async Task<IHttpActionResult> DeletePrescription(Guid id)
        {
            Prescription prescription = await db.Prescription.FindAsync(id);
            if (prescription == null)
            {
                return NotFound();
            }

            db.Prescription.Remove(prescription);
            await db.SaveChangesAsync();

            return Ok(prescription);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PrescriptionExists(Guid id)
        {
            return db.Prescription.Count(e => e.PrescriptionId == id) > 0;
        }
    }
}