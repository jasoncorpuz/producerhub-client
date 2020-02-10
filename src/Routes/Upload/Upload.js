import React, { Component } from 'react';
import ApiService from '../../services/api-service';
import Loader from '../Components/loader'
import ProducerContext from '../../producerContext'
import './Upload.css'

class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            location: '',
            error: false,
            uploadError: null,
            loading: false,
        };
    }

    static contextType = ProducerContext

    fileSelectedHandler = event => {
        const file = event.target.files[0]
        this.setState({
            file: file,
        })
        //file.type
    }

    setLoading() {
        this.setState({ loading: true })
    }

    verifyAudio(e) {
        e.preventDefault()
        const fileType = this.state.file.type
        if (fileType.includes('audio')) {
            this.uploadSong()
            this.setLoading()
        } else {
            this.setState({
                error: true
            })
        }
    }


    uploadSong() {
        const song = this.state.file
        const fd = new FormData()


        fd.append('element1', ' ')
        fd.append('element2', song)


        ApiService.upload(fd)
            .then(res => res.data)
            .then(location => this.uploadSongData(location))
            .catch(e => this.setState({
                uploadError: e,
                loading: false
            }))
    }


    uploadSongData(url) {
        //posts song data to database once it has the url

        const { location } = url
        const { title, description } = this.state

        const newSongData = {
            title: title,
            description: description,
            location: location,
        }

        ApiService.saveSong(newSongData)
            .then(song => {
                this.context.addSong(song)
                this.props.history.push('/upload-success')
            })

    }

    updateTitle(title) {
        this.setState({
            title: title
        })
    }

    updateDescription(description) {
        this.setState({
            description: description
        })
    }

    renderVerificationError() {
        return (
            <div>
                file must be an audio file.
        </div>
        )
    }

    renderUploadError(error) {
        return (
            <div>
                oops, there was an error with your upload. please try again.
            </div>
        )
    }

    //verify audio file
    render() {
        const { error, loading, uploadError } = this.state
        return (
            <form onSubmit={(e) => this.verifyAudio(e)}>
                <legend><h1>upload.</h1></legend>
                <label htmlFor='title'>title:</label>
                <input type='text' placeholder='requiem for a dream' required onChange={e => this.updateTitle(e.target.value)} />
                <label htmlFor='file'>audio file:</label>
                <input type='file' onChange={this.fileSelectedHandler} required />
                <label htmlFor='description'>description:</label>
                <textarea
                    className='text-area'
                    rows='3'
                    columns='10'
                    type='text area'
                    placeholder='write a short description...'
                    required
                    onChange={e => this.updateDescription(e.target.value)} />
                <button type='submit'>upload</button>
                {error && this.renderVerificationError()}
                {uploadError && this.renderUploadError()}
                <div className="sweet-loading">
                <Loader
                    loading={loading}
                />
                </div>
            </form>
        );
    }
}

export default Upload;