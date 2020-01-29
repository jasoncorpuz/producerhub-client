import React, { Component } from 'react';
import TokenService from '../../services/token-service'
import ApiService from '../../services/api-service'
import Song from '../Song/Song'
import { NavLink, Link } from 'react-router-dom'

class Home extends Component {
    state = {
        songs: [{}],
        loaded: false
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

    setSongs = fetchedSongs => {
        this.setState({
            songs: fetchedSongs,
            loaded: true
        })
    }
    //render song feed
    //upload
    // nav
    componentDidMount() {
        this.setToken(TokenService.getAuthToken())
        ApiService.getAllSongs()
            .then(res => this.setSongs(res))
            .catch(err => { throw new Error(err) })

    }
    render() {
        const { songs, loaded } = this.state
        const songList = loaded ?
            songs.map((song, idx) => {
                return (
                    <Song {...song} key={idx} />
                )
            })
            : null
        return (
            <div>
                <h1>{this.state.username}</h1>
                <h2>
                    <NavLink to={`/songs/user/${this.state.id}`}>my songs</NavLink>
                    {' '}
                    <Link to='/upload'>upload</Link>
                </h2>
                {songList}
            </div>
        );
    }
}

export default Home;