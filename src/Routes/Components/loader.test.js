import React from 'react';
import ReactDOM from 'react-dom';
import Loader from './loader';
import { BrowserRouter } from 'react-router-dom'
import App from '../../App/App'

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
    <BrowserRouter>
        <App>
            <Loader />
        </App>
    </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
});