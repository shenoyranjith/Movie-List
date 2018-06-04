using System;
using System.Collections.Generic;
using MovieApp.Entity;
using MovieApp.Model;

namespace MovieApp.Helpers
{
    public interface IPersonHelper
    {
        string AddActor(ActorDto actor);
        string AddProducer(ProducerDto producer);
        string DeleteActor(Guid actorId);
        string DeleteProducer(Guid producerId);
        string EditActor(ActorDto actor);
        string EditProducer(ProducerDto producer);
        CompleteActorDto GetActor(Guid actorId);
        List<CompleteActorDto> GetAllActors();
        List<CompleteProducerDto> GetAllProducers();
        CompleteProducerDto GetProducer(Guid producerId);
    }
}