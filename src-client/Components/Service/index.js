import React from 'react';

export default class Service extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.service;
    }

    render () {
        return (<div>{this.state.getName()} is {this.state.getStatus()}</div>);
    }
}