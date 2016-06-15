import React from 'react';
import ReactDOM from 'react-dom';
import Display from './Components/Containers/Display';
import App from './App';
import Socket from './Socket';
import Reducers from './Reducers';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

app.sync();
let store = createStore(Reducers);
let socket = new Socket('ws://localhost:3000');
let app = new App(socket);

ReactDOM.render(
    <Provider store={store}>
        <Display/>
    </Provider>,
    document.getElementById('app')
);

socket.connect();