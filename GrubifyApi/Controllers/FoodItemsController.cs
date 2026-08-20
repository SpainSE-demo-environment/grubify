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
            // Tarifas de Luz
            new FoodItem
            {
                Id = 1,
                Name = "Tarifa Valle",
                Description = "Tarifa con discriminación horaria: paga menos en las horas valle, sin permanencia",
                Price = 0.12m,
                ImageUrl = "",
                Category = "Tarifas",
                IsVegetarian = true,
                IsVegan = true,
                IsSpicy = false,
                RestaurantId = 1,
                PreparationTime = 15
            },
            new FoodItem
            {
                Id = 2,
                Name = "Tarifa Solar",
                Description = "Tarifa pensada para autoconsumo que compensa tus excedentes de energía solar",
                Price = 0.10m,
                ImageUrl = "",
                Category = "Tarifas",
                IsVegetarian = true,
                IsVegan = true,
                IsSpicy = true,
                RestaurantId = 1,
                PreparationTime = 15
            },
            new FoodItem
            {
                Id = 3,
                Name = "Tarifa Plana",
                Description = "Cuota mensual fija con energía 100% renovable: siempre pagas lo mismo, sin sorpresas",
                Price = 55.00m,
                ImageUrl = "",
                Category = "Tarifas",
                IsVegetarian = true,
                IsVegan = false,
                IsSpicy = false,
                RestaurantId = 1,
                PreparationTime = 15
            },
            new FoodItem
            {
                Id = 4,
                Name = "Tarifa Nocturna",
                Description = "Precio reducido por la noche, ideal para recargar tu vehículo eléctrico en horas valle",
                Price = 0.09m,
                ImageUrl = "",
                Category = "Tarifas",
                IsVegetarian = false,
                IsVegan = false,
                IsSpicy = true,
                RestaurantId = 1,
                PreparationTime = 15
            },

            // Recarga VE
            new FoodItem
            {
                Id = 5,
                Name = "Recarga Rápida 50kW",
                Description = "Sesión de recarga rápida en corriente continua de 50 kW: hasta el 80% en 30 minutos",
                Price = 0.45m,
                ImageUrl = "",
                Category = "Recarga VE",
                IsVegetarian = false,
                IsVegan = true,
                IsSpicy = false,
                RestaurantId = 2,
                PreparationTime = 25
            },
            new FoodItem
            {
                Id = 6,
                Name = "Recarga Ultrarrápida 150kW",
                Description = "Recarga ultrarrápida DC de 150 kW: recupera hasta el 80% de batería en solo 15 minutos",
                Price = 0.55m,
                ImageUrl = "",
                Category = "Recarga VE",
                IsVegetarian = true,
                IsVegan = true,
                IsSpicy = true,
                RestaurantId = 2,
                PreparationTime = 20
            },
            new FoodItem
            {
                Id = 7,
                Name = "Recarga en Casa 7kW",
                Description = "Punto de recarga doméstico de 7,4 kW en AC con wallbox incluido para cargar de noche",
                Price = 0.18m,
                ImageUrl = "",
                Category = "Recarga VE",
                IsVegetarian = false,
                IsVegan = false,
                IsSpicy = true,
                RestaurantId = 2,
                PreparationTime = 30
            },

            // Autoconsumo Solar
            new FoodItem
            {
                Id = 8,
                Name = "Placas Solares Residencial",
                Description = "Instalación de autoconsumo de 3 kWp con legalización incluida y hasta un 60% de ahorro",
                Price = 3900.00m,
                ImageUrl = "",
                Category = "Autoconsumo",
                IsVegetarian = true,
                IsVegan = true,
                IsSpicy = false,
                RestaurantId = 3,
                PreparationTime = 20
            },
            new FoodItem
            {
                Id = 9,
                Name = "Batería Virtual",
                Description = "Guarda el valor de tus excedentes solares y úsalo en tu factura las 24 horas, sin baterías físicas",
                Price = 0.00m,
                ImageUrl = "",
                Category = "Autoconsumo",
                IsVegetarian = false,
                IsVegan = true,
                IsSpicy = false,
                RestaurantId = 3,
                PreparationTime = 15
            },
            new FoodItem
            {
                Id = 10,
                Name = "Kit Solar Plug & Play",
                Description = "Kit de autoconsumo de 800 W autoinstalable: enchufa, produce tu energía y empieza a ahorrar",
                Price = 699.00m,
                ImageUrl = "",
                Category = "Autoconsumo",
                IsVegetarian = false,
                IsVegan = true,
                IsSpicy = true,
                RestaurantId = 3,
                PreparationTime = 15
            },

            // Gas Natural
            new FoodItem
            {
                Id = 11,
                Name = "Tarifa Gas Hogar",
                Description = "Gas natural sin permanencia con un precio claro y una factura fácil de entender",
                Price = 0.06m,
                ImageUrl = "",
                Category = "Gas",
                IsVegetarian = true,
                IsVegan = false,
                IsSpicy = true,
                RestaurantId = 4,
                PreparationTime = 5
            },
            new FoodItem
            {
                Id = 12,
                Name = "Tarifa Gas Plana",
                Description = "Cuota mensual fija de gas natural: precio estable todo el año con todo incluido",
                Price = 42.00m,
                ImageUrl = "",
                Category = "Gas",
                IsVegetarian = true,
                IsVegan = true,
                IsSpicy = true,
                RestaurantId = 4,
                PreparationTime = 10
            },

            // Movilidad
            new FoodItem
            {
                Id = 13,
                Name = "Bono Recarga Ilimitada",
                Description = "Recargas ilimitadas en miles de puntos de la red pública por una cuota mensual fija",
                Price = 39.00m,
                ImageUrl = "",
                Category = "Movilidad",
                IsVegetarian = false,
                IsVegan = true,
                IsSpicy = false,
                RestaurantId = 5,
                PreparationTime = 15
            },
            new FoodItem
            {
                Id = 14,
                Name = "Instalación Punto de Recarga",
                Description = "Instalación de wallbox de 7,4 kW en tu plaza con gestión de la subvención Moves incluida",
                Price = 590.00m,
                ImageUrl = "",
                Category = "Movilidad",
                IsVegetarian = true,
                IsVegan = true,
                IsSpicy = false,
                RestaurantId = 5,
                PreparationTime = 15
            },

            // Servicios
            new FoodItem
            {
                Id = 15,
                Name = "Mantenimiento Caldera",
                Description = "Plan de mantenimiento con revisión anual de la caldera y asistencia 24h ante averías",
                Price = 6.90m,
                ImageUrl = "",
                Category = "Servicios",
                IsVegetarian = false,
                IsVegan = true,
                IsSpicy = false,
                RestaurantId = 6,
                PreparationTime = 15
            },
            new FoodItem
            {
                Id = 16,
                Name = "Asistencia Energética 24h",
                Description = "Cobertura de averías de luz y gas con técnico 24/7 y sin coste de desplazamiento",
                Price = 4.50m,
                ImageUrl = "",
                Category = "Servicios",
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
