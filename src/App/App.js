import React, { Component } from 'react';
import './App.css';
import Home from '../Routes/Home/Home'
import Landing from '../Routes/Landing/Landing'
import Signup from '../Routes/Signup/Signup'
import Upload from '../Routes/Upload/Upload'
import producerContext from '../producerContext'
import Login from '../Routes/Login/Login'
import Nav from '../Routes/Nav/Nav'
import SongsByUser from '../Routes/Songs-By-User/Songs-By-User'
import { Route, Switch, withRouter } from 'react-router-dom'
// import ApiService from '../services/api-service'


class App extends Component {
  state = {
    foo: ''
  }

  componentDidMount() {

  }

  render() {
    const contextValue = {

    }
    return (
      <producerContext.Provider value={contextValue}>
        <Route path='/' component={Nav} />
        <main>
          <Switch>
            <Route path='/' component={Landing} exact />
            <Route path='/home' component={Home} />
            <Route path='/upload' component={Upload} />
            <Route path='/signup' render={(props) => <Signup {...props} setUserId={this.setUserId} />} />
            <Route path='/login' render={(props) => <Login {...props} setUserId={this.setUserId} />} />
            <Route path='/songs/user/:id' render={(props) => <SongsByUser {...props} setUserId={this.setUserId}/>} />
          </Switch>
        </main>
      </producerContext.Provider>
    );
  }
}

export default withRouter(App);


