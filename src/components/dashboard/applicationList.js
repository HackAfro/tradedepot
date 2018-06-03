import React from 'react';
import PropTypes from 'prop-types';

const AppList = (data) => {
  const { userData } = data;

  return (
    <div className="flex px-6 py-4 bg-white rounded">
      <div className="">
        <h5 className="font-semibold opacity-75 text-sm">{userData.name}</h5>
        <p className="font-light opacity-50 text-xs mt-2">{userData.email}</p>
      </div>
      <div className="ml-4 px-2">
        <div className="">
          <p className="text-xs opacity-50">Address</p>
          <p className="text-sm opacity-75">{userData.address}</p>
        </div>
        <div className="mt-2">
          <p className="text-xs opacity-50">Vehicle Type</p>
          <p className="text-sm opacity-75 mt-1">{userData.vehicleType}</p>
        </div>
      </div>
      <div className="ml-4">
        <div>
          <p className="text-xs opacity-50">Sex</p>
          <p className="text-sm opacity-75 mt-1">{userData.sex}</p>
        </div>
        <div className="mt-1">
          <p className="text-xs opacity-50">Occupation</p>
          <p className="text-sm opacity-75 mt-1">{userData.occupation}</p>
        </div>
      </div>
      <div className="ml-8 flex items-center">
        <div className="flex">
          <button className="text-green border-none shadow-md rounded-sm px-4 py-2 flex font-semibold hover:shadow-lg">
            Accept
          </button>
          <button className="text-red border-none shadow-md rounded-sm px-4 py-2 flex font-semibold hover:shadow-lg ml-4">
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

AppList.propTypes = {
  userData: PropTypes.object.isRequired,
};

export default AppList;
