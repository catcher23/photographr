import React, { Component } from 'react';
import HeaderContainer from '../containers/HeaderContainer.js';
import ProfileCardContainer from '../containers/ProfileCardContainer.js';

class Profile extends Component {
  render() {
    return (
      <div>
        <HeaderContainer type="posts_new"/>
        <div className="container">
        	<h2>Profile</h2>

        	<div className='well'>
        		<ProfileCardContainer />
        	</div>
        	<div className='well'>
        	</div>
        </div>
      </div>
    );
  }
}


export default Profile;
