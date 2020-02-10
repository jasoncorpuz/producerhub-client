import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import './Nav.css'

export default class Nav extends Component {
  handleLogoutClick = () => {
    TokenService.clearAuthToken()
  }

  renderLogoutLink() {
    return (
      <span className='logout-link'>
        <Link
          onClick={this.handleLogoutClick}
          to='/'>
          logout
        </Link>
      </span>
    )
  }

  renderLoginLink() {
    return (
      <span className='login-link'>
        <Link
          to='/signup'>
          signup
        </Link>
        {' '}
        <Link
          to='/login'>
          log in
        </Link>
      </span>
    )
  }

  directHome(){
    return(
      <Link to='/home'>
      producer hub
      {'  '}
    </Link>
    )
  }

  directLanding(){
    return(
      <Link to='/'>
      producer hub
      {'  '}
    </Link>
    )

  }

  render() {
    return (
      <nav className='header'>
        {TokenService.hasAuthToken()
          ? this.directHome()
          : this.directLanding()
        }
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
        
      </nav>
    )
  }
}
