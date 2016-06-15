import Service from './Service';

export default class ServiceHierarchy {
    /**
     * @param serviceList {Object[]}
     */
    constructor(serviceList = []) {
        this._list = serviceList;
        this._map = this.getServiceMapFlatIndexed(serviceList);
    }

    }
    
    getAll () {
        var richFlatMap = {};
        this._list.forEach(item => {
            this._createServiceWithSubs(richFlatMap, item);
        });

        return Object.keys(richFlatMap).map(id => richFlatMap[id]).filter(service => service.hasParent() === false);
    }

    /**
     * @param list {Object[]}
     * @returns {Object.<string, Object>}
     */
    getServiceMapFlatIndexed (list) {
        var index = {};
        list.forEach(item => {
            index[item.id] = item;
        });

        return index;
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
                var subService = this._map[subServiceId] || null;
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