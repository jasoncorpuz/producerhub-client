import React, { Component } from 'react';
import ApiService from '../../services/api-service'
import { NavLink } from 'react-router-dom';
import LikeButton from '../Like-Button/Like-Button'
import ProducerContext from '../../producerContext'


class Song extends Component {
    state = {
        likeCount: 0,
        likesArray: [{}]
    }

    static contextType = ProducerContext

    setLikesCounts() {


    }

    setLikes(data) {
        this.setState({
            likeCount: data.length,
            likesArray: data
        })
    }

    uploadLike(e) {
        const songId = e.target.value
        ApiService.postLike(songId)
            .then(res => res.json())
            .then(json => console.log(json))
        // .catch(e => console.log(e))
    }

    addLike() {
        this.setState({
            likeCount: this.state.likeCount + 1
        })
        console.log('ran')
    }

    subtractLike() {
        this.setState({
            likeCount: this.state.likeCount - 1
        })
        console.log('ran')
    }

    componentDidMount() {
        const songId = this.props.id
        ApiService.getLikesBySongId(songId)
            .then(res => this.setLikes(res))
            .catch(e => null)
    }

    render() {
        const { likeCount, likesArray } = this.state
        const { user } = this.props //drilling


        return (
            <div className='song'>
                <h3>{this.props.title}</h3>
                <NavLink to={`/songs/user/${this.props.user_id}`}><h4>{this.props.username}</h4></NavLink>
                <audio controls>
                    <source src='https://test-300.s3.amazonaws.com/Untitled.mp3'
                        type='audio/mp3' />
                </audio>
                <p>{likeCount} musicians like this track</p>
                <LikeButton
                    likes={likesArray}
                    {...this.props}
                    user={user}
                    addLike={() => this.addLike()}
                    subtractLike={() => this.subtractLike()}
                />
            </div>
        )
    }
}

export default Song;

