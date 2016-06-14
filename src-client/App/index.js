import {EventEmitter} from 'events';
import Service from '../Models/Service';

export default class App extends EventEmitter {
    constructor(socket) {
        super();

        this._socket = socket;
        this._services = [];
    }
    
    sync() {
        this._socket.on('message', (type, message) => {
            switch (type) {
                case 'initialState':
                    this._services = message.payload.map(service => Service.createFromObject(service));
                    this.emit('update');
                    break;

                case 'update':
                    var newService = message.payload.newService;
                    this._services = this._services.map(service => {
                        if (service.getId() !== newService.id) {
                            return service;
                        }

                        return Service.createFromObject(newService);
                    });
                    this.emit('update');
                    break;

                case 'insert':
                    this._services.push(Service.createFromObject(message.payload));
                    this.emit('update');
                    break;

                case 'delete':
                    this._services.filter(service => {
                        return service.getId() !== message.payload.id;
                    });
                    this.emit('update');
                    break;
            }
        })
    }

    getServices () {
        return this._services;
    }
}