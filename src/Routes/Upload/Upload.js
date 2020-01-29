import React, { Component } from 'react';
import ApiService from '../../services/api-service';

class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null
        };
    }

    fileSelectedHandler = event => {
        const file = event.target.files[0]
        this.setState({
            file: file
        })
        //file.type

    }
    onSubmit(e) {
        e.preventDefault()
        const song = this.state.file
        console.log(song.name)
        const fd = new FormData()
        fd.append('element1', ' ')
        fd.append('element2', song)
    
        ApiService.upload(fd)
         .then(res => console.log(res))
    }

    updateTitle(title) {
        console.log(title)
    }

    updateDescription(description) {
        console.log(description)
    }
    //verify audio file
    render() {
        console.log(this.state)
        return (
            <form onSubmit={(e) => this.onSubmit(e)}>
                <legend><h1>upload.</h1></legend>
                <label htmlFor='title'>title:</label>
                <input type='text' placeholder='requiem for a dream' onChange={e => this.updateTitle(e.target.value)}  />
                <label htmlFor='file'>audio file:</label>
                <input type='file' onChange={this.fileSelectedHandler} required />
                <label htmlFor='description'>description</label>
                <input type='text area' placeholder='write a short description of your track'  onChange={e => this.updateDescription(e.target.value)} />
                <button type='submit'>upload</button>
            </form>
        );
    }
}

export default Upload;