import React, { Component } from 'react';
import Modal from 'react-modal';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import {store} from './store';
import {addActorToList,addProducerToList} from './actions';
import Add from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import RestApi from './Utils';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
};
Modal.setAppElement('#root')
class AddPersonModal extends Component {
    state = {
        Name: "",
        Sex: "",
        Bio: "",
        DOB: "",
        Type: "",
        openSnackBar : false,
        message : "",
    }
    handleAddClick = () => {
        var Name = this.state.Name
        var Sex = this.state.Sex;
        var Bio = this.state.Bio;
        var DOB = this.state.DOB;
        var personObj = {
            Name, Sex, Bio, DOB
        }
        if(this.state.Type === "Actor"){
            RestApi.addActor(personObj).then( (response) => {
                if(response.message !== undefined){
                    this.setState({
                        message: response.message,
                    })
                }
                else{
                    this.setState({
                        message: "Actor Added.",
                    })
                    personObj.Id = response;
                    store.dispatch(addActorToList(personObj));
                }
                this.handleSnackBar();
            });
        }
        else{
            RestApi.addProducer(personObj).then( (response) => {
                if(response.message !== undefined){
                    this.setState({
                        message: response.message,
                    })
                }
                else{
                    this.setState({
                        message: "Producer Added.",
                    })
                    personObj.Id = response;
                    store.dispatch(addProducerToList(personObj));
                }
                this.handleSnackBar();
            })
        }
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

    closeSnackBar = event =>{
        this.setState({
            openSnackBar: false,
        })
        if(this.state.message.includes("Added.")){
            this.props.handleModalClose();
        }
    }

    render() {
        return (
            <div>
                <Modal
                    isOpen={this.props.open}
                    onRequestClose={this.props.handleModalClose}
                    style={customStyles}
                    contentLabel="Add Person Modal"
                >
                    <div>
                        <Grid container>
                        <Grid item xs={3}>
                                <Button variant="outlined" onClick={this.props.handleModalClose}>
                                    <CloseIcon />
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <h2>Enter Details</h2>
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
                            <Grid item xs={4}>
                                <FormControl>
                                    <FormLabel  style = {{fontSize:"15px"}}>Type</FormLabel>
                                    <RadioGroup
                                        aria-label="Type"
                                        name="Type"
                                        value={this.state.Type}
                                        onChange={this.handleSelectChange}
                                    >
                                        <FormControlLabel value="Actor" control={<Radio />} label="Actor" />
                                        <FormControlLabel value="Producer" control={<Radio />} label="Producer" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
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
                            <Grid item xs={4}>
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
                            onClose={this.closeSnackBar}
                            ContentProps={{
                                'aria-describedby': 'message-id',
                            }}
                            message={<span id="message-id">{this.state.message}</span>}
                            action={[
                                <IconButton
                                    key="close"
                                    aria-label="Close"
                                    color="inherit"
                                    onClick={this.closeSnackBar}
                                >
                                    <CloseIcon />
                                </IconButton>,
                            ]}
                        />
                    </div>
                </Modal>
            </div>
        );
    }
}
  
export default AddPersonModal;