import React from 'react';
import ReactDOM from 'react-dom';
import UploadSuccess from './Upload-Success';
import { BrowserRouter } from 'react-router-dom'
import App from '../../App/App'

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
    <BrowserRouter>
        <App>
            <UploadSuccess />
        </App>
    </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
});