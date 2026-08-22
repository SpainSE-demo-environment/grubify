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
                new FoodItem { Id = 1, Name = "Seguro de Auto a Terceros", Price = 22.00m, ImageUrl = "", RestaurantId = 1 },
                new FoodItem { Id = 2, Name = "Seguro de Auto Terceros Ampliado", Price = 30.00m, ImageUrl = "", RestaurantId = 1 },
                new FoodItem { Id = 3, Name = "Seguro de Auto Todo Riesgo", Price = 45.00m, ImageUrl = "", RestaurantId = 1 },
                new FoodItem { Id = 4, Name = "Seguro de Hogar Básico", Price = 12.00m, ImageUrl = "", RestaurantId = 2 },
                new FoodItem { Id = 5, Name = "Seguro de Hogar Completo", Price = 22.00m, ImageUrl = "", RestaurantId = 2 },
                new FoodItem { Id = 6, Name = "Seguro de Vida Riesgo", Price = 15.00m, ImageUrl = "", RestaurantId = 3 },
                new FoodItem { Id = 7, Name = "Seguro de Vida Ahorro", Price = 40.00m, ImageUrl = "", RestaurantId = 3 },
                new FoodItem { Id = 8, Name = "Seguro de Salud Básico", Price = 35.00m, ImageUrl = "", RestaurantId = 4 },
                new FoodItem { Id = 9, Name = "Seguro de Salud Completo", Price = 55.00m, ImageUrl = "", RestaurantId = 4 },
                new FoodItem { Id = 10, Name = "Seguro Dental", Price = 12.00m, ImageUrl = "", RestaurantId = 4 },
                new FoodItem { Id = 11, Name = "Seguro de Moto a Terceros", Price = 14.00m, ImageUrl = "", RestaurantId = 5 },
                new FoodItem { Id = 12, Name = "Seguro de Moto Todo Riesgo", Price = 28.00m, ImageUrl = "", RestaurantId = 5 },
                new FoodItem { Id = 13, Name = "Seguro de Viaje", Price = 8.00m, ImageUrl = "", RestaurantId = 6 },
                new FoodItem { Id = 14, Name = "Seguro de Mascotas", Price = 11.00m, ImageUrl = "", RestaurantId = 6 },
                new FoodItem { Id = 15, Name = "Seguro de Decesos", Price = 9.00m, ImageUrl = "", RestaurantId = 6 },
                new FoodItem { Id = 16, Name = "Seguro de Accidentes", Price = 13.00m, ImageUrl = "", RestaurantId = 6 }
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
