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

    componentWillMount() {
        ApiService.getLikesBySongId(this.props.id)
            .then(likes => this.setLikes(likes))
            .catch(err => console.log('no likes yet'))
    }
    render() {
        console.log(this.props)
        return (
            <div className='song'>
                <h3>{this.props.title}</h3>
                <NavLink to={`/songs/user/${this.props.user_id}`}><h4>{this.props.username}</h4></NavLink>
                <audio controls>
                    <source src='https://test-300.s3.amazonaws.com/Untitled.mp3'
                        type='audio/mp3' />
                </audio>
                <p>{this.state.likes} musicians like this track</p>
            </div>
        )
    }
}

export default Song;

