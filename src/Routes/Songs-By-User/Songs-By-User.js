import React, { Component } from 'react';
import Song from '../Song/Song'
import ProducerContext from '../../producerContext'
import ApiService from '../../services/api-service';



class SongsByUser extends Component {
    state = {
        songs: [{}],
        loaded: false
    }

    static contextType = ProducerContext

    componentDidMount() {
        const currentUser = Number(this.props.match.params.id)
        ApiService.getSongByUserId(currentUser)
            .then(res => this.setState({
                songs: res,
                loaded: true
            }))
    }

    render() {
        const { songs, loaded } = this.state
        const {userId} = this.context

        const songList = loaded ? songs.map((song, idx) => {
            return <Song {...song} key={idx} user={userId} />
        }) : null
        return (
            <div>
                {songList}
            </div>
        );
    }
}

export default SongsByUser;