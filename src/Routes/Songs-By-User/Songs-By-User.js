import React, { Component } from 'react';
import Song from '../Song/Song'
import ProducerContext from '../../producerContext'



class SongsByUser extends Component {
    state = {
        songs: [{}],
        loaded: false
    }

    static contextType = ProducerContext


    render() {
        const { songs, userId } = this.context
        const currentUser = Number(this.props.match.params.id)
        const songsByUser = songs.filter(song => song.user_id === currentUser)

        const songList = songsByUser ?  songsByUser.map((song, idx) => {
            return <Song {...song} key={idx} user={userId}/>
        }) : null
        return (
            <div>
                {songList}
            </div>
        );
    }
}

export default SongsByUser;