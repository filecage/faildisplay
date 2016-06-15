export const INSERT_SERVICE = 'INSERT_SERVICE';
export const DELETE_SERVICE = 'DELETE_SERVICE';
export const UPDATE_SERVICE = 'UPDATE_SERVICE';
export const REPLACE_SERVICES = 'REPLACE_SERVICES';

export function insertService(service) {
    return {type: INSERT_SERVICE, service};
}

export function deleteService(serviceId) {
    return {type: DELETE_SERVICE, serviceId};
}

export function updateService(service) {
    return {type: UPDATE_SERVICE, service};
}

export function replaceServices(services) {
    return {type: REPLACE_SERVICES, services};
}