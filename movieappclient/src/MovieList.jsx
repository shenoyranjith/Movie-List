import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import {store} from './store';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import {deleteMovie,addMovieToList} from './actions';
import RestApi from './Utils.js';
import MovieDetails from './MovieDetails';
import Grid from '@material-ui/core/Grid';
import {getNameFromObj} from './Utils';
import Icon from '@material-ui/core/Icon';
import EditMovieModal from './EditMovieModal'

class MovieList extends Component{
    state = {
        open : false,
    }

    getOpenState = () => {
        return this.state.open;
    }

    handleModalOpen = () => {
        this.setState({ open: true });
      };
    
      handleModalClose = () => {
        this.setState({ open: false });
      };

    onDeleteButtonClick = (movie,e) => {
        e.preventDefault();
        RestApi.deleteMovie(movie.Id).then(() => {
            store.dispatch(deleteMovie(movie))
        });
    }

    onEditButtonClick = (movie,e) => {
        e.preventDefault();
        this.handleModalOpen();
    }

    componentWillMount(){
        this.getAllMovies();
    }
    
    componentDidMount(){
        store.subscribe(() => this.forceUpdate());
    }

    getAllMovies(){
        RestApi.getAllMovies().then((allMovies) => {
            allMovies.map((movie) => 
                store.dispatch(addMovieToList(movie))
            );
        });
      }
    render(){
        var storeState = store.getState();
        const createList = storeState.movies.map((movie,key) =>{
            var producerName = getNameFromObj(storeState.producers,movie.ProducerId);
            var actorNames = [];
            for(var i = 0; i<movie.Actors.length;i++){
                var actorName = getNameFromObj(storeState.actors,movie.Actors[i]);
                actorNames = actorNames.concat(actorName);
            }
            return(
              <div key={key}>
                    <ListItem dense button style={{padding: "1% 20%"}}>
                        <Grid container alignContent="center">
                            <Grid item xs>
                                <Avatar alt={movie.Name} src={movie.PosterURL} style={{width:"150px",height:"150px"}} />
                            </Grid>
                            <Grid item sm={6}>
                                <ListItemText primary={movie.Name + " (" + movie.YearOfRelease + ")"} style={{fontSize:"200%"}} />
                                <br />
                                <MovieDetails 
                                    producerName={producerName}
                                    actorNames = {actorNames}
                                    plot = {movie.Plot}
                                />
                            </Grid>
                            <Grid item xs>
                            <ListItemSecondaryAction style = {{paddingRight:"5%"}}>
                                <Button variant="fab" 
                                    aria-label="delete"
                                    onClick={(e) => this.onDeleteButtonClick(movie,e)}
                                >
                                    <DeleteIcon />
                                </Button>
                                <Button variant="fab" color="secondary" aria-label="edit" 
                                    onClick={(e) => this.onEditButtonClick(movie,e)}
                                >
                                    <Icon>edit_icon</Icon>
                                </Button>
                            </ListItemSecondaryAction>
                            </Grid>
                        </Grid>
                    </ListItem>
                    {this.state.open?
                        <EditMovieModal 
                            open = {this.state.open}
                            handleModalOpen = {this.handleModalOpen}
                            handleModalClose = {this.handleModalClose}
                            movie = {movie}
                            completeActors = {store.getState().actors}
                        />
                        : <div></div>
                    }
              </div>
            );
        })
        return(
            <div>
                <Grid container>
                    <Grid item xs>
                    <List>
                        {createList}
                    </List>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default MovieList;