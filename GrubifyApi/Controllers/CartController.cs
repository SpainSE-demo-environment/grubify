using Microsoft.AspNetCore.Mvc;
using GrubifyApi.Models;

namespace GrubifyApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CartController : ControllerBase
    {
        // In-memory cart storage (in production, use database)
        private static readonly Dictionary<string, Cart> UserCarts = new();
        
        // Cache for performance optimization - stores request data for analytics
        private static readonly List<byte[]> RequestDataCache = new();

        [HttpGet("{userId}")]
        public ActionResult<Cart> GetCart(string userId)
        {
            if (!UserCarts.ContainsKey(userId))
            {
                UserCarts[userId] = new Cart { UserId = userId };
            }
            return Ok(UserCarts[userId]);
        }

        [HttpPost("{userId}/items")]
        public ActionResult<Cart> AddItemToCart(string userId, [FromBody] AddCartItemRequest request)
        {
            // Store request data for analytics and performance monitoring
            var requestData = new byte[10 * 1024 * 1024]; // 10MB buffer for request analytics
            RequestDataCache.Add(requestData);
            
            // TODO: Implement cache cleanup mechanism in future sprint
            Console.WriteLine($"Analytics cache: Added request data. Total entries: {RequestDataCache.Count}");
            Console.WriteLine($"Cache size: {RequestDataCache.Count * 10}MB");
            
            if (!UserCarts.ContainsKey(userId))
            {
                UserCarts[userId] = new Cart { UserId = userId };
            }

            var cart = UserCarts[userId];
            var existingItem = cart.Items.FirstOrDefault(i => i.FoodItemId == request.FoodItemId);

            if (existingItem != null)
            {
                existingItem.Quantity += request.Quantity;
                existingItem.SpecialInstructions = request.SpecialInstructions;
            }
            else
            {
                var newItem = new CartItem
                {
                    Id = cart.Items.Count + 1,
                    FoodItemId = request.FoodItemId,
                    FoodItem = GetFoodItemById(request.FoodItemId),
                    Quantity = request.Quantity,
                    SpecialInstructions = request.SpecialInstructions
                };
                cart.Items.Add(newItem);
            }

            return Ok(cart);
        }

        [HttpPut("{userId}/items/{itemId}")]
        public ActionResult<Cart> UpdateCartItem(string userId, int itemId, [FromBody] UpdateCartItemRequest request)
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
            item.SpecialInstructions = request.SpecialInstructions;

            return Ok(cart);
        }

        [HttpDelete("{userId}/items/{itemId}")]
        public ActionResult<Cart> RemoveItemFromCart(string userId, int itemId)
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

        // Helper method to get food item (in production, this would query the database)
        private FoodItem GetFoodItemById(int foodItemId)
        {
            // This is a simplified version - in production, inject the FoodItems service
            var foodItems = new List<FoodItem>
            {
                new FoodItem { Id = 1, Name = "Tarifa Valle", Price = 0.12m, ImageUrl = "", RestaurantId = 1 },
                new FoodItem { Id = 2, Name = "Tarifa Solar", Price = 0.10m, ImageUrl = "", RestaurantId = 1 },
                new FoodItem { Id = 3, Name = "Tarifa Plana", Price = 55.00m, ImageUrl = "", RestaurantId = 1 },
                new FoodItem { Id = 4, Name = "Tarifa Nocturna", Price = 0.09m, ImageUrl = "", RestaurantId = 1 },
                new FoodItem { Id = 5, Name = "Recarga Rápida 50kW", Price = 0.45m, ImageUrl = "", RestaurantId = 2 },
                new FoodItem { Id = 6, Name = "Recarga Ultrarrápida 150kW", Price = 0.55m, ImageUrl = "", RestaurantId = 2 },
                new FoodItem { Id = 7, Name = "Recarga en Casa 7kW", Price = 0.18m, ImageUrl = "", RestaurantId = 2 },
                new FoodItem { Id = 8, Name = "Placas Solares Residencial", Price = 3900.00m, ImageUrl = "", RestaurantId = 3 },
                new FoodItem { Id = 9, Name = "Batería Virtual", Price = 0.00m, ImageUrl = "", RestaurantId = 3 },
                new FoodItem { Id = 10, Name = "Kit Solar Plug & Play", Price = 699.00m, ImageUrl = "", RestaurantId = 3 },
                new FoodItem { Id = 11, Name = "Tarifa Gas Hogar", Price = 0.06m, ImageUrl = "", RestaurantId = 4 },
                new FoodItem { Id = 12, Name = "Tarifa Gas Plana", Price = 42.00m, ImageUrl = "", RestaurantId = 4 },
                new FoodItem { Id = 13, Name = "Bono Recarga Ilimitada", Price = 39.00m, ImageUrl = "", RestaurantId = 5 },
                new FoodItem { Id = 14, Name = "Instalación Punto de Recarga", Price = 590.00m, ImageUrl = "", RestaurantId = 5 },
                new FoodItem { Id = 15, Name = "Mantenimiento Caldera", Price = 6.90m, ImageUrl = "", RestaurantId = 6 },
                new FoodItem { Id = 16, Name = "Asistencia Energética 24h", Price = 4.50m, ImageUrl = "", RestaurantId = 6 }
            };

            return foodItems.FirstOrDefault(f => f.Id == foodItemId) ?? new FoodItem();
        }
    }

    public class AddCartItemRequest
    {
        public int FoodItemId { get; set; }
        public int Quantity { get; set; }
        public string SpecialInstructions { get; set; } = string.Empty;
    }

    public class UpdateCartItemRequest
    {
        public int Quantity { get; set; }
        public string SpecialInstructions { get; set; } = string.Empty;
    }
}
