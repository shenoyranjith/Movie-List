using Microsoft.AspNetCore.Mvc;
using MovieApp.Helpers;
using MovieApp.Model;
using MovieApp.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieApp.Controllers
{
    [Route("[controller]/[action]")]
    public class MovieController : Controller
    {
        private IMovieHelper _movieHelper;

        public MovieController(IMovieHelper movieHelper)
        {
            _movieHelper = movieHelper;
        }

        [HttpGet]
        public IActionResult GetAllMovies()
        {
            return Ok(_movieHelper.GetAllMovies());
        }

        [HttpGet]
        public IActionResult GetMovie([FromQuery] Guid movieId)
        {
            var movie = _movieHelper.GetMovie(movieId);

            if (movie != null)
            {
                return Ok(movie);
            }
            else
            {
                return NotFound(new { message = ErrorMessages.MOVIE_DOES_NOT_EXISTS });
            }
        }

        [HttpPost]
        public IActionResult AddMovie([FromBody] MovieDto movie)
        {
            if (movie == null)
            {
                return BadRequest(new { message = "Please check input." });
            }
            var result = _movieHelper.AddMovie(movie);

            if (Guid.TryParse(result, out Guid Id))
            {
                return Ok(Id);
            }
            else if (result.Equals(ErrorMessages.MOVIE_ALREADY_EXISTS) ||
               result.Equals(ErrorMessages.MOVIE_NAME_EMPTY) ||
               result.Equals(ErrorMessages.MOVIE_YEAR_OF_RELEASE_SHOULD_BE_FROM_1900_2050) ||
               result.Equals(ErrorMessages.MOVIE_POSTER_INVALID_URL) ||
               result.Equals(ErrorMessages.PRODUCER_NOT_FOUND) ||
               result.Equals(ErrorMessages.ACTOR_NOT_FOUND))
            {
                return BadRequest(new { message = result });
            }
            else
            {
                return StatusCode(500, new { message = result });
            }
        }

        [HttpPost]
        public IActionResult EditMovie([FromBody] CompleteMovieDto movie)
        {
            if (movie == null)
            {
                return BadRequest(new { message = "Please check input." });
            }
            var result = _movieHelper.EditMovie(movie);

            if (Guid.TryParse(result, out Guid Id))
            {
                return Ok(Id);
            }

            else if (result.Equals(ErrorMessages.MOVIE_DOES_NOT_EXISTS) ||
               result.Equals(ErrorMessages.MOVIE_NAME_EMPTY) ||
               result.Equals(ErrorMessages.MOVIE_YEAR_OF_RELEASE_SHOULD_BE_FROM_1900_2050) ||
               result.Equals(ErrorMessages.MOVIE_POSTER_INVALID_URL) ||
               result.Equals(ErrorMessages.PRODUCER_NOT_FOUND) ||
               result.Equals(ErrorMessages.ACTOR_NOT_FOUND))
            {
                return BadRequest(new { message = result });
            }
            else
            {
                return StatusCode(500, new { message = result });
            }
        }

        [HttpDelete]
        public IActionResult DeleteMovie([FromBody] Guid movieId)
        {
            if (movieId == Guid.Empty)
            {
                return BadRequest(new { message = "Please check input." });
            }
            var result = _movieHelper.DeleteMovie(movieId);

            if (result.Equals(String.Empty))
            {
                return Ok();
            }
            else if (result.Equals(ErrorMessages.MOVIE_DOES_NOT_EXISTS))
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
