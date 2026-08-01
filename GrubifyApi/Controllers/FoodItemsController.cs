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
            // Banca Personal - Cuentas
            new FoodItem
            {
                Id = 1,
                Name = "Cuenta Nómina Sin Comisiones",
                Description = "Cuenta corriente sin comisiones con tu nómina domiciliada y tarjeta gratis",
                Price = 0.00m,
                ImageUrl = "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",
                Category = "Cuentas",
                IsVegetarian = true,
                IsVegan = true,
                IsSpicy = false,
                RestaurantId = 1,
                PreparationTime = 20
            },
            new FoodItem
            {
                Id = 2,
                Name = "Cuenta Ahorro Remunerada",
                Description = "Rentabiliza tus ahorros con un 2,5% TAE y liquidez total",
                Price = 0.00m,
                ImageUrl = "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400&h=300&fit=crop",
                Category = "Ahorro",
                IsVegetarian = true,
                IsVegan = false,
                IsSpicy = true,
                RestaurantId = 1,
                PreparationTime = 25
            },
            new FoodItem
            {
                Id = 3,
                Name = "Cuenta Joven Online",
                Description = "Cuenta 100% digital para menores de 30 años, sin comisiones ni requisitos",
                Price = 0.00m,
                ImageUrl = "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop",
                Category = "Cuentas",
                IsVegetarian = true,
                IsVegan = true,
                IsSpicy = false,
                RestaurantId = 1,
                PreparationTime = 10
            },

            // Tarjetas y Pagos
            new FoodItem
            {
                Id = 4,
                Name = "Tarjeta de Débito Clásica",
                Description = "Tarjeta de débito gratuita con pagos móviles y retiradas sin comisión",
                Price = 0.00m,
                ImageUrl = "https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4?w=400&h=300&fit=crop",
                Category = "Tarjetas",
                IsVegetarian = true,
                IsVegan = false,
                IsSpicy = false,
                RestaurantId = 2,
                PreparationTime = 15
            },
            new FoodItem
            {
                Id = 5,
                Name = "Tarjeta de Crédito Oro",
                Description = "Crédito hasta 6.000€ con seguros de viaje y programa de puntos",
                Price = 45.00m,
                ImageUrl = "https://images.unsplash.com/photo-1556742393-d75f468bfcb0?w=400&h=300&fit=crop",
                Category = "Tarjetas",
                IsVegetarian = false,
                IsVegan = false,
                IsSpicy = true,
                RestaurantId = 2,
                PreparationTime = 15
            },
            new FoodItem
            {
                Id = 6,
                Name = "Tarjeta Revolving Flexible",
                Description = "Aplaza tus compras y elige la cuota mensual que mejor se adapte a ti",
                Price = 0.00m,
                ImageUrl = "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=400&h=300&fit=crop",
                Category = "Tarjetas",
                IsVegetarian = false,
                IsVegan = false,
                IsSpicy = false,
                RestaurantId = 2,
                PreparationTime = 20
            },

            // Hipotecas y Financiación
            new FoodItem
            {
                Id = 7,
                Name = "Hipoteca Tipo Fijo 30 años",
                Description = "Hipoteca a tipo fijo desde el 2,90% TIN con cuota estable toda la vida del préstamo",
                Price = 950.00m,
                ImageUrl = "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=400&h=300&fit=crop",
                Category = "Hipotecas",
                IsVegetarian = false,
                IsVegan = false,
                IsSpicy = true,
                RestaurantId = 3,
                PreparationTime = 30
            },
            new FoodItem
            {
                Id = 8,
                Name = "Préstamo Personal Preconcedido",
                Description = "Hasta 30.000€ al instante sin comisión de apertura y respuesta inmediata",
                Price = 320.00m,
                ImageUrl = "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=400&h=300&fit=crop",
                Category = "Préstamos",
                IsVegetarian = true,
                IsVegan = true,
                IsSpicy = true,
                RestaurantId = 3,
                PreparationTime = 25
            },
            new FoodItem
            {
                Id = 9,
                Name = "Financiación de Coche",
                Description = "Financia tu vehículo hasta en 96 meses con las mejores condiciones",
                Price = 280.00m,
                ImageUrl = "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=300&fit=crop",
                Category = "Préstamos",
                IsVegetarian = true,
                IsVegan = false,
                IsSpicy = false,
                RestaurantId = 3,
                PreparationTime = 10
            },

            // Inversión y Ahorro
            new FoodItem
            {
                Id = 10,
                Name = "Fondo Indexado Global",
                Description = "Invierte en los principales mercados mundiales con bajas comisiones",
                Price = 100.00m,
                ImageUrl = "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop",
                Category = "Inversión",
                IsVegetarian = false,
                IsVegan = false,
                IsSpicy = false,
                RestaurantId = 4,
                PreparationTime = 15
            },
            new FoodItem
            {
                Id = 11,
                Name = "Depósito a Plazo 12 meses",
                Description = "Depósito garantizado al 3% TAE a 12 meses sin sorpresas",
                Price = 1000.00m,
                ImageUrl = "https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=400&h=300&fit=crop",
                Category = "Ahorro",
                IsVegetarian = false,
                IsVegan = false,
                IsSpicy = false,
                RestaurantId = 4,
                PreparationTime = 5
            },
            new FoodItem
            {
                Id = 12,
                Name = "Plan de Pensiones",
                Description = "Prepara tu jubilación con ventajas fiscales y aportaciones flexibles",
                Price = 50.00m,
                ImageUrl = "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
                Category = "Pensiones",
                IsVegetarian = true,
                IsVegan = true,
                IsSpicy = false,
                RestaurantId = 4,
                PreparationTime = 20
            },

            // Seguros y Pensiones
            new FoodItem
            {
                Id = 13,
                Name = "Seguro de Hogar",
                Description = "Protege tu vivienda y su contenido con cobertura integral 24/7",
                Price = 18.00m,
                ImageUrl = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop",
                Category = "Seguros",
                IsVegetarian = true,
                IsVegan = true,
                IsSpicy = false,
                RestaurantId = 5,
                PreparationTime = 15
            },
            new FoodItem
            {
                Id = 14,
                Name = "Seguro de Vida",
                Description = "Tranquilidad para los tuyos con coberturas adaptadas a cada etapa",
                Price = 12.00m,
                ImageUrl = "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=300&fit=crop",
                Category = "Seguros",
                IsVegetarian = true,
                IsVegan = true,
                IsSpicy = false,
                RestaurantId = 5,
                PreparationTime = 5
            },
            new FoodItem
            {
                Id = 15,
                Name = "Seguro de Auto",
                Description = "Seguro de coche a todo riesgo con asistencia en carretera incluida",
                Price = 30.00m,
                ImageUrl = "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=400&h=300&fit=crop",
                Category = "Seguros",
                IsVegetarian = false,
                IsVegan = false,
                IsSpicy = false,
                RestaurantId = 5,
                PreparationTime = 20
            },

            // Ampliación: más hipotecas y financiación
            new FoodItem
            {
                Id = 16,
                Name = "Hipoteca Tipo Variable Euríbor",
                Description = "Hipoteca a tipo variable con diferencial reducido y bonificaciones por vinculación",
                Price = 780.00m,
                ImageUrl = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop",
                Category = "Hipotecas",
                IsVegetarian = false,
                IsVegan = false,
                IsSpicy = false,
                RestaurantId = 3,
                PreparationTime = 30
            },
            new FoodItem
            {
                Id = 17,
                Name = "Hipoteca Mixta 10+20",
                Description = "Combina tipo fijo los primeros 10 años y variable el resto, lo mejor de ambos mundos",
                Price = 890.00m,
                ImageUrl = "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=400&h=300&fit=crop",
                Category = "Hipotecas",
                IsVegetarian = false,
                IsVegan = false,
                IsSpicy = true,
                RestaurantId = 3,
                PreparationTime = 30
            },
            new FoodItem
            {
                Id = 18,
                Name = "Préstamo para Estudios",
                Description = "Financia tu máster o grado con carencia hasta finalizar los estudios",
                Price = 150.00m,
                ImageUrl = "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop",
                Category = "Préstamos",
                IsVegetarian = true,
                IsVegan = true,
                IsSpicy = false,
                RestaurantId = 3,
                PreparationTime = 20
            },
            new FoodItem
            {
                Id = 19,
                Name = "Préstamo Reforma Hogar",
                Description = "Hasta 40.000€ para reformar tu vivienda con plazos de hasta 8 años",
                Price = 210.00m,
                ImageUrl = "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=300&fit=crop",
                Category = "Préstamos",
                IsVegetarian = true,
                IsVegan = false,
                IsSpicy = false,
                RestaurantId = 3,
                PreparationTime = 25
            },

            // Ampliación: banca personal y tarjetas
            new FoodItem
            {
                Id = 20,
                Name = "Cuenta Autónomos y Negocios",
                Description = "Cuenta profesional sin comisiones con TPV y gestión de recibos incluida",
                Price = 0.00m,
                ImageUrl = "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=300&fit=crop",
                Category = "Cuentas",
                IsVegetarian = true,
                IsVegan = false,
                IsSpicy = true,
                RestaurantId = 1,
                PreparationTime = 20
            },
            new FoodItem
            {
                Id = 21,
                Name = "Tarjeta Prepago Recargable",
                Description = "Controla tu gasto con una tarjeta prepago recargable, ideal para compras online",
                Price = 0.00m,
                ImageUrl = "https://images.unsplash.com/photo-1613243555988-441166d4d6fd?w=400&h=300&fit=crop",
                Category = "Tarjetas",
                IsVegetarian = true,
                IsVegan = true,
                IsSpicy = false,
                RestaurantId = 2,
                PreparationTime = 10
            },

            // Ampliación: inversión
            new FoodItem
            {
                Id = 22,
                Name = "Cartera Gestionada Roboadvisor",
                Description = "Cartera de fondos diversificada y gestionada automáticamente según tu perfil",
                Price = 200.00m,
                ImageUrl = "https://images.unsplash.com/photo-1642790551116-18e150f248e3?w=400&h=300&fit=crop",
                Category = "Inversión",
                IsVegetarian = false,
                IsVegan = false,
                IsSpicy = true,
                RestaurantId = 4,
                PreparationTime = 15
            },
            new FoodItem
            {
                Id = 23,
                Name = "Broker de Acciones y ETFs",
                Description = "Opera en las principales bolsas mundiales con comisiones ultrarreducidas",
                Price = 0.00m,
                ImageUrl = "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=300&fit=crop",
                Category = "Inversión",
                IsVegetarian = false,
                IsVegan = false,
                IsSpicy = false,
                RestaurantId = 4,
                PreparationTime = 15
            },

            // Ampliación: seguros
            new FoodItem
            {
                Id = 24,
                Name = "Seguro de Salud",
                Description = "Cuadro médico completo, sin copagos y con acceso a videoconsulta 24h",
                Price = 45.00m,
                ImageUrl = "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&h=300&fit=crop",
                Category = "Seguros",
                IsVegetarian = true,
                IsVegan = true,
                IsSpicy = false,
                RestaurantId = 5,
                PreparationTime = 15
            },
            new FoodItem
            {
                Id = 25,
                Name = "Seguro de Viaje",
                Description = "Cobertura mundial con asistencia médica, cancelación y equipaje incluidos",
                Price = 15.00m,
                ImageUrl = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop",
                Category = "Seguros",
                IsVegetarian = true,
                IsVegan = false,
                IsSpicy = false,
                RestaurantId = 5,
                PreparationTime = 10
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
