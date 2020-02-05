import React, { Component } from 'react';
import ApiService from '../../services/api-service'
import { NavLink } from 'react-router-dom';
import LikeButton from '../Like-Button/Like-Button'
import ProducerContext from '../../producerContext'


class Song extends Component {
    state = {
        likeCount: 0,
        likesArray: [{}],
        liked: false
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


    setUserLikes(likes) {
        const { user, id } = this.props

        const likesByUser = likes.filter(like => user === like.user_id)
        const userLikesSong = likesByUser.find(like => like.song_id === id) ? true : false

        this.setState({
            liked: userLikesSong
        })
    }

    uploadLike(e) {
        const songId = e.target.value
        ApiService.postLike(songId)
            .then(res => res.json())
            .then(json => console.log(json))
    }

    addLike() {
        this.setState({
            likeCount: this.state.likeCount + 1,
            liked: true
        })

    }

    subtractLike() {
        this.setState({
            likeCount: this.state.likeCount - 1,
            liked: false
        })

    }


    componentDidMount() {
        const songId = this.props.id
        ApiService.getLikesBySongId(songId)
            .then(res => this.setLikes(res))
            .catch(e => null)

        const { user } = this.props
        ApiService.getLikesByUserId(user)
            .then(res => this.setUserLikes(res))
            .catch(e => null)
    }

    render() {
        const { likeCount, likesArray, liked } = this.state
        const { user, title, user_id, location, description, username} = this.props //drilling

        return (
            <div className='song'>
                <h3>{title}</h3>
                <NavLink to={`/songs/user/${user_id}`}><h4>{username}</h4></NavLink>
                <audio controls controlsList="nodownload">
                    <source src={location}
                        type='audio/mp3' />
                </audio>
                <h4>description:</h4>
                <p className ='description'>{description}</p>
                <p><span className='like-count'>{likeCount} musicians like this track</span></p>
                <LikeButton
                    {...this.props}
                    likes={likesArray}
                    user={user}
                    liked={liked}
                    addLike={() => this.addLike()}
                    subtractLike={() => this.subtractLike()}
                    refetch={() => this.refetch()}                    
                />
            </div>
        )
    }
}

export default Song;

