import React from 'react';
import ReactDOM from 'react-dom';
import Display from './Components/Containers/Display';
import App from './App';
import Socket from './Socket';

app.sync();
let socket = new Socket('ws://localhost:3000');
let app = new App(socket);

ReactDOM.render(
    <Display app={app}/>,
    document.getElementById('app')
);

socket.connect();