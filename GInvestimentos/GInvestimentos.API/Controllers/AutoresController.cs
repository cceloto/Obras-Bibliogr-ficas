using GInvestimentos.API.DbContexts;
using GInvestimentos.API.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GInvestimentos.API.Controllers
{
    [Route("/[controller]")]
    public class AutoresController : Controller
    {
        private readonly GInvDbContext _db;

        public AutoresController(GInvDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public ActionResult<List<Autores>> GetAutores()
        {
            return _db.Autores.OrderBy(x => x.IdAutores).ToList();
        }

        [HttpPost]
        public ActionResult PostAutores([FromBody]Autores[] autores)
        {
            foreach (var autor in autores)
            {
                if (autor.Nome == "" || autor.Nome == null)
                {
                    return BadRequest("Existem autores sem nome.");
                }

                _db.Autores.Add(autor);
            }

            _db.SaveChanges();
            return Ok("Autores inseridos com sucesso.");
        }
    }
}
