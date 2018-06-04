import {createStore} from 'redux';
import {reducer} from './reducer';
const InitialState = { 
    movies : [],
    actors: [],
    producers: []
};
export const store = createStore(reducer, InitialState);