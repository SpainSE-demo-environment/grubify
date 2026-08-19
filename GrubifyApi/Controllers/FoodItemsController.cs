using Microsoft.AspNetCore.Mvc;
using GrubifyApi.Models;

namespace GrubifyApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FoodItemsController : ControllerBase
    {
        private static readonly List<FoodItem> FoodItems = new()
        {
            // Auto
            new FoodItem
            {
                Id = 1,
                Name = "Seguro de Auto a Terceros",
                Description = "RC obligatoria y voluntaria, asistencia en carretera 24h y defensa jurídica",
                Price = 22.00m,
                ImageUrl = "",
                Category = "Auto",
                IsVegetarian = true,
                IsVegan = true,
                IsSpicy = false,
                RestaurantId = 1,
                PreparationTime = 15
            },
            new FoodItem
            {
                Id = 2,
                Name = "Seguro de Auto Terceros Ampliado",
                Description = "Terceros con lunas, robo e incendio y asistencia 24h desde el kilómetro 0",
                Price = 30.00m,
                ImageUrl = "",
                Category = "Auto",
                IsVegetarian = true,
                IsVegan = true,
                IsSpicy = true,
                RestaurantId = 1,
                PreparationTime = 15
            },
            new FoodItem
            {
                Id = 3,
                Name = "Seguro de Auto Todo Riesgo",
                Description = "Cobertura total con daños propios, franquicia reducida y coche de sustitución",
                Price = 45.00m,
                ImageUrl = "",
                Category = "Auto",
                IsVegetarian = true,
                IsVegan = false,
                IsSpicy = false,
                RestaurantId = 1,
                PreparationTime = 20
            },

            // Hogar
            new FoodItem
            {
                Id = 4,
                Name = "Seguro de Hogar Básico",
                Description = "Continente y responsabilidad civil con asistencia de urgencias 24h",
                Price = 12.00m,
                ImageUrl = "",
                Category = "Hogar",
                IsVegetarian = false,
                IsVegan = false,
                IsSpicy = true,
                RestaurantId = 2,
                PreparationTime = 15
            },
            new FoodItem
            {
                Id = 5,
                Name = "Seguro de Hogar Completo",
                Description = "Continente, contenido, daños por agua, robo y servicio de bricohogar incluido",
                Price = 22.00m,
                ImageUrl = "",
                Category = "Hogar",
                IsVegetarian = false,
                IsVegan = true,
                IsSpicy = false,
                RestaurantId = 2,
                PreparationTime = 15
            },

            // Vida
            new FoodItem
            {
                Id = 6,
                Name = "Seguro de Vida Riesgo",
                Description = "Capital por fallecimiento e invalidez para proteger la economía de tu familia",
                Price = 15.00m,
                ImageUrl = "",
                Category = "Vida",
                IsVegetarian = true,
                IsVegan = true,
                IsSpicy = true,
                RestaurantId = 3,
                PreparationTime = 20
            },
            new FoodItem
            {
                Id = 7,
                Name = "Seguro de Vida Ahorro",
                Description = "Protección más ahorro garantizado con rentabilidad y ventajas fiscales",
                Price = 40.00m,
                ImageUrl = "",
                Category = "Vida",
                IsVegetarian = false,
                IsVegan = false,
                IsSpicy = true,
                RestaurantId = 3,
                PreparationTime = 30
            },

            // Salud
            new FoodItem
            {
                Id = 8,
                Name = "Seguro de Salud Básico",
                Description = "Cuadro médico, especialistas y pruebas diagnósticas sin listas de espera",
                Price = 35.00m,
                ImageUrl = "",
                Category = "Salud",
                IsVegetarian = true,
                IsVegan = true,
                IsSpicy = false,
                RestaurantId = 4,
                PreparationTime = 20
            },
            new FoodItem
            {
                Id = 9,
                Name = "Seguro de Salud Completo",
                Description = "Cuadro médico amplio, hospitalización y videoconsulta 24h sin copagos",
                Price = 55.00m,
                ImageUrl = "",
                Category = "Salud",
                IsVegetarian = false,
                IsVegan = true,
                IsSpicy = false,
                RestaurantId = 4,
                PreparationTime = 15
            },
            new FoodItem
            {
                Id = 10,
                Name = "Seguro Dental",
                Description = "Limpiezas y revisiones incluidas con amplio cuadro dental y sin copagos",
                Price = 12.00m,
                ImageUrl = "",
                Category = "Salud",
                IsVegetarian = false,
                IsVegan = true,
                IsSpicy = true,
                RestaurantId = 4,
                PreparationTime = 15
            },

            // Moto
            new FoodItem
            {
                Id = 11,
                Name = "Seguro de Moto a Terceros",
                Description = "RC obligatoria y voluntaria con defensa jurídica y asistencia en carretera 24h",
                Price = 14.00m,
                ImageUrl = "",
                Category = "Moto",
                IsVegetarian = true,
                IsVegan = false,
                IsSpicy = true,
                RestaurantId = 5,
                PreparationTime = 5
            },
            new FoodItem
            {
                Id = 12,
                Name = "Seguro de Moto Todo Riesgo",
                Description = "Daños propios, robo e incendio con asistencia 24h desde el kilómetro 0",
                Price = 28.00m,
                ImageUrl = "",
                Category = "Moto",
                IsVegetarian = true,
                IsVegan = true,
                IsSpicy = true,
                RestaurantId = 5,
                PreparationTime = 10
            },

            // Viaje
            new FoodItem
            {
                Id = 13,
                Name = "Seguro de Viaje",
                Description = "Asistencia médica en el extranjero, equipaje y cancelación de viaje incluidas",
                Price = 8.00m,
                ImageUrl = "",
                Category = "Viaje",
                IsVegetarian = false,
                IsVegan = true,
                IsSpicy = false,
                RestaurantId = 6,
                PreparationTime = 15
            },
            new FoodItem
            {
                Id = 14,
                Name = "Seguro de Mascotas",
                Description = "Gastos veterinarios, responsabilidad civil y asistencia para tu mascota",
                Price = 11.00m,
                ImageUrl = "",
                Category = "Viaje",
                IsVegetarian = true,
                IsVegan = true,
                IsSpicy = false,
                RestaurantId = 6,
                PreparationTime = 15
            },
            new FoodItem
            {
                Id = 15,
                Name = "Seguro de Decesos",
                Description = "Servicio funerario completo y tramitación con asesoramiento a la familia",
                Price = 9.00m,
                ImageUrl = "",
                Category = "Viaje",
                IsVegetarian = false,
                IsVegan = false,
                IsSpicy = true,
                RestaurantId = 6,
                PreparationTime = 20
            },
            new FoodItem
            {
                Id = 16,
                Name = "Seguro de Accidentes",
                Description = "Indemnización por accidente, invalidez y asistencia sanitaria 24h",
                Price = 13.00m,
                ImageUrl = "",
                Category = "Viaje",
                IsVegetarian = false,
                IsVegan = true,
                IsSpicy = false,
                RestaurantId = 6,
                PreparationTime = 15
            }
        };

        [HttpGet]
        public ActionResult<IEnumerable<FoodItem>> GetFoodItems()
        {
            return Ok(FoodItems);
        }

        [HttpGet("{id}")]
        public ActionResult<FoodItem> GetFoodItem(int id)
        {
            var foodItem = FoodItems.FirstOrDefault(f => f.Id == id);
            if (foodItem == null)
            {
                return NotFound();
            }
            return Ok(foodItem);
        }

        [HttpGet("restaurant/{restaurantId}")]
        public ActionResult<IEnumerable<FoodItem>> GetFoodItemsByRestaurant(int restaurantId)
        {
            var items = FoodItems.Where(f => f.RestaurantId == restaurantId).ToList();
            return Ok(items);
        }

        [HttpGet("category/{category}")]
        public ActionResult<IEnumerable<FoodItem>> GetFoodItemsByCategory(string category)
        {
            var items = FoodItems.Where(f => 
                f.Category.Equals(category, StringComparison.OrdinalIgnoreCase)).ToList();
            return Ok(items);
        }

        [HttpGet("search")]
        public ActionResult<IEnumerable<FoodItem>> SearchFoodItems([FromQuery] string query)
        {
            if (string.IsNullOrEmpty(query))
            {
                return Ok(FoodItems);
            }

            var items = FoodItems.Where(f => 
                f.Name.Contains(query, StringComparison.OrdinalIgnoreCase) ||
                f.Description.Contains(query, StringComparison.OrdinalIgnoreCase) ||
                f.Category.Contains(query, StringComparison.OrdinalIgnoreCase)).ToList();
            
            return Ok(items);
        }

        [HttpGet("dietary")]
        public ActionResult<IEnumerable<FoodItem>> GetFoodItemsByDietaryPreference(
            [FromQuery] bool? isVegetarian = null,
            [FromQuery] bool? isVegan = null,
            [FromQuery] bool? isSpicy = null)
        {
            var items = FoodItems.AsQueryable();

            if (isVegetarian.HasValue)
                items = items.Where(f => f.IsVegetarian == isVegetarian.Value);

            if (isVegan.HasValue)
                items = items.Where(f => f.IsVegan == isVegan.Value);

            if (isSpicy.HasValue)
                items = items.Where(f => f.IsSpicy == isSpicy.Value);

            return Ok(items.ToList());
        }
    }
}
