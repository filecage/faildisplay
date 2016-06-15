import * as Service from '../Actions/services';
import {List} from 'immutable';

export default (state, action) => {
    switch (action.type) {
        case Service.REPLACE_SERVICES:
            return List(action.services);

        case Service.INSERT_SERVICE:
            return state.push(action.service);
        
        case Service.UPDATE_SERVICE:
            return state.map(service => {
                if (service.getId() !== action.service.getId()) {
                    return service;
                }
                return action.service;
            });
        
        case Service.DELETE_SERVICE:
            return state.filter(service => service.getId() !== action.serviceId);
    }

    return state || List();
}