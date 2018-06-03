import React, { Component } from 'react';
import { UserContext } from '../context/user.provider';
import UserDashboard from './userDash';
import ReviewerDashBoard from './review.dashboard';
import { getUser } from '../../utils/auth';
import Header from '../header/header';

import './dashboard.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }
  componentDidMount() {
    getUser().then((user) => {
      this.setState({ user });
    });
  }
  render() {
    const { user } = this.state;

    const dash =
      user.type === 'applicant' ? (
        <UserDashboard user={user} />
      ) : user.type === 'reviewer' ? (
        <ReviewerDashBoard />
      ) : (
        <h1>Processer</h1>
      );
    return (
      <div>
        <Header />
        <div className="dash-box">{dash}</div>
      </div>
    );
  }
}

export default Dashboard;
