using MovieApp.Entity;
using MovieApp.Model;
using MovieApp.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieApp.Helpers
{
    public class MovieHelper : IMovieHelper
    {

        private IMovieAppRepository _movieAppRepository;

        public MovieHelper(IMovieAppRepository movieAppRepository)
        {
            _movieAppRepository = movieAppRepository;
        }

        public List<CompleteMovieDto> GetAllMovies()
        {
            var allMovies = _movieAppRepository.GetAllMovies();

            List<CompleteMovieDto> completeMovies = new List<CompleteMovieDto>();

            foreach(Movie movie in allMovies)
            {
                var eachMovie = AutoMapper.Mapper.Map<CompleteMovieDto>(movie);
                eachMovie.ProducerId = _movieAppRepository.GetMovieProducer(eachMovie.Name,eachMovie.YearOfRelease).Id;
                var actors = _movieAppRepository.GetActorsInMovie(eachMovie.Name, eachMovie.YearOfRelease);
                List<Guid> actorIds = new List<Guid>();
                foreach (Actor actor in actors)
                {
                    actorIds.Add(actor.Id);
                }
                eachMovie.Actors = actorIds;
                completeMovies.Add(eachMovie);
            }

            return completeMovies;
        }

        public CompleteMovieDto GetMovie(Guid movieId)
        {
            var movie = _movieAppRepository.GetMovie(movieId);
            var completeMovie = AutoMapper.Mapper.Map<CompleteMovieDto>(movie);
            completeMovie.ProducerId = _movieAppRepository.GetMovieProducer(completeMovie.Name, completeMovie.YearOfRelease).Id;
            var actors = _movieAppRepository.GetActorsInMovie(completeMovie.Name, completeMovie.YearOfRelease);
            List<Guid> actorIds = new List<Guid>();
            foreach (Actor actor in actors)
            {
                actorIds.Add(actor.Id);
            }
            completeMovie.Actors = actorIds;

            return completeMovie;
        }

        public string AddMovie(MovieDto movie)
        {
            var checkExists = _movieAppRepository.GetMovie(movie.Name, movie.YearOfRelease);
            if (checkExists != null)
            {
                return ErrorMessages.MOVIE_ALREADY_EXISTS;
            }
            else
            {
                if(!Utils.IsStringValid(movie.Name))
                {
                    return ErrorMessages.MOVIE_NAME_EMPTY;
                }

                if (movie.YearOfRelease < 1900 || movie.YearOfRelease > 2050)
                {
                    return ErrorMessages.MOVIE_YEAR_OF_RELEASE_SHOULD_BE_FROM_1900_2050;
                }

                if (!Utils.IsStringValid(movie.Plot))
                {
                    return ErrorMessages.MOVIE_PLOT_EMPTY;
                }

                if (!Utils.IsURLValid(movie.PosterURL))
                {
                    return ErrorMessages.MOVIE_POSTER_INVALID_URL;
                }

                if(movie.ProducerId == null)
                {
                    return ErrorMessages.PRODUCER_NOT_FOUND;
                }

                var producer = _movieAppRepository.GetProducer(movie.ProducerId);
                if(producer == null)
                {
                    return ErrorMessages.PRODUCER_NOT_FOUND;
                }

                if(movie.Actors == null || movie.Actors.Count == 0)
                {
                    return ErrorMessages.ACTOR_NOT_FOUND;
                }

                foreach(Guid actorId in movie.Actors)
                {
                    if(_movieAppRepository.GetActor(actorId) == null)
                    {
                        return ErrorMessages.ACTOR_NOT_FOUND;
                    }
                }

                var newMovie = _movieAppRepository.AddMovie(movie);
                if(newMovie != null)
                {
                    return newMovie.Id.ToString();
                }
                else
                {
                    return ErrorMessages.SERVER_ERROR;
                }
            }
        }

        public string EditMovie(CompleteMovieDto movie)
        {
            var checkExists = _movieAppRepository.GetMovie(movie.Id);
            if (checkExists == null)
            {
                return ErrorMessages.MOVIE_DOES_NOT_EXISTS;
            }
            else
            {
                if (movie.Name != null)
                {
                    if(Utils.IsStringEmpty(movie.Name))
                        return ErrorMessages.MOVIE_NAME_EMPTY;
                }

                if (movie.YearOfRelease > 0)
                {
                    if(movie.YearOfRelease < 1900 || movie.YearOfRelease > 2050)
                        return ErrorMessages.MOVIE_YEAR_OF_RELEASE_SHOULD_BE_FROM_1900_2050;
                }

                if (movie.Plot != null)
                {
                    if (Utils.IsStringEmpty(movie.Plot))
                        return ErrorMessages.MOVIE_PLOT_EMPTY;
                }

                if (movie.PosterURL != null)
                {
                    if(!Utils.IsURLValid(movie.PosterURL))
                        return ErrorMessages.MOVIE_POSTER_INVALID_URL;
                }

                if (movie.ProducerId != null)
                {
                    var producer = _movieAppRepository.GetProducer(movie.ProducerId);
                    if (producer == null)
                    {
                        return ErrorMessages.PRODUCER_NOT_FOUND;
                    }
                }

                if (movie.Actors != null && movie.Actors.Count != 0)
                {
                    foreach (Guid actorId in movie.Actors)
                    {
                        if (_movieAppRepository.GetActor(actorId) == null)
                        {
                            return ErrorMessages.ACTOR_NOT_FOUND;
                        }
                    }
                }
                var editMovie = _movieAppRepository.EditMovie(movie);
                if (editMovie != null)
                {
                    return editMovie.Id.ToString();
                }
                else
                {
                    return ErrorMessages.SERVER_ERROR;
                }
            }
        }

        public string DeleteMovie(Guid movieId)
        {
            var checkExists = _movieAppRepository.GetMovie(movieId);
            if(checkExists == null)
            {
                return ErrorMessages.MOVIE_DOES_NOT_EXISTS;
            }
            else
            {
                if (_movieAppRepository.DeleteMovie(movieId))
                {
                    return String.Empty;
                }
                else
                {
                    return ErrorMessages.SERVER_ERROR;
                }
            }
        }
    }
}
