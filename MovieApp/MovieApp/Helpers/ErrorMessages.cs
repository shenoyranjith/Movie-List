using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieApp.Helpers
{
    public class ErrorMessages
    {
        public static string SERVER_ERROR = "Server Error";

        public static string MOVIE_DOES_NOT_EXISTS = "Movie does not exists.";

        public static string MOVIE_ALREADY_EXISTS = "Movie already exists.";

        public static string MOVIE_NAME_EMPTY = "Movie name empty.";

        public static string MOVIE_YEAR_OF_RELEASE_SHOULD_BE_FROM_1900_2050 = "Year of release should be from 1900 to 2050";

        public static string MOVIE_PLOT_EMPTY = "Movie plot empty.";

        public static string MOVIE_POSTER_INVALID_URL = "Movie poster URL is invalid.";

        public static string PRODUCER_NOT_FOUND = "Producer not found.";

        public static string ACTOR_NOT_FOUND = "Actor not found.";

        public static string ACTOR_ALREADY_EXISTS = "Actor already exists.";

        public static string PRODUCER_ALREADY_EXISTS = "Producer already exists.";

        public static string NAME_EMPTY = "Name is empty.";

        public static string SEX_EMPTY = "Sex is empty.";

        public static string SEX_INVALID = "Sex should be Male or Female";

        public static string BIO_EMPTY = "Bio is empty.";

        public static string DOB_EMPTY = "DOB is empty.";

        public static string DOB_INVALID = "DOB is invalid. Accepted format is DD-MM-YYYY, example 20-12-2018.";

        public static string DOB_LIMIT = "Should be atleast 18 years old.";

        public static string ACTOR_MAPPED = "Actor is mapped to a movie.";

        public static string PRODUCER_MAPPED = "Producer is mapped to a movie.";
    }
}
