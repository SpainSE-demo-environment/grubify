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
                Name = "Auto",
                Description = "Seguros de coche a terceros y todo riesgo con asistencia en carretera 24h",
                ImageUrl = "",
                CuisineType = "Auto",
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
                Name = "Hogar",
                Description = "Protege tu vivienda y su contenido con coberturas integrales y asistencia 24h",
                ImageUrl = "",
                CuisineType = "Hogar",
                Rating = 4.7,
                DeliveryTime = "Contratación inmediata",
                DeliveryFee = 0.00m,
                MinimumOrder = 0.00m,
                IsOpen = true,
                Address = "Oficina Central, Barcelona"
            },
            new Restaurant
            {
                Id = 3,
                Name = "Vida",
                Description = "Seguros de vida para proteger a los tuyos ante cualquier imprevisto",
                ImageUrl = "",
                CuisineType = "Vida",
                Rating = 4.6,
                DeliveryTime = "Estudio en 24-48h",
                DeliveryFee = 0.00m,
                MinimumOrder = 0.00m,
                IsOpen = true,
                Address = "Oficina Central, Valencia"
            },
            new Restaurant
            {
                Id = 4,
                Name = "Salud",
                Description = "Seguros de salud con cuadro médico, especialistas y videoconsulta 24h",
                ImageUrl = "",
                CuisineType = "Salud",
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
                Name = "Moto",
                Description = "Seguros de moto con las mejores coberturas, defensa jurídica y asistencia 24h",
                ImageUrl = "",
                CuisineType = "Moto",
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
                Name = "Viaje",
                Description = "Seguros de viaje, mascotas, decesos y accidentes para proteger lo que más importa",
                ImageUrl = "",
                CuisineType = "Viaje",
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
