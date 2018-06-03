import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { getUser } from '../../utils/auth';

export const UserContext = React.createContext();

class UserProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
    this.setUser = this.setUser.bind(this);
    this.removeUser = this.removeUser.bind(this);
  }

  componentDidMount() {
    getUser().then(
      (user) => {
        this.setState({ user });
      },
      () => {
        this.setState({ isAuth: false });
      }
    );
  }

  setUser(data) {
    this.setState({ user: data });
  }

  removeUser() {
    this.setState({ user: {} });
  }

  render() {
    const { children } = this.props;
    const value = {
      userData: this.state.user,
      setUser: this.setUser,
      removeUser: this.removeUser,
    };
    return (
      <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
  }
}

UserProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default UserProvider;
