using MovieApp.Entity;
using MovieApp.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieApp.Repository
{
    public class MovieAppRepository : IMovieAppRepository
    {

        private MovieAppDbContext _context;

        public MovieAppRepository(MovieAppDbContext context)
        {
            _context = context;
        }

        public List<Actor> GetAllActors()
        {
            return _context.Actors.ToList();
        }

        public Actor GetActor(Guid actorId)
        {
            return _context.Actors.FirstOrDefault(a => a.Id == actorId);
        }

        public Actor GetActor(string actorName)
        {
            return _context.Actors.FirstOrDefault(a => a.Name == actorName);
        }

        public List<Producer> GetAllProducers()
        {
            return _context.Producers.ToList();
        }

        public Producer GetProducer(Guid producerId)
        {
            return _context.Producers.FirstOrDefault(p => p.Id == producerId);
        }

        public Producer GetProducer(string producerName)
        {
            return _context.Producers.FirstOrDefault(p => p.Name == producerName);
        }

        public List<Movie> GetAllMovies()
        {
            return _context.Movies.ToList();
        }

        public Movie GetMovie(Guid movieId)
        {
            return _context.Movies.FirstOrDefault(m => m.Id == movieId);
        }

        public Movie GetMovie(string movieName,int yearOfRelease)
        {
            return _context.Movies.FirstOrDefault(m => m.Name == movieName && m.YearOfRelease == yearOfRelease);
        }

        public List<Actor> GetActorsInMovie(string movieName, int yearOfRelease)
        {
            var movieId = _context.Movies.FirstOrDefault(m => m.Name == movieName && m.YearOfRelease == yearOfRelease).Id;
            if (movieId != null)
            {
                List<Actor> actors = new List<Actor>();
                foreach(var map in _context.ActorMovieMap.Where(am => am.MovieId == movieId))
                {
                    actors.Add(GetActor(map.ActorId));
                }
                return actors;
            }
            return null;
        }

        public Producer GetMovieProducer(string movieName,int yearOfRelease)
        {
            var movieId = _context.Movies.FirstOrDefault(m => m.Name == movieName && m.YearOfRelease == yearOfRelease).Id;
            if (movieId != null)
            {
                return GetProducer(_context.ProducerMovieMap.FirstOrDefault(pm => pm.MovieId == movieId).ProducerId);
            }
            return null;
        }

        public Actor AddActor(ActorDto actor)
        {
            var newActor = AutoMapper.Mapper.Map<Actor>(actor);
            _context.Actors.Add(newActor);
            if (Save())
            {
                return newActor;
            }
            return null;
        }

        public Producer AddProducer(ProducerDto producer)
        {
            var newProducer = AutoMapper.Mapper.Map<Producer>(producer);
            _context.Producers.Add(newProducer);
            if (Save())
            {
                return newProducer;
            }
            return null;
        }

        public Movie AddMovie(MovieDto movie)
        {
            var newMovie = AutoMapper.Mapper.Map<Movie>(movie);
            _context.Movies.Add(newMovie);

            var producerMovieMap = new ProducerMovieMap()
            {
                MovieId = newMovie.Id,
                ProducerId = movie.ProducerId
            };
            _context.ProducerMovieMap.Add(producerMovieMap);

            foreach(Guid actorId in movie.Actors)
            {
                var actorMovieMap = new ActorMovieMap()
                {
                    MovieId = newMovie.Id,
                    ActorId = actorId
                };
                _context.ActorMovieMap.Add(actorMovieMap);
            }

            if (Save())
            {
                return newMovie;
            }
            return null;
        }

        public bool DeleteMovie(Guid movieId)
        {
            var movie = GetMovie(movieId);
            if (movie != null)
            {
                var producerMovieMap = _context.ProducerMovieMap.FirstOrDefault(pm => pm.MovieId == movieId);
                _context.ProducerMovieMap.Remove(producerMovieMap);

                List<ActorMovieMap> actorMovieMaps = _context.ActorMovieMap.Where(am => am.MovieId == movieId).ToList();
                _context.ActorMovieMap.RemoveRange(actorMovieMaps);

                _context.Movies.Remove(movie);
                return Save();
            }
            return false;
        }

        public bool DeleteProducer(Guid producerId)
        {
            var producerMovieMap = _context.ProducerMovieMap.FirstOrDefault(pm => pm.ProducerId == producerId);
            if (producerMovieMap == null)
            {
                _context.Producers.Remove(GetProducer(producerId));
                return Save();
            }

            return false;
        }

        public bool DeleteActor(Guid actorId)
        {
            var actorMovieMap = _context.ActorMovieMap.FirstOrDefault(am => am.ActorId == actorId);
            if (actorMovieMap == null)
            {
                _context.Actors.Remove(GetActor(actorId));
                return Save();
            }

            return false;
        }

        public Movie EditMovie(CompleteMovieDto movie)
        {
            var movieObj = GetMovie(movie.Id);
            AutoMapper.Mapper.Map(movie, movieObj);

            if(movie.ProducerId != null)
            {
                var producerForMovie = _context.ProducerMovieMap.FirstOrDefault(pm => pm.MovieId == movie.Id);
                if(movie.ProducerId!= producerForMovie.ProducerId)
                    producerForMovie.ProducerId = movie.ProducerId;
            }

            if(movie.Actors != null && movie.Actors.Count != 0)
            {
                var actorsList = _context.ActorMovieMap.Where(am => am.MovieId == movie.Id).ToList();
                _context.ActorMovieMap.RemoveRange(actorsList);

                if (Save())
                {
                    foreach (Guid actorId in movie.Actors)
                    {
                        _context.ActorMovieMap.Add(new ActorMovieMap()
                        {
                            ActorId = actorId,
                            MovieId = movie.Id
                        });
                    }
                    if (Save())
                        return movieObj;
                }
                else
                {
                    return null;
                }
            }
            return null;
        }

        public Producer EditProducer(Guid producerId, ProducerDto producer) 
        {
            var producerObj = GetProducer(producerId);

            AutoMapper.Mapper.Map(producer, producerObj);

            if (Save())
                return producerObj;

            return null;
        }

        public Actor EditActor(Guid actorId, ActorDto actor)
        {
            var actorObj = GetActor(actorId);

            AutoMapper.Mapper.Map(actor, actorObj);

            if (Save())
                return actorObj;

            return null;
        }

        public bool Save()
        {
            return _context.SaveChanges() > 0 ? true: false;
        }

    }
}
