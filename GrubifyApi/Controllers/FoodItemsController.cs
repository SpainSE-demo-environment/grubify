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
            // Camisetas
            new FoodItem
            {
                Id = 1,
                Name = "Camiseta Básica",
                Description = "Camiseta de algodón 100% orgánico, corte regular. Tallas S-XXL y varios colores",
                Price = 12.99m,
                ImageUrl = "",
                Category = "Camisetas",
                IsVegetarian = true,
                IsVegan = true,
                IsSpicy = false,
                RestaurantId = 1,
                PreparationTime = 15
            },
            new FoodItem
            {
                Id = 2,
                Name = "Camiseta Oversize",
                Description = "Camiseta oversize de punto grueso con estampado, unisex. Tallas S-XL",
                Price = 19.99m,
                ImageUrl = "",
                Category = "Camisetas",
                IsVegetarian = true,
                IsVegan = true,
                IsSpicy = true,
                RestaurantId = 1,
                PreparationTime = 15
            },

            // Pantalones
            new FoodItem
            {
                Id = 3,
                Name = "Vaqueros Slim",
                Description = "Vaqueros slim fit elásticos en denim azul. Tallas 36-46",
                Price = 39.99m,
                ImageUrl = "",
                Category = "Pantalones",
                IsVegetarian = true,
                IsVegan = false,
                IsSpicy = false,
                RestaurantId = 2,
                PreparationTime = 15
            },
            new FoodItem
            {
                Id = 4,
                Name = "Pantalón Chino",
                Description = "Pantalón chino de algodón en corte recto, disponible en beige, azul y verde",
                Price = 34.99m,
                ImageUrl = "",
                Category = "Pantalones",
                IsVegetarian = false,
                IsVegan = false,
                IsSpicy = true,
                RestaurantId = 2,
                PreparationTime = 15
            },

            // Vestidos
            new FoodItem
            {
                Id = 5,
                Name = "Vestido Midi",
                Description = "Vestido midi de tejido fluido con estampado floral. Tallas XS-L",
                Price = 45.99m,
                ImageUrl = "",
                Category = "Vestidos",
                IsVegetarian = false,
                IsVegan = true,
                IsSpicy = false,
                RestaurantId = 3,
                PreparationTime = 25
            },
            new FoodItem
            {
                Id = 6,
                Name = "Vestido de Fiesta",
                Description = "Vestido de fiesta largo con detalle de lentejuelas y espalda abierta",
                Price = 79.99m,
                ImageUrl = "",
                Category = "Vestidos",
                IsVegetarian = true,
                IsVegan = true,
                IsSpicy = true,
                RestaurantId = 3,
                PreparationTime = 20
            },
            new FoodItem
            {
                Id = 7,
                Name = "Vestido Camisero",
                Description = "Vestido camisero de lino con cinturón, ideal para diario. Tallas XS-XL",
                Price = 42.99m,
                ImageUrl = "",
                Category = "Vestidos",
                IsVegetarian = false,
                IsVegan = false,
                IsSpicy = true,
                RestaurantId = 3,
                PreparationTime = 30
            },

            // Calzado
            new FoodItem
            {
                Id = 8,
                Name = "Zapatillas Urbanas",
                Description = "Zapatillas urbanas de piel sintética con suela cómoda. Tallas 36-45",
                Price = 59.99m,
                ImageUrl = "",
                Category = "Calzado",
                IsVegetarian = true,
                IsVegan = true,
                IsSpicy = false,
                RestaurantId = 4,
                PreparationTime = 20
            },
            new FoodItem
            {
                Id = 9,
                Name = "Botas de Piel",
                Description = "Botas de piel auténtica con forro cálido, ideales para el invierno",
                Price = 89.99m,
                ImageUrl = "",
                Category = "Calzado",
                IsVegetarian = false,
                IsVegan = true,
                IsSpicy = false,
                RestaurantId = 4,
                PreparationTime = 15
            },
            new FoodItem
            {
                Id = 10,
                Name = "Bailarinas",
                Description = "Bailarinas de ante en varios colores, cómodas y versátiles. Tallas 35-42",
                Price = 35.99m,
                ImageUrl = "",
                Category = "Calzado",
                IsVegetarian = false,
                IsVegan = true,
                IsSpicy = true,
                RestaurantId = 4,
                PreparationTime = 15
            },

            // Abrigos
            new FoodItem
            {
                Id = 11,
                Name = "Abrigo de Lana",
                Description = "Abrigo largo de mezcla de lana con corte recto. Tallas S-XL",
                Price = 119.99m,
                ImageUrl = "",
                Category = "Abrigos",
                IsVegetarian = true,
                IsVegan = false,
                IsSpicy = true,
                RestaurantId = 5,
                PreparationTime = 5
            },
            new FoodItem
            {
                Id = 12,
                Name = "Chaqueta Vaquera",
                Description = "Chaqueta vaquera clásica de denim con lavado medio. Tallas XS-XXL",
                Price = 49.99m,
                ImageUrl = "",
                Category = "Abrigos",
                IsVegetarian = true,
                IsVegan = true,
                IsSpicy = true,
                RestaurantId = 5,
                PreparationTime = 10
            },

            // Accesorios
            new FoodItem
            {
                Id = 13,
                Name = "Bolso Bandolera",
                Description = "Bolso bandolera de piel sintética con correa ajustable, varios colores",
                Price = 39.99m,
                ImageUrl = "",
                Category = "Accesorios",
                IsVegetarian = false,
                IsVegan = true,
                IsSpicy = false,
                RestaurantId = 6,
                PreparationTime = 15
            },
            new FoodItem
            {
                Id = 14,
                Name = "Cinturón de Piel",
                Description = "Cinturón de piel auténtica con hebilla metálica. Tallas 90-110 cm",
                Price = 24.99m,
                ImageUrl = "",
                Category = "Accesorios",
                IsVegetarian = true,
                IsVegan = true,
                IsSpicy = false,
                RestaurantId = 6,
                PreparationTime = 15
            },
            new FoodItem
            {
                Id = 15,
                Name = "Bufanda de Punto",
                Description = "Bufanda de punto suave y cálida, disponible en tonos lisos de temporada",
                Price = 19.99m,
                ImageUrl = "",
                Category = "Accesorios",
                IsVegetarian = false,
                IsVegan = false,
                IsSpicy = true,
                RestaurantId = 6,
                PreparationTime = 20
            },
            new FoodItem
            {
                Id = 16,
                Name = "Gafas de Sol",
                Description = "Gafas de sol con protección UV400 y montura ligera de estilo retro",
                Price = 29.99m,
                ImageUrl = "",
                Category = "Accesorios",
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
