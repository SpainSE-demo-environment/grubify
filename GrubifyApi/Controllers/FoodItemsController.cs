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
            // Cuentas
            new FoodItem
            {
                Id = 1,
                Name = "Cuenta Personal",
                Description = "Cuenta corriente sin comisiones con tarjeta gratis, Bizum y app móvil",
                Price = 0.00m,
                ImageUrl = "",
                Category = "Cuentas",
                IsVegetarian = true,
                IsVegan = true,
                IsSpicy = false,
                RestaurantId = 1,
                PreparationTime = 15
            },
            new FoodItem
            {
                Id = 2,
                Name = "Cuenta de Ahorro",
                Description = "Cuenta de ahorro remunerada con liquidez total y sin comisiones de mantenimiento",
                Price = 0.00m,
                ImageUrl = "",
                Category = "Cuentas",
                IsVegetarian = true,
                IsVegan = true,
                IsSpicy = true,
                RestaurantId = 1,
                PreparationTime = 15
            },

            // Tarjetas
            new FoodItem
            {
                Id = 3,
                Name = "Tarjeta de Débito",
                Description = "Tarjeta de débito gratuita con pagos móviles y retiradas sin comisión",
                Price = 0.00m,
                ImageUrl = "",
                Category = "Tarjetas",
                IsVegetarian = true,
                IsVegan = false,
                IsSpicy = false,
                RestaurantId = 2,
                PreparationTime = 15
            },
            new FoodItem
            {
                Id = 4,
                Name = "Tarjeta de Crédito",
                Description = "Crédito hasta 6.000€ con pago aplazado, seguros de viaje y programa de puntos",
                Price = 45.00m,
                ImageUrl = "",
                Category = "Tarjetas",
                IsVegetarian = false,
                IsVegan = false,
                IsSpicy = true,
                RestaurantId = 2,
                PreparationTime = 15
            },

            // Préstamos
            new FoodItem
            {
                Id = 5,
                Name = "Préstamo Personal",
                Description = "Financia tus proyectos hasta 60.000€ con cuotas a tu medida y sin sorpresas",
                Price = 180.00m,
                ImageUrl = "",
                Category = "Préstamos",
                IsVegetarian = false,
                IsVegan = true,
                IsSpicy = false,
                RestaurantId = 3,
                PreparationTime = 25
            },
            new FoodItem
            {
                Id = 6,
                Name = "Préstamo Personal Preconcedido",
                Description = "Hasta 30.000€ preconcedidos al instante, sin comisión de apertura y respuesta inmediata",
                Price = 250.00m,
                ImageUrl = "",
                Category = "Préstamos",
                IsVegetarian = true,
                IsVegan = true,
                IsSpicy = true,
                RestaurantId = 3,
                PreparationTime = 20
            },
            new FoodItem
            {
                Id = 7,
                Name = "Hipoteca",
                Description = "Hipoteca a tipo fijo desde el 2,90% TIN con cuota estable toda la vida del préstamo",
                Price = 950.00m,
                ImageUrl = "",
                Category = "Préstamos",
                IsVegetarian = false,
                IsVegan = false,
                IsSpicy = true,
                RestaurantId = 3,
                PreparationTime = 30
            },

            // Inversión
            new FoodItem
            {
                Id = 8,
                Name = "Plan de Pensiones",
                Description = "Prepara tu jubilación con ventajas fiscales y aportaciones flexibles",
                Price = 50.00m,
                ImageUrl = "",
                Category = "Inversión",
                IsVegetarian = true,
                IsVegan = true,
                IsSpicy = false,
                RestaurantId = 4,
                PreparationTime = 20
            },
            new FoodItem
            {
                Id = 9,
                Name = "Fondos de Inversión",
                Description = "Fondos gestionados e indexados para diversificar tu patrimonio con bajas comisiones",
                Price = 100.00m,
                ImageUrl = "",
                Category = "Inversión",
                IsVegetarian = false,
                IsVegan = true,
                IsSpicy = false,
                RestaurantId = 4,
                PreparationTime = 15
            },
            new FoodItem
            {
                Id = 10,
                Name = "Acciones y ETFs",
                Description = "Opera en las principales bolsas mundiales con comisiones ultrarreducidas",
                Price = 0.00m,
                ImageUrl = "",
                Category = "Inversión",
                IsVegetarian = false,
                IsVegan = true,
                IsSpicy = true,
                RestaurantId = 4,
                PreparationTime = 15
            },

            // Ahorro
            new FoodItem
            {
                Id = 11,
                Name = "Depósito",
                Description = "Depósito a plazo garantizado al 3% TAE a 12 meses sin sorpresas",
                Price = 1000.00m,
                ImageUrl = "",
                Category = "Ahorro",
                IsVegetarian = true,
                IsVegan = false,
                IsSpicy = true,
                RestaurantId = 5,
                PreparationTime = 5
            },
            new FoodItem
            {
                Id = 12,
                Name = "Cuenta de Ahorro Remunerada",
                Description = "Cuenta de ahorro con un 2,5% TAE y disponibilidad inmediata de tu dinero",
                Price = 0.00m,
                ImageUrl = "",
                Category = "Ahorro",
                IsVegetarian = true,
                IsVegan = true,
                IsSpicy = true,
                RestaurantId = 5,
                PreparationTime = 10
            },

            // Seguros
            new FoodItem
            {
                Id = 13,
                Name = "Seguro de Salud",
                Description = "Cuadro médico completo, sin copagos y con acceso a videoconsulta 24h",
                Price = 45.00m,
                ImageUrl = "",
                Category = "Seguros",
                IsVegetarian = false,
                IsVegan = true,
                IsSpicy = false,
                RestaurantId = 6,
                PreparationTime = 15
            },
            new FoodItem
            {
                Id = 14,
                Name = "Seguro de Hogar",
                Description = "Protege tu vivienda y su contenido con cobertura integral y asistencia 24/7",
                Price = 18.00m,
                ImageUrl = "",
                Category = "Seguros",
                IsVegetarian = true,
                IsVegan = true,
                IsSpicy = false,
                RestaurantId = 6,
                PreparationTime = 15
            },
            new FoodItem
            {
                Id = 15,
                Name = "Seguro de Auto",
                Description = "Seguro de coche a todo riesgo con asistencia en carretera incluida",
                Price = 30.00m,
                ImageUrl = "",
                Category = "Seguros",
                IsVegetarian = false,
                IsVegan = false,
                IsSpicy = true,
                RestaurantId = 6,
                PreparationTime = 20
            },
            new FoodItem
            {
                Id = 16,
                Name = "Seguro de Moto",
                Description = "Seguro de moto con las mejores coberturas, defensa jurídica y asistencia 24h",
                Price = 20.00m,
                ImageUrl = "",
                Category = "Seguros",
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
