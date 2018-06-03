import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { auth, provider } from '../../utils/firebase';
import { authenticate, saveToDb } from '../../utils/auth';

import Google from './search.svg';
import Logo1 from './chauffeur.svg';
import './signup.css';
import { UserContext } from '../context/user.provider';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signUpSuccess: false,
    };
    this.onClick = this.onClick.bind(this);
  }

  async onClick() {
    try {
      const data = await auth.signInWithPopup(provider);
      const user = {
        token: data.credential.accessToken,
        name: data.user.displayName,
        email: data.user.email,
        id: data.user.uid,
        type: 'applicant',
      };
      const url = `users/${user.id}`;
      saveToDb(url, user).then((f) => {
        this.setUser(user);
        authenticate(user).then(() => {
          this.setState({ signUpSuccess: true });
        });
      }, (err) => {
        console.log(err, '=>')
      });
    } catch (e) {}
  }

  render() {
    return this.state.signUpSuccess ? (
      <Redirect to="/dashboard" />
    ) : (
      <UserContext>
        {({ setUser }) => {
          this.setUser = setUser;
          return (
            <div className="login-box">
              <div className="w-1/4 mx-auto shadow-lg rounded-lg bg-white py-8 px-6 flex flex-col items-center">
                <h2 className="brand-name my-4 text-orange opacity-75">
                  Driver Safe
                </h2>
                <div>
                  <img src={Logo1} alt="" className="w-32 h-32" />
                </div>
                <h3 className="text-center mt-4 mb-6 opacity-50">Sign Up</h3>
                <button
                  className="border-none shadow-md rounded-sm px-6 py-3 flex font-semibold hover:shadow-lg"
                  onClick={this.onClick}
                >
                  <img src={Google} alt="" className="mr-4 w-4 h-4" />
                  Sign up with Google
                </button>
                <Link
                  to="/login"
                  className="text-sm text-black opacity-75 hover:text-orange mt-4 no-underline"
                >
                  Sign In
                </Link>
              </div>
            </div>
          );
        }}
      </UserContext>
    );
  }
}

export default SignUp;
