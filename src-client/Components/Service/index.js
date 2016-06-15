import React from 'react';

export default class Service extends React.Component {
    render () {
        var subServices = this.props.service.getSubServices();

        return (<li>{this.props.service.getName()} is {this.props.service.getStatus()}{subServices.length ? this.buildSubServiceList(subServices) : null}</li>);
    }

    buildSubServiceList (subServices) {
        return (<ul>
            {subServices.map(subService => <Service service={subService} key={subService.getId()}/>)}
        </ul>);
    }
}