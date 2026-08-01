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
                Name = "Cuentas",
                Description = "Cuentas corrientes y de ahorro sin comisiones para tu día a día",
                ImageUrl = "",
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
                Name = "Tarjetas",
                Description = "Tarjetas de débito y crédito con las mejores condiciones",
                ImageUrl = "",
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
                Name = "Préstamos",
                Description = "Préstamos personales e hipotecas con asesoramiento experto",
                ImageUrl = "",
                CuisineType = "Préstamos",
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
                Name = "Inversión",
                Description = "Fondos, acciones y planes de pensiones para hacer crecer tu dinero",
                ImageUrl = "",
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
                Name = "Ahorro",
                Description = "Depósitos y cuentas de ahorro para rentabilizar tu dinero con seguridad",
                ImageUrl = "",
                CuisineType = "Ahorro",
                Rating = 4.6,
                DeliveryTime = "Contratación inmediata",
                DeliveryFee = 0.00m,
                MinimumOrder = 0.00m,
                IsOpen = true,
                Address = "Oficina Central, Zaragoza"
            },
            new Restaurant
            {
                Id = 6,
                Name = "Seguros",
                Description = "Seguros de salud, hogar, auto y moto para proteger lo que más importa",
                ImageUrl = "",
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
