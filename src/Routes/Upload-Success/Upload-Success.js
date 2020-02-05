import React, { Component } from 'react';
import ProducerContext from '../../producerContext'
import {NavLink} from 'react-router-dom'

class UploadSuccess extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static contextType = ProducerContext

    render() {
        const { userId } = this.context

        return (
            <div className='success'>
                <h1>upload complete.</h1>
                <NavLink to ={`/songs/user/${userId}`}>view in my songs here.</NavLink>
            </div>
        );
    }
}

export default UploadSuccess;