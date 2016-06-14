var rethink = require('rethinkdb');
var EventEmitter = require('events').EventEmitter;

module.exports = class Persistence extends EventEmitter {
    constructor(connection) {
        super();
        this._connection = connection;
        this._listening = false;
    }

    getInitialState (callback) {
        this._selectServices(cursor => {
            cursor.toArray((error, state) => {
                if (error) {
                    return console.error(error);
                }

                callback(state);
            })
        });
    }

    listen () {
        if (this._listening) {
            return this;
        }

        this._listening = true;
        this._getServiceSelector().changes().run(this._connection, (error, cursor) => {
            if (error) {
                return console.error(error);
            }

            cursor.each((error, service) => {
                if (error) {
                    return console.error(error);
                }

                this.emit(service.old_val === null ? 'insert' : service.new_val === null ? 'delete' : 'update', service.new_val, service.old_val);
            })
        })
    }

    _selectServices (callback) {
        this._getServiceSelector().run(this._connection, (error, cursor) => {
            if (error) {
                return console.error(err);
            }

            callback(cursor);
        })
    }

    _getServiceSelector () {
        return rethink.table('services');
    }
};