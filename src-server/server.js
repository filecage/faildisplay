var connectionManager = require('./Persistence/ConnectionManager');
var Persistence = require('./Persistence');
var Distributor = require('./Distributor');

connectionManager(connection => {
    var persistence = new Persistence(connection);
    var distributor = new Distributor(persistence);

    persistence.listen();
});
