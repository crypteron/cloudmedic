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
    [RoutePrefix("Prescriptions")]
    public class PresciptionsController : ApiController
    {
        private MyDbContext db = new MyDbContext();

        // GET: Prescriptions
        [Route("")]
        public async Task<IHttpActionResult> GetPrescriptions()
        {
            List<Prescription> prescriptions;

            prescriptions = await db.Prescription
                .Take(30)
                .ToListAsync();

            var prescriptionsDto = new List<PrescriptionDto>();

            foreach (var prescription in prescriptions)
            {
                prescriptionsDto.Add(PrescriptionToDto(prescription));
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

        // PUT: Prescriptions/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutPrescriptions(Guid id, Prescription prescription)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != prescription.PrescriptionId)
            {
                return BadRequest();
            }

            db.Entry(prescription).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PrescriptionExists(id))
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

        // POST: Prescriptions/Add
        [Route("Add")]
        [ResponseType(typeof(Prescription))]
        public async Task<IHttpActionResult> PostPrescription(PrescriptionDto prescriptionDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var prescription = new Prescription();
            prescription.InjectFrom(prescriptionDto);
            prescription.PrescriptionId = Guid.NewGuid();
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

            prescriptionDto.PrescriptionId = prescription.PrescriptionId;
            return Created("prescriptions/" + prescription.PrescriptionId, prescriptionDto);
        }

        // DELETE: Prescriptions/5
        [Route("")]
        [ResponseType(typeof(Prescription))]
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

        public static PrescriptionDto PrescriptionToDto(Prescription prescription)
        {
            var prescriptionDto = new PrescriptionDto();
            prescriptionDto.InjectFrom(prescription);
            return prescriptionDto;
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