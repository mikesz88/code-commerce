import React from "react";
import s from "../components/Login.module.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eye: undefined,
    };
  }

  handleRadioButton = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
  };

  newUser = () => {
    return (
      <div className={`${s.flexContainer}`}>
        <h2 className={`header-sm`}>Create an Account</h2>
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
          <input type="button" value={this.state.eye} onChange={this.eye} />{" "}
          {/* function needed for eye flip */}
        </div>
        <p className={`${s.finePrint}`}>
          Password must be 8-20 characters, including: at least one capital
          letter, at least one small letter, one number and one special
          character - ! @ # $ % ^ & * ( ) _ +
        </p>
        <label className={s.marginAndPadding}>Confirm Password *</label>
        <input
          className={`${s.input} ${s.marginAndPadding}`}
          type="password"
          name="confirmPassword"
          id="confirmPassword"
        />
        <label className={s.marginAndPadding}>First Name *</label>
        <input
          className={`${s.input} ${s.marginAndPadding}`}
          type="text"
          name="firstName"
          id="firstName"
        />
        <label className={s.marginAndPadding}>Last Name *</label>
        <input
          className={`${s.input} ${s.marginAndPadding}`}
          type="text"
          name="lastName"
          id="lastName"
        />
        <label className={s.marginAndPadding}>PostCode</label>
        <input
          className={`${s.input} ${s.marginAndPadding}`}
          type="number"
          name="postCode"
          id="postCode"
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
          <input type="button" value={this.state.eye} onChange={this.eye} />{" "}
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
            <button className={s.direction} onClick={this.backToStore}>
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
              />{" "}
              Sign In
              <input
                type="radio"
                name="userType"
                value="newUser"
                id="newUser"
                onChange={this.handleRadioButton}
              />{" "}
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
