using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MovieApp.Model
{
    public class ProducerDto
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
