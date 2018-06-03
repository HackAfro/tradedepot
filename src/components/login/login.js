import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { auth, provider, db } from '../../utils/firebase';
import { authenticate } from '../../utils/auth';

import Google from './search.svg';
import Logo1 from './chauffeur.svg';
import './login.css';
import { UserContext } from '../context/user.provider';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginSuccess: false,
      userTypes: ['Applicant', 'Reviewer', 'Processor'],
      userType: 'applicant',
    };
    this.onClick = this.onClick.bind(this);
    this.changeUserType = this.changeUserType.bind(this);
  }

  async onClick() {
    try {
      const {
        user: { uid },
      } = await auth.signInWithPopup(provider);
      const url = `users/${uid}`;
      db.ref(url).once(
        'value',
        (snapshot) => {
          const user = snapshot.val();
          this.setUser(user);
          authenticate(user).then(() => {
            this.setState({ loginSuccess: true, userType: user.type });
          });
        },
        (err) => {
          console.log(err);
        }
      );
    } catch (e) {}
  }

  changeUserType({ target }) {
    this.setState({ userType: target.value });
  }

  render() {
    return this.state.loginSuccess ? (
      <Redirect to="/dashboard" />
    ) : (
      <UserContext>
        {({ setUser }) => {
          this.setUser = setUser;
          return (
            <div className="login-box">
              <div className="w-1/4 mx-auto shadow-lg rounded-lg bg-white py-8 px-6 flex flex-col items-center">
                <h2 className="brand-name my-4 text-orange opacity-75">
                  Driver's Safe
                </h2>
                <div>
                  <img src={Logo1} alt="" className="w-32 h-32" />
                </div>
                <h3 className="text-center mt-4 mb-4 opacity-50">Log in</h3>
                <button
                  className="border-none shadow-md rounded-sm px-6 py-3 flex my-3 font-semibold hover:shadow-lg"
                  onClick={this.onClick}
                >
                  <img src={Google} alt="" className="mr-4 w-4 h-4" />
                  Sign in with Google
                </button>
                <Link
                  to="/signup"
                  className="text-sm text-black opacity-75 hover:text-orange mt-4 no-underline"
                >
                  No Account? Sign Up
                </Link>
              </div>
            </div>
          );
        }}
      </UserContext>
    );
  }
}

export default Login;
