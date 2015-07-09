using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using CloudMedic.DAL;
using CloudMedic.Models;

namespace CloudMedic.Controllers.Api
{
    public class MedicationsController : ApiController
    {
        private CloudMedicContext db = new CloudMedicContext();

        // GET: api/Medications
        public IQueryable<Medication> GetMedications()
        {
            return db.Medications;
        }

        // GET: api/Medications/5
        [ResponseType(typeof(Medication))]
        public async Task<IHttpActionResult> GetMedication(Guid id)
        {
            Medication medication = await db.Medications.FindAsync(id);
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

        // POST: api/Medications
        [ResponseType(typeof(Medication))]
        public async Task<IHttpActionResult> PostMedication(Medication medication)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Medications.Add(medication);

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

            return CreatedAtRoute("DefaultApi", new { id = medication.MedicationId }, medication);
        }

        // DELETE: api/Medications/5
        [ResponseType(typeof(Medication))]
        public async Task<IHttpActionResult> DeleteMedication(Guid id)
        {
            Medication medication = await db.Medications.FindAsync(id);
            if (medication == null)
            {
                return NotFound();
            }

            db.Medications.Remove(medication);
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

        private bool MedicationExists(Guid id)
        {
            return db.Medications.Count(e => e.MedicationId == id) > 0;
        }
    }
}