var rethink = require('rethinkdb');
module.exports = function connect (callback) {
    rethink.connect({host: 'localhost', port: 28015}, (err, conn) => {
        if (err) {
            throw err;
        }

        callback(conn);
    });
};