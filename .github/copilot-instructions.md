<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Clinify - Medical Appointment Booking App

This is a modern medical appointment booking application with a React TypeScript frontend and .NET backend, designed for deployment to Azure Container Apps.

> Note: deployment identifiers (assembly `GrubifyApi`, folders, Docker images `grubify-*`) intentionally remain `grubify`; only the product domain and UI are rebranded to Clinify.

## Tech Stack
- **Frontend**: React 18 with TypeScript, Material-UI, React Router
- **Backend**: .NET 9 Web API with Controllers
- **Deployment**: Azure Container Apps
- **Infrastructure**: Bicep templates

## Architecture
- Clean separation between frontend and backend
- RESTful API design
- Responsive Material-UI components
- Azure Container Apps for scalable hosting

## Development Guidelines
- Use TypeScript strict mode
- Follow Material-UI design patterns
- Implement proper error handling
- Use async/await for API calls
- Follow RESTful conventions for API endpoints

## API Endpoints
- `/api/clinics` - Clinic management
- `/api/services` - Medical service/specialty management
- `/api/appointmentcart` - Appointment cart operations
- `/api/appointments` - Appointment management

## UI Components
- Modern, responsive design with a clean clinical (teal/blue) aesthetic
- Card-based layouts for clinics and medical services
- Step-by-step booking process
- Real-time appointment tracking

When working on this project, prioritize user experience, maintain clean code architecture, and ensure proper error handling throughout the application.
