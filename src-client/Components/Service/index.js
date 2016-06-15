import React from 'react';

export default class Service extends React.Component {
    render () {
        return (<div>{this.props.service.getName()} is {this.props.service.getStatus()}</div>);
    }
}