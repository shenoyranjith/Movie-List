import React, { Component } from 'react';
import {Panel,Button} from 'react-bootstrap';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

class MovieDetails extends Component{
    state = {
        openToggle: false,
    }
    getActorNamesList(){
        var names = ""
        this.props.actorNames.forEach((name) =>{
            names = names +", "+name
        })
        return names.substr(2);
    }

    render(){
        return(
            <div>
                <Button onClick={() => this.setState({ openToggle: !this.state.openToggle})}>
                    {this.state.openToggle? "Hide Details" : "Show Details"}
                </Button>
                <br />
                <Panel
                    style = {{display: "contents"}}
                    expanded={this.state.openToggle} onToggle={() => ""}>
                    <Panel.Collapse>
                        <Panel.Body>
                        <List>
                            <ListItem>
                                <ListItemText 
                                disableTypography
                                primary={<Typography type="body2" style={{ fontSize: "20px" }}>Plot</Typography>} 
                                secondary={<Typography type="body2" style={{ fontSize: "15px" }}>{this.props.plot}</Typography>} 
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText 
                                disableTypography
                                primary={<Typography type="body2" style={{ fontSize: "20px" }}>Producer</Typography>} 
                                secondary={<Typography type="body2" style={{ fontSize: "15px" }}>{this.props.producerName}</Typography>} 
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText 
                                disableTypography
                                primary={<Typography type="body2" style={{ fontSize: "20px" }}>Actor</Typography>} 
                                secondary={<Typography type="body2" style={{ fontSize: "15px" }}>{this.getActorNamesList()}</Typography>} 
                                />
                            </ListItem>
                        </List>
                        </Panel.Body>
                    </Panel.Collapse>
                </Panel>
            </div>
        )
    }

}

export default MovieDetails;