using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using System.Web;
using CloudMedicApi.DAL;
using CloudMedicApi.Models;
using CloudMedicApi.Utility;
using Microsoft.AspNet.Identity.Owin;

namespace CloudMedicApi.Controllers
{
    //[RoutePrefix("Person")]
    //public class PersonController : Controller
    //{
    //    private readonly MyDbContext _db = new MyDbContext();
        
    //    private const int DbCapacity=2000;
    //    private static readonly string DbCapacityMsg = "Database capacity of " + DbCapacity + " patients reached";
    //    private ApplicationUserManager _userManager;

    //    public ApplicationUserManager UserManager
    //    {
    //        get
    //        {
    //            return _userManager ?? HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();
    //        }
    //        private set
    //        {
    //            _userManager = value;
    //        }
    //    }

    //    #region [Dangerous code, for demonstration purposes only]
    //    [HttpGet]
    //    public async Task<ActionResult> Prefill(int count = 100)
    //    {
    //        // Sanity checks
    //        if (count < 0)
    //            return Error("Count cannot be negative");

    //        var currentCapacity = await _db.Users.CountAsync();
    //        if (count + currentCapacity > DbCapacity)
    //            return Error(DbCapacityMsg);

    //        var sw = new Stopwatch();
    //        sw.Start();
    //        for (int i = 0; i < count; i++)
    //        {
    //            _db.Users.Add(PersonRandomizer.CreateRandomPatient());
    //        }
    //        await _db.SaveChangesAsync();
    //        sw.Stop();

    //        //var rate = (float)count/(sw.ElapsedMilliseconds/1000.0);
    //        //ViewBag.Message = String.Format("Created {0} patients in {1} milliseconds (avg {2} patients/second)", count, sw.ElapsedMilliseconds, rate);
    //        //return View();
    //        return RedirectToAction("Index");
    //    }

    //    [HttpGet]
    //    public async Task<ActionResult> Wipeall()
    //    {
    //        return View();
    //    }

    //    [HttpPost]
    //    public async Task<ActionResult> WipeallConfirmed()
    //    {
    //        // Cannot truncate table 'Patients' because it is being referenced by 
    //        // a FOREIGN KEY constraint so issue delete
    //        _db.Database.ExecuteSqlCommand("DELETE From Patients");
    //        return RedirectToAction("Index");
    //    }
    //    #endregion

    //    // GET: Patients
    //    public async Task<ActionResult> Index(bool cipherdb=true)
    //    {
    //        List<ApplicationUser> allUsers;
    //        if (cipherdb)
    //        {
    //            var sw = new Stopwatch();
    //            sw.Start();
    //            allUsers = _db.Users.Take(30).Include(u => u.Roles).ToList();
    //            sw.Stop();

    //            var count = allUsers.Count;
    //            var rate = (float)count / (sw.ElapsedMilliseconds / 1000.0);
    //            ViewBag.Message = String.Format("Listing {0} patients via CipherDB " +
    //                                            "mode took {1} milliseconds (avg {2} patients/second)",
    //                                            count,
    //                                            sw.ElapsedMilliseconds,
    //                                            rate);
    //        }
    //        else
    //        {
    //            using (var noCipherDbCtx = new MyDbContext(byPassCipherDb:true))
    //            {
    //                var sw = new Stopwatch();
    //                sw.Start();
    //                allUsers = noCipherDbCtx.Users.Include(u => u.Roles).ToList();
    //                sw.Stop();

    //                var count = allUsers.Count;
    //                var rate = (float)count / (sw.ElapsedMilliseconds / 1000.0);
    //                ViewBag.Message = String.Format("Listing {0} users WITHOUT security " +
    //                                                "mode took {1} milliseconds (avg {2} patients/second)",
    //                                                count,
    //                                                sw.ElapsedMilliseconds,
    //                                                rate);

    //            }
    //        }
            
    //        return View(allUsers);
    //    }

    //    // GET: Patients/Details/5
    //    public async Task<ActionResult> Details(string id)
    //    {
    //        if (string.IsNullOrWhiteSpace(id))
    //        {
    //            return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
    //        }

    //        var user = await _userManager.FindByIdAsync(id);
    //        if (user == null)
    //        {
    //            return HttpNotFound();
    //        }
    //        return View(user);
    //    }

    //    // GET: Patients/Create
    //    public async Task<ActionResult> Create()
    //    {
    //        var currentCapacity = await _db.Users.CountAsync();
    //        if (currentCapacity >= DbCapacity)
    //            return Error(DbCapacityMsg);

    //        var prefilledPatient = PersonRandomizer.CreateRandomPatient();
    //        return View(prefilledPatient);
    //    }

    //    // POST: Patients/Create
    //    // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
    //    // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
    //    [HttpPost]
    //    [ValidateAntiForgeryToken]
    //    public async Task<ActionResult> Create([Bind(Include = "Id,FirstName,LastName,GenderEnum,DateOfBirth")] ApplicationUser patient)
    //    {
    //        if (await _db.Users.CountAsync() > DbCapacity)
    //            return Error(DbCapacityMsg);

    //        if (ModelState.IsValid)
    //        {
    //            patient.Id = Guid.NewGuid().ToString();
    //            _db.Users.Add(patient);
    //            await _db.SaveChangesAsync();
    //            return RedirectToAction("Index");
    //        }

    //        return View(patient);
    //    }

    //    // GET: Patients/Edit/5
    //    public async Task<ActionResult> Edit(string id)
    //    {
    //        if (string.IsNullOrWhiteSpace(id))
    //        {
    //            return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
    //        }
    //        var patient = _db.Users.Find(id);
    //        if (patient == null)
    //        {
    //            return HttpNotFound();
    //        }
    //        return View(patient);
    //    }

    //    // POST: Patients/Edit/5
    //    // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
    //    // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
    //    [HttpPost]
    //    [ValidateAntiForgeryToken]
    //    public async Task<ActionResult> Edit([Bind(Include = "Id,FirstName,LastName,GenderEnum,DateOfBirth")] ApplicationUser patient)
    //    {
    //        if (ModelState.IsValid)
    //        {
    //            _db.Entry(patient).State = EntityState.Modified;
    //            await _db.SaveChangesAsync();
    //            return RedirectToAction("Index");
    //        }
    //        return View(patient);
    //    }

    //    // GET: Patients/Delete/5
    //    public async Task<ActionResult> Delete(string id)
    //    {
    //        if (string.IsNullOrWhiteSpace(id))
    //        {
    //            return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
    //        }

    //        var patient = await _userManager.FindByIdAsync(id);
    //        if (patient == null)
    //        {
    //            return HttpNotFound();
    //        }
    //        return View(patient);
    //    }

    //    // POST: Patients/Delete/5
    //    [HttpPost, ActionName("Delete")]
    //    [ValidateAntiForgeryToken]
    //    public async Task<ActionResult> DeleteConfirmed(string id)
    //    {
    //        var patient = await _userManager.FindByIdAsync(id);
    //        _db.Users.Remove(patient);
    //        await _db.SaveChangesAsync();
    //        return RedirectToAction("Index");
    //    }

    //    private ActionResult Error(string errorMessage)
    //    {
    //        ViewBag.ErrorMessage = errorMessage;
    //        return View("Error");
    //    }

    //    protected override void Dispose(bool disposing)
    //    {
    //        if (disposing)
    //        {
    //            _db.Dispose();
    //        }
    //        base.Dispose(disposing);
    //    }
    //}
}
