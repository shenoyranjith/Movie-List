import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';
import RestApi from './Utils';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {store} from './store';
import {addProducerToList} from './actions';
import Icon from '@material-ui/core/Icon';

class AddProducer extends Component{
    state = {
        Name: "",
        Sex: "",
        Bio: "",
        DOB: "",
        openSnackBar : false,
        message : "",
    }
    handleAddClick = () => {
        var Name = this.state.Name
        var Sex = this.state.Sex;
        var Bio = this.state.Bio;
        var DOB = this.state.DOB;
        var producerObj = {
            Name, Sex, Bio, DOB
        }
        RestApi.addProducer(producerObj).then( (response) => {
            if(response.message !== undefined){
                this.setState({
                    message: response.message,
                })
            }
            else{
                this.setState({
                    message: "Producer Added.",
                })
                producerObj.Id = response;
                store.dispatch(addProducerToList(producerObj));
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
                        <h2>Enter Producer Details</h2>
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
                            label="Bio"
                            value={this.state.Plot}
                            onChange={this.handleTextChange('Bio')}
                            margin="normal"
                            style = {{width:"25%"}}
                            multiline
                            rowsMax="10"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <br />
                    </Grid>
                    <Grid item xs={3}>
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl>
                            <FormLabel  style = {{fontSize:"15px"}}>Sex</FormLabel>
                            <RadioGroup
                                aria-label="Sex"
                                name="Sex"
                                value={this.state.Sex}
                                onChange={this.handleSelectChange}
                            >
                                <FormControlLabel value="Female" control={<Radio />} label="Female" />
                                <FormControlLabel value="Male" control={<Radio />} label="Male" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                    <TextField
                            required
                            InputProps = {{style: {fontSize:"20px"}}}
                            InputLabelProps = {{style: {fontSize:"15px"}}}
                            label="Date of Birth(dd-mm-yyy)"
                            value={this.state.DOB}
                            onChange={this.handleTextChange('DOB')}
                            margin="normal"
                            style = {{width:"65%"}}
                        />
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
            </div>
        );
      }
}
export default AddProducer;