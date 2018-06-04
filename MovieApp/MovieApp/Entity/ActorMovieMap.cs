using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MovieApp.Entity
{
    public class ActorMovieMap
    {

        [ForeignKey("MovieId")]
        public Movie Movie { get; set; }

        public Guid MovieId { get; set; }

        [ForeignKey("ActorId")]
        public Actor Actor { get; set; }

        public Guid ActorId { get; set; }
    }
}
