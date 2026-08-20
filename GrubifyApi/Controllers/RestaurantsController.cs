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
                Name = "Tarifas de Luz",
                Description = "Tarifas de luz 100% renovable, sin permanencia, para tu hogar y tu negocio",
                ImageUrl = "",
                CuisineType = "Tarifas",
                Rating = 4.8,
                DeliveryTime = "Activación en 24-48h",
                DeliveryFee = 0.00m,
                MinimumOrder = 0.00m,
                IsOpen = true,
                Address = "Comercializadora, Madrid"
            },
            new Restaurant
            {
                Id = 2,
                Name = "Recarga VE",
                Description = "Red de recarga rápida y ultrarrápida para tu vehículo eléctrico",
                ImageUrl = "",
                CuisineType = "Recarga VE",
                Rating = 4.7,
                DeliveryTime = "Disponible ahora",
                DeliveryFee = 0.00m,
                MinimumOrder = 0.00m,
                IsOpen = true,
                Address = "Red de recarga, Barcelona"
            },
            new Restaurant
            {
                Id = 3,
                Name = "Autoconsumo Solar",
                Description = "Placas solares y autoconsumo para producir y ahorrar con tu propia energía",
                ImageUrl = "",
                CuisineType = "Autoconsumo",
                Rating = 4.6,
                DeliveryTime = "Estudio en 48-72h",
                DeliveryFee = 0.00m,
                MinimumOrder = 0.00m,
                IsOpen = true,
                Address = "Instalaciones, Valencia"
            },
            new Restaurant
            {
                Id = 4,
                Name = "Gas Natural",
                Description = "Tarifas de gas natural sin permanencia y con un precio claro",
                ImageUrl = "",
                CuisineType = "Gas",
                Rating = 4.5,
                DeliveryTime = "Activación en 24-48h",
                DeliveryFee = 0.00m,
                MinimumOrder = 0.00m,
                IsOpen = true,
                Address = "Comercializadora, Sevilla"
            },
            new Restaurant
            {
                Id = 5,
                Name = "Movilidad",
                Description = "Bonos de recarga e instalación de puntos para tu vehículo eléctrico",
                ImageUrl = "",
                CuisineType = "Movilidad",
                Rating = 4.6,
                DeliveryTime = "Disponible ahora",
                DeliveryFee = 0.00m,
                MinimumOrder = 0.00m,
                IsOpen = true,
                Address = "Movilidad, Zaragoza"
            },
            new Restaurant
            {
                Id = 6,
                Name = "Servicios",
                Description = "Mantenimiento y asistencia para tus instalaciones de luz y gas",
                ImageUrl = "",
                CuisineType = "Servicios",
                Rating = 4.4,
                DeliveryTime = "Contratación inmediata",
                DeliveryFee = 0.00m,
                MinimumOrder = 0.00m,
                IsOpen = true,
                Address = "Servicios, Bilbao"
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
