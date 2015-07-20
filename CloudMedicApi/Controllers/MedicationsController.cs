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

namespace CloudMedicApi.Controllers
{
    [RoutePrefix("Medications")]
    public class MedicationsController : ApiController
    {
        //private CloudMedicContext db = new CloudMedicContext();
        private MyDbContext db = new MyDbContext();

        // GET: Medications
        [Route("")]
        public async Task<IHttpActionResult> GetMedications()
        {
            List<Medication> medications;

            medications = await db.Medication
                .Take(30)
                .ToListAsync();

            var medicationsDto = new List<MedicationDto>();

            foreach (var medication in medications)
            {
                medicationsDto.Add(MedicationToDto(medication));
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

        // PUT: api/Medications/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutMedication(Guid id, Medication medication)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != medication.MedicationId)
            {
                return BadRequest();
            }

            db.Entry(medication).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MedicationExists(id))
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

        // POST: Medications/Add
        [Route("Add")]
        [ResponseType(typeof(Medication))]
        public async Task<IHttpActionResult> PostMedication(MedicationDto medicationDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var medication = new Medication();
            medication.InjectFrom(medicationDto);
            medication.MedicationId = Guid.NewGuid();
            db.Medication.Add(medication);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (MedicationExists(medication.MedicationId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }
            return Created("medications/" + medication.MedicationId, medicationDto);
        }

        // DELETE: Medications/5
        [Route("")]
        [ResponseType(typeof(Medication))]
        public async Task<IHttpActionResult> DeleteMedication(Guid id)
        {
            Medication medication = await db.Medication.FindAsync(id);
            if (medication == null)
            {
                return NotFound();
            }

            db.Medication.Remove(medication);
            await db.SaveChangesAsync();

            return Ok(medication);
        }

        public static MedicationDto MedicationToDto(Medication medication)
        {
            var medicationDto = new MedicationDto();
            medicationDto.InjectFrom(medication);
            return medicationDto;
        }


        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool MedicationExists(Guid id)
        {
            return db.Medication.Count(e => e.MedicationId == id) > 0;
        }
    }
}