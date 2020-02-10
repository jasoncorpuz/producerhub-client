import React, { Component } from 'react';
import ApiService from '../../services/api-service'
import producerContext from '../../producerContext'
import './Like-button.css'

class LikeButton extends Component {
    state = {
        likes: [{}],
        touched: false,
        liked: true,
        likestatus: 'like',
        id: ''
    }

    static contextType = producerContext

    setId(res) {
        const id = res.response.id
        this.setState({
            id: id
        })
    }

    postLike(e, cb) {
        //song id 
        const { id, addLike } = this.props
        ApiService.uploadLike(id)
            .then(res => res.json())
            .then(res => this.setId(res))
            .catch(e => console.log(e))
        addLike();
        this.setState({
            likestatus: 'unlike',
            liked: true,

        })
    }

    deleteLike(likeId) {
        const { subtractLike } = this.props
        ApiService.deleteLike(likeId)
        subtractLike();
        this.setState({
            likestatus: 'like',
            liked: false
        })
    }

    render() {
        const { likes, user, liked } = this.props

        const likeByUser = likes.find(like => user === like.user_id)
        const id = !likeByUser ? this.state.id : likeByUser.id
        const renderNextLikeButton = liked ?

            <button
                className='like-button like-button-animated'
                onClick={(e) => this.deleteLike(id)}
            >
                unlike
            </button>

            :
            <button
            className='like-button like-button-animated'
                onClick={(e) => this.postLike(e)}
            >
                like
            </button>


        // app tries to find if user id matches a like
        // if it matches, render liked.
        // if no match, api call to like
        return (
            <>
                {renderNextLikeButton}
            </>
        )
    }
}

export default LikeButton;