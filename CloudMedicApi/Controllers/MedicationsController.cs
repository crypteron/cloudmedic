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
using System.Security.Permissions;

namespace CloudMedicApi.Controllers
{
    [Authorize]
    [RoutePrefix("api/medications")]
    public class MedicationsController : ApiController
    {
        //private CloudMedicContext db = new CloudMedicContext();
        private MyDbContext db = new MyDbContext();

        // GET: Medications
        [Route("")]
        [Authorize(Roles = "Physician, Nurse")]
        public async Task<IHttpActionResult> GetMedications()
        {
            List<Medication> medications;

            medications = await db.Medication
                .Take(30)
                .ToListAsync();

            var medicationsDto = new List<MedicationDto>();

            foreach (var medication in medications)
            {
                medicationsDto.Add(ToDto.MedicationToDto(medication));
            }

            return Ok(medicationsDto);
        }

        // GET: api/Medications/5
        [Route("")]
        [ResponseType(typeof(Medication))]
        public async Task<IHttpActionResult> GetMedication(Guid id)
        {
            Medication medication = await db.Medication.FindAsync(id);
            if (medication == null)
            {
                return NotFound();
            }

            return Ok(medication);
        }

        // POST: Medications/Add
        [Route("Add")]
        [ResponseType(typeof(Medication))]
        [Authorize(Roles = "Physician, Nurse")]
        public async Task<IHttpActionResult> PostMedication(MedicationBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var medication = new Medication()
            {
                MedicationId = Guid.NewGuid(),
                GenericName = model.GenericName,
                Code = model.Code
            };

            try
            {
                if (MedicationExists(medication) == false)
                {
                    db.Medication.Add(medication);
                    await db.SaveChangesAsync();

                }
                else
                {
                    return BadRequest("The medication name or code already exists in the databae.");
                }
            }
            catch (DbUpdateException)
            {
                throw;
            }

            return Created("medications/" + medication.MedicationId, ToDto.MedicationToDto(medication));
        }

        // DELETE: Medications/5
        [Route("")]
        [ResponseType(typeof(Medication))]
        [Authorize(Roles = "Physician, Nurse")]
        public async Task<IHttpActionResult> DeleteMedication(Guid id)
        {
            Medication medication = await db.Medication.FindAsync(id);
            if (medication == null)
            {
                return NotFound();
            }

            // Clear prescriptions dependent on medication
            while (medication.Prescriptions.Count != 0)
            {
                db.Prescription.Remove(medication.Prescriptions.ElementAt(0));
            }

            db.Medication.Remove(medication);
            await db.SaveChangesAsync();

            return Ok(medication);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool MedicationExists(Medication medication)
        {
            bool code_check = db.Medication.Count(e => e.Code == medication.Code) > 0;
            bool name_check = db.Medication.Count(e => e.GenericName == medication.GenericName) > 0;

            return (code_check || name_check);

        }

    }
}