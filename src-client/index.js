import React from 'react';
import ReactDOM from 'react-dom';
import Display from './Components/Containers/Display';
import App from './App';
import Socket from './Socket';

var socket = new Socket('ws://localhost:3000');
var app = new App(socket);
app.sync();

ReactDOM.render(
    <Display app={app}/>,
    document.getElementById('app')
);

socket.connect();