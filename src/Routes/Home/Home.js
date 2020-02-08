import React, { Component } from 'react';
import Song from '../Song/Song'
import { NavLink, Link } from 'react-router-dom'
import ProducerContext from '../../producerContext'
import TokenService from '../../services/token-service'

class Home extends Component {
    state = {
        songs: [{}],
        loaded: false
    }

    static contextType = ProducerContext

    handleSort(e) {
        const { sortSongs } = this.context
        sortSongs(e.target.value)
    }

    componentDidMount() {
        this.setToken(TokenService.getAuthToken())
    }

    setToken = token => {
        if (token) {
            this.setState({
                token
            })
            const jwt = TokenService.parseJsonToken(token)
            const { user_id, sub } = jwt

            this.setState({
                user_id,
                username: sub
            })
        }
    }

    render() {
        const { songs } = this.context
        const userId = this.state.user_id
        const songList = songs.length !== 1 ?
            songs.map((song, idx) => {
                return (
                    <Song {...song} key={idx} user={userId} />
                )
            })
            : null
        return (
            <div>
                <h1>{this.state.username}</h1>
                <h2>
                    <NavLink to={`/songs/user/${userId}`}>my songs</NavLink>
                    {' '}
                    <Link to='/upload'>upload</Link>
                </h2>
                <label htmlFor='select'>order by</label>
                {' '}
                <select onChange={e => this.handleSort(e)}>
                    <option value='newest'>newest</option>
                    <option value='oldest'>oldest</option>
                </select>
                {songList}
            </div>
        );
    }
}

export default Home;