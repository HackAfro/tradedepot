import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import user from './man-user.svg';
import logo from '../login/chauffeur.svg';

import './header.css';

import { getUser, unAuthenticate } from '../../utils/auth';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedOut: false,
      showDropdown: false,
      userInfo: {},
    };
    this.showDropdown = this.showDropdown.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    getUser().then((user) => {
      const { name, email } = user; // eslint-disable-line
      const [firstName, lastName] = name.split(' ');
      this.setState({ userInfo: { firstName, email } }); // eslint-disable-line
    });
  }
  showDropdown(e) {
    e.preventDefault();
    this.setState((prevState) => ({ showDropdown: !prevState.showDropdown }));
  }

  logout() {
    unAuthenticate().then(() => {
      this.setState({ signedOut: true });
    });
  }

  render() {
    const { signedOut } = this.state;
    return (
      <div>
        {signedOut ? (
          <Redirect to="/login" />
        ) : (
          <nav className="flex items-center justify-between flex-wrap bg-white py-2 px-8 shadow-md">
            <div className="flex items-center flex-no-shrink text-white mr-6">
              <Link to="/login">
                <img src={logo} alt="Logo" className="brand-logo" />
              </Link>
            </div>
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
              <div className="text-sm flex items-center justify-end lg:flex-grow">
                <div>
                  <button
                    onClick={this.logout}
                    className="block mt-4 px-6 py-2 no-underline uppercase text-sm font-bold border-orange border-2 cursor-pointer text-center text-white bg-orange rounded-lg mr-6 lg:inline-block lg:mt-0 hover:bg-white hover:text-orange hover:text-black"
                  >
                    Logout
                  </button>
                </div>
                <div
                  onClick={this.showDropdown}
                  tabIndex="-1"
                  onKeyPress={this.showDropdown}
                  role="button"
                  style={{ position: 'relative' }}
                >
                  <img src={user} alt="Profile" />
                  <p>{this.state.userInfo.firstName}</p>
                </div>
              </div>
            </div>
          </nav>
        )}
      </div>
    );
  }
}
export default Header;
