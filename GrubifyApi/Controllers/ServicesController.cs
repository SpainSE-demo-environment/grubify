using Microsoft.AspNetCore.Mvc;
using GrubifyApi.Models;

namespace GrubifyApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ServicesController : ControllerBase
    {
        private static readonly List<Service> Services = new()
        {
            // Centro Médico Norte (clínica 1)
            new Service
            {
                Id = 1,
                Name = "Revisión general",
                Description = "Consulta completa de medicina general con revisión de constantes",
                Price = 30.00m,
                ImageUrl = "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop",
                Specialty = "Medicina General",
                ClinicId = 1,
                DurationMinutes = 30
            },
            new Service
            {
                Id = 2,
                Name = "Consulta de seguimiento",
                Description = "Revisión de evolución y ajuste de tratamiento",
                Price = 25.00m,
                ImageUrl = "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=300&fit=crop",
                Specialty = "Medicina General",
                ClinicId = 1,
                DurationMinutes = 20
            },
            new Service
            {
                Id = 3,
                Name = "Electrocardiograma",
                Description = "Registro de la actividad eléctrica del corazón en reposo",
                Price = 40.00m,
                ImageUrl = "https://images.unsplash.com/photo-1628348070889-cb656235b4eb?w=400&h=300&fit=crop",
                Specialty = "Cardiología",
                ClinicId = 1,
                DurationMinutes = 25
            },

            // Clínica Salud Integral (clínica 2)
            new Service
            {
                Id = 4,
                Name = "Análisis de sangre",
                Description = "Extracción y analítica completa con hemograma y bioquímica",
                Price = 20.00m,
                ImageUrl = "https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=400&h=300&fit=crop",
                Specialty = "Análisis Clínicos",
                ClinicId = 2,
                DurationMinutes = 15
            },
            new Service
            {
                Id = 5,
                Name = "Consulta de Cardiología",
                Description = "Valoración cardiológica con especialista",
                Price = 60.00m,
                ImageUrl = "https://images.unsplash.com/photo-1618498082410-b4aa22193b38?w=400&h=300&fit=crop",
                Specialty = "Cardiología",
                ClinicId = 2,
                DurationMinutes = 30
            },
            new Service
            {
                Id = 6,
                Name = "Ecografía abdominal",
                Description = "Prueba de imagen por ultrasonidos del abdomen",
                Price = 55.00m,
                ImageUrl = "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=400&h=300&fit=crop",
                Specialty = "Radiología",
                ClinicId = 2,
                DurationMinutes = 30
            },

            // Centro de Diagnóstico Sur (clínica 3)
            new Service
            {
                Id = 7,
                Name = "Radiografía",
                Description = "Radiografía simple con informe del radiólogo",
                Price = 45.00m,
                ImageUrl = "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400&h=300&fit=crop",
                Specialty = "Radiología",
                ClinicId = 3,
                DurationMinutes = 20
            },
            new Service
            {
                Id = 8,
                Name = "Resonancia magnética",
                Description = "Estudio de imagen de alta resolución sin radiación",
                Price = 120.00m,
                ImageUrl = "https://images.unsplash.com/photo-1583911860205-72f8ac8ddcbe?w=400&h=300&fit=crop",
                Specialty = "Radiología",
                ClinicId = 3,
                DurationMinutes = 45
            },
            new Service
            {
                Id = 9,
                Name = "Análisis de orina",
                Description = "Análisis de orina con sedimento y urocultivo",
                Price = 15.00m,
                ImageUrl = "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop",
                Specialty = "Análisis Clínicos",
                ClinicId = 3,
                DurationMinutes = 10
            },

            // Clínica del Bienestar (clínica 4)
            new Service
            {
                Id = 10,
                Name = "Sesión de fisioterapia",
                Description = "Tratamiento fisioterápico individualizado",
                Price = 40.00m,
                ImageUrl = "https://images.unsplash.com/photo-1519824145371-296894a0daa9?w=400&h=300&fit=crop",
                Specialty = "Fisioterapia",
                ClinicId = 4,
                DurationMinutes = 45
            },
            new Service
            {
                Id = 11,
                Name = "Rehabilitación deportiva",
                Description = "Recuperación funcional tras lesión deportiva",
                Price = 50.00m,
                ImageUrl = "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop",
                Specialty = "Fisioterapia",
                ClinicId = 4,
                DurationMinutes = 60
            },

            // Centro Pediátrico Los Olivos (clínica 5)
            new Service
            {
                Id = 12,
                Name = "Consulta de Pediatría",
                Description = "Consulta con pediatra para valoración del menor",
                Price = 35.00m,
                ImageUrl = "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=300&fit=crop",
                Specialty = "Pediatría",
                ClinicId = 5,
                DurationMinutes = 30
            },
            new Service
            {
                Id = 13,
                Name = "Revisión del niño sano",
                Description = "Control de crecimiento y desarrollo del menor",
                Price = 30.00m,
                ImageUrl = "https://images.unsplash.com/photo-1632053002928-1919a06e3d20?w=400&h=300&fit=crop",
                Specialty = "Pediatría",
                ClinicId = 5,
                DurationMinutes = 25
            },
            new Service
            {
                Id = 14,
                Name = "Vacunación infantil",
                Description = "Administración de vacunas del calendario infantil",
                Price = 20.00m,
                ImageUrl = "https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&h=300&fit=crop",
                Specialty = "Pediatría",
                ClinicId = 5,
                DurationMinutes = 15
            },

            // Instituto Dermatológico Central (clínica 6)
            new Service
            {
                Id = 15,
                Name = "Consulta de Dermatología",
                Description = "Valoración de la piel con dermatólogo especialista",
                Price = 50.00m,
                ImageUrl = "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=300&fit=crop",
                Specialty = "Dermatología",
                ClinicId = 6,
                DurationMinutes = 30
            },
            new Service
            {
                Id = 16,
                Name = "Revisión de lunares",
                Description = "Mapeo y control dermatoscópico de lunares",
                Price = 45.00m,
                ImageUrl = "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400&h=300&fit=crop",
                Specialty = "Dermatología",
                ClinicId = 6,
                DurationMinutes = 20
            }
        };

        [HttpGet]
        public ActionResult<IEnumerable<Service>> GetServices()
        {
            return Ok(Services);
        }

        [HttpGet("{id}")]
        public ActionResult<Service> GetService(int id)
        {
            var service = Services.FirstOrDefault(s => s.Id == id);
            if (service == null)
            {
                return NotFound();
            }
            return Ok(service);
        }

        [HttpGet("clinic/{clinicId}")]
        public ActionResult<IEnumerable<Service>> GetServicesByClinic(int clinicId)
        {
            var items = Services.Where(s => s.ClinicId == clinicId).ToList();
            return Ok(items);
        }

        [HttpGet("specialty/{specialty}")]
        public ActionResult<IEnumerable<Service>> GetServicesBySpecialty(string specialty)
        {
            var items = Services.Where(s =>
                s.Specialty.Equals(specialty, StringComparison.OrdinalIgnoreCase)).ToList();
            return Ok(items);
        }

        [HttpGet("search")]
        public ActionResult<IEnumerable<Service>> SearchServices([FromQuery] string query)
        {
            if (string.IsNullOrEmpty(query))
            {
                return Ok(Services);
            }

            var items = Services.Where(s =>
                s.Name.Contains(query, StringComparison.OrdinalIgnoreCase) ||
                s.Description.Contains(query, StringComparison.OrdinalIgnoreCase) ||
                s.Specialty.Contains(query, StringComparison.OrdinalIgnoreCase)).ToList();

            return Ok(items);
        }
    }
}
