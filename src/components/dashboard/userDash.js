import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { v4 } from 'uuid';

import { User } from 'firebase';
import states from '../../utils/states';

import img from './id-card.svg';
import next from './next.svg';
import checked from './checked.svg';
import 'react-datepicker/dist/react-datepicker.css';
import { saveToDb } from '../../utils/auth';

class UserDashboard extends Component {
  static formatState(state) {
    return state
      .split(' ')
      .join('_')
      .toLowerCase();
  }

  static propTypes = {
    user: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);

    this.state = {
      userData: {
        occupation: '',
        address: '',
        state: '',
        dob: '',
        sex: '',
        applicationType: '',
        vehicleType: '',
        testScore: '',
      },
      currentDate: moment(),
      errorMessage: '',
      applicationSuccess: false,
    };
    this.states = states;

    this.handleChange = this.handleChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  get formComplete() {
    const {
      occupation,
      address,
      state,
      dob,
      sex,
      testScore,
      vehicleType,
      applicationType,
    } = this.state.userData;

    if (
      occupation &&
      address &&
      state &&
      dob &&
      sex &&
      testScore &&
      vehicleType &&
      applicationCache
    ) {
      return true;
    } else {
      return false;
    }
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState((prevState) => ({
      userData: { ...prevState.userData, [name]: value },
    }));
  }

  onDateChange(value) {
    this.setState((prevState) => ({
      userData: { ...prevState.userData, dob: value.format() },
      currentDate: value,
    }));
  }

  onSubmit(e) {
    e.preventDefault();

    this.setState({ errorMessage: '' });
    const id = v4();
    const url = `applications/${id}`;

    if (this.formComplete) {
      const { user } = this.props;
      const data = {
        ...this.state.userData,
        accepted: false,
        id,
        user,
      };
      saveToDb(url, data).then(
        () => {
          this.setState({ applicationSuccess: true });
        },
        (err) => {
          console.log(err, '=>');
        }
      );
    } else {
      this.setState({
        errorMessage: 'Please complete all the fields on the form',
      });
    }
  }

  render() {
    const { occupation, address, sex, testScore } = this.state.userData;
    const { errorMessage, currentDate, applicationSuccess } = this.state;

    return (
      <div className="w-1/3 shadow-md rounded-lg mx-auto bg-white py-8 px-4 flex flex-col items-center text-center">
        {applicationSuccess ? (
          <div className="">
            <img src={checked} alt="" className="h-32 w-32 my-4" />
            <h5 className="mt-1 text-xl text-green-light opacity-75">
              Your application was successful
            </h5>
            <p className="text-xs opacity-50 text-black mt-2 font-bold">
              You should receive an email of confirmation
            </p>
          </div>
        ) : (
          <div>
            <form
              className=" flex flex-col items-center"
              onSubmit={this.onSubmit}
            >
              <h4 className="text-xl opacity-75">Apply for your License</h4>
              <img src={img} alt="" className="h-24 w-24 my-4" />
              <p className="text-red-light text-sm font-semibold my-2">
                {errorMessage}
              </p>
              <div className="form-control two">
                <div className="input-container">
                  <input
                    placeholder="Enter your address"
                    value={address}
                    onChange={this.handleChange}
                    className="input"
                    name="address"
                  />
                </div>
                <div className="input-container">
                  <input
                    onChange={this.handleChange}
                    placeholder="Your Occupation"
                    value={occupation}
                    name="occupation"
                    className="input"
                  />
                </div>
              </div>
              <div className="form-control one">
                <div className="input-container">
                  {/* eslint-disable-next-line */}
                  <DatePicker
                    selected={currentDate}
                    onChange={this.onDateChange}
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    name="dob"
                    className="input"
                  />
                </div>
              </div>
              <div className="form-control two">
                <div className="input-container">
                  <select
                    onChange={this.handleChange}
                    className="input"
                    name="state"
                  >
                    <option value="">State of origin</option>
                    {this.states.map((state) => (
                      <option
                        value={this.constructor.formatState(state)}
                        key={state}
                      >
                        {state}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="input-container">
                  <select
                    onChange={this.handleChange}
                    className="input"
                    name="sex"
                  >
                    <option value="">Select your sex</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
              <div className="form-control one">
                <div className="input-container">
                  <input
                    onChange={this.handleChange}
                    placeholder="Your test scores"
                    value={testScore}
                    name="testScore"
                    className="input"
                  />
                </div>
              </div>
              <div className="form-control two">
                <div className="input-container">
                  <select
                    onChange={this.handleChange}
                    className="input"
                    name="vehicleType"
                  >
                    <option value="">Vehicle Type</option>
                    <option value="articulated">Articulated Vehicle</option>
                    <option value="commercial">Commercial</option>
                    <option value="private">Private Vehicle</option>
                    <option value="motorcycle">Motorcycle</option>
                  </select>
                </div>
                <div className="input-container flex flex-col">
                  <p className="text-xs opacity-75">Application Type</p>
                  <div className="my-2">
                    <input
                      type="radio"
                      name="applicationType"
                      value="first"
                      id="first-time"
                      onChange={this.handleChange}
                    />
                    <label
                      htmlFor="first-time"
                      className="text-xs opacity-75 font-semibold ml-3"
                    >
                      First Time
                    </label>
                  </div>
                  <div className="">
                    <input
                      type="radio"
                      name="applicationType"
                      value="renewal"
                      id="renewal"
                      onChange={this.handleChange}
                    />
                    <label
                      htmlFor="renewal"
                      className="text-xs opacity-75 font-semibold ml-3"
                    >
                      Renewal
                    </label>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <button className="text-black border-none shadow-md rounded-sm px-6 py-3 flex font-semibold hover:shadow-lg">
                  Apply
                  <img src={next} alt="" className="ml-4 w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default UserDashboard;
