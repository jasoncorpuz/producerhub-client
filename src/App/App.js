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
import ApiService from '../services/api-service';
import TokenService from '../services/token-service'


class App extends Component {
  state = {
    likes: [{}],
    songs: [{}]
  }


  //cbs as arrow functions

  postLike = like => {
    console.log(this.state.likes.length)
    this.setState({
      likes: [...this.state.likes, like]
    })

    this.props.history.push('/home')
    console.log(this.state.likes.length)
    console.log('post like called')
  }

  deleteLike = like => {
    console.log(typeof like)
    console.log(this.state.likes.length)
    const { likes } = this.state
    const newLikes = likes.filter(
      currentLikes => like !== currentLikes.id
    )

    this.props.history.push('/home')
    console.log(newLikes)

    this.setState({
      likes: newLikes
    })
    console.log('delete like called')
    console.log(this.state.likes.length)
  }

  setSongs = fetchedSongs => {
    this.setState({
      songs: fetchedSongs,
      loaded: true
    })
  }
  componentDidMount() {
    this.setToken(TokenService.getAuthToken())
    ApiService.getAllSongs()
      .then(res => this.setSongs(res))
      .catch(err => { throw new Error(err) })
    ApiService.getAllLikes()
      .then(res => this.setState({
        likes: res
      }))
  }

  setToken = token => {
    if (token) {
      this.setState({
        token
      })
      const jwt = TokenService.parseJsonToken(token)
      const { user_id, sub } = jwt

      this.setState({
        id: user_id,
        username: sub
      })
    }
  }
  render() {

    const contextValue = {
      likes: this.state.likes,
      songs: this.state.songs,
      postLike: this.postLike,
      deleteLike: this.deleteLike,
      userId: this.state.id
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
            <Route path='/songs/user/:id' render={(props) => <SongsByUser {...props} setUserId={this.setUserId} />} />
          </Switch>
        </main>
      </producerContext.Provider>
    );
  }
}

export default withRouter(App);


