import Service from './Service';

export default class ServiceHierarchy {
    /**
     * @param map {Map}
     */
    constructor(map) {
        this._map = map;
    }

    getBranch (id) {
        return this.getAll()[id] || null;
    }
    
    getAll () {
        var richFlatMap = {};
        this._map.forEach(service => {
            this._createServiceWithSubs(richFlatMap, service);
        });

        return richFlatMap;
    }

    getSuperParents () {
        var richFlatMap = this.getAll();

        return Object.keys(richFlatMap)
            .map(id => richFlatMap[id])
            .filter(service => service.hasParent() === false);
    }

    /**
     * @param object {{id: string, subServices: array}}
     * @param parent
     * @param richFlatMap {Object.<string, Service>}
     */
    _createServiceWithSubs (richFlatMap, object, parent = null) {
        var service = richFlatMap[object.id] || Service.createFromObject(object, parent);
        if (Array.isArray(object.subServices)) {
            object.subServices.forEach(subServiceId => {
                var subService = this._map.get(subServiceId) || null;
                if (subService === null) {
                    return console.warn('service %s (id: %s) has invalid sub-service with id %s', service.getName(), service.getId(), subServiceId);
                }

                service.addSubService(this._createServiceWithSubs(richFlatMap, subService, service));
            });
        }

        if (parent !== null && !service.hasParent()) {
            service.setParent(parent);
        }

        return richFlatMap[object.id] = service;
    }
}