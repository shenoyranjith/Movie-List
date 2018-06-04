import {ADD_MOVIE_TO_LIST,DELETE_MOVIE,ADD_ACTOR_TO_LIST,ADD_PRODUCER_TO_LIST,DELETE_ACTOR,DELETE_PRODUCER,EDIT_MOVIE} from './actions'
import {isObjPresentInArray,removeElementFromArray} from './Utils'

export function reducer(state, action) {
    switch(action.type) {
        case ADD_MOVIE_TO_LIST:
            if(isObjPresentInArray(state.movies,action.movie) === true)
                return state;
            else{
                return {
                    ...state,
                    movies: state.movies.concat(action.movie),
                };
            }

            case ADD_ACTOR_TO_LIST:
            if(isObjPresentInArray(state.actors,action.actor) === true)
                return state;
            else{
                return {
                    ...state,
                    actors: state.actors.concat(action.actor),
                };
            }

            case ADD_PRODUCER_TO_LIST:
            if(isObjPresentInArray(state.producers,action.producer) === true)
                return state;
            else{
                return {
                    ...state,
                    producers: state.producers.concat(action.producer),
                };
            }    
        case DELETE_MOVIE:
            return {
                ...state,
                movies : removeElementFromArray(state.movies,action.movie),
            }
        case EDIT_MOVIE:
            return {
                ...state,
                movies : removeElementFromArray(state.movies,action.movie).concat(action.movie),
            }
        case DELETE_ACTOR:
            return {
                ...state,
                actors : removeElementFromArray(state.actors,action.actor),
            }  
        case DELETE_PRODUCER:
            return {
                ...state,
                producers : removeElementFromArray(state.producers,action.producer),
            }  
        default:
            return state;
    }
}