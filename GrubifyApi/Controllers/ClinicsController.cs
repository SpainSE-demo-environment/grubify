using Microsoft.AspNetCore.Mvc;
using GrubifyApi.Models;

namespace GrubifyApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClinicsController : ControllerBase
    {
        private static readonly List<Clinic> Clinics = new()
        {
            new Clinic
            {
                Id = 1,
                Name = "Centro Médico Norte",
                Description = "Atención primaria y especialidades con equipo multidisciplinar y trato cercano",
                ImageUrl = "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop",
                SpecialtyType = "Medicina General",
                Rating = 4.8,
                NextAvailable = "Hoy 16:30",
                ConsultationFee = 30.00m,
                IsOpen = true,
                Address = "Av. de la Salud 12, Madrid"
            },
            new Clinic
            {
                Id = 2,
                Name = "Clínica Salud Integral",
                Description = "Diagnóstico y tratamiento integral con tecnología de última generación",
                ImageUrl = "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&h=600&fit=crop",
                SpecialtyType = "Diagnóstico",
                Rating = 4.7,
                NextAvailable = "Mañana 09:15",
                ConsultationFee = 45.00m,
                IsOpen = true,
                Address = "Calle Mayor 88, Barcelona"
            },
            new Clinic
            {
                Id = 3,
                Name = "Centro de Diagnóstico Sur",
                Description = "Pruebas de imagen y análisis clínicos con resultados rápidos",
                ImageUrl = "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=800&h=600&fit=crop",
                SpecialtyType = "Radiología",
                Rating = 4.6,
                NextAvailable = "Hoy 18:00",
                ConsultationFee = 55.00m,
                IsOpen = true,
                Address = "Paseo del Prado 3, Valencia"
            },
            new Clinic
            {
                Id = 4,
                Name = "Clínica del Bienestar",
                Description = "Fisioterapia, rehabilitación y cuidado del deporte para tu recuperación",
                ImageUrl = "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop",
                SpecialtyType = "Fisioterapia",
                Rating = 4.5,
                NextAvailable = "Mañana 11:45",
                ConsultationFee = 40.00m,
                IsOpen = true,
                Address = "Ronda de Poniente 21, Sevilla"
            },
            new Clinic
            {
                Id = 5,
                Name = "Centro Pediátrico Los Olivos",
                Description = "Atención especializada en pediatría y salud infantil",
                ImageUrl = "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&h=600&fit=crop",
                SpecialtyType = "Pediatría",
                Rating = 4.9,
                NextAvailable = "Hoy 17:15",
                ConsultationFee = 35.00m,
                IsOpen = true,
                Address = "Calle Olivos 45, Málaga"
            },
            new Clinic
            {
                Id = 6,
                Name = "Instituto Dermatológico Central",
                Description = "Dermatología clínica y estética con especialistas colegiados",
                ImageUrl = "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=800&h=600&fit=crop",
                SpecialtyType = "Dermatología",
                Rating = 4.4,
                NextAvailable = "Mañana 10:30",
                ConsultationFee = 50.00m,
                IsOpen = true,
                Address = "Gran Vía 100, Bilbao"
            }
        };

        [HttpGet]
        public ActionResult<IEnumerable<Clinic>> GetClinics()
        {
            return Ok(Clinics);
        }

        [HttpGet("{id}")]
        public ActionResult<Clinic> GetClinic(int id)
        {
            var clinic = Clinics.FirstOrDefault(c => c.Id == id);
            if (clinic == null)
            {
                return NotFound();
            }
            return Ok(clinic);
        }

        [HttpGet("specialty/{specialtyType}")]
        public ActionResult<IEnumerable<Clinic>> GetClinicsBySpecialty(string specialtyType)
        {
            var clinics = Clinics.Where(c =>
                c.SpecialtyType.Equals(specialtyType, StringComparison.OrdinalIgnoreCase)).ToList();
            return Ok(clinics);
        }

        [HttpGet("search")]
        public ActionResult<IEnumerable<Clinic>> SearchClinics([FromQuery] string query)
        {
            if (string.IsNullOrEmpty(query))
            {
                return Ok(Clinics);
            }

            var clinics = Clinics.Where(c =>
                c.Name.Contains(query, StringComparison.OrdinalIgnoreCase) ||
                c.SpecialtyType.Contains(query, StringComparison.OrdinalIgnoreCase) ||
                c.Description.Contains(query, StringComparison.OrdinalIgnoreCase)).ToList();

            return Ok(clinics);
        }
    }
}
