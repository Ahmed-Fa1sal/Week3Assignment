using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Document
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; } // Foreign Key

        [Required, MaxLength(200)]
        public string Title { get; set; }

        [Required]
        public string FilePath { get; set; } // Path to the uploaded file

        [Required]
        public string VerificationCode { get; set; } // Unique Code

        [Required]
        public string Status { get; set; } // Pending, Verified, Rejected

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation properties
        [ForeignKey("UserId")]
        public User User { get; set; }
        
        public ICollection<VerificationLog> VerificationLogs { get; set; }
    }
}
