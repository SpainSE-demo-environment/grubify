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
                Name = "Camisetas",
                Description = "Camisetas y tops de todas las tallas y estilos para tu día a día",
                ImageUrl = "",
                CuisineType = "Camisetas",
                Rating = 4.8,
                DeliveryTime = "Envío en 24-48h",
                DeliveryFee = 0.00m,
                MinimumOrder = 0.00m,
                IsOpen = true,
                Address = "Tienda Gran Vía, Madrid"
            },
            new Restaurant
            {
                Id = 2,
                Name = "Pantalones",
                Description = "Vaqueros, chinos y pantalones para cada ocasión",
                ImageUrl = "",
                CuisineType = "Pantalones",
                Rating = 4.7,
                DeliveryTime = "Envío en 24-48h",
                DeliveryFee = 0.00m,
                MinimumOrder = 0.00m,
                IsOpen = true,
                Address = "Tienda Passeig de Gràcia, Barcelona"
            },
            new Restaurant
            {
                Id = 3,
                Name = "Vestidos",
                Description = "Vestidos de día, fiesta y básicos de temporada",
                ImageUrl = "",
                CuisineType = "Vestidos",
                Rating = 4.6,
                DeliveryTime = "Envío en 24-48h",
                DeliveryFee = 0.00m,
                MinimumOrder = 0.00m,
                IsOpen = true,
                Address = "Tienda Calle Colón, Valencia"
            },
            new Restaurant
            {
                Id = 4,
                Name = "Calzado",
                Description = "Zapatillas, botas y zapatos con envío gratis",
                ImageUrl = "",
                CuisineType = "Calzado",
                Rating = 4.5,
                DeliveryTime = "Envío en 24-48h",
                DeliveryFee = 0.00m,
                MinimumOrder = 0.00m,
                IsOpen = true,
                Address = "Tienda Calle Sierpes, Sevilla"
            },
            new Restaurant
            {
                Id = 5,
                Name = "Abrigos",
                Description = "Abrigos, chaquetas y prendas de abrigo para toda la temporada",
                ImageUrl = "",
                CuisineType = "Abrigos",
                Rating = 4.6,
                DeliveryTime = "Envío en 24-48h",
                DeliveryFee = 0.00m,
                MinimumOrder = 0.00m,
                IsOpen = true,
                Address = "Tienda Paseo Independencia, Zaragoza"
            },
            new Restaurant
            {
                Id = 6,
                Name = "Accesorios",
                Description = "Bolsos, cinturones y complementos para completar tu look",
                ImageUrl = "",
                CuisineType = "Accesorios",
                Rating = 4.4,
                DeliveryTime = "Envío en 24-48h",
                DeliveryFee = 0.00m,
                MinimumOrder = 0.00m,
                IsOpen = true,
                Address = "Tienda Gran Vía Don Diego, Bilbao"
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
