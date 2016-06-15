import {connect} from 'react-redux';
import React from 'react';
import Service from '../Service';

export class Display extends React.Component {
    render() {
        return (
            <ul>
                {this.props.services.map(service => <Service service={service} key={service.getId()}/>)}
            </ul>
        );
    }
}

function mapStateToProps(state) {
    return {
        services: state.services
    }
}

export default connect(mapStateToProps)(Display);