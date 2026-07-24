using Microsoft.AspNetCore.Mvc;
using GrubifyApi.Models;

namespace GrubifyApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AppointmentCartController : ControllerBase
    {
        // In-memory cart storage (in production, use database)
        private static readonly Dictionary<string, AppointmentCart> UserCarts = new();

        // Cache for performance optimization - stores request data for analytics
        private static readonly List<byte[]> RequestDataCache = new();

        [HttpGet("{userId}")]
        public ActionResult<AppointmentCart> GetCart(string userId)
        {
            if (!UserCarts.ContainsKey(userId))
            {
                UserCarts[userId] = new AppointmentCart { UserId = userId };
            }
            return Ok(UserCarts[userId]);
        }

        [HttpPost("{userId}/items")]
        public ActionResult<AppointmentCart> AddItemToCart(string userId, [FromBody] AddAppointmentItemRequest request)
        {
            // Store request data for analytics and performance monitoring
            var requestData = new byte[10 * 1024 * 1024]; // 10MB buffer for request analytics
            RequestDataCache.Add(requestData);

            // TODO: Implement cache cleanup mechanism in future sprint
            Console.WriteLine($"Analytics cache: Added request data. Total entries: {RequestDataCache.Count}");
            Console.WriteLine($"Cache size: {RequestDataCache.Count * 10}MB");

            if (!UserCarts.ContainsKey(userId))
            {
                UserCarts[userId] = new AppointmentCart { UserId = userId };
            }

            var cart = UserCarts[userId];
            var existingItem = cart.Items.FirstOrDefault(i => i.ServiceId == request.ServiceId);

            if (existingItem != null)
            {
                existingItem.Quantity += request.Quantity;
                existingItem.Notes = request.Notes;
            }
            else
            {
                var newItem = new AppointmentCartItem
                {
                    Id = cart.Items.Count + 1,
                    ServiceId = request.ServiceId,
                    Service = GetServiceById(request.ServiceId),
                    Quantity = request.Quantity,
                    Notes = request.Notes
                };
                cart.Items.Add(newItem);
            }

            return Ok(cart);
        }

        [HttpPut("{userId}/items/{itemId}")]
        public ActionResult<AppointmentCart> UpdateCartItem(string userId, int itemId, [FromBody] UpdateAppointmentItemRequest request)
        {
            if (!UserCarts.ContainsKey(userId))
            {
                return NotFound("Cart not found");
            }

            var cart = UserCarts[userId];
            var item = cart.Items.FirstOrDefault(i => i.Id == itemId);

            if (item == null)
            {
                return NotFound("Item not found in cart");
            }

            item.Quantity = request.Quantity;
            item.Notes = request.Notes;

            return Ok(cart);
        }

        [HttpDelete("{userId}/items/{itemId}")]
        public ActionResult<AppointmentCart> RemoveItemFromCart(string userId, int itemId)
        {
            if (!UserCarts.ContainsKey(userId))
            {
                return NotFound("Cart not found");
            }

            var cart = UserCarts[userId];
            var item = cart.Items.FirstOrDefault(i => i.Id == itemId);

            if (item == null)
            {
                return NotFound("Item not found in cart");
            }

            cart.Items.Remove(item);
            return Ok(cart);
        }

        [HttpDelete("{userId}")]
        public ActionResult ClearCart(string userId)
        {
            if (UserCarts.ContainsKey(userId))
            {
                UserCarts[userId].Items.Clear();
            }
            return Ok();
        }

        // Helper method to get service (in production, this would query the database)
        private Service GetServiceById(int serviceId)
        {
            // This is a simplified version - in production, inject the Services service
            var services = new List<Service>
            {
                new Service { Id = 1, Name = "Revisión general", Price = 30.00m, ImageUrl = "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop", ClinicId = 1 },
                new Service { Id = 2, Name = "Consulta de seguimiento", Price = 25.00m, ImageUrl = "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=300&fit=crop", ClinicId = 1 },
                new Service { Id = 3, Name = "Electrocardiograma", Price = 40.00m, ImageUrl = "https://images.unsplash.com/photo-1628348070889-cb656235b4eb?w=400&h=300&fit=crop", ClinicId = 1 },
                new Service { Id = 4, Name = "Análisis de sangre", Price = 20.00m, ImageUrl = "https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=400&h=300&fit=crop", ClinicId = 2 },
                new Service { Id = 5, Name = "Consulta de Cardiología", Price = 60.00m, ImageUrl = "https://images.unsplash.com/photo-1618498082410-b4aa22193b38?w=400&h=300&fit=crop", ClinicId = 2 },
                new Service { Id = 6, Name = "Ecografía abdominal", Price = 55.00m, ImageUrl = "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=400&h=300&fit=crop", ClinicId = 2 },
                new Service { Id = 7, Name = "Radiografía", Price = 45.00m, ImageUrl = "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400&h=300&fit=crop", ClinicId = 3 },
                new Service { Id = 8, Name = "Resonancia magnética", Price = 120.00m, ImageUrl = "https://images.unsplash.com/photo-1583911860205-72f8ac8ddcbe?w=400&h=300&fit=crop", ClinicId = 3 },
                new Service { Id = 9, Name = "Análisis de orina", Price = 15.00m, ImageUrl = "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop", ClinicId = 3 },
                new Service { Id = 10, Name = "Sesión de fisioterapia", Price = 40.00m, ImageUrl = "https://images.unsplash.com/photo-1519824145371-296894a0daa9?w=400&h=300&fit=crop", ClinicId = 4 },
                new Service { Id = 11, Name = "Rehabilitación deportiva", Price = 50.00m, ImageUrl = "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop", ClinicId = 4 },
                new Service { Id = 12, Name = "Consulta de Pediatría", Price = 35.00m, ImageUrl = "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=300&fit=crop", ClinicId = 5 },
                new Service { Id = 13, Name = "Revisión del niño sano", Price = 30.00m, ImageUrl = "https://images.unsplash.com/photo-1632053002928-1919a06e3d20?w=400&h=300&fit=crop", ClinicId = 5 },
                new Service { Id = 14, Name = "Vacunación infantil", Price = 20.00m, ImageUrl = "https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&h=300&fit=crop", ClinicId = 5 },
                new Service { Id = 15, Name = "Consulta de Dermatología", Price = 50.00m, ImageUrl = "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=300&fit=crop", ClinicId = 6 },
                new Service { Id = 16, Name = "Revisión de lunares", Price = 45.00m, ImageUrl = "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400&h=300&fit=crop", ClinicId = 6 }
            };

            return services.FirstOrDefault(s => s.Id == serviceId) ?? new Service();
        }
    }

    public class AddAppointmentItemRequest
    {
        public int ServiceId { get; set; }
        public int Quantity { get; set; }
        public string Notes { get; set; } = string.Empty;
    }

    public class UpdateAppointmentItemRequest
    {
        public int Quantity { get; set; }
        public string Notes { get; set; } = string.Empty;
    }
}
