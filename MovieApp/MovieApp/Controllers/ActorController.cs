using Microsoft.AspNetCore.Mvc;
using MovieApp.Helpers;
using MovieApp.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieApp.Controllers
{
    [Route("[controller]/[action]")]
    public class ActorController : Controller
    {
        private IPersonHelper _personHelper;

        public ActorController(IPersonHelper personHelper)
        {
            _personHelper = personHelper;
        }

        [HttpGet()]
        public IActionResult GetAllActors()
        {
            return Ok(_personHelper.GetAllActors());
        }

        [HttpGet()]
        public IActionResult GetActor([FromQuery] Guid actorId)
        {
            if (actorId == null)
            {
                return BadRequest(new { message = "Please check input."});
            }

            var actor = _personHelper.GetActor(actorId);

            if (actor != null)
            {
                return Ok(actor);
            }
            else
            {
                return NotFound(new { message = ErrorMessages.ACTOR_NOT_FOUND });
            }
        }

        [HttpPost()]
        public IActionResult AddActor([FromBody]ActorDto actor)
        {
            if(actor == null)
            {
                return BadRequest(new { message = "Please check input." });
            }
            var result = _personHelper.AddActor(actor);

            if (Guid.TryParse(result, out Guid Id))
            {
                return Ok(Id);
            }
            else if (result.Equals(ErrorMessages.ACTOR_ALREADY_EXISTS) ||
               result.Equals(ErrorMessages.NAME_EMPTY) ||
               result.Equals(ErrorMessages.SEX_INVALID) ||
               result.Equals(ErrorMessages.SEX_EMPTY) ||
               result.Equals(ErrorMessages.BIO_EMPTY) ||
               result.Equals(ErrorMessages.DOB_EMPTY) ||
               result.Equals(ErrorMessages.DOB_INVALID) ||
               result.Equals(ErrorMessages.DOB_LIMIT))
            {
                return BadRequest(new { message = result });
            }
            else
            {
                return StatusCode(500, new { message = result });
            }
        }

        [HttpPost()]
        public IActionResult EditActor([FromBody] ActorDto actor)
        {
            if (actor == null)
            {
                return BadRequest(new { message = "Please check input." });
            }

            var result = _personHelper.EditActor(actor);

            if (Guid.TryParse(result, out Guid Id))
            {
                return Ok(Id);
            }
            else if (result.Equals(ErrorMessages.ACTOR_NOT_FOUND) ||
               result.Equals(ErrorMessages.NAME_EMPTY) ||
               result.Equals(ErrorMessages.SEX_INVALID) ||
               result.Equals(ErrorMessages.BIO_EMPTY) ||
               result.Equals(ErrorMessages.DOB_INVALID) ||
               result.Equals(ErrorMessages.DOB_LIMIT))
            {
                return BadRequest(new { message = result });
            }
            else
            {
                return StatusCode(500, new { message = result });
            }
        }

        [HttpDelete()]
        public IActionResult DeleteActor([FromBody] Guid actorId)
        {
            if (actorId == Guid.Empty)
            {
                return BadRequest(new { message = "Please check input." });
            }

            var result = _personHelper.DeleteActor(actorId);

            if (result.Equals(String.Empty))
            {
                return Ok(new { message = "Actor deleted." });
            }
            else if (result.Equals(ErrorMessages.ACTOR_NOT_FOUND) ||
                result.Equals(ErrorMessages.ACTOR_MAPPED))
            {
                return BadRequest(new { message = result });
            }
            else
            {
                return StatusCode(500, new { message = result });
            }
        }
    }
}
