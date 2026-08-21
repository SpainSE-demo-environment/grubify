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
            // ===== Mujer (RestaurantId 1) =====
            new FoodItem
            {
                Id = 1,
                Name = "Vestido Midi Flores",
                Description = "Vestido midi de tejido fluido con estampado floral y manga corta. Tallas XS-L",
                Price = 45.99m,
                ImageUrl = "",
                Category = "Vestidos",
                RestaurantId = 1,
                PreparationTime = 0
            },
            new FoodItem
            {
                Id = 2,
                Name = "Blusa Satinada",
                Description = "Blusa de tacto satinado con cuello camisero, ideal para diario u oficina. Tallas XS-XL",
                Price = 29.99m,
                ImageUrl = "",
                Category = "Camisas y Blusas",
                RestaurantId = 1,
                PreparationTime = 0
            },
            new FoodItem
            {
                Id = 3,
                Name = "Vaquero Slim Tiro Alto",
                Description = "Vaquero slim de tiro alto en denim elástico azul medio. Tallas 34-46",
                Price = 39.99m,
                ImageUrl = "",
                Category = "Pantalones",
                RestaurantId = 1,
                PreparationTime = 0
            },
            new FoodItem
            {
                Id = 4,
                Name = "Abrigo Lana Espiga",
                Description = "Abrigo largo de mezcla de lana con patrón espiga y corte recto. Tallas S-XL",
                Price = 119.99m,
                ImageUrl = "",
                Category = "Abrigos",
                RestaurantId = 1,
                PreparationTime = 0
            },
            new FoodItem
            {
                Id = 5,
                Name = "Falda Plisada Midi",
                Description = "Falda midi plisada de vuelo con cintura elástica. Tallas XS-L",
                Price = 34.99m,
                ImageUrl = "",
                Category = "Faldas",
                RestaurantId = 1,
                PreparationTime = 0
            },
            new FoodItem
            {
                Id = 6,
                Name = "Blazer Entallado",
                Description = "Blazer entallado con solapa y botonadura simple, perfecto para looks smart. Tallas XS-XL",
                Price = 59.99m,
                ImageUrl = "",
                Category = "Chaquetas",
                RestaurantId = 1,
                PreparationTime = 0
            },

            // ===== Hombre (RestaurantId 2) =====
            new FoodItem
            {
                Id = 7,
                Name = "Camisa Oxford",
                Description = "Camisa Oxford de algodón con corte regular, versátil y resistente. Tallas S-XXL",
                Price = 29.99m,
                ImageUrl = "",
                Category = "Camisas y Blusas",
                RestaurantId = 2,
                PreparationTime = 0
            },
            new FoodItem
            {
                Id = 8,
                Name = "Vaquero Slim",
                Description = "Vaquero slim fit elástico en denim azul oscuro. Tallas 38-48",
                Price = 39.99m,
                ImageUrl = "",
                Category = "Pantalones",
                RestaurantId = 2,
                PreparationTime = 0
            },
            new FoodItem
            {
                Id = 9,
                Name = "Sudadera con Capucha",
                Description = "Sudadera con capucha de felpa cepillada y bolsillo canguro. Tallas S-XXL",
                Price = 34.99m,
                ImageUrl = "",
                Category = "Sudaderas",
                RestaurantId = 2,
                PreparationTime = 0
            },
            new FoodItem
            {
                Id = 10,
                Name = "Chaqueta Bomber",
                Description = "Chaqueta bomber ligera con cierre de cremallera y puños elásticos. Tallas S-XL",
                Price = 69.99m,
                ImageUrl = "",
                Category = "Chaquetas",
                RestaurantId = 2,
                PreparationTime = 0
            },
            new FoodItem
            {
                Id = 11,
                Name = "Polo Piqué",
                Description = "Polo de punto piqué de algodón con cuello y puños en contraste. Tallas S-XXL",
                Price = 22.99m,
                ImageUrl = "",
                Category = "Camisetas",
                RestaurantId = 2,
                PreparationTime = 0
            },
            new FoodItem
            {
                Id = 12,
                Name = "Pantalón Chino",
                Description = "Pantalón chino de algodón en corte recto, disponible en beige, azul y verde. Tallas 38-48",
                Price = 34.99m,
                ImageUrl = "",
                Category = "Pantalones",
                RestaurantId = 2,
                PreparationTime = 0
            },

            // ===== Niño (RestaurantId 3) =====
            new FoodItem
            {
                Id = 13,
                Name = "Camiseta Estampada Niño",
                Description = "Camiseta de algodón con estampado divertido, resistente a los lavados. Tallas 3-14 años",
                Price = 9.99m,
                ImageUrl = "",
                Category = "Camisetas",
                RestaurantId = 3,
                PreparationTime = 0
            },
            new FoodItem
            {
                Id = 14,
                Name = "Pantalón Cargo Niño",
                Description = "Pantalón cargo de sarga con bolsillos laterales y cintura ajustable. Tallas 3-14 años",
                Price = 19.99m,
                ImageUrl = "",
                Category = "Pantalones",
                RestaurantId = 3,
                PreparationTime = 0
            },
            new FoodItem
            {
                Id = 15,
                Name = "Vestido Flores Niña",
                Description = "Vestido de algodón con estampado de flores y lazo trasero. Tallas 3-12 años",
                Price = 24.99m,
                ImageUrl = "",
                Category = "Vestidos",
                RestaurantId = 3,
                PreparationTime = 0
            },
            new FoodItem
            {
                Id = 16,
                Name = "Sudadera Capucha Kids",
                Description = "Sudadera con capucha de felpa suave y estampado frontal. Tallas 3-14 años",
                Price = 19.99m,
                ImageUrl = "",
                Category = "Sudaderas",
                RestaurantId = 3,
                PreparationTime = 0
            },
            new FoodItem
            {
                Id = 17,
                Name = "Chaqueta Acolchada Niño",
                Description = "Chaqueta acolchada ligera con capucha, cálida para el día a día. Tallas 3-14 años",
                Price = 39.99m,
                ImageUrl = "",
                Category = "Abrigos",
                RestaurantId = 3,
                PreparationTime = 0
            },

            // ===== Calzado (RestaurantId 4) =====
            new FoodItem
            {
                Id = 18,
                Name = "Zapatilla Running",
                Description = "Zapatilla running con amortiguación ligera y suela flexible. Tallas 36-46",
                Price = 59.99m,
                ImageUrl = "",
                Category = "Deportivo",
                RestaurantId = 4,
                PreparationTime = 0
            },
            new FoodItem
            {
                Id = 19,
                Name = "Bota Chelsea Piel",
                Description = "Bota Chelsea de piel con elásticos laterales y suela de goma. Tallas 39-45",
                Price = 89.99m,
                ImageUrl = "",
                Category = "Botas",
                RestaurantId = 4,
                PreparationTime = 0
            },
            new FoodItem
            {
                Id = 20,
                Name = "Bailarina Charol",
                Description = "Bailarina de charol con puntera redonda, cómoda y elegante. Tallas 35-42",
                Price = 35.99m,
                ImageUrl = "",
                Category = "Plano",
                RestaurantId = 4,
                PreparationTime = 0
            },
            new FoodItem
            {
                Id = 21,
                Name = "Sandalia Tacón",
                Description = "Sandalia de tacón medio con tira ajustable al tobillo. Tallas 35-41",
                Price = 45.99m,
                ImageUrl = "",
                Category = "Tacón",
                RestaurantId = 4,
                PreparationTime = 0
            },
            new FoodItem
            {
                Id = 22,
                Name = "Mocasín Piel",
                Description = "Mocasín de piel con acabado pulido, ideal para looks smart casual. Tallas 39-45",
                Price = 55.99m,
                ImageUrl = "",
                Category = "Plano",
                RestaurantId = 4,
                PreparationTime = 0
            },

            // ===== Accesorios (RestaurantId 5) =====
            new FoodItem
            {
                Id = 23,
                Name = "Bolso Bandolera",
                Description = "Bolso bandolera de piel sintética con correa ajustable, varios colores",
                Price = 39.99m,
                ImageUrl = "",
                Category = "Bolsos",
                RestaurantId = 5,
                PreparationTime = 0
            },
            new FoodItem
            {
                Id = 24,
                Name = "Cinturón de Piel",
                Description = "Cinturón de piel auténtica con hebilla metálica. Tallas 90-110 cm",
                Price = 24.99m,
                ImageUrl = "",
                Category = "Cinturones",
                RestaurantId = 5,
                PreparationTime = 0
            },
            new FoodItem
            {
                Id = 25,
                Name = "Bufanda de Punto",
                Description = "Bufanda de punto suave y cálida, disponible en tonos lisos de temporada",
                Price = 19.99m,
                ImageUrl = "",
                Category = "Complementos",
                RestaurantId = 5,
                PreparationTime = 0
            },
            new FoodItem
            {
                Id = 26,
                Name = "Gafas de Sol",
                Description = "Gafas de sol con protección UV400 y montura ligera de estilo retro",
                Price = 29.99m,
                ImageUrl = "",
                Category = "Complementos",
                RestaurantId = 5,
                PreparationTime = 0
            },
            new FoodItem
            {
                Id = 27,
                Name = "Gorro de Lana",
                Description = "Gorro de punto de lana con vuelta, cálido y suave. Talla única",
                Price = 15.99m,
                ImageUrl = "",
                Category = "Complementos",
                RestaurantId = 5,
                PreparationTime = 0
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
