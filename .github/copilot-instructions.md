<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Grubify Food Delivery Portal

This is a modern food-delivery portal (Spanish UI) with a React TypeScript frontend and .NET backend, designed for deployment to Azure Container Apps. It is used for **Azure SRE Agent** demos.

> This vertical keeps the ORIGINAL food-delivery brand ("Grubify"). The user-facing
> brand, texts and catalog are food (restaurants, dishes, warm theme, "Crear pedido"),
> while it retains all the newer functionality and integration wiring from `main`.
> **Internal C# class names, model properties and API routes are food-native and
> unchanged** (e.g. `Restaurant`, `FoodItem`, `/api/restaurants`, `/api/fooditems`)
> so the frontend↔API contract and telemetry stay stable. Change only displayed
> values and frontend visuals — never rename classes, model properties or routes.

## Demo faults (do NOT "fix" these)
- **Memory leak** in `CartController` (`static List<byte[]> RequestDataCache`,
  `new byte[10 * 1024 * 1024]` per `AddItemToCart`, plus its `Console.WriteLine`
  logs). This is the central demo failure (OutOfMemoryException / HTTP 5xx). Keep it
  byte-for-byte intact.
- **Payment failure (v2)** logic in `OrdersController`. Also intentional.

## Tech Stack
- **Frontend**: React 18 with TypeScript, Material-UI, React Router
- **Backend**: .NET 9 Web API with Controllers
- **Deployment**: Azure Container Apps (built with `az acr build`)
- **Infrastructure**: Bicep templates

## Architecture
- Clean separation between frontend and backend
- RESTful API design
- Responsive Material-UI components
- Azure Container Apps for scalable hosting on the ACA spoke (see `docs/INTEGRATION.md`)

## Development Guidelines
- Use TypeScript strict mode
- Follow Material-UI design patterns
- Implement proper error handling
- Use async/await for API calls
- Follow RESTful conventions for API endpoints
- Keep user-facing text in Spanish

## API Endpoints
- `/api/restaurants` - Restaurants management
- `/api/fooditems` - Food items / menu management
- `/api/cart` - Cart operations
- `/api/orders` - Order management

## UI Components
- Modern, responsive design for an appetizing food-delivery experience
- Card-based layouts for restaurants and dishes (themed MUI icons, no photos)
- Step-by-step checkout ("Crear pedido") process
- Order status tracking

When working on this project, prioritize user experience, maintain clean code architecture, and ensure proper error handling throughout the application.
