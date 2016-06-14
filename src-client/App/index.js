import {EventEmitter} from 'events';
import Service from '../Models/Service';

export default class App extends EventEmitter {
    constructor(socket) {
        super();

        this._socket = socket;
        this._services = [];
    }
    
    getServices () {
        return this._services;
    }
}