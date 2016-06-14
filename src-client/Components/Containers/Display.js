import React from 'react';
import Service from '../Service';

export default class Display extends React.Component {
    render() {
        return (
            <ul>
                {this.props.app.getServices().map(service => <Service service={service} key={service.getId()}/>)}
            </ul>
        );
    }
}