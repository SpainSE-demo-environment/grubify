namespace GrubifyApi.Models
{
    public class Service
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; } // copago / tarifa
        public string ImageUrl { get; set; } = string.Empty;
        public string Specialty { get; set; } = string.Empty;
        public int ClinicId { get; set; }
        public bool IsAvailable { get; set; } = true;
        public int DurationMinutes { get; set; }
    }
}
