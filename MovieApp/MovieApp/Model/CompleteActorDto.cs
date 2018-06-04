using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;

namespace MovieApp.Model
{
    public class CompleteActorDto
    {
        [JsonProperty("Id")]
        public Guid Id { get; set; }

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
