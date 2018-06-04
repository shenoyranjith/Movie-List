using MovieApp.Entity;
using MovieApp.Model;
using MovieApp.Repository;
using System;
using System.Collections.Generic;
using System.Globalization;

namespace MovieApp.Helpers
{
    public class PersonHelper : IPersonHelper
    {
        private IMovieAppRepository _movieAppRepository;

        public PersonHelper(IMovieAppRepository movieAppRepository)
        {
            _movieAppRepository = movieAppRepository;
        }

        public List<CompleteActorDto> GetAllActors()
        {
            var allActors =  _movieAppRepository.GetAllActors();
            List<CompleteActorDto> result = new List<CompleteActorDto>();
            foreach(Actor actor in allActors)
            {
                var actorObj = AutoMapper.Mapper.Map<CompleteActorDto>(actor);
                result.Add(actorObj);
            }
            return result;
        }

        public CompleteActorDto GetActor(Guid actorId)
        {
            return AutoMapper.Mapper.Map<CompleteActorDto>(_movieAppRepository.GetActor(actorId));
        }

        public List<CompleteProducerDto> GetAllProducers()
        {
            var allProducers = _movieAppRepository.GetAllProducers();
            List<CompleteProducerDto> result = new List<CompleteProducerDto>();
            foreach (Producer actor in allProducers)
            {
                var producerObj = AutoMapper.Mapper.Map<CompleteProducerDto>(actor);
                result.Add(producerObj);
            }
            return result;
        }

        public CompleteProducerDto GetProducer(Guid producerId)
        {
            return AutoMapper.Mapper.Map<CompleteProducerDto>(_movieAppRepository.GetProducer(producerId));
        }

        public string AddActor(ActorDto actor)
        {
            var checkExists = _movieAppRepository.GetActor(actor.Name);
            if(checkExists != null)
            {
                return ErrorMessages.ACTOR_ALREADY_EXISTS;
            }

            var result = ValidatePersonForAdd(actor.Name, actor.Sex, actor.Bio, actor.DOB);
            if (result.Equals(String.Empty))
            {
                var newActor = _movieAppRepository.AddActor(actor);
                if(newActor != null)
                {
                    return newActor.Id.ToString();
                }
                else
                {
                    return ErrorMessages.SERVER_ERROR;
                }
            }
            else
            {
                return result;
            }
        }

        public string EditActor(ActorDto actor)
        {
            var checkExists = _movieAppRepository.GetActor(actor.Name);
            if (checkExists == null)
            {
                return ErrorMessages.ACTOR_NOT_FOUND;
            }

            var result = ValidatePersonForEdit(actor.Name, actor.Sex, actor.Bio, actor.DOB);
            if (result.Equals(String.Empty))
            {
                var editedActor = _movieAppRepository.EditActor(checkExists.Id, actor);
                if (editedActor != null)
                {
                    return editedActor.Id.ToString();
                }
                else
                {
                    return ErrorMessages.SERVER_ERROR;
                }
            }
            else
            {
                return result;
            }
        }

        public string DeleteActor(Guid actorId)
        {
            var checkExists = _movieAppRepository.GetActor(actorId);
            if (checkExists == null)
            {
                return ErrorMessages.ACTOR_NOT_FOUND;
            }
            else
            {
                if (_movieAppRepository.DeleteActor(actorId))
                {
                    return String.Empty;
                }
                else
                {
                    return ErrorMessages.ACTOR_MAPPED;
                }
            }
        }

        public string AddProducer(ProducerDto producer)
        {
            var checkExists = _movieAppRepository.GetProducer(producer.Name);
            if (checkExists != null)
            {
                return ErrorMessages.PRODUCER_ALREADY_EXISTS;
            }

            var result = ValidatePersonForAdd(producer.Name, producer.Sex, producer.Bio, producer.DOB);
            if (result.Equals(String.Empty))
            {
                var newProducer = _movieAppRepository.AddProducer(producer);
                if (newProducer != null)
                {
                    return newProducer.Id.ToString();
                }
                else
                {
                    return ErrorMessages.SERVER_ERROR;
                }
            }
            else
            {
                return result;
            }
        }

        public string EditProducer(ProducerDto producer)
        {
            var checkExists = _movieAppRepository.GetProducer(producer.Name);
            if (checkExists == null)
            {
                return ErrorMessages.PRODUCER_NOT_FOUND;
            }

            var result = ValidatePersonForEdit(producer.Name, producer.Sex, producer.Bio, producer.DOB);
            if (result.Equals(String.Empty))
            {
                var editedProducer = _movieAppRepository.EditProducer(checkExists.Id, producer);
                if (editedProducer != null)
                {
                    return editedProducer.Id.ToString();
                }
                else
                {
                    return ErrorMessages.SERVER_ERROR;
                }
            }
            else
            {
                return result;
            }
        }

        public string DeleteProducer(Guid producerId)
        {
            var checkExists = _movieAppRepository.GetProducer(producerId);
            if (checkExists == null)
            {
                return ErrorMessages.PRODUCER_NOT_FOUND;
            }
            else
            {
                if (_movieAppRepository.DeleteProducer(producerId))
                {
                    return String.Empty;
                }
                else
                {
                    return ErrorMessages.PRODUCER_MAPPED;
                }
            }
        }

        private string ValidatePersonForAdd(string name, string sex, string bio, string dob)
        {
            if (!Utils.IsStringValid(name))
            {
                return ErrorMessages.NAME_EMPTY;
            }

            if (!Utils.IsStringValid(sex))
            {
                return ErrorMessages.SEX_EMPTY;
            }
            else
            {
                if (!(sex.ToLower().Equals("male") || sex.ToLower().Equals("female")))
                {
                    return ErrorMessages.SEX_INVALID;
                }
            }

            if (!Utils.IsStringValid(bio))
            {
                return ErrorMessages.BIO_EMPTY;
            }
            
            if(dob == null)
            {
                return ErrorMessages.DOB_EMPTY;
            }
            else
            {
                if(!DateTime.TryParseExact(dob, "dd-MM-yyyy",
                           CultureInfo.InvariantCulture,
                           DateTimeStyles.None,
                           out DateTime date))
                {
                    return ErrorMessages.DOB_INVALID;
                }
                else if(DateTime.Now.Year - date.Year < 18)
                {
                    return ErrorMessages.DOB_LIMIT;
                }
            }

            return String.Empty;
        }

        private string ValidatePersonForEdit(string name, string sex, string bio, string dob)
        {
            if (name != null)
            {
                if(Utils.IsStringEmpty(name))
                    return ErrorMessages.NAME_EMPTY;
            }

            if (sex != null)
            {
                if (!(sex.ToLower().Equals("male") || sex.ToLower().Equals("female")))
                {
                    return ErrorMessages.SEX_INVALID;
                }
            }

            if (bio != null)
            {
                if(Utils.IsStringEmpty(bio))
                    return ErrorMessages.BIO_EMPTY;
            }

            if (dob != null)
            {
                if (!DateTime.TryParseExact(dob, "dd-MM-yyyy",
                           CultureInfo.InvariantCulture,
                           DateTimeStyles.None,
                           out DateTime date))
                {
                    return ErrorMessages.DOB_INVALID;
                }
                else if (DateTime.Now.Year - date.Year < 18)
                {
                    return ErrorMessages.DOB_LIMIT;
                }
            }

            return String.Empty;
        }
    }
}
