using backend.Models;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DocumentsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly string _connectionString;

        public DocumentsController(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        // POST: api/documents
        [HttpPost]
        public async Task<IActionResult> UploadDocument([FromBody] Document document)
        {
            if (document == null)
            {
                return BadRequest("Document is null");
            }

            // Fetch the user based on the userId
            var user = await _context.Users.FindAsync(document.UserId);
            if (user == null)
            {
                return BadRequest("User not found");
            }

            // Associate the user with the document
            document.User = user;

            // Generate a unique VerificationCode
            document.VerificationCode = Guid.NewGuid().ToString("N").Substring(0, 6); // Example: 6-character unique code
            document.CreatedAt = DateTime.UtcNow;

            // Add to database
            _context.Documents.Add(document);
            await _context.SaveChangesAsync();

            // Return the created document with the HTTP status code 201
            return CreatedAtAction("GetDocument", new { id = document.Id }, document);
        }

        // GET: api/documents/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDocument(int id)
        {
            var document = await _context.Documents
                                         .FirstOrDefaultAsync(d => d.Id == id);

            if (document == null)
            {
                return NotFound();
            }

            return Ok(document);
        }

        // POST: api/documents/verify
        [HttpPost("verify")]
        public async Task<IActionResult> VerifyDocument([FromBody] VerificationRequest request)
        {
            if (request == null || string.IsNullOrEmpty(request.VerificationCode))
            {
                return BadRequest("Verification code is required");
            }

            using (IDbConnection dbConnection = new SqlConnection(_connectionString))
            {
                var query = "SELECT * FROM Documents WHERE VerificationCode = @VerificationCode";
                var document = await dbConnection.QueryFirstOrDefaultAsync<Document>(query, new { VerificationCode = request.VerificationCode });

                if (document == null)
                {
                    return NotFound("Document not found or invalid verification code.");
                }

                // You can add more logic here to mark the document as verified or perform any actions needed

                return Ok(document);
            }
        }

        // Inner class for verification request
        public class VerificationRequest
        {
            [Required]
            public string VerificationCode { get; set; }
        }
    }
}