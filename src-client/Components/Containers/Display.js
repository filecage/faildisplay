import {connect} from 'react-redux';
import React from 'react';
import Service from '../Service';
import ServiceHierarchy from '../../Models/ServiceHierarchy';

export class Display extends React.Component {
    render() {
        return (
            <ul>
                {this.props.services.getSuperParents().map(service => <Service service={service} key={service.getId()}/>)}
            </ul>
        );
    }
}

function mapStateToProps(state) {
    return {
        services: new ServiceHierarchy(state.services)
    }
}

export default connect(mapStateToProps)(Display);