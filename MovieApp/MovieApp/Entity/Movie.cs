using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MovieApp.Entity
{
    public class Movie
    {

        [Key]
        public Guid Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public int YearOfRelease { get; set; }

        [Required]
        public string Plot { get; set; }

        [Required]
        public string PosterURL { get; set; }

    }
}
