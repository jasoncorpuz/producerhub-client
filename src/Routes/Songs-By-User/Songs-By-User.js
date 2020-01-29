import React, { Component } from 'react';
import Song from '../Song/Song'
import ApiService from '../../services/api-service'
import TokenService from '../../services/token-service'


class SongsByUser extends Component {
    state = {
        songs: [{}]
    }

    setSongs(songs) {
        this.setState({
            songs: songs
        })
    }


    componentDidMount() {
        ApiService.getSongByUserId(this.props.match.params.id)
            .then(songs => this.setSongs(songs))
    }
    render() {
        const { songs } = this.state
        console.log(songs)
        const songList = songs.map((song, idx) => {
            return <Song {...song} key={idx} />
        })
        return (
            <div>
                {songList}
            </div>
        );
    }
}

export default SongsByUser;