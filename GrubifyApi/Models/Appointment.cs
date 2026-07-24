namespace GrubifyApi.Models
{
    public enum AppointmentStatus
    {
        Requested = 1,
        Confirmed = 2,
        Reminded = 3,
        CheckedIn = 4,
        InConsultation = 5,
        Completed = 6,
        Cancelled = 7
    }

    public class Appointment
    {
        public int Id { get; set; }
        public string UserId { get; set; } = string.Empty;
        public int ClinicId { get; set; }
        public Clinic Clinic { get; set; } = new Clinic();
        public List<AppointmentCartItem> Items { get; set; } = new List<AppointmentCartItem>();
        public decimal SubTotal { get; set; }
        public decimal BookingFee { get; set; }
        public decimal Total { get; set; }
        public AppointmentStatus Status { get; set; } = AppointmentStatus.Requested;
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
        public DateTime? CompletedDate { get; set; }
        public DateTime? CompletedTime { get; set; }
        public string ClinicLocation { get; set; } = string.Empty; // sala / ubicación
        public string PatientName { get; set; } = string.Empty;
        public string PatientPhone { get; set; } = string.Empty;
        public string PaymentMethod { get; set; } = string.Empty; // póliza / tarjeta
        public string Notes { get; set; } = string.Empty; // motivo de consulta
        public int EstimatedWaitMinutes { get; set; }
    }
}
