import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Router from 'next/router'
import Cookies from "js-cookie";

import PropTypes from "prop-types";
import ErrorComponent from '../components/ErrorComponent';
@inject("authStore")

@observer
class Login extends Component {

  static propTypes = {
    
    history: PropTypes.object
  }
  constructor(props){
   super(props)
   
   this.state={
     showError:false
   }
  }



  componentWillUnmount() {
    this.props.authStore.reset();
  }

  handleUsernameChange = e => {
    this.props.authStore.setUsername(e.target.value);
  };

  handlePasswordChange = e => {
    this.props.authStore.setPassword(e.target.value);
  };

  handleSubmitForm = e => {
    e.preventDefault();
    this.props.authStore.login().then(() => {
      if(this.props.authStore.errors === null) {
        Cookies.set("username", this.props.authStore.values.username);
        Router.push("/searchPage")
      }
        else this.setState({showError:true})
      
    }
    );
  };
    render() {
     
       const { authStore:{ errors, inProgress} } = this.props;

        return (
            <div className="App">
          
        

        <form onSubmit={this.handleSubmitForm}>
        <div className="container" style={{maxWidth:"600px",left:"35%"}}>
                <h2>Sign-In to StarWars</h2>
                <p>
                {this.state.showError &&    <ErrorComponent errors={errors} /> }
                </p>
                <p className="input-container">
                  <input
                                    
                                    type="text"
                                    placeholder="Username"
                                    onChange={this.handleUsernameChange}
                                    id="input-username" className="login-input"
                                  />
                  <label htmlFor="input-username" unselectable="on">Username</label>
                </p>
                <p className="input-container">
                
                  <input
                                  
                                    type="password"
                                    placeholder="Password"
                                    onChange={this.handlePasswordChange}
                                    id="input-password" className="login-input"
                                  />
                  <label htmlFor="input-password" unselectable="on">Password</label>
                </p>

                <p className="input-container">
                <button
                                  className="btn btn-lg btn-primary pull-xs-right"
                                  type="submit"
                                  disabled={inProgress}
                                >
                                  Sign in
                                </button>
                </p>
              </div>
          </form>
           

            </div>



        )
    }


}

export default Login;
