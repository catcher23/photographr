import React, { Component } from 'react';
import { connect } from 'react-redux';
import { meFromToken, meFromTokenSuccess, meFromTokenFailure, resetToken, currentPosition } from '../actions/usersActions';
import App from '../components/App.js';

const mapDispatchToProps = (dispatch) => {
	return {
		loadUserFromToken: () => {
			let token = sessionStorage.getItem('jwtToken');
			if (!token || token === '') {//if there is no token, dont bother
				return;
			}

			//fetch user from token (if server deems it's valid token)
			dispatch(meFromToken(token))
				.then((response) => {
					if (!response.error) {
						//reset token (possibly new token that was regenerated by the server)
						sessionStorage.setItem('jwtToken', response.payload.data.token);
						dispatch(meFromTokenSuccess(response.payload))
					} else {
						sessionStorage.removeItem('jwtToken');//remove token from storage
						dispatch(meFromTokenFailure(response.payload));
					}
				});
		},

		resetMe: () => {
			sessionStorage.removeItem('jwtToken'); //remove token from storage
			dispatch(resetToken());
		},

		getGeolocation: () => {
			let cbSuccess = (position) => {
				let coords = {};
				coords['lat'] = position.coords.latitude;
				coords['lng'] = position.coords.longitude;
				dispatch(currentPosition(coords));
			};
			let cbError = () => {
				console.log('error')
			};
			navigator.geolocation.getCurrentPosition(cbSuccess, cbError)
		}
	}
};


export default connect(null, mapDispatchToProps)(App);