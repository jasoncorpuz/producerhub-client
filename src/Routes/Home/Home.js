import React, { Component } from 'react';
import Song from '../Song/Song'
import { NavLink, Link } from 'react-router-dom'
import ProducerContext from '../../producerContext'

class Home extends Component {
    state = {
        songs: [{}],
        loaded: false
    }

    static contextType = ProducerContext

    render() {
        const { songs, userId } = this.context
        const songList = songs.length !== 1 ?
            songs.map((song, idx) => {
                return (
                    <Song {...song} key={idx} user={userId}/>
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