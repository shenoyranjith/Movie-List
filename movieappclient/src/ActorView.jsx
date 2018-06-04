import React, { Component } from 'react';
import ActorList from './ActorList';
import AddActor from './AddActor';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';

class ActorView extends Component{
    state = {
        showList : true,
    }

    render(){
        const handleAddClick = () => {
            this.setState({
                showList: !this.state.showList,
            });
        }

        const renderButton = () => {
            if(this.state.showList === true){
                return (
                    <div>
                        <br style={{height:"10%"}}/> 
                        <Button variant="raised" color="secondary" aria-label="add" onClick={handleAddClick}>
                            <Add />
                        </Button>
                    </div>
                );
            }
        }
        return (
            <div>
                {renderButton()}
                <br style={{height:"10%"}}/> 
                {this.state.showList ? <ActorList /> : <AddActor handleClick = {handleAddClick}/> }
            </div>
        );
    }
}


export default ActorView;