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
                Name = "Banca Personal",
                Description = "Cuentas corrientes y de ahorro sin comisiones para tu día a día",
                ImageUrl = "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=800&h=600&fit=crop",
                CuisineType = "Cuentas",
                Rating = 4.8,
                DeliveryTime = "Contratación inmediata",
                DeliveryFee = 0.00m,
                MinimumOrder = 0.00m,
                IsOpen = true,
                Address = "Oficina Central, Madrid"
            },
            new Restaurant
            {
                Id = 2,
                Name = "Tarjetas y Pagos",
                Description = "Tarjetas de débito y crédito con las mejores condiciones",
                ImageUrl = "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
                CuisineType = "Tarjetas",
                Rating = 4.7,
                DeliveryTime = "Alta en 24-48h",
                DeliveryFee = 0.00m,
                MinimumOrder = 0.00m,
                IsOpen = true,
                Address = "Oficina Central, Barcelona"
            },
            new Restaurant
            {
                Id = 3,
                Name = "Hipotecas y Financiación",
                Description = "Hipotecas y préstamos personales con asesoramiento experto",
                ImageUrl = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
                CuisineType = "Hipotecas",
                Rating = 4.6,
                DeliveryTime = "Estudio en 48-72h",
                DeliveryFee = 0.00m,
                MinimumOrder = 0.00m,
                IsOpen = true,
                Address = "Oficina Central, Valencia"
            },
            new Restaurant
            {
                Id = 4,
                Name = "Inversión y Ahorro",
                Description = "Fondos, depósitos y planes de pensiones para hacer crecer tu dinero",
                ImageUrl = "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop",
                CuisineType = "Inversión",
                Rating = 4.5,
                DeliveryTime = "Contratación inmediata",
                DeliveryFee = 0.00m,
                MinimumOrder = 0.00m,
                IsOpen = true,
                Address = "Oficina Central, Sevilla"
            },
            new Restaurant
            {
                Id = 5,
                Name = "Seguros y Pensiones",
                Description = "Seguros de hogar, vida y auto para proteger lo que más importa",
                ImageUrl = "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop",
                CuisineType = "Seguros",
                Rating = 4.4,
                DeliveryTime = "Contratación inmediata",
                DeliveryFee = 0.00m,
                MinimumOrder = 0.00m,
                IsOpen = true,
                Address = "Oficina Central, Bilbao"
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
