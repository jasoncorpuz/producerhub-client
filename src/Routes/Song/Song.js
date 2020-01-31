import React, { Component } from 'react';
import ApiService from '../../services/api-service'
import { NavLink } from 'react-router-dom';

class Song extends Component {
    state = {
        likes: 0
    }

    setLikes(likes) {
        this.setState({
            likes: likes.length
        })
    }

    componentDidMount() {
        ApiService.getLikesBySongId(this.props.id)
            .then(likes => {
                if (!likes.length) {
                    return null
                }
                this.setLikes(likes)
            })
            .catch(err =>  null)
    }

    uploadLike(e) {
        const songId = e.target.value
        ApiService.postLike(songId)
         .then(res => res.json())
         .then(json => console.log(json))
         .catch(e => console.log(e))
    }

    render() {

        return (
            <div className='song'>
                <h3>{this.props.title}</h3>
                <NavLink to={`/songs/user/${this.props.user_id}`}><h4>{this.props.username}</h4></NavLink>
                <audio controls>
                    <source src='https://test-300.s3.amazonaws.com/Untitled.mp3'
                        type='audio/mp3' />
                </audio>
                <p>{this.state.likes} musicians like this track</p>
                <button 
                className='like' 
                type='submit' 
                value={this.props.id}
                onClick={e => this.uploadLike(e)}
                >like</button>
            </div>
        )
    }
}

export default Song;

