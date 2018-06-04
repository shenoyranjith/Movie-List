using System;
using System.Collections.Generic;
using MovieApp.Entity;
using MovieApp.Model;

namespace MovieApp.Repository
{
    public interface IMovieAppRepository
    {
        Actor AddActor(ActorDto actor);
        Movie AddMovie(MovieDto movie);
        Producer AddProducer(ProducerDto producer);
        bool DeleteActor(Guid actorId);
        bool DeleteMovie(Guid movieId);
        bool DeleteProducer(Guid producerId);
        Actor EditActor(Guid actorId, ActorDto actor);
        Movie EditMovie(CompleteMovieDto movie);
        Producer EditProducer(Guid producerId, ProducerDto producer);
        Actor GetActor(Guid actorId);
        Actor GetActor(string actorName);
        List<Actor> GetActorsInMovie(string movieName, int yearOfRelease);
        List<Actor> GetAllActors();
        List<Movie> GetAllMovies();
        List<Producer> GetAllProducers();
        Movie GetMovie(Guid movieId);
        Movie GetMovie(string movieName, int yearOfRelease);
        Producer GetMovieProducer(string movieName, int yearOfRelease);
        Producer GetProducer(Guid producerId);
        Producer GetProducer(string producerName);
        bool Save();
    }
}