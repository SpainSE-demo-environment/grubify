namespace GrubifyApi.Models
{
    public class AppointmentCartItem
    {
        public int Id { get; set; }
        public int ServiceId { get; set; }
        public Service Service { get; set; } = new Service();
        public int Quantity { get; set; } = 1;
        public string Notes { get; set; } = string.Empty; // motivo de consulta
    }

    public class AppointmentCart
    {
        public int Id { get; set; }
        public string UserId { get; set; } = string.Empty;
        public List<AppointmentCartItem> Items { get; set; } = new List<AppointmentCartItem>();
        public decimal SubTotal => Items.Sum(item => item.Service.Price * item.Quantity);
        public decimal BookingFee { get; set; } = 0m; // tasa de gestión de la cita
        public decimal Total => SubTotal + BookingFee;
    }
}
