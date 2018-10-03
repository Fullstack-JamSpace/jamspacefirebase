// OB: unused variable firebase
import * as firebase from 'firebase';
import db from './firebase';
import React, { Component, Fragment } from 'react';
import SignupForm from './signup-form';
import history from './history';

export default class SignUp extends Component {
  constructor(){
    super();
    this.handleSignup = this.handleSignup.bind(this)
  }

  handleSignup = event => {
    event.preventDefault();
    // OB: ditto, could wrap up some of this logic into SubmitForm
    const email = event.target.email.value;
    const password = event.target.password.value;
    const firstName = event.target.firstName.value;
    const lastName = event.target.lastName.value;
    const displayName = event.target.displayName.value;
    const imageUrl = event.target.imageUrl.value;

    // OB: consider making a function for all the firebase stuff
    const emailRef = db.collection('jammers').doc(`${email}`)
    emailRef.get().then(user => {
      if (!user.exists) {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
          .then(() => firebase.auth().createUserWithEmailAndPassword(email, password))

          db.collection('jammers').doc(`${email}`).set({
            email,
            firstName,
            lastName,
            displayName,
            imageUrl
        })
      } else alert('That email already has an account with us')
    })
    history.push('/viewer')
  }

  render(){

    return (
      <Fragment>
        <h1>Welcome to Jamspace, baby!</h1>
        <SignupForm handleSignup={this.handleSignup} />
      </Fragment>
    )
  }
}