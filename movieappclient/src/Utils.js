import fetch from 'isomorphic-fetch';

const GET = "GET";
const POST = "POST";
const DELETE = "DELETE";

const  GET_ALL_MOVIES ='/Movie/GetAllMovies'
const  GET_MOVIES ='/Movie/GetMovie'
const  ADD_MOVIE ='/Movie/AddMovie'
const  EDIT_MOVIE ='/Movie/EditMovie'
const  DELETE_MOVIE ='/Movie/DeleteMovie'
const  GET_PRODUCER ='/Producer/GetProducer'
const  GET_ACTOR ='/Actor/GetActor'
const  GET_ALL_PRODUCERS ='/Producer/GetAllProducers'
const  GET_ALL_ACTORS='/Actor/GetAllActors'
const  DELETE_ACTOR ='/Actor/DeleteActor'
const  ADD_ACTOR ='/Actor/AddActor'
const  DELETE_PRODUCER ='/Producer/DeleteProducer'
const  ADD_PRODUCER ='/Producer/AddProducer'

export function isObjPresentInArray(array,element){
    var i;
    for (i = 0; i < array.length; i++) {
        if (array[i].Id === element.Id) {
            return true;
        }
    }

    return false;
}

export function removeElementFromArray(array,element){
    var index = array.indexOf(element);
    array.splice(index, 1);
    return array;
}

export function getNameFromObj(array,actorId){
    for(var j=0; j<array.length;j++){
        if(actorId === array[j].Id){
            return array[j].Name;
        }
    }
}

const getBasePath = () => {
    return "http://localhost:5000";
};

const basePath = getBasePath();

const serialize = (obj) => {
    var str = [];
    for(var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + (obj[p]));
      }
    return str.join("&");
  }

const apiRequest = (url, method, body) => {
    if(method === GET){
        url = url.split('?')[0];
        url = url+'?'+serialize(body)
    }
    let reqBody={
        method: method,
        headers: {    
            'Content-Type': 'application/json'
        }       
    }
    if(method === POST || method === DELETE){
         reqBody["body"] = JSON.stringify(body)
    }

    return fetch(basePath + url, reqBody)
    .then((response) => {
        var res = response.json()
        return res;
    })
}

export default {
    getAllMovies : (body) => {return apiRequest(GET_ALL_MOVIES, GET,body)},
    deleteMovie : (body) => {return apiRequest(DELETE_MOVIE, DELETE,body)},
    getProducer : (body) => {return apiRequest(GET_PRODUCER, GET,body)},
    getActor : (body) => {return apiRequest(GET_ACTOR, GET,body)},
    getAllProducers : (body) => {return apiRequest(GET_ALL_PRODUCERS, GET,body)},
    getAllActors : (body) => {return apiRequest(GET_ALL_ACTORS, GET,body)},
    addMovie : (body) => {return apiRequest(ADD_MOVIE, POST,body)},
    editMovie : (body) => {return apiRequest(EDIT_MOVIE, POST,body)},
    getMovie : (body) => {return apiRequest(GET_MOVIES, GET,body)},
    deleteActor : (body) => {return apiRequest(DELETE_ACTOR, DELETE,body)},
    addActor : (body) => {return apiRequest(ADD_ACTOR, POST,body)},
    deleteProducer : (body) => {return apiRequest(DELETE_PRODUCER, DELETE,body)},
    addProducer : (body) => {return apiRequest(ADD_PRODUCER, POST,body)},
}