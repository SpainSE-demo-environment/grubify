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
            // Tarifas móviles
            new FoodItem
            {
                Id = 1,
                Name = "Tarifa Móvil 5GB",
                Description = "5 GB de datos en 4G/5G con llamadas ilimitadas y sin permanencia",
                Price = 5.99m,
                ImageUrl = "",
                Category = "Móvil",
                IsVegetarian = true,
                IsVegan = true,
                IsSpicy = false,
                RestaurantId = 1,
                PreparationTime = 15
            },
            new FoodItem
            {
                Id = 2,
                Name = "Tarifa Móvil 20GB",
                Description = "20 GB en la red 4G/5G con llamadas ilimitadas y roaming en la UE",
                Price = 9.99m,
                ImageUrl = "",
                Category = "Móvil",
                IsVegetarian = true,
                IsVegan = true,
                IsSpicy = true,
                RestaurantId = 1,
                PreparationTime = 15
            },
            new FoodItem
            {
                Id = 3,
                Name = "Tarifa Móvil Ilimitada",
                Description = "Datos ilimitados en 5G y llamadas ilimitadas para no preocuparte por el consumo",
                Price = 19.99m,
                ImageUrl = "",
                Category = "Móvil",
                IsVegetarian = true,
                IsVegan = false,
                IsSpicy = false,
                RestaurantId = 1,
                PreparationTime = 15
            },
            new FoodItem
            {
                Id = 4,
                Name = "Tarifa Móvil 100GB 5G",
                Description = "100 GB en la red 5G con llamadas ilimitadas, ideal para teletrabajo y streaming",
                Price = 14.99m,
                ImageUrl = "",
                Category = "Móvil",
                IsVegetarian = false,
                IsVegan = false,
                IsSpicy = true,
                RestaurantId = 1,
                PreparationTime = 15
            },

            // Fibra y fijo
            new FoodItem
            {
                Id = 5,
                Name = "Fibra 300 Mbps",
                Description = "Fibra simétrica de 300 Mbps con router WiFi 6 e instalación gratuita",
                Price = 25.99m,
                ImageUrl = "",
                Category = "Fibra",
                IsVegetarian = false,
                IsVegan = true,
                IsSpicy = false,
                RestaurantId = 2,
                PreparationTime = 25
            },
            new FoodItem
            {
                Id = 6,
                Name = "Fibra 600 Mbps",
                Description = "Fibra simétrica de 600 Mbps con router WiFi 6 y sin permanencia",
                Price = 30.99m,
                ImageUrl = "",
                Category = "Fibra",
                IsVegetarian = true,
                IsVegan = true,
                IsSpicy = true,
                RestaurantId = 2,
                PreparationTime = 20
            },
            new FoodItem
            {
                Id = 7,
                Name = "Fibra 1 Gbps",
                Description = "Fibra simétrica de 1 Gbps para el máximo rendimiento en tu hogar",
                Price = 39.99m,
                ImageUrl = "",
                Category = "Fibra",
                IsVegetarian = false,
                IsVegan = false,
                IsSpicy = true,
                RestaurantId = 2,
                PreparationTime = 30
            },

            // Paquetes convergentes
            new FoodItem
            {
                Id = 8,
                Name = "Combo Fibra 600 + Móvil 20GB",
                Description = "Fibra 600 Mbps y una línea móvil con 20 GB y llamadas ilimitadas en un solo pack",
                Price = 45.99m,
                ImageUrl = "",
                Category = "Convergente",
                IsVegetarian = true,
                IsVegan = true,
                IsSpicy = false,
                RestaurantId = 3,
                PreparationTime = 20
            },
            new FoodItem
            {
                Id = 9,
                Name = "Combo Fibra 1Gb + Ilimitada",
                Description = "Fibra 1 Gbps y línea móvil con datos ilimitados 5G para el máximo rendimiento",
                Price = 59.99m,
                ImageUrl = "",
                Category = "Convergente",
                IsVegetarian = false,
                IsVegan = true,
                IsSpicy = false,
                RestaurantId = 3,
                PreparationTime = 15
            },
            new FoodItem
            {
                Id = 10,
                Name = "Combo Fibra 300 + Móvil 5GB",
                Description = "Fibra 300 Mbps y una línea móvil con 5 GB al mejor precio, sin permanencia",
                Price = 35.99m,
                ImageUrl = "",
                Category = "Convergente",
                IsVegetarian = false,
                IsVegan = true,
                IsSpicy = true,
                RestaurantId = 3,
                PreparationTime = 15
            },

            // Móviles y dispositivos
            new FoodItem
            {
                Id = 11,
                Name = "Smartphone 5G a plazos",
                Description = "Últimos smartphones 5G financiados a 24 meses sin intereses al contratar tu tarifa",
                Price = 15.99m,
                ImageUrl = "",
                Category = "Dispositivos",
                IsVegetarian = true,
                IsVegan = false,
                IsSpicy = true,
                RestaurantId = 4,
                PreparationTime = 5
            },
            new FoodItem
            {
                Id = 12,
                Name = "Router WiFi 6",
                Description = "Router WiFi 6 de alto rendimiento y amplia cobertura para todo tu hogar",
                Price = 59.99m,
                ImageUrl = "",
                Category = "Dispositivos",
                IsVegetarian = true,
                IsVegan = true,
                IsSpicy = true,
                RestaurantId = 4,
                PreparationTime = 10
            },

            // Internet móvil / datos
            new FoodItem
            {
                Id = 13,
                Name = "SIM Datos 50GB",
                Description = "SIM solo datos con 50 GB en la red 5G para tu tablet, portátil o segundo dispositivo",
                Price = 12.99m,
                ImageUrl = "",
                Category = "Datos",
                IsVegetarian = false,
                IsVegan = true,
                IsSpicy = false,
                RestaurantId = 5,
                PreparationTime = 15
            },
            new FoodItem
            {
                Id = 14,
                Name = "Roaming Internacional",
                Description = "Navega y llama en la UE y destinos internacionales usando tus GB y minutos",
                Price = 9.99m,
                ImageUrl = "",
                Category = "Datos",
                IsVegetarian = true,
                IsVegan = true,
                IsSpicy = false,
                RestaurantId = 5,
                PreparationTime = 15
            },

            // Servicios adicionales
            new FoodItem
            {
                Id = 15,
                Name = "Pack TV y Streaming",
                Description = "Cientos de canales y las mejores plataformas de streaming en un solo pack",
                Price = 12.99m,
                ImageUrl = "",
                Category = "Servicios",
                IsVegetarian = false,
                IsVegan = false,
                IsSpicy = true,
                RestaurantId = 6,
                PreparationTime = 20
            },
            new FoodItem
            {
                Id = 16,
                Name = "Seguro de Móvil",
                Description = "Protege tu móvil ante roturas, robo y averías con asistencia y sustitución 24h",
                Price = 6.99m,
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
