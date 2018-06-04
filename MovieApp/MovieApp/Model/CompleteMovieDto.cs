using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieApp.Model
{
    public class CompleteMovieDto
    {
        [JsonProperty("Id")]
        public Guid Id { get; set; }

        [JsonProperty("Name")]
        public string Name { get; set; }

        [JsonProperty("YearOfRelease")]
        public int YearOfRelease { get; set; }

        [JsonProperty("Plot")]
        public string Plot { get; set; }

        [JsonProperty("PosterURL")]
        public string PosterURL { get; set; }

        [JsonProperty("ProducerId")]
        public Guid ProducerId { get; set; }

        [JsonProperty("Actors")]
        public List<Guid> Actors { get; set; }

    }
}
