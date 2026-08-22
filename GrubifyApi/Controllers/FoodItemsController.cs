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
                Name = "Pantalón Pitillo",
                Description = "Pantalón pitillo de tiro medio en tejido elástico con corte ajustado. Tallas 34-46",
                Price = 35.99m,
                ImageUrl = "",
                Category = "Pantalones",
                RestaurantId = 1,
                PreparationTime = 0
            },
            new FoodItem
            {
                Id = 6,
                Name = "Traje Tres Piezas",
                Description = "Traje de tres piezas de corte entallado con americana, chaleco y pantalón a juego. Tallas 46-56",
                Price = 149.99m,
                ImageUrl = "",
                Category = "Chaquetas",
                RestaurantId = 2,
                PreparationTime = 0
            },

            // ===== Hombre (RestaurantId 2) =====
            new FoodItem
            {
                Id = 7,
                Name = "Camisa Popelín Mujer",
                Description = "Camisa de popelín de algodón con corte fluido, ideal para diario u oficina. Tallas XS-XL",
                Price = 29.99m,
                ImageUrl = "",
                Category = "Camisas y Blusas",
                RestaurantId = 1,
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
                Name = "Chaqueta de Cuero",
                Description = "Chaqueta de cuero de corte entallado con cremallera y solapas. Tallas XS-XL",
                Price = 89.99m,
                ImageUrl = "",
                Category = "Chaquetas",
                RestaurantId = 1,
                PreparationTime = 0
            },
            new FoodItem
            {
                Id = 11,
                Name = "Camiseta Blanca",
                Description = "Camiseta blanca de algodón de cuello redondo, básico esencial de fondo de armario. Tallas S-XXL",
                Price = 14.99m,
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
                Name = "Chaqueta de Punto Niño",
                Description = "Chaqueta de punto para niño con botones y cuello redondo, cálida y suave. Tallas 3-14 años",
                Price = 19.99m,
                ImageUrl = "",
                Category = "Chaquetas",
                RestaurantId = 3,
                PreparationTime = 0
            },
            new FoodItem
            {
                Id = 14,
                Name = "Conjunto Dos Piezas Niña",
                Description = "Conjunto de dos piezas para niña con top y falda a juego. Tallas 3-12 años",
                Price = 24.99m,
                ImageUrl = "",
                Category = "Vestidos",
                RestaurantId = 3,
                PreparationTime = 0
            },
            new FoodItem
            {
                Id = 15,
                Name = "Vestido de Lunares Niña",
                Description = "Vestido de algodón con estampado de lunares y lazo trasero. Tallas 3-12 años",
                Price = 24.99m,
                ImageUrl = "",
                Category = "Vestidos",
                RestaurantId = 3,
                PreparationTime = 0
            },
            new FoodItem
            {
                Id = 16,
                Name = "Abrigo con Capucha Kids",
                Description = "Abrigo con capucha acolchado y cálido para el día a día. Tallas 3-14 años",
                Price = 34.99m,
                ImageUrl = "",
                Category = "Abrigos",
                RestaurantId = 3,
                PreparationTime = 0
            },
            new FoodItem
            {
                Id = 17,
                Name = "Camiseta Blanca Niño",
                Description = "Camiseta blanca de algodón de cuello redondo, resistente a los lavados. Tallas 3-14 años",
                Price = 9.99m,
                ImageUrl = "",
                Category = "Camisetas",
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
                Name = "Zapato de Tacón",
                Description = "Zapato de tacón medio con puntera fina, elegante y versátil. Tallas 35-41",
                Price = 45.99m,
                ImageUrl = "",
                Category = "Tacón",
                RestaurantId = 4,
                PreparationTime = 0
            },
            new FoodItem
            {
                Id = 21,
                Name = "Zapato de Tacón Estampado",
                Description = "Zapato de tacón con estampado de temporada y puntera redonda. Tallas 35-41",
                Price = 49.99m,
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
                Name = "Bolso de Piel Rojo",
                Description = "Bolso de piel en color rojo con asas, acabado premium e interior forrado",
                Price = 59.99m,
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
                Name = "Camiseta Manga Larga Hombre",
                Description = "Camiseta de manga larga de algodón para hombre, tacto suave y corte regular. Tallas S-XXL",
                Price = 16.99m,
                ImageUrl = "",
                Category = "Camisetas",
                RestaurantId = 2,
                PreparationTime = 0
            },

            // ===== Ampliación de catálogo =====
            // ----- Mujer (RestaurantId 1) -----
            new FoodItem
            {
                Id = 28,
                Name = "Camiseta Estampada Mujer",
                Description = "Camiseta de mujer con estampado original en algodón de tacto suave y corte relajado. Tallas XS-XL",
                Price = 19.99m,
                ImageUrl = "",
                Category = "Camisetas",
                RestaurantId = 1,
                PreparationTime = 0
            },
            new FoodItem
            {
                Id = 30,
                Name = "Abrigo Largo",
                Description = "Abrigo largo de corte recto con solapa clásica, cálido y elegante. Tallas S-XL",
                Price = 99.99m,
                ImageUrl = "",
                Category = "Abrigos",
                RestaurantId = 1,
                PreparationTime = 0
            },
            new FoodItem
            {
                Id = 31,
                Name = "Blusa Estampada",
                Description = "Blusa de tejido fluido con estampado all-over y manga larga. Tallas XS-XL",
                Price = 27.99m,
                ImageUrl = "",
                Category = "Camisas y Blusas",
                RestaurantId = 1,
                PreparationTime = 0
            },

            // ----- Hombre (RestaurantId 2) -----
            new FoodItem
            {
                Id = 32,
                Name = "Camiseta Básica Hombre",
                Description = "Camiseta básica de algodón orgánico con cuello redondo, suave y resistente. Tallas S-XXL",
                Price = 12.99m,
                ImageUrl = "",
                Category = "Camisetas",
                RestaurantId = 2,
                PreparationTime = 0
            },
            new FoodItem
            {
                Id = 33,
                Name = "Poncho",
                Description = "Poncho de punto amplio con flecos, cálido y envolvente. Talla única",
                Price = 49.99m,
                ImageUrl = "",
                Category = "Chaquetas",
                RestaurantId = 1,
                PreparationTime = 0
            },
            new FoodItem
            {
                Id = 34,
                Name = "Cazadora de Piel",
                Description = "Cazadora de piel de corte entallado con cierre de cremallera. Tallas XS-XL",
                Price = 119.99m,
                ImageUrl = "",
                Category = "Chaquetas",
                RestaurantId = 1,
                PreparationTime = 0
            },
            new FoodItem
            {
                Id = 35,
                Name = "Cazadora Vaquera",
                Description = "Cazadora vaquera de denim rígido con botones metálicos y bolsillos de pecho. Tallas S-XL",
                Price = 49.99m,
                ImageUrl = "",
                Category = "Chaquetas",
                RestaurantId = 2,
                PreparationTime = 0
            },

            // ----- Calzado (RestaurantId 4) -----
            new FoodItem
            {
                Id = 36,
                Name = "Deportiva Multicolor",
                Description = "Zapatilla deportiva multicolor con suela de goma y estilo urbano. Tallas 36-46",
                Price = 54.99m,
                ImageUrl = "",
                Category = "Deportivo",
                RestaurantId = 4,
                PreparationTime = 0
            },
            new FoodItem
            {
                Id = 37,
                Name = "Cazadora de Piel Hombre",
                Description = "Cazadora de piel de corte clásico con cierre de cremallera y forro interior. Tallas S-XXL",
                Price = 139.99m,
                ImageUrl = "",
                Category = "Chaquetas",
                RestaurantId = 2,
                PreparationTime = 0
            },

            // ----- Accesorios (RestaurantId 5) -----
            new FoodItem
            {
                Id = 38,
                Name = "Reloj Analógico",
                Description = "Reloj analógico con caja de acero inoxidable y resistencia al agua 3ATM. Correa intercambiable",
                Price = 59.99m,
                ImageUrl = "",
                Category = "Complementos",
                RestaurantId = 5,
                PreparationTime = 0
            },
            new FoodItem
            {
                Id = 39,
                Name = "Cartera de Piel",
                Description = "Cartera de piel auténtica con 8 ranuras para tarjetas y compartimento para billetes",
                Price = 29.99m,
                ImageUrl = "",
                Category = "Complementos",
                RestaurantId = 5,
                PreparationTime = 0
            },
            new FoodItem
            {
                Id = 40,
                Name = "Mochila Urbana",
                Description = "Mochila urbana de 20 L con bolsillo acolchado para portátil y cierre de cremallera. Varios colores",
                Price = 44.99m,
                ImageUrl = "",
                Category = "Bolsos",
                RestaurantId = 5,
                PreparationTime = 0
            },
            new FoodItem
            {
                Id = 41,
                Name = "Gorra Gris",
                Description = "Gorra gris de algodón con visera curvada y cierre ajustable trasero. Talla única",
                Price = 16.99m,
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
