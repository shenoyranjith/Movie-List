import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import {store} from './store';
import {removeElementFromArray,getNameFromObj} from './Utils'
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';
import RestApi from './Utils';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Icon from '@material-ui/core/Icon';
import AddPersonModal from './AddPersonModal';

class AddMovie extends Component{

    state = {
        Name: "",
        Plot: "",
        PosterURL: "",
        YearOfRelease:"",
        ProducerId:"",
        Actors:[],
        years: [],
        completeActors: [],
        actorNames:[],
        openSnackBar : false,
        message : "",
        open : false,
    }
    
    componentDidMount(){
        store.subscribe(() => this.forceUpdate());
        let y = [];
        for(var i=1900;i<=2050;i++){
            y = y.concat(i);
        }
        this.setState({
            years : this.state.years.concat(y)
         });
         this.setState({
            completeActors : this.state.completeActors.concat(store.getState().actors)
         })
    }

    handleAddClick = () => {
        var Name = this.state.Name
        var Plot = this.state.Plot;
        var PosterURL = this.state.PosterURL;
        var YearOfRelease = this.state.YearOfRelease;
        var Actors = this.state.Actors;
        var ProducerId = this.state.ProducerId;
        var movieObj = {
            Name, Plot, PosterURL, YearOfRelease, Actors,ProducerId
        }
        RestApi.addMovie(movieObj).then( (response) => {
            if(response.message !== undefined){
                this.setState({
                    message: response.message,
                })
            }
            else{
                this.setState({
                    message: "Movie Added.",
                })
            }
            this.handleSnackBar();
        })
    }

    handleSnackBar(){
        this.setState({
            openSnackBar: true,
        })
    }

    handleTextChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };

      handleSelectChange = event => {
        this.setState({ [event.target.name]: event.target.value });
      };
      
      handleActorSelect = event => {
        var name;
        var value = event.target.value[event.target.value.length -1];
        var actorsFromStore = store.getState().actors;
        if(this.state.Actors.indexOf(value) === -1)
        {
            this.setState({
                 Actors: this.state.Actors.concat(value) 
            });
            name = getNameFromObj(actorsFromStore,value);
            this.setState({
                actorNames : this.state.actorNames.concat(name)
            });
        }
        else{
            this.setState({
                Actors: removeElementFromArray(this.state.Actors,value)
            });
            name = getNameFromObj(actorsFromStore,value);
            this.setState({
                actorNames : removeElementFromArray(this.state.actorNames,name)
            });
        }
    };

    handleModalOpen = () => {
        this.setState({ open: true });
    };
    
    handleModalClose = () => {
        this.setState({ open: false });
    };


    render(){
        return (
            <div>
                <Grid container>
                    <Grid item xs={3}>
                        <Button variant="outlined" onClick={this.props.handleClick}>
                            <Icon>arrow_back_ios</Icon>
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <h2>Enter Movie Details</h2>
                    </Grid>
                    <Grid item xs={3}>
                        <Button variant="raised" color="secondary" aria-label="add" onClick={this.handleAddClick}>
                            <Add />
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            InputProps = {{style: {fontSize:"20px"}}}
                            InputLabelProps = {{style: {fontSize:"15px"}}}
                            label="Name"
                            value={this.state.Name}
                            onChange={this.handleTextChange('Name')}
                            margin="normal"
                            style = {{width:"25%"}}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <br />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            InputProps = {{style: {fontSize:"20px"}}}
                            InputLabelProps = {{style: {fontSize:"15px"}}}
                            label="Plot"
                            value={this.state.Plot}
                            onChange={this.handleTextChange('Plot')}
                            margin="normal"
                            style = {{width:"25%"}}
                            multiline
                            rowsMax="10"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <br />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            InputProps = {{style: {fontSize:"20px"}}}
                            InputLabelProps = {{style: {fontSize:"15px"}}}
                            label="Poster Image URL"
                            value={this.state.PosterURL}
                            onChange={this.handleTextChange('PosterURL')}
                            margin="normal"
                            style = {{width:"25%"}}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <br />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                                required
                                InputProps = {{style: {fontSize:"15px"}}}
                                InputLabelProps = {{style: {fontSize:"15px"}}}
                                label="Year of Release"
                                value={this.state.YearOfRelease}
                                onChange={this.handleTextChange('YearOfRelease')}
                                margin="normal"
                                style = {{width:"60%"}}
                        />
                    </Grid>
                    <Grid item xs={3} style={{paddingTop: "0.5%"}}>
                        <InputLabel htmlFor="ProducerId" style={{fontSize:"15px",width:"100%"}}>Producer</InputLabel>
                        <Select
                            value={this.state.ProducerId}
                            onChange={this.handleSelectChange}
                            inputProps={{id: "ProducerId",name: 'ProducerId',style : {fontSize: "20px"}}}
                            style={{width:"50%",fontSize:"15px"}}
                        >
                            {
                                store.getState().producers.map((producer,key) =>{
                                    return <MenuItem key={key} value={producer.Id}>{producer.Name}</MenuItem>
                                })
                            }
                        </Select>
                    </Grid>
                    <Grid item xs={3} style={{paddingTop: "0.5%"}}>
                        <InputLabel htmlFor="Actors" style={{fontSize:"15px",width:"100%"}}>Actors</InputLabel>
                        <Select
                            multiple
                            value={this.state.actorNames}
                            onChange={this.handleActorSelect}
                            inputProps={{id: "Actors",name: 'Actors',style : {fontSize: "20px"}}}
                            renderValue={selected => selected.join(', ')}
                            style={{width:"50%",fontSize:"15px"}}
                        >
                            {
                                store.getState().actors.map((actor,key) => (
                                    <MenuItem key={key} value={actor.Id}
                                        style={{
                                            fontWeight:
                                            this.state.actorNames.indexOf(actor.Name) === -1
                                                ? "normal"
                                                : "bolder",
                                            background:
                                            this.state.actorNames.indexOf(actor.Name) === -1
                                                ? "white"
                                                : "lightgray",
                                        }}
                                    >
                                        {actor.Name}
                                    </MenuItem>
                            ))
                            }
                        </Select>
                    </Grid>
                    <Grid item xs={3}>
                        <Button 
                            variant="raised" color="secondary" aria-label="add" 
                            style = {{width:"50%"}}
                            onClick={this.handleModalOpen}>
                            Add Actor/Producer
                        </Button>
                    </Grid>
                </Grid>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.openSnackBar}
                    autoHideDuration={6000}
                    onClose={() => this.setState({openSnackBar: false})}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{this.state.message}</span>}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            onClick={() => this.setState({openSnackBar: false})}
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />
                {this.state.open?
                        <AddPersonModal 
                            open = {this.state.open}
                            handleModalOpen = {this.handleModalOpen}
                            handleModalClose = {this.handleModalClose}
                        />
                        : <div></div>
                    }
            </div>
        );
    }
}

export default AddMovie;