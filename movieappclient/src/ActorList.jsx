import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import {store} from './store';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import {deleteActor} from './actions';
import RestApi from './Utils.js';
import Grid from '@material-ui/core/Grid';
import {Panel} from 'react-bootstrap';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
class ActorList extends Component{

    state = {
        openSnackBar : false,
        message : "",
    }

    componentDidMount(){
        store.subscribe(() => this.forceUpdate());
    }

    onDeleteButtonClick = (actor,e) => {
        e.preventDefault();
        RestApi.deleteActor(actor.Id).then((response) => {
            this.setState({
                message: response.message,
            })
            if(this.state.message === "Actor deleted.")
                store.dispatch(deleteActor(actor))
            this.handleSnackBar();
        });
    }
    handleSnackBar(){
        this.setState({
            openSnackBar: true,
        })
    }
    render(){
        var storeState = store.getState();
        const createList = storeState.actors.map((actor,key) =>{
            return(
                <div key={key}>
                    <ListItem dense button style={{padding: "1% 20%"}}>
                        <Grid container alignContent="center">
                            <Grid item xs={12}>
                                <h2>{actor.Name}</h2>
                            </Grid>
                            <Grid item xs={8}>
                                <Panel style = {{display: "contents"}} >
                                    <Panel.Body>
                                        <List>
                                            <ListItem>
                                                <ListItemText 
                                                    disableTypography
                                                    primary={<Typography type="body2" style={{ fontSize: "20px" }}>Sex</Typography>} 
                                                    secondary={<Typography type="body2" style={{ fontSize: "15px" }}>{actor.Sex}</Typography>} 
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText 
                                                    disableTypography
                                                    primary={<Typography type="body2" style={{ fontSize: "20px" }}>Bio</Typography>} 
                                                    secondary={<Typography type="body2" style={{ fontSize: "15px" }}>{actor.Bio}</Typography>} 
                                                    />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText 
                                                    disableTypography
                                                    primary={<Typography type="body2" style={{ fontSize: "20px" }}>Date of Birth</Typography>} 
                                                    secondary={<Typography type="body2" style={{ fontSize: "15px" }}>{actor.DOB}</Typography>} 
                                                />
                                            </ListItem>
                                        </List>
                                    </Panel.Body>
                                </Panel>
                            </Grid>
                            <Grid item xs>
                            <ListItemSecondaryAction style = {{paddingRight:"25%"}}>
                                <Button variant="fab" 
                                    aria-label="delete"
                                    onClick={(e) => this.onDeleteButtonClick(actor,e)}
                                >
                                    <DeleteIcon />
                                </Button>
                            </ListItemSecondaryAction>
                            </Grid>
                        </Grid>
                    </ListItem>
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
export default ActorList;