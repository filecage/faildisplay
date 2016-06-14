import {EventEmitter} from 'events';

export default class App extends EventEmitter {
    constructor(socket) {
        super();
        
        this._socket = socket;
    }
}