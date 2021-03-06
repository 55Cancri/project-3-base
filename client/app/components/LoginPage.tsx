import React, { Component } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import ResetPasswordPage from './ResetPasswordPage'
import * as awsCognito from 'amazon-cognito-identity-js'

import { startLogin } from '../actions/auth'

import api from '../api'

interface IData {
  username: string
  password: string
  token: string
}

// define types of props, with route component props included
interface IProps extends RouteComponentProps<any> {
  startLogin(data: IData): any
}

// define types of state
interface IState {
  username: string
  password: string
  errors: {
    username: string
    password: string
    global?: string
  }
}
// include both prop types and state types with class
export class LoginPage extends Component<IProps, IState> {
  state = {
    username: '',
    password: '',
    errors: {
      username: '',
      password: '',
      global: ''
    }
  }
  onFieldChange = ({ target }) => {
    let { name, value }: { name: keyof IState; value: string } = target
    this.setState({
      [name]: value
    } as any)
  }

  create = e => {
    e.preventDefault()
    // api.user.createTable()
  }

  onSubmit = e => {
    e.preventDefault()
    const initialData = {
      username: this.state.username,
      password: this.state.password
    }

    // check username is not blank
    if (this.state.username.length === 0) {
      this.setState(prevState => ({
        errors: {
          username: 'username field cannot be blank',
          password: prevState.errors.password
        }
      }))
      // ??
    } else if (this.state.username.length > 0) {
      this.setState(prevState => ({
        errors: {
          username: '',
          password: prevState.errors.password
        }
      }))
    }
    // TODO: implement email regex
    // else if (!this.state.email.match(emailRegex)) {
    //   this.setState(prevState => ({
    //     errors: {
    //       email: 'please enter a valid email',
    //       password: prevState.errors.password
    //     }
    //   }))
    // }

    // check password is not blank
    if (this.state.password.length === 0) {
      this.setState(prevState => ({
        errors: {
          username: prevState.errors.username,
          password: 'password field cannot be blank'
        }
      }))
      // ??
    } else if (this.state.password.length > 0) {
      this.setState(prevState => ({
        errors: {
          username: prevState.errors.username,
          password: ''
        }
      }))
    }

    // if checks pass, send user data to the server
    if (this.state.username.length > 0 && this.state.password.length > 0) {
      const { username, password } = this.state

      // gets credentials
      const credentials = { username, password }

      // const authenticationData = {
      //   Password: credentials.password,
      //   Username: credentials.username
      // }

      // // store credentials in amazon object
      // const authenticationDetails = new awsCognito.AuthenticationDetails(
      //   authenticationData
      // )
      // // data defined in cognito
      // const poolData = {
      //   ClientId: '5lmmpid5kd4v4vibmvifhcm3re', // Your client id here
      //   UserPoolId: 'us-east-2_LfGmk9qIA' // Your user pool id here
      // }
      // // access user pool with pool data
      // const userPool = new awsCognito.CognitoUserPool(poolData)

      // // access user from user pool
      // const userData = {
      //   Pool: userPool,
      //   Username: credentials.username
      // }

      // // create user from previous object buids
      // const cognitoUser = new awsCognito.CognitoUser(userData)

      // // and authenticate them
      // cognitoUser.authenticateUser(authenticationDetails, {
      //   onSuccess: result => {
      //     const token = result.getIdToken().getJwtToken()
      //     const data = {
      //       ...initialData,
      //       token
      //     }
      //     this.props
      //       .startLogin(data)
      //       .then(() => {
      //         this.props.history.push('/dashboard')
      //       })
      //       .catch(err => {
      //         console.log('front end error', err)
      //         return this.setState({ errors: err.response.data.errors })
      //       })
      //     // this.props.setToken(token)

      //     // add token to localstorage
      //     // localStorage.setItem('token', token)

      //     // console.log(userPool.getCurrentUser())
      //     // console.log(result.getIdToken().decodePayload())
      //     // const idtok: any = result.getIdToken();
      //     // console.log(idtok.payload['cognito:groups']) //payload has the user info on it
      //   },
      //   onFailure: err => {
      //     console.log(err)
      //     if (
      //       err.code === 'UserNotFoundException' ||
      //       err.code === 'NotAuthorizedException'
      //     ) {
      //       console.log('Invalid Credentials, try again.')
      //       // this.props.updateError('Invalid Credentials, try again.')
      //     } else {
      //       console.log('Unable to login at this time, please try again later')
      //       // this.props.updateError(
      //       //   'Unable to login at this time, please try again later'
      //       // )
      //     }
      //   }
      // })
    }
  }

  // @ts-ignore
  render = () => {
    const { errors } = this.state
    return (
      <div className="login-page">
        <div className="login-bg" />
        <form
          className="login-form"
          onChange={this.onFieldChange}
          onSubmit={this.onSubmit}
        >
          {errors.global && <p className="global-errors">{errors.global}</p>}
          <div className="input-group">
            <label className="title">username</label>
            <input
              type="text"
              name="username"
              style={{
                border: !!errors.username ? '2px solid #e87c7c' : 'none'
              }}
            />
            {errors.username && (
              <p className="inline-errors">{errors.username}</p>
            )}
          </div>
          <div className="input-group">
            <label className="title">password</label>
            <input
              type="password"
              name="password"
              style={{
                border: !!errors.password ? '2px solid #e87c7c' : 'none'
              }}
            />
            {errors.password && (
              <p className="inline-errors">{errors.password}</p>
            )}
          </div>
          <div className="input-group">
            <button type="submit" className="login-button button">
              Login
            </button>
          </div>
          <div className="switch-auth-form">
            <p className="text">Don't have an account?</p>
            <Link to="/signup" className="signup-link">
              &nbsp;Signup
            </Link>
            <br />
            <Link to="/reset">Forgot password?</Link>
          </div>
        </form>
        <div className="overlay" />
        <div className="bg" />
      </div>
    )
  }
}

export default connect(
  undefined,
  { startLogin }
)(LoginPage)
