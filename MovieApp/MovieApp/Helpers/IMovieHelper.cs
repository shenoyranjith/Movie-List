using System;
using System.Collections.Generic;
using MovieApp.Entity;
using MovieApp.Model;

namespace MovieApp.Helpers
{
    public interface IMovieHelper
    {
        string AddMovie(MovieDto movie);
        string DeleteMovie(Guid movieId);
        string EditMovie(CompleteMovieDto movie);
        List<CompleteMovieDto> GetAllMovies();
        CompleteMovieDto GetMovie(Guid movieId);
    }
}