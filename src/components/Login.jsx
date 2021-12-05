/* 
1. Work on the password issue with the exclamation
2. On submit I need to store the user on to the Commerce State User & change component to cart
3. Create the logic for signing in.
4. finish the cancel function to change the display back to the store front
*/

import React from "react";
import s from "../components/Login.module.css";

const INIT_CARD = {
  password: '',
  confirmPassword: '',
  firstName: '',
  lastName: '',
  postCode: '',
  email: ''
}

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eye: false,
      revealPassword: 'password',
      userType: 'newUser',
      newUser: INIT_CARD,
      error: {},
    };
  }

  handleRadioButton = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  checkErrorBeforeSave = () => {
    const { newUser, error } = this.state;
    let errorValue = {};
    let isError = false;
    Object.keys(newUser).forEach(val => {
      let checkError = val;
      if (!newUser[val].length || error[checkError]) {
        error[checkError] 
        ? errorValue = { ...errorValue, [checkError]: error[checkError]}
        : errorValue = { ...errorValue, [checkError]: 'Required'};
        isError = true;

    }
    });
    this.setState({ error: errorValue }, this.generalError);
    return isError;
  }

  generalError = () => {
    const errorObject = this.state.error;
    const errors = Object.keys(errorObject);
    const divMessage = document.getElementById('generalError');
    divMessage.style.display = 'none';

    if (!errors.length) {
      divMessage.style.display = 'block';
    }

    if (errors.length) {
      errors.forEach(errorKey => {
        if (errorObject[errorKey] !== undefined) {
          divMessage.style.display = 'block';
        }
      })
    }

  }

  handleSubmit = (e) => {
    e.preventDefault();
    const errorCheck = this.checkErrorBeforeSave();
    if (!errorCheck) {
        this.setState({
          newUser: INIT_CARD,
        }, () => {
          const divMessage = document.getElementById('generalError');
          divMessage.style.display = 'none';

        });
    }  
  };

  handleInputData = e => {
    this.setState(prevState => ({
      newUser: {
        ...prevState.newUser,
        [e.target.name]: e.target.value
      }
    }))
  }

  backToStore = () => {
    const divMessage = document.getElementById('generalError');
    divMessage.style.display = 'none';
    this.setState({
      eye: false,
      revealPassword: 'password',
      userType: 'newUser',
      newUser: INIT_CARD,
      error: {},
    });
  }

  eyeFlip = () => {
    const eyeButton = document.getElementById('newUserPassword'); 
    if (!this.state.eye) {
        eyeButton.innerHTML = '<i class="fas fa-eye"></i>';
        this.setState({
          eye: true,
          revealPassword: 'text'
        });
      } else {
        eyeButton.innerHTML = '<i class="fas fa-eye-slash"></i>';
        this.setState({
          eye: false,
          revealPassword: 'password'
        });
      }
  }

  firstNameCheck = value => {
    const letterRegex = /^[A-Za-z]+((\s)?((\'|\-|\.)?([A-Za-z])+))*$/gi;
    const error = letterRegex.test(value);
    return !error ? 'Please enter a valide First Name' : undefined;
  }

  lastNameCheck = value => {
    const letterRegex = /^[A-Za-z]+((\s)?((\'|\-|\.)?([A-Za-z])+))*$/gi;
    const error = letterRegex.test(value);
    return !error ? 'Please enter a valide Last Name' : undefined;
  }

  postCodeCheck = value => {
    const postalCodeRegex = /^\d{5}$/;
    const error = postalCodeRegex.test(value);
    return !error ? 'Must be a 5 digit ZIP Code' : undefined;
  }

  passwordMatchCheck = value => 
  !(value === this.state.newUser.password) 
  ? 'This does not match your password above.' 
  : undefined;

  passwordValidationCheck = value => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,20}$/gm;
    const error = passwordRegex.test(value);
    return !error ? 'This does not fit the requirement. Try again!' : undefined;
  }

  emailAlreadyTaken = value => {
    const users = Object.keys(this.props.users);
    console.log(users);
    const alreadyTaken = users.some(user => this.props.users[user]['email'] === value);
    // console.log(this.props.users[user]['email']);
    return alreadyTaken ? 'This email is already used. Try another one.' : undefined;
  }

  emailCheck = value => {
    const emailRegex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    const error = emailRegex.test(value);
    return !error ? 'This is not a proper email. Try again!' : this.emailAlreadyTaken(value);
  }

  handleValidations = (target, value) => {
    let errorText;
    switch (target) {
      case 'email':
        errorText = this.emailCheck(value);
        this.setState(prevState => ({  error: {    ...prevState.error,    email: errorText }}))
        break;
      case 'password':
        errorText = this.passwordValidationCheck(value);
        this.setState(prevState => ({  error: {    ...prevState.error,    password: errorText }}))
        break;
      case 'confirmPassword':
        errorText = this.passwordMatchCheck(value);
        this.setState(prevState => ({  error: {    ...prevState.error,    confirmPassword: errorText }}))
        break;    
      case 'firstName':
        errorText = this.firstNameCheck(value);
        this.setState(prevState => ({  error: {    ...prevState.error,    firstName: errorText }}))
        break;      
      case 'lastName':
        errorText = this.lastNameCheck(value);
        this.setState(prevState => ({  error: {    ...prevState.error,    lastName: errorText }}))
        break;
      case 'postCode':
        errorText = this.postCodeCheck(value);
        this.setState(prevState => ({  error: {    ...prevState.error,    postCode: errorText }}))
        break;
      default:
        break;
    }
  }

  handleBlur = e => this.handleValidations(e.target.name, e.target.value);



  newUser = () => {
    return (
      <div className={`${s.flexContainer}`}>
        <div id='generalError' className={`${s.error} ${s.generalError}`}>We're sorry, but one or more fields are incomplete or incorrect. <u>Find error(s)</u>.</div>
        <h2 className={`header-sm`}>Create an Account</h2>
        <label className={s.marginAndPadding}>Your E-Mail Address *</label>
        {this.state.error.email && <div className={s.error}>{this.state.error.email}</div>}
        <input
          className={`${s.input} ${s.marginAndPadding} ${this.state.error.email && this.state.error.email != undefined ? s.redError : ''}`}
          type="email"
          name="email"
          id="email"
          autoComplete="off"
          value={this.state.newUser && this.state.newUser.email}
          onChange={this.handleInputData}
          onBlur={this.handleBlur}
        />
        <label className={s.marginAndPadding}>Create Password *</label>
        {this.state.error.password && <div className={s.error}>{this.state.error.password}</div>}
        <div className={`${s.passwordWithEye} ${s.marginAndPadding} ${this.state.error.password && this.state.error.password != undefined ? s.redError : ''}`}>
          <input
            id="revealPassword"
            className={`${s.deleteBorder} ${this.state.error.password && this.state.error.password != undefined ? s.redTransparentError : ''}`}
            type={this.state.revealPassword}
            name="password"
            autoComplete="off"
            value={this.state.newUser && this.state.newUser.password}
            onChange={this.handleInputData}
            onBlur={this.handleBlur}
          />
          <button id="newUserPassword" type="button" onClick={this.eyeFlip}><i className="fas fa-eye-slash"></i></button>
          {/* function needed for eye flip */}
        </div>
        <p className={`${s.finePrint}`}>
          Password must be 8-20 characters, including: at least one capital
          letter, at least one small letter, one number and one special
          character - ! @ # $ % ^ & * ( ) _ +
        </p>
        <label className={s.marginAndPadding}>Confirm Password *</label>
        {this.state.error.confirmPassword && <div className={s.error}>{this.state.error.confirmPassword}</div>}
        <input
          className={`${s.input} ${s.marginAndPadding} ${this.state.error.confirmPassword && this.state.error.confirmPassword != undefined ? s.redError : ''}`}
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          autoComplete="off"
          value={this.state.newUser && this.state.newUser.confirmPassword}
          onChange={this.handleInputData}
          onBlur={this.handleBlur}
        />
        <label className={s.marginAndPadding}>First Name *</label>
        {this.state.error.firstName && <div className={s.error}>{this.state.error.firstName}</div>}
        <input
          className={`${s.input} ${s.marginAndPadding} ${this.state.error.firstName && this.state.error.firstName != undefined ? s.redError : ''}`}
          type="text"
          name="firstName"
          id="firstName"
          value={this.state.newUser && this.state.newUser.firstName}
          onChange={this.handleInputData}
          onBlur={this.handleBlur}
        />
        <label className={s.marginAndPadding}>Last Name *</label>
        {this.state.error.lastName && <div className={s.error}>{this.state.error.lastName}</div>}
        <input
          className={`${s.input} ${s.marginAndPadding} ${this.state.error.lastName && this.state.error.lastName != undefined ? s.redError : ''}`}
          type="text"
          name="lastName"
          id="lastName"
          autoComplete="off"
          value={this.state.newUser && this.state.newUser.lastName}
          onChange={this.handleInputData}
          onBlur={this.handleBlur}
        />
        <label className={s.marginAndPadding}>PostCode</label>
        {this.state.error.postCode && <div className={s.error}>{this.state.error.postCode}</div>}
        <input
          className={`${s.input} ${s.marginAndPadding} ${this.state.error.postCode && this.state.error.postCode != undefined ? s.redError : ''}`}
          type="number"
          name="postCode"
          id="postCode"
          autoComplete="off"
          value={this.state.newUser && this.state.newUser.postCode}
          onChange={this.handleInputData}
          onBlur={this.handleBlur}
        />
        <button className={`${s.input} ${s.marginAndPadding}`} type="submit">
          SAVE
        </button>
        <div className={` ${s.width} ${s.surroundingLine}`}>or</div>
        <button className={`${s.input} ${s.marginAndPadding}`} type="submit">
          SIGN UP WITH FACEBOOK
        </button>
        <button
          className={`${s.input} ${s.marginAndPadding}`}
          onClick={this.backToStore}
          type="reset"
        >
          Cancel
        </button>
        <div className={`${s.formFooter}`}>
            <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">Privacy Policy and Cookies</a>
            | 
            <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">Terms of Sale and Use</a>
        </div>
        {/* then create the logic */}
      </div>
    );
  };

  returningUser = () => {
    return (
      <div className={`${s.flexContainer}`}>
        <h2 className={`header-sm`}>Returning User</h2>
        <label className={s.marginAndPadding}>Your E-Mail Address *</label>
        <input
          className={`${s.input} ${s.marginAndPadding}`}
          type="email"
          name="userName"
          id="userName"
        />
        <label className={s.marginAndPadding}>Create Password *</label>
        <div className={`${s.passwordWithEye} ${s.marginAndPadding}`}>
          <input
            className={`${s.deleteBorder}`}
            type="password"
            name="password"
            id="password"
          />
          <input type="button" value={this.state.eye} onClick={this.eyeFlip} />{" "}
          {/* function needed for eye flip */}
        </div>
        <button className={`${s.input} ${s.marginAndPadding}`} type="submit">
          SIGN IN
        </button>
      </div>
    );
  };

  loginType = () => (this.state.userType === "newUser" ? true : false);

  render() {
    return (
      <div className={`container`}>
        <form onSubmit={this.handleSubmit}>
          <div className={s.formContainer}>
            <button className={s.direction} type="reset" onClick={this.backToStore}>
              <i className={`fas fa-times`}></i>
            </button>
            <h3>New User or Returning?</h3>
            <div>
              <input
                type="radio"
                name="userType"
                value="signIn"
                id="signIn"
                onChange={this.handleRadioButton}
              />
              Sign In
              <input
                type="radio"
                name="userType"
                value="newUser"
                id="newUser"
                onChange={this.handleRadioButton}
              />
              Create Account
            </div>
          </div>
          {this.loginType() ? this.newUser() : this.returningUser()}
        </form>
      </div>
    );
  }
}

export default Login;
