export function addMovieToList(movie){
    return(
        {
            type: ADD_MOVIE_TO_LIST,
            movie,
        }
    );
}

export function addActorToList(actor){
    return(
        {
            type: ADD_ACTOR_TO_LIST,
            actor,
        }
    );
}

export function addProducerToList(producer){
    return(
        {
            type: ADD_PRODUCER_TO_LIST,
            producer,
        }
    );
}

export function deleteMovie(movie){
    return(
        {
            type: DELETE_MOVIE,
            movie,
        }
    );
}

export function editMovie(movie){
    return(
        {
            type: EDIT_MOVIE,
            movie,
        }
    );
}

export function deleteActor(actor){
    return(
        {
            type: DELETE_ACTOR,
            actor,
        }
    );
}
export function deleteProducer(producer){
    return(
        {
            type: DELETE_PRODUCER,
            producer,
        }
    );
}



export const ADD_MOVIE_TO_LIST = "ADD_MOVIE_TO_LIST";
export const ADD_ACTOR_TO_LIST = "ADD_ACTOR_TO_LIST";
export const ADD_PRODUCER_TO_LIST = "ADD_PRODUCER_TO_LIST";
export const DELETE_MOVIE = "DELETE_MOVIE";
export const EDIT_MOVIE = "EDIT_MOVIE";
export const DELETE_ACTOR = "DELETE_ACTOR";
export const DELETE_PRODUCER = "DELETE_PRODUCER";
