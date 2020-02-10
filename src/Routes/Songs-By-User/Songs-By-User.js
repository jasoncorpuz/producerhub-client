import React, { Component } from 'react';
import Song from '../Song/Song'
import ProducerContext from '../../producerContext'
import ApiService from '../../services/api-service';



class SongsByUser extends Component {
    state = {
        songs: [{}],
        loaded: false,
        user:''
    }

    static contextType = ProducerContext

    componentDidMount() {
        const currentUser = Number(this.props.match.params.id)
        ApiService.getSongByUserId(currentUser)
            .then(res => this.setState({
                songs: res,
                loaded: true
            }))
        
        ApiService.getUserbyId(currentUser)
         .then(res => this.setState({
             user: res[0].username
         }))
    }

    render() {
        const { songs, loaded, user} = this.state
        console.log(user)
        const {userId} = this.context
        const renderUser = user.length 
        ? <h1>{user}</h1>
        : null
        const songList = loaded ? songs.map((song, idx) => {
            return <Song {...song} key={idx} user={userId} />
        }) : null
        return (
            <div>
                {renderUser}
                {songList}
            </div>
        );
    }
}

export default SongsByUser;