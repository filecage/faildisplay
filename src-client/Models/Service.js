export default class Service {

    /**
     * @param object
     * @param parent
     * @returns {Service}
     */
    static createFromObject (object, parent = null) {
        var service = new Service(object.id, object.name, object.status, parent);
        if (Array.isArray(object.subServices)) {
            object.subServices.forEach(subService => service.addSubService(Service.createFromObject(subService, service)));
        }

        return service;
    }

    constructor (id, name, status, parent = null, subServices = []) {
        this._id = id;
        this._name = name;
        this._status = status;
        this._parent = parent;
        this._subServices = subServices;
    }

    getId () {
        return this._id;
    }

    getName () {
        return this._name;
    }

    getStatus () {
        return this._status;
    }

    getParent () {
        return this._parent;
    }

    getSubServices () {
        return this._subServices;
    }

    addSubService (service) {
        this._subServices.push(service);

        return this;
    }
}