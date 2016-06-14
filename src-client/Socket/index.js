import {EventEmitter} from 'events';

export default class Socket extends EventEmitter {
    constructor(url, opts = {}) {
        super();

        if (typeof url === 'object') {
            opts = Object.assign(opts, url);
        } else {
            opts = Object.assign(opts, {url: url});
        }

        this._ws = null;
        this._url = opts.url || url;
        this._connection = 0;
        this._reconnectDelay = opts.reconnectDelay || 500;
        this._maximumRetries = opts.maximumRetries || 10;

        this._connect()
            ._bindComponentEvents();
    }

    _bindComponentEvents() {
        this.on('close', this._reconnect.bind(this));
        this.on('open', this._connected.bind(this));
        this.on('error', () => { console.log('error!'); /* EventEmitter requires an error handler */ });

        return this;
    }

    _reconnect () {
        if (this._connection < this._maximumRetries) {
            this.emit('reconnect');
            setTimeout(() => {
                this._connect();
            }, this._connection * this._reconnectDelay);
        } else {
            this.emit('reconnect-maximum-reached');
        }

        return this;
    }

    _connected () {
        this._connection = 0;

        return this;
    }

    _connect () {
        this._connection++;
        this._ws = this._bindWsEvents(new WebSocket(this._url));

        return this;
    }

    _bindWsEvents(ws) {
        ws.addEventListener('open', this.emit.bind(this, 'open'));
        ws.addEventListener('message', this.emit.bind(this, 'message'));
        ws.addEventListener('close', this.emit.bind(this, 'close'));
        ws.addEventListener('error', this.emit.bind(this, 'error'));

        return ws;
    }
}