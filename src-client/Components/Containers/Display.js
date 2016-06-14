import React from 'react';
import Service from '../Service';

export default class Display extends React.Component {
    constructor(props) {
        super(props);
        this.state = Object.assign({}, props);
        this.state.services = this.props.app.getServices();

        this.props.app.on('update', () => {
            this.setState({
                services: this.props.app.getServices()
            });
        })
    }

    render() {
        return (
            <ul>
                {this.state.services.map(service => <Service service={service} key={service.getId()}/>)}
            </ul>
        );
    }
}