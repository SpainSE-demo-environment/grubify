using Microsoft.AspNetCore.Mvc;
using GrubifyApi.Models;

namespace GrubifyApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AppointmentsController : ControllerBase
    {
        // In-memory appointment storage (in production, use database)
        private static readonly List<Appointment> Appointments = new()
        {
            new Appointment
            {
                Id = 1,
                UserId = "user123",
                ClinicId = 1,
                Clinic = new Clinic { Id = 1, Name = "Centro Médico Norte", Address = "Av. de la Salud 12, Madrid" },
                Items = new List<AppointmentCartItem>
                {
                    new AppointmentCartItem { Id = 1, ServiceId = 1, Quantity = 1, Notes = "Revisión anual", Service = new Service { Id = 1, Name = "Revisión general", Price = 30.00m, ClinicId = 1, ImageUrl = "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop" } }
                },
                SubTotal = 30.00m,
                BookingFee = 0m,
                Total = 30.00m,
                Status = AppointmentStatus.Confirmed,
                CreatedDate = DateTime.UtcNow.AddDays(-1),
                ClinicLocation = "Consulta 3",
                PatientName = "María López",
                PatientPhone = "600123456",
                PaymentMethod = "poliza",
                Notes = "Revisión anual",
                EstimatedWaitMinutes = 15
            },
            new Appointment
            {
                Id = 2,
                UserId = "user123",
                ClinicId = 4,
                Clinic = new Clinic { Id = 4, Name = "Clínica del Bienestar", Address = "Ronda de Poniente 21, Sevilla" },
                Items = new List<AppointmentCartItem>
                {
                    new AppointmentCartItem { Id = 1, ServiceId = 10, Quantity = 1, Notes = "Dolor lumbar", Service = new Service { Id = 10, Name = "Sesión de fisioterapia", Price = 40.00m, ClinicId = 4, ImageUrl = "https://images.unsplash.com/photo-1519824145371-296894a0daa9?w=400&h=300&fit=crop" } }
                },
                SubTotal = 40.00m,
                BookingFee = 0m,
                Total = 40.00m,
                Status = AppointmentStatus.Reminded,
                CreatedDate = DateTime.UtcNow.AddHours(-3),
                ClinicLocation = "Sala de rehabilitación",
                PatientName = "Juan García",
                PatientPhone = "600654321",
                PaymentMethod = "tarjeta",
                Notes = "Dolor lumbar",
                EstimatedWaitMinutes = 10
            },
            new Appointment
            {
                Id = 3,
                UserId = "user123",
                ClinicId = 2,
                Clinic = new Clinic { Id = 2, Name = "Clínica Salud Integral", Address = "Calle Mayor 88, Barcelona" },
                Items = new List<AppointmentCartItem>
                {
                    new AppointmentCartItem { Id = 1, ServiceId = 4, Quantity = 1, Notes = "Analítica de control", Service = new Service { Id = 4, Name = "Análisis de sangre", Price = 20.00m, ClinicId = 2, ImageUrl = "https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=400&h=300&fit=crop" } }
                },
                SubTotal = 20.00m,
                BookingFee = 0m,
                Total = 20.00m,
                Status = AppointmentStatus.Completed,
                CreatedDate = DateTime.UtcNow.AddDays(-2),
                CompletedDate = DateTime.UtcNow.AddDays(-2).AddHours(1),
                CompletedTime = DateTime.UtcNow.AddDays(-2).AddHours(1),
                ClinicLocation = "Sala de extracciones",
                PatientName = "Ana Martín",
                PatientPhone = "600987654",
                PaymentMethod = "poliza",
                Notes = "Analítica de control",
                EstimatedWaitMinutes = 5
            }
        };
        private static int NextAppointmentId = 4;

        // Version detection based on environment or Docker image tag
        private readonly bool _isV2Version;

        public AppointmentsController()
        {
            // Detect version from environment variable (set in Docker builds)
            var version = Environment.GetEnvironmentVariable("API_VERSION") ?? "v1";
            _isV2Version = version.ToLower() == "v2";

            Console.WriteLine($"AppointmentsController initialized with version: {version}");
        }

        private PaymentResult ProcessPayment(string paymentMethod)
        {
            if (_isV2Version)
            {
                // V2: BUG - Payment gateway configuration is incorrect in production
                // This was supposed to be fixed in the last deployment but got missed
                var gatewayUrl = GetPaymentGatewayUrlV2();

                Console.WriteLine($"V2: Attempting payment processing with gateway: {gatewayUrl}");

                // Connection always fails due to wrong endpoint
                return new PaymentResult
                {
                    Success = false,
                    ErrorMessage = "Connection to payment gateway timed out"
                };
            }
            else
            {
                // V1: Working payment processing
                var gatewayUrl = GetPaymentGatewayUrlV1();

                Console.WriteLine($"V1: Processing payment successfully with gateway: {gatewayUrl}");

                // Simulate successful payment processing
                return new PaymentResult
                {
                    Success = true,
                    ErrorMessage = string.Empty
                };
            }
        }

        private string GetPaymentGatewayUrlV1()
        {
            // V1: Correct production payment gateway URL
            return "https://payment-gateway-prod.medify.com/v1/process";
        }

        private string GetPaymentGatewayUrlV2()
        {
            // V2: Wrong URL that doesn't exist (bug introduced in v2)
            return "https://payment-gateway-staging.internal.com/v1/process";
        }

        [HttpPost]
        public ActionResult<Appointment> BookAppointment([FromBody] BookAppointmentRequest request)
        {
            Console.WriteLine($"BookAppointment called - Version: {(_isV2Version ? "v2" : "v1")}");

            // Validate payment information
            if (string.IsNullOrEmpty(request.PaymentMethod))
            {
                return BadRequest("Payment method is required");
            }

            // Process payment through gateway
            var paymentResult = ProcessPayment(request.PaymentMethod);
            if (!paymentResult.Success)
            {
                Console.WriteLine($"Payment processing failed in {(_isV2Version ? "v2" : "v1")}: {paymentResult.ErrorMessage}");
                return StatusCode(500, new {
                    error = "Payment processing failed",
                    code = "PAYMENT_ERROR",
                    message = "Unable to process payment. Please check your payment information and try again.",
                    timestamp = DateTime.UtcNow,
                    details = paymentResult.ErrorMessage,
                    version = _isV2Version ? "v2" : "v1"
                });
            }

            // V1 reaches here (successful payment), V2 never reaches here
            Console.WriteLine($"Payment successful in {(_isV2Version ? "v2" : "v1")} - creating appointment");
            var appointment = new Appointment
            {
                Id = NextAppointmentId++,
                UserId = request.UserId,
                ClinicId = request.ClinicId,
                Items = request.Items.Select(item => new AppointmentCartItem
                {
                    Id = item.Id,
                    ServiceId = item.ServiceId,
                    Service = item.Service,
                    Quantity = item.Quantity,
                    Notes = item.Notes
                }).ToList(),
                Status = AppointmentStatus.Requested,
                CreatedDate = DateTime.UtcNow,
                ClinicLocation = request.ClinicLocation,
                PaymentMethod = request.PaymentMethod,
                Notes = request.Notes
            };

            Appointments.Add(appointment);

            // Simulate appointment status updates after booking
            Task.Run(async () =>
            {
                await Task.Delay(30000); // 30 seconds
                appointment.Status = AppointmentStatus.Confirmed;

                await Task.Delay(600000); // 10 minutes
                appointment.Status = AppointmentStatus.Reminded;

                await Task.Delay(900000); // 15 minutes
                appointment.Status = AppointmentStatus.InConsultation;

                await Task.Delay(600000); // 10 minutes
                appointment.Status = AppointmentStatus.Completed;
                appointment.CompletedTime = DateTime.UtcNow;
            });

            return CreatedAtAction(nameof(GetAppointment), new { id = appointment.Id }, appointment);
        }

        [HttpGet("{id}")]
        public ActionResult<Appointment> GetAppointment(int id)
        {
            var appointment = Appointments.FirstOrDefault(a => a.Id == id);
            if (appointment == null)
            {
                return NotFound();
            }
            return Ok(appointment);
        }

        [HttpGet("user/{userId}")]
        public ActionResult<IEnumerable<Appointment>> GetUserAppointments(string userId)
        {
            var userAppointments = Appointments.Where(a => a.UserId == userId)
                                 .OrderByDescending(a => a.CreatedDate)
                                 .ToList();
            return Ok(userAppointments);
        }

        [HttpGet("user/{userId}/active")]
        public ActionResult<IEnumerable<Appointment>> GetActiveUserAppointments(string userId)
        {
            var activeAppointments = Appointments.Where(a => a.UserId == userId &&
                                          a.Status != AppointmentStatus.Completed &&
                                          a.Status != AppointmentStatus.Cancelled)
                                   .OrderByDescending(a => a.CreatedDate)
                                   .ToList();
            return Ok(activeAppointments);
        }

        [HttpPut("{id}/cancel")]
        public ActionResult<Appointment> CancelAppointment(int id)
        {
            var appointment = Appointments.FirstOrDefault(a => a.Id == id);
            if (appointment == null)
            {
                return NotFound();
            }

            if (appointment.Status == AppointmentStatus.Reminded ||
                appointment.Status == AppointmentStatus.InConsultation)
            {
                return BadRequest("Cannot cancel an appointment that is already in progress");
            }

            appointment.Status = AppointmentStatus.Cancelled;
            return Ok(appointment);
        }

        [HttpGet("clinic/{clinicId}")]
        public ActionResult<IEnumerable<Appointment>> GetClinicAppointments(int clinicId)
        {
            var clinicAppointments = Appointments.Where(a => a.ClinicId == clinicId)
                                       .OrderByDescending(a => a.CreatedDate)
                                       .ToList();
            return Ok(clinicAppointments);
        }

        [HttpPut("{id}/status")]
        public ActionResult<Appointment> UpdateAppointmentStatus(int id, [FromBody] UpdateAppointmentStatusRequest request)
        {
            var appointment = Appointments.FirstOrDefault(a => a.Id == id);
            if (appointment == null)
            {
                return NotFound();
            }

            appointment.Status = request.Status;
            if (request.Status == AppointmentStatus.Completed)
            {
                appointment.CompletedTime = DateTime.UtcNow;
            }

            return Ok(appointment);
        }
    }

    public class BookAppointmentRequest
    {
        public string UserId { get; set; } = string.Empty;
        public int ClinicId { get; set; }
        public List<AppointmentCartItem> Items { get; set; } = new();
        public string ClinicLocation { get; set; } = string.Empty;
        public string PaymentMethod { get; set; } = string.Empty;
        public string Notes { get; set; } = string.Empty;
    }

    public class UpdateAppointmentStatusRequest
    {
        public AppointmentStatus Status { get; set; }
    }

    public class PaymentResult
    {
        public bool Success { get; set; }
        public string ErrorMessage { get; set; } = string.Empty;
    }
}
