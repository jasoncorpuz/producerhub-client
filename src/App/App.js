import React, { Component } from 'react';
import './App.css';
import Home from '../Routes/Home/Home'
import Landing from '../Routes/Landing/Landing'
import Signup from '../Routes/Signup/Signup'
import Upload from '../Routes/Upload/Upload'
import producerContext from '../producerContext'
import Login from '../Routes/Login/Login'
import { Route, Switch, withRouter } from 'react-router-dom'
import ApiService from '../services/api-service'


class App extends Component {
  state = {
    foo: ''
  }

  componentWillMount() {
    ApiService.getSongByUserId(1)
     .then(res => console.log(res))
  }

  render() {
    const contextValue = {

    }
    return (
      <producerContext.Provider value={contextValue}>
        <main>
          <Switch>
            <Route path='/' component={Landing} exact />
            <Route path='/home' component={Home} />
            <Route path='/signup' component={Signup} />
            <Route path='/upload' component={Upload} />
            <Route path='/login' component={Login} />
          </Switch>
        </main>
      </producerContext.Provider>
    );
  }
}

export default withRouter(App);


