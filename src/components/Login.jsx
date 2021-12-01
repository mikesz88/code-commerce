import React from 'react';
import s from '../components/Login.module.css';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eye: undefined
        };
    }

    handleRadioButton = e => {
        const {name , value } = e.target;

        this.setState({
            [name]: value
        });

    };

    newUser = () => {
        // const wrongForm = document.getElementById('returningUserForm');
        // if (wrongForm) wrongForm.remove();
        // const form = document.querySelector('form');
        // const div = document.createElement('div');
        // div.setAttribute('id', 'newUserForm')
        // div.innerHTML = `
        // test1
        // <button class="btn btn-primary round-pill">Submit</button>        
        // `;
        // form.appendChild(div);
        return (
            <>
                <h2 className={`header-md`}>Create an Account</h2>
                <label>Your E-Mail Address *</label>
                <input type="email" name="userName" id="userName" />
                <label>Create Password *</label>
                <div className={``}>
                    <input className={``} type="password" name="password" id="password" />
                    <input type="button" value={this.state.eye} onChange={this.eye}/> {/* function needed for eye flip */}
                </div>
                <p>
                    Password must be 8-20 characters, including: at least one capital letter, at least one small letter, one number and one special character - ! @ # $ % ^ & * () _ + 
                </p>
                <label>Confirm Password *</label>
                <div className={` `}>
                <input className={` `} type="password" name="confirmPassword" id="confirmPassword" />
                </div>
                <label>First Name *</label>
                <input type="text" name="firstName" id="firstName" />
                <label>Last Name *</label>
                <input type="text" name="lastName" id="lastName" />
                <label>PostCode</label>
                <input type="number" name="postCode" id="postCode" />
                <button type="submit">SAVE</button>
                <div className={s.surroundingLine}>
                    or
                </div>
                {/* facebook icon */}
                {/* cancel -> reset and go back to storeDisplay? */}
                {/* Privacy Policy and Cookies | Terms of Sale and use // create fake places for these */}
                {/* then create the logic */}
            </>
        )
    }

    returningUser = () => {
        // const wrongForm = document.getElementById('newUserForm');
        // if (wrongForm) wrongForm.remove();
        // const form = document.querySelector('form');
        // const div = document.createElement('div');
        // div.setAttribute('id', 'returningUserForm')
        // div.innerHTML = `
        // test2
        // <button class="btn btn-primary round-pill">Submit</button>        
        // `;
        // form.appendChild(div);

        return (
            <>
                <div>test2</div>
                <h2 className={`header-md`}>Returning User</h2>
            </>

        )
    }

    loginType = () => this.state.userType === 'newUser' ? true : false;

    render() {
        return(
            <div className={`container`}>
                <form onSubmit={this.submit}>
                    <h3>New User or Returning?</h3>
                    <input type="radio" name="userType" value="signIn" id="signIn" onChange={this.handleRadioButton}/> Sign In
                    <input type="radio" name="userType" value="newUser" id="newUser" onChange={this.handleRadioButton}/> Create Account
                    <label>Your E-Mail Address *</label>
                    <input type="email" name="userName" id="userName" />
                    <label>Create Password *</label>
                    <div className={``}>
                        <input className={``} type="password" name="password" id="password" />
                        {/* {} */}
                    </div>
                    {this.loginType() ? this.newUser() : this.returningUser()}
                </form>
            </div>
        )
    }
}

export default Login;