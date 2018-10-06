import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react'
import '../../css/navbar.css';
// import history from '../../history';
import * as firebase from 'firebase'

export class ProfileIcon extends Component{

  handleLogout = evt => {
    firebase.auth().signOut()
  }

  render(){
    const { jammer } = this.props;
    const trigger = (
      <span>
        <p id='drop-text'>
          Hello, {jammer.displayName}
        </p>
      </span>
    )

    const options = [
      {
        key: 'user',
        text: (
          <span>
            Signed in as <strong>{jammer.displayName}</strong>
          </span>
        ),
        disabled: true,
      },
      { key: 'profile',
        text: (
          <Link className='no-deco' to={`/channels/${jammer.displayName}/profile`}>
            <p className='drop-choice'>Profile</p>
          </Link>
        )
      },
      { key: 'settings', text: (
        <Link className='no-deco' to={`/channels/${jammer.displayName}/account`}>
          <p className='drop-choice'>Account Settings</p>
        </Link>
      ) },
      { key: 'sign-out', text: (
        <Link className='no-deco' to='/' onClick={this.handleLogout}>
          <p className='drop-choice'>Sign Out</p>
        </Link>
      ) },
    ]

    return (
      <Fragment>
      <div id='user-drop-down'>
        <img id='user-sprite' src={jammer.imageUrl} alt='user-pic'/>
        <Dropdown trigger={trigger} options={options} />
      </div>
      </Fragment>
    )
  }

}