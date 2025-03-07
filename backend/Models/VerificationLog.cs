using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class VerificationLog
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int DocumentId { get; set; } // Foreign Key

        [Required]
        public string VerifiedBy { get; set; } // Admin/User Email

        public DateTime Timestamp { get; set; } = DateTime.UtcNow;

        [Required]
        public string Status { get; set; } // Verified, Rejected

        // Navigation property
        [ForeignKey("DocumentId")]
        public Document Document { get; set; }
    }
}
