<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Coverfy Insurance Portal

This is a modern insurance portal (Spanish UI) with a React TypeScript frontend and .NET backend, designed for deployment to Azure Container Apps. It is used for **Azure SRE Agent** demos.

> Rebranded from a food-delivery scaffold ("Grubify") to Coverfy. The user-facing
> brand, texts and catalog are insurance; **internal C# class names, model properties
> and API routes are intentionally unchanged** (e.g. `Restaurant`, `FoodItem`,
> `/api/restaurants`, `/api/fooditems`) so the frontend↔API contract and telemetry
> stay stable. Change only displayed values and frontend visuals — never rename
> classes, model properties or routes.

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

## API Endpoints (names unchanged from the original scaffold)
- `/api/restaurants` - Insurance lines (families) management
- `/api/fooditems` - Insurance policies management
- `/api/cart` - Selected-policies (application basket) operations
- `/api/orders` - Application / contracting management

## UI Components
- Modern, responsive design for a trustworthy online insurance experience
- Card-based layouts for insurance lines and policies (themed MUI icons, no photos)
- Step-by-step contracting (checkout) process
- Application status tracking

When working on this project, prioritize user experience, maintain clean code architecture, and ensure proper error handling throughout the application.
