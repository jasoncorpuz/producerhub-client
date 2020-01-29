import React, { Component } from 'react';
import AuthApiService from '../../services/auth-api-services'
import TokenService from '../../services/token-service'

class Login extends Component {
  state = {
    error: null
  }

  onLoginSuccess() {
    console.log('login')
    const { history } = this.props
    history.push('/home')
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ error: null })

    const { username, password } = e.target

    AuthApiService.postLogin({
      username: username.value,
      password: password.value
    })
      .then(res => {
        username.value = ''
        password.value = ''
        TokenService.saveAuthToken(res.authToken)
        this.props.setUserId(res.id)
        this.onLoginSuccess()
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  render() {
    const { error } = this.state
    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        <section>
          <fieldset>
          <legend><h1>Log In</h1></legend>
            <label htmlFor='input'>User Name:</label>
            <input type='text' placeholder="username" name='username' required />
            <label htmlFor='input'>Password:</label>
            <input type='password' placeholder="password" name='password' required />
            <button type='submit'>submit</button>
            <div role='alert'>
              {error && <p>{error}</p>}
            </div>
          </fieldset>
        </section>
      </form>
    );
  }
}

export default Login;