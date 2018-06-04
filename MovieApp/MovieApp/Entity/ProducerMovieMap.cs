using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MovieApp.Entity
{
    public class ProducerMovieMap
    {

        [ForeignKey("ProducerId")]
        public Producer Producer { get; set; }

        public Guid ProducerId { get; set; }

        [ForeignKey("MovieId")]
        public Movie Movie { get; set; }

        public Guid MovieId { get; set; }
    }
}
