import React, { Component } from 'react';
import './App.css';
import Home from '../Routes/Home/Home'
import Landing from '../Routes/Landing/Landing'
import Signup from '../Routes/Signup/Signup'
import Upload from '../Routes/Upload/Upload'
import producerContext from '../producerContext'
import { Route, Switch, withRouter} from 'react-router-dom'



class App extends Component {
  state = {
    foo: ''
  }
  render() {
    const contextValue = {

    }
    return (
      // <producerContext.Provider value={contextValue}>
      <main>
            <Route path='/' Component={Landing} exact />
            <Route path='/home' Component={Home}  />
            <Route path='/Signup' Component={Signup}  />
            <Route path='/Upload' Component={Upload}  />
      </main>
      // </producerContext.Provider>
    );
  }
}

export default withRouter(App);


