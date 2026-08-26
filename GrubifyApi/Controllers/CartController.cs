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
                new FoodItem { Id = 1, Name = "Tarifa Móvil 5GB", Price = 5.99m, ImageUrl = "", RestaurantId = 1 },
                new FoodItem { Id = 2, Name = "Tarifa Móvil 20GB", Price = 9.99m, ImageUrl = "", RestaurantId = 1 },
                new FoodItem { Id = 3, Name = "Tarifa Móvil Ilimitada", Price = 19.99m, ImageUrl = "", RestaurantId = 1 },
                new FoodItem { Id = 4, Name = "Tarifa Móvil 100GB 5G", Price = 14.99m, ImageUrl = "", RestaurantId = 1 },
                new FoodItem { Id = 5, Name = "Fibra 300 Mbps", Price = 25.99m, ImageUrl = "", RestaurantId = 2 },
                new FoodItem { Id = 6, Name = "Fibra 600 Mbps", Price = 30.99m, ImageUrl = "", RestaurantId = 2 },
                new FoodItem { Id = 7, Name = "Fibra 1 Gbps", Price = 39.99m, ImageUrl = "", RestaurantId = 2 },
                new FoodItem { Id = 8, Name = "Combo Fibra 600 + Móvil 20GB", Price = 45.99m, ImageUrl = "", RestaurantId = 3 },
                new FoodItem { Id = 9, Name = "Combo Fibra 1Gb + Ilimitada", Price = 59.99m, ImageUrl = "", RestaurantId = 3 },
                new FoodItem { Id = 10, Name = "Combo Fibra 300 + Móvil 5GB", Price = 35.99m, ImageUrl = "", RestaurantId = 3 },
                new FoodItem { Id = 11, Name = "Smartphone 5G a plazos", Price = 15.99m, ImageUrl = "", RestaurantId = 4 },
                new FoodItem { Id = 12, Name = "Router WiFi 6", Price = 59.99m, ImageUrl = "", RestaurantId = 4 },
                new FoodItem { Id = 13, Name = "SIM Datos 50GB", Price = 12.99m, ImageUrl = "", RestaurantId = 5 },
                new FoodItem { Id = 14, Name = "Roaming Internacional", Price = 9.99m, ImageUrl = "", RestaurantId = 5 },
                new FoodItem { Id = 15, Name = "Pack TV y Streaming", Price = 12.99m, ImageUrl = "", RestaurantId = 6 },
                new FoodItem { Id = 16, Name = "Seguro de Móvil", Price = 6.99m, ImageUrl = "", RestaurantId = 6 }
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
