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
                Name = "Tarifas móviles",
                Description = "Tarifas móviles con datos 4G/5G y llamadas ilimitadas, sin permanencia",
                ImageUrl = "",
                CuisineType = "Móvil",
                Rating = 4.8,
                DeliveryTime = "Activación en 24h",
                DeliveryFee = 0.00m,
                MinimumOrder = 0.00m,
                IsOpen = true,
                Address = "Tienda Mobify, Madrid"
            },
            new Restaurant
            {
                Id = 2,
                Name = "Fibra y fijo",
                Description = "Fibra simétrica y fijo para tu hogar con router WiFi 6 incluido",
                ImageUrl = "",
                CuisineType = "Fibra",
                Rating = 4.7,
                DeliveryTime = "Instalación en 5-7 días",
                DeliveryFee = 0.00m,
                MinimumOrder = 0.00m,
                IsOpen = true,
                Address = "Tienda Mobify, Barcelona"
            },
            new Restaurant
            {
                Id = 3,
                Name = "Paquetes convergentes",
                Description = "Combina fibra y móvil y ahorra con nuestros paquetes convergentes",
                ImageUrl = "",
                CuisineType = "Convergente",
                Rating = 4.6,
                DeliveryTime = "Activación en 24-48h",
                DeliveryFee = 0.00m,
                MinimumOrder = 0.00m,
                IsOpen = true,
                Address = "Tienda Mobify, Valencia"
            },
            new Restaurant
            {
                Id = 4,
                Name = "Móviles y dispositivos",
                Description = "Últimos smartphones, routers y dispositivos financiados a tu medida",
                ImageUrl = "",
                CuisineType = "Dispositivos",
                Rating = 4.5,
                DeliveryTime = "Envío en 24-72h",
                DeliveryFee = 0.00m,
                MinimumOrder = 0.00m,
                IsOpen = true,
                Address = "Logística Mobify, Sevilla"
            },
            new Restaurant
            {
                Id = 5,
                Name = "Internet móvil / datos",
                Description = "SIM solo datos y routers portátiles para navegar estés donde estés",
                ImageUrl = "",
                CuisineType = "Datos",
                Rating = 4.6,
                DeliveryTime = "Disponible ahora",
                DeliveryFee = 0.00m,
                MinimumOrder = 0.00m,
                IsOpen = true,
                Address = "Tienda Mobify, Zaragoza"
            },
            new Restaurant
            {
                Id = 6,
                Name = "Servicios adicionales",
                Description = "Roaming, TV, streaming y seguros para exprimir tu conexión",
                ImageUrl = "",
                CuisineType = "Servicios",
                Rating = 4.4,
                DeliveryTime = "Contratación inmediata",
                DeliveryFee = 0.00m,
                MinimumOrder = 0.00m,
                IsOpen = true,
                Address = "Servicios Mobify, Bilbao"
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
