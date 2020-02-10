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
import UploadSuccess from '../Routes/Upload-Success/Upload-Success'
import { Route, Switch, withRouter } from 'react-router-dom'
import ApiService from '../services/api-service';
import TokenService from '../services/token-service'
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { fab } from '@fortawesome/free-brands-svg-icons'
// import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'

// library.add(fab, faCheckSquare, faCoffee)


class App extends Component {
  state = {
    likes: [{}],
    songs: [{}]
  }




  setSongs = fetchedSongs => {
    this.setState({
      songs: fetchedSongs,
      loaded: true
    })
  }
  componentDidMount() {
    this.setToken(TokenService.getAuthToken())
    ApiService.getNewSongs()
      .then(res => this.setSongs(res))
      .catch(err => null)
    ApiService.getAllLikes()
      .then(res => this.setState({
        likes: res
      }))
  }

  addSong = newSong => {
    console.log('called')
    this.setState({
      songs: [...this.state.songs, newSong]
    })
  }

  sortSongs = order =>  {
    order === 'newest'
      ? ApiService.getNewSongs()
        .then(res => this.setSongs(res))
        .catch(err => console.log(err))
      : ApiService.getAllSongs()
        .then(res => this.setSongs(res))
        .catch(err => console.log(err))
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
      userId: this.state.id,
      addSong: this.addSong, 
      sortSongs: this.sortSongs
    }

    const { username } = this.state
    return (
      <producerContext.Provider value={contextValue}>
        <Route path='/' component={Nav} />
        <main>
          <Switch>
            <Route path='/' component={Landing} exact />
            <Route path='/home' render={(props) => <Home {...props} username={username} />} />
            <Route path='/upload' component={Upload} />
            <Route path='/upload-success' component={UploadSuccess} />
            <Route path='/signup' render={(props) => <Signup {...props} setUserId={this.setUserId} />} />
            {/* <Route path='/login' render={(props) => <Login {...props} setUserId={this.setUserId} />} /> */}
            <Route path='/login' component={Login} />
            <Route path='/songs/user/:id' render={(props) => <SongsByUser {...props} setUserId={this.setUserId} />} />
          </Switch>
        </main>
      </producerContext.Provider>
    );
  }
}

export default withRouter(App);


