import React, { Component } from 'react';
import { db } from '../../utils/firebase';
import AppList from './applicationList';

class ReviewerDashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      applications: [],
      accepted: [],
      rejected: [],
    };
  }

  componentDidMount() {
    db.ref('applications').on('value', (snapshot) => {
      const data = snapshot.val();
      const applications = Object.keys(data).map((val) => data[val]);
      const accepted = applications.filter((app) => app.accepted);
      const rejected = applications.filter((app) => !app.accepted);
      this.setState({ applications, rejected, accepted });
    });
  }

  render() {
    const { rejected, accepted, applications } = this.state;
    return (
      <div>
        <div className="summary">
          <h5 className="opacity-75 text-black text-sm text-center my-4">
            Application Summary
          </h5>
          <div className="w-3/5 mx-auto flex">
            <div className="w-1/3 px-4 pt-3 pb-6 shadow rounded bg-white mx-3">
              <p className="font-bold text-xs opacity-25">Total Applications</p>
              <h3 className="text-2xl text-center opacity-75 font-bold my-3">
                {applications.length}
              </h3>
            </div>
            <div className="w-1/3 px-4 pt-3 pb-6 shadow rounded bg-white mx-3">
              <p className="font-bold text-xs opacity-25">
                Accepted Applications
              </p>
              <h3 className="text-2xl text-center opacity-75 font-bold my-3">
                {accepted.length}
              </h3>
            </div>
            <div className="w-1/3 px-4 pt-3 pb-6 shadow rounded bg-white mx-3">
              <p className="font-bold text-xs opacity-25">
                {' '}
                Rejected Applications
              </p>
              <h3 className="text-2xl text-center opacity-75 font-bold my-3">
                {rejected.length}
              </h3>
            </div>
          </div>
        </div>

        <div className="application-list">
          <h5 className="opacity-75 text-black text-sm text-center mt-8 mb-4">
            Application List
          </h5>
          <div className="w-3/5 mx-auto flex flex-col">
            {applications.map((app) => {
              const { user } = app;
              const data = {
                email: user.email,
                name: user.name,
                ...app,
              };
              return <AppList userData={data} key={app.id} />;
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default ReviewerDashBoard;
