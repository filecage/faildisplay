import {EventEmitter} from 'events';
import Service from '../Models/Service';
import * as ServiceAction from '../Actions/services';

export default class App extends EventEmitter {
    constructor(socket, store) {
        super();

        this._socket = socket;
        this._store = store;
    }
    
    sync() {
        this._socket.on('message', (type, message) => {
            switch (type) {
                case 'initialState':
                    this._store.dispatch(ServiceAction.replaceServices(message.payload.services.map(service => Service.createFromObject(service))));
                    break;

                case 'update':
                    this._store.dispatch(ServiceAction.updateService(Service.createFromObject(message.payload.newService)));
                    break;

                case 'insert':
                    this._store.dispatch(ServiceAction.insertService(Service.createFromObject(message.payload.newService)));
                    break;

                case 'delete':
                    this._store.dispatch(ServiceAction.deleteService(message.payload.service.id));
                    break;
            }
        })
    }
}