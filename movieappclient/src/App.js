import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Nav, NavItem} from 'react-bootstrap';
import MovieView from './MovieView'
import ActorView from './ActorView'
import ProducerView from './ProducerView'
import {store} from './store';
import {addActorToList,addProducerToList} from './actions';
import RestApi from './Utils.js';


class App extends Component {
  view = {
    MOVIE : 1,
    ACTORS : 2,
    PRODUCERS: 3,
  }
  state = {
    activeKey : "1",
    activeView: this.view.MOVIE,
  }
  
  componentDidMount(){
    store.subscribe(() => this.forceUpdate());
    this.getAllActors();
    this.getAllProducers();
  }

  getAllActors(){
    RestApi.getAllActors().then((allActors) => {
      allActors.map((actor) => 
            store.dispatch(addActorToList(actor))
        );
    });
  }

  getAllProducers(){
    RestApi.getAllProducers().then((allProducers) => {
      allProducers.map((producer) => 
            store.dispatch(addProducerToList(producer))
        );
    });
  }


  handleSelect(eventKey) {
    this.setState({
      activeKey : eventKey,
    });
    switch(eventKey){
      case "1" : this.setState({
        activeView : this.view.MOVIE,
      })
      break;
      case "2" : this.setState({
        activeView : this.view.ACTORS,
      })
      break;
      case "3" : this.setState({
        activeView : this.view.PRODUCERS,
      })
      break;
      default : break;
    } 
  }
  selectView(){
    switch(this.state.activeView){
      case this.view.MOVIE : 
         return (<MovieView />);
      case this.view.ACTORS : 
        return (<ActorView />);
      case this.view.PRODUCERS : 
        return (<ProducerView />);
      default : break;
    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Movie App</h1>
        </header>
        <Nav style = {{display:"flex", justifyContent:"center"}} bsStyle="tabs" activeKey={this.state.activeKey} onSelect={k => this.handleSelect(k)}>
        <NavItem eventKey="1" >
          Movies
        </NavItem>
        <NavItem eventKey="2">
          Actors
        </NavItem>
        <NavItem eventKey="3">
          Producers
        </NavItem>
        </Nav>
        <div>
          {this.selectView()}
        </div>
      </div>
    );
  }
}

export default App;
