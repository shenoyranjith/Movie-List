using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;

namespace MovieApp.Model
{
    public class ActorDto
    {

        [JsonProperty("Name")]
        public string Name { get; set; }

        [JsonProperty("Sex")]
        public string Sex { get; set; }

        [JsonProperty("Bio")]
        public string Bio { get; set; }

        [JsonProperty("DOB")]
        public string DOB { get; set; }

    }
}
