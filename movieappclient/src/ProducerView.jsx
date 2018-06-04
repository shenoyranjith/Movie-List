import React, { Component } from 'react';
import ProducerList from './ProducerList';
import AddProducer from './AddProducer';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';

class ProducerView extends Component{
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
                {this.state.showList ? <ProducerList /> : <AddProducer handleClick = {handleAddClick}/> }
            </div>
        );
    }
}


export default ProducerView;