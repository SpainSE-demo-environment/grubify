namespace GrubifyApi.Models
{
    public class Clinic
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
        public double Rating { get; set; }
        public string Address { get; set; } = string.Empty;
        public string SpecialtyType { get; set; } = string.Empty;
        public string NextAvailable { get; set; } = string.Empty; // e.g., "Hoy 16:30"
        public decimal ConsultationFee { get; set; } // copago base
        public bool IsOpen { get; set; }
        public List<Service> Services { get; set; } = new List<Service>();
    }
}
