import React, { Component } from 'react';
import ApiService from '../../services/api-service'
import producerContext from '../../producerContext'

class LikeButton extends Component {
    state = {
        likes: [{}]
    }

    static contextType = producerContext

    postLike(e, cb) {
        //song id 
        const { id, addLike } = this.props
        console.log(id, 'posted!')
        ApiService.uploadLike(id)
        .then(res => res.json())
        .catch(e => console.log(e))
        addLike(); 
    }

    deleteLike(likeId) {
        console.log(likeId)
        const {subtractLike} = this.props
        ApiService.deleteLike(likeId)
        subtractLike();
    }

    render() {
        const { likes, user } = this.props

        const likedByUser = likes.find(like => user === like.user_id)
        
        const renderLikeButton = likedByUser ?
        
            <button
                onClick={(e) => this.deleteLike(likedByUser.id)}
            >
                unlike 
            </button>
            
            :
            <button
                onClick={(e) => this.postLike(e)}
            >
                like
            </button>


        // app tries to find if user id matches a like
        // if it matches, render liked.
        // if no match, api call to like
        return (<>
            {renderLikeButton}
        </>
        )
    }
}

export default LikeButton;