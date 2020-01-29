import React, { Component } from 'react';
import ApiService from '../../services/api-service'

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
                <h4>{this.props.username}</h4>
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

