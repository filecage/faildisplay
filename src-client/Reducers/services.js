import * as Service from '../Actions/services';
import {Map} from 'immutable';

function indexServiceList (list) {
    var map = {};
    list.forEach(item => map[item.id] = item);

    return map;
}

export default (state, action) => {
    switch (action.type) {
        case Service.REPLACE_SERVICES:
            return Map(indexServiceList(action.services));

        case Service.UPDATE_SERVICE:
        case Service.INSERT_SERVICE:
            return state.set(action.service.id, action.service);
        
        case Service.DELETE_SERVICE:
            return state.delete(action.service.id);
    }

    return state || Map();
}