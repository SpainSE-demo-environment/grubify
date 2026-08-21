using Microsoft.AspNetCore.Mvc;
using GrubifyApi.Models;

namespace GrubifyApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RestaurantsController : ControllerBase
    {
        private static readonly List<Restaurant> Restaurants = new()
        {
            new Restaurant
            {
                Id = 1,
                Name = "Mujer",
                Description = "Colección de mujer: vestidos, abrigos, pantalones y prendas de temporada",
                ImageUrl = "",
                CuisineType = "Mujer",
                Rating = 4.8,
                DeliveryTime = "Envío en 24-48h",
                DeliveryFee = 0.00m,
                MinimumOrder = 0.00m,
                IsOpen = true,
                Address = "Dressify · Nueva colección"
            },
            new Restaurant
            {
                Id = 2,
                Name = "Hombre",
                Description = "Colección de hombre: camisas, vaqueros, chaquetas y básicos",
                ImageUrl = "",
                CuisineType = "Hombre",
                Rating = 4.7,
                DeliveryTime = "Envío en 24-48h",
                DeliveryFee = 0.00m,
                MinimumOrder = 0.00m,
                IsOpen = true,
                Address = "Dressify · Nueva colección"
            },
            new Restaurant
            {
                Id = 3,
                Name = "Niño",
                Description = "Moda infantil cómoda y resistente para niñas y niños",
                ImageUrl = "",
                CuisineType = "Niño",
                Rating = 4.6,
                DeliveryTime = "Envío en 24-48h",
                DeliveryFee = 0.00m,
                MinimumOrder = 0.00m,
                IsOpen = true,
                Address = "Dressify · Colección kids"
            },
            new Restaurant
            {
                Id = 4,
                Name = "Calzado",
                Description = "Zapatillas, botas, bailarinas y sandalias para toda la familia",
                ImageUrl = "",
                CuisineType = "Calzado",
                Rating = 4.5,
                DeliveryTime = "Envío en 24-48h",
                DeliveryFee = 0.00m,
                MinimumOrder = 0.00m,
                IsOpen = true,
                Address = "Dressify · Zapatería"
            },
            new Restaurant
            {
                Id = 5,
                Name = "Accesorios",
                Description = "Bolsos, cinturones y complementos para completar tu look",
                ImageUrl = "",
                CuisineType = "Accesorios",
                Rating = 4.4,
                DeliveryTime = "Envío en 24-48h",
                DeliveryFee = 0.00m,
                MinimumOrder = 0.00m,
                IsOpen = true,
                Address = "Dressify · Complementos"
            }
        };

        [HttpGet]
        public ActionResult<IEnumerable<Restaurant>> GetRestaurants()
        {
            return Ok(Restaurants);
        }

        [HttpGet("{id}")]
        public ActionResult<Restaurant> GetRestaurant(int id)
        {
            var restaurant = Restaurants.FirstOrDefault(r => r.Id == id);
            if (restaurant == null)
            {
                return NotFound();
            }
            return Ok(restaurant);
        }

        [HttpGet("cuisine/{cuisineType}")]
        public ActionResult<IEnumerable<Restaurant>> GetRestaurantsByCuisine(string cuisineType)
        {
            var restaurants = Restaurants.Where(r => 
                r.CuisineType.Equals(cuisineType, StringComparison.OrdinalIgnoreCase)).ToList();
            return Ok(restaurants);
        }

        [HttpGet("search")]
        public ActionResult<IEnumerable<Restaurant>> SearchRestaurants([FromQuery] string query)
        {
            if (string.IsNullOrEmpty(query))
            {
                return Ok(Restaurants);
            }

            var restaurants = Restaurants.Where(r => 
                r.Name.Contains(query, StringComparison.OrdinalIgnoreCase) ||
                r.CuisineType.Contains(query, StringComparison.OrdinalIgnoreCase) ||
                r.Description.Contains(query, StringComparison.OrdinalIgnoreCase)).ToList();
            
            return Ok(restaurants);
        }
    }
}
