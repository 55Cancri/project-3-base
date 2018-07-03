import React, { Component } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js'
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js'

import { connect } from 'react-redux'
import { startSignup } from '../actions/auth'
import { generateUuid } from '../helpers/helpers'

interface ClassProps extends RouteComponentProps<any> {
  startSignup(data: {}): any
}

interface ClassState {
  username: string
  email: string
  password: string
  message: string
  admin: boolean
  errors: {
    username: string
    email: string
    password: string
  }
}

export class SignupPage extends Component<ClassProps, ClassState> {
  state = {
    email: '',
    fullname: '',
    username: '',
    password: '',
    message: '',
    admin: false,
    errors: {
      username: '',
      email: '',
      password: '',
      global: ''
    }
  }

  // @ts-ignore
  onFieldChange = e => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    } as any)
  }

  // user: Eric1529523007809 pass: a12345678

  // startSignup will also have dispatch with it
  // @ts-ignore
  onSubmit = e => {
    e.preventDefault()
    const personName = this.state.fullname.split(' ')

    // single variable used in cognito signup
    const { email, username, password, admin } = this.state

    const clientData = {
      email: this.state.email,
      firstname: personName[0],
      lastname: personName[personName.length - 1],
      username: this.state.username,
      password: this.state.password,
      uid: generateUuid()
      // role: admin ? 'admin' : 'employee'
    }

    // start of cognito logic
    const poolData = {
      UserPoolId: 'us-east-2_LfGmk9qIA',
      ClientId: '5lmmpid5kd4v4vibmvifhcm3re'
    }

    // initialize pool of users
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData)

    const attributeList = []

    const dataEmail = {
      Name: 'email',
      Value: email
    }

    console.log('state email ', email)
    console.log('data email ', dataEmail)

    // add attribute to user
    // TODO: where is this stored in wizard?
    const attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(
      dataEmail
    )

    attributeList.push(attributeEmail)

    // creates user
    userPool.signUp(username, password, attributeList, null, (err, result) => {
      if (err) {
        return console.log('there was an error.', err)
      }

      // authenticate user after signup and autoConfirm trigger happens in cognito
      const authenticationData = {
        Username: username,
        Password: password
      }
      const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
        authenticationData
      )
      const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData)
      const userData = {
        Username: username,
        Pool: userPool
      }
      const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)

      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: result => {
          const accessToken = result.getAccessToken().getJwtToken()

          console.log('token we get back from cognito: ', accessToken)

          const data = {
            ...clientData,
            token: accessToken
          }

          this.props
            .startSignup(data)
            .then(() => {
              this.props.history.push('/dashboard')
            })
            .catch(err => {
              this.setState({ errors: err.response.data.errors })
            })
          /* Use the idToken for Logins Map when Federating User Pools with identity pools or when passing through an Authorization Header to an API Gateway Authorizer*/
          // const idToken = result.idToken.jwtToken
        },

        onFailure: err => {
          console.log('the err: ', err)
        }
      })
    })
  }

  // @ts-ignore
  render = () => {
    const { errors, admin, message } = this.state
    return (
      <div className="signup-page">
        {admin && (
          <img
            src="https://png.icons8.com/color/160/crown.png"
            style={{
              margin: '0 auto',
              width: '100px',
              height: '100px',
              filter: 'brightness(110%)'
            }}
          />
        )}
        <div className="signup-bg" />
        <form
          autoComplete="off"
          className="signup-form"
          onChange={this.onFieldChange}
          onSubmit={this.onSubmit}
        >
          <div className="input-group">
            <label htmlFor="email" className="title">
              email
            </label>
            <input type="email" name="email" />
          </div>
          <div className="input-group">
            <label htmlFor="fullname" className="title">
              full name
            </label>
            <input type="text" name="fullname" />
          </div>
          <div className="input-group">
            <label htmlFor="username" className="title">
              username
            </label>
            <input type="text" name="username" />
          </div>
          <div className="input-group">
            <label htmlFor="password" className="title">
              password
            </label>
            <input
              type="password"
              name="password"
              autoComplete="new-password"
            />
          </div>
          <div className="input-group">
            <button type="submit" className="signup-button button">
              Signup
            </button>
          </div>
          <div className="switch-auth-form">
            <p className="text">Already have an account?</p>
            <Link to="/login" className="login-link">
              &nbsp;Login
            </Link>
          </div>
        </form>
        {!!errors.global && <p>{errors.global}</p>}
        {message && <div className="message">{message}</div>}
        <div className="signup-overlay" />
        <div className="signup-bg" />
      </div>
    )
  }
}

export default connect(
  undefined,
  { startSignup }
)(SignupPage)
