import React, { Component } from 'react';
import Song from '../Song/Song'
import ProducerContext from '../../producerContext'
import ApiService from '../../services/api-service';
import { Link } from 'react-router-dom'


class SongsByUser extends Component {
    state = {
        songs: [{}],
        loaded: false,
        user: '', 
        error: false,
    }

    static contextType = ProducerContext

    componentDidMount() {
        const currentUser = Number(this.props.match.params.id)
        this.setState({
            currentUser
        })

        ApiService.getSongByUserId(currentUser)
            .then(res => this.setState({
                songs: res,
                loaded: true
            }))
            .catch(e => this.setState({ error: true}))

        ApiService.getUserbyId(currentUser)
            .then(res => this.setState({
                user: res[0].username
            }))
    }

    renderNoSongsUploaded() {
        return (
            <>
                <h2>No songs uploaded yet!</h2>
                <p><Link to='/upload'>get started here.</Link></p>
            </>
        )
    }

    renderThisUserHasNoSongs(){
        return(
            <h2>This user hasn't uploaded any songs yet!</h2>
        )
    }

    render() {
        const { songs, loaded, user, error, currentUser } = this.state
        const { userId } = this.context
        const renderUser = user.length
            ? <h1>{user}</h1>
            : null
        const songList = loaded ? songs.map((song, idx) => {
            return <Song {...song} key={idx} user={userId} />
        }) : null

       

        const renderMessage = userId === currentUser
        ? this.renderNoSongsUploaded()
        : this.renderThisUserHasNoSongs()

        const checkError = error ? renderMessage : null

        return (
            <div className='songs-by-user'>
                {renderUser}
                {checkError}
                {songList}
            </div>
        );
    }
}

export default SongsByUser;