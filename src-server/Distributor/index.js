var WebSocketServer = require('ws').Server;
var EventEmitter = require('events').EventEmitter;

module.exports = class Distributor extends EventEmitter {
    constructor(persistence, port = 3000) {
        super();
        this._persistence = persistence;
        this._wss = new WebSocketServer({port: port});
        this._bindEvents();
    }

    _bindEvents () {
        this._wss.on('connection', (connection) => {
            connection.on('message', this._request.bind(this, connection));
            this._initialSync(connection);
        });

        this._persistence.on('update', this._update.bind(this));
        this._persistence.on('insert', this._insert.bind(this));
        this._persistence.on('delete', this._delete.bind(this));
    }

    _initialSync (connection) {
        this._persistence.getInitialState(services => connection.send(this._packMessage('initialState', {services})));

        return this;
    }

    _request (message) {
        console.log(message);
    }

    _update (newService, oldService) {
        this._broadcast('update', {
            newService: newService,
            oldService: oldService
        });
    }

    _insert (newService) {
        this._broadcast('insert', {newService});
    }

    _delete (newService, service) {
        this._broadcast('delete', {service});
    }

    _broadcast (type, payload) {
        var message = this._packMessage(type, payload);
        this._wss.clients.forEach(client => {
            client.send(message);
        });

        return this;
    }

    _packMessage (type, payload) {
        return JSON.stringify({
            type: type,
            payload: payload
        });
    }
};