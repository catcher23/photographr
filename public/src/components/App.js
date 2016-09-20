import React from 'react';
import { Component } from 'react';

export default class App extends Component {
	componentWillMount() {
    this.props.loadUserFromToken();
    this.props.getGeolocation();
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
