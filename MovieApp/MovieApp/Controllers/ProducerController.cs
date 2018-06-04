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
    public class ProducerController : Controller
    {
        private IPersonHelper _personHelper;

        public ProducerController(IPersonHelper personHelper)
        {
            _personHelper = personHelper;
        }

        [HttpGet]
        public IActionResult GetAllProducers()
        {
            return Ok(_personHelper.GetAllProducers());
        }

        [HttpGet]
        public IActionResult GetProducer([FromQuery] Guid ProducerId)
        {
            if (ProducerId == null)
            {
                return BadRequest();
            }

            var Producer = _personHelper.GetProducer(ProducerId);

            if (Producer != null)
            {
                return Ok(Producer);
            }
            else
            {
                return NotFound(new { message = ErrorMessages.PRODUCER_NOT_FOUND });
            }
        }

        [HttpPost]
        public IActionResult AddProducer([FromBody] ProducerDto Producer)
        {
            if (Producer == null)
            {
                return BadRequest(new { message = "Please check input." });
            }

            var result = _personHelper.AddProducer(Producer);

            if (Guid.TryParse(result, out Guid Id))
            {
                return Ok(Id);
            }
            else if (result.Equals(ErrorMessages.PRODUCER_ALREADY_EXISTS) ||
               result.Equals(ErrorMessages.NAME_EMPTY) ||
               result.Equals(ErrorMessages.SEX_INVALID) ||
               result.Equals(ErrorMessages.SEX_EMPTY) ||
               result.Equals(ErrorMessages.BIO_EMPTY) ||
               result.Equals(ErrorMessages.DOB_EMPTY) ||
               result.Equals(ErrorMessages.DOB_LIMIT))
            {
                return BadRequest(new { message = result });
            }
            else
            {
                return StatusCode(500, new { message = result });
            }
        }

        [HttpPost]
        public IActionResult EditProducer([FromBody] ProducerDto Producer)
        {
            if (Producer == null)
            {
                return BadRequest(new { message = "Please check input." });
            }

            var result = _personHelper.AddProducer(Producer);

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

        [HttpDelete]
        public IActionResult DeleteProducer([FromBody] Guid ProducerId)
        {
            if (ProducerId == Guid.Empty)
            {
                return BadRequest(new { message = "Please check input." });
            }

            var result = _personHelper.DeleteProducer(ProducerId);

            if (result.Equals(String.Empty))
            {
                return Ok(new { message = "Producer deleted." });
            }
            else if (result.Equals(ErrorMessages.PRODUCER_NOT_FOUND) ||
                result.Equals(ErrorMessages.PRODUCER_MAPPED))
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
