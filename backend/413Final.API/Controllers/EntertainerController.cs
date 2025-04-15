using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using _413Final.API.Data;
using System.Linq;


namespace _413Final.API.Controllers

{
    // Path
    [Route("api/entertainer")]
    [ApiController]
    
    public class EntertainerController : ControllerBase
    {

        private EntertainerDbContext _EntertainerContext;

        public EntertainerController(EntertainerDbContext context)
        {
            _EntertainerContext = context;
        }
        
        // Controller for grabbing all the entertainer stage names, number of times they have been booked
        // and the last date they were booked
        [HttpGet("AllEntertainers")]
        public IActionResult Get()
        {
            var result = _EntertainerContext.Entertainers
                .Select(e => new
                {
                    e.EntertainerId, // ← Add this line!
                    e.EntStageName,
                    NumberOfBookings = _EntertainerContext.Engagements.Count(eng => eng.EntertainerID == e.EntertainerId),
                    LastBookingDate = _EntertainerContext.Engagements
                        .Where(eng => eng.EntertainerID == e.EntertainerId)
                        .OrderByDescending(eng => eng.StartDate)
                        .Select(eng => eng.StartDate)
                        .FirstOrDefault()
                })
                .ToList();

            return Ok(result);
        }


        // Controller that grabs the details of the entertainer based on ID
        [HttpGet("{id}")]
        public IActionResult GetEntertainerById(int id)
        {
            var entertainer = _EntertainerContext.Entertainers
                .FirstOrDefault(e => e.EntertainerId == id);

            if (entertainer == null)
            {
                return NotFound(new { message = "Entertainer not found." });
            }

            return Ok(entertainer);
        }
        
        //Controller that adds an entertainer
        [HttpPost("AddEntertainer")]
        public IActionResult AddEntertainer([FromBody] EntertainerAddRequest entertainerRequest)
        {
            var entertainer = new Entertainer
            {
                EntertainerId = entertainerRequest.EntertainerId,
                EntStageName = entertainerRequest.EntStageName,
                EntSSN = entertainerRequest.EntSSN,
                EntStreetAddress = entertainerRequest.EntStreetAddress,
                EntCity = entertainerRequest.EntCity,
                EntState = entertainerRequest.EntState,
                EntZipCode = entertainerRequest.EntZipCode,
                EntPhoneNumber = entertainerRequest.EntPhoneNumber,
                EntWebPage = entertainerRequest.EntWebPage,
                EntEMailAddress = entertainerRequest.EntEMailAddress,
                DateEntered = entertainerRequest.DateEntered
            };

            _EntertainerContext.Entertainers.Add(entertainer);
            _EntertainerContext.SaveChanges();
            return Ok(entertainer);
        }
        
        // Edit an entertainer 
        [HttpPut("UpdateEntertainer/{id}")]
        public IActionResult UpdateEntertainer(int id, [FromBody] EntertainerAddRequest entertainerRequest)
        {
            var existingEntertainer = _EntertainerContext.Entertainers.FirstOrDefault(e => e.EntertainerId == id);
            if (existingEntertainer == null)
            {
                return NotFound(new { message = "Entertainer not found." });
            }

            existingEntertainer.EntStageName = entertainerRequest.EntStageName;
            existingEntertainer.EntSSN = entertainerRequest.EntSSN;
            existingEntertainer.EntStreetAddress = entertainerRequest.EntStreetAddress;
            existingEntertainer.EntCity = entertainerRequest.EntCity;
            existingEntertainer.EntState = entertainerRequest.EntState;
            existingEntertainer.EntZipCode = entertainerRequest.EntZipCode;
            existingEntertainer.EntPhoneNumber = entertainerRequest.EntPhoneNumber;
            existingEntertainer.EntWebPage = entertainerRequest.EntWebPage;
            existingEntertainer.EntEMailAddress = entertainerRequest.EntEMailAddress;
            existingEntertainer.DateEntered = entertainerRequest.DateEntered;

            _EntertainerContext.SaveChanges();
            return Ok(existingEntertainer);
        }


    }
}



