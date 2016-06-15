export default class Service {

    /**
     * @param object
     * @param parent
     * @returns {Service}
     */
    static createFromObject (object, parent = null) {
        return new Service(object.id, object.name, object.status, parent);
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

    hasParent () {
        return !!this._parent;
    }

    getParent () {
        return this._parent;
    }

    setParent (parent) {
        this._parent = parent;

        return this;
    }

    getSubServices () {
        return this._subServices;
    }

    addSubService (service) {
        if (this._subServices.some(existingService => existingService.getId() === service.getId())) {
            return this;
        }
        
        this._subServices.push(service);

        return this;
    }
}