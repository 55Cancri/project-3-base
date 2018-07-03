import React from 'react'
import { Link } from 'react-router-dom'

export const SplashPage = () => (
  <div>
    <header>
      <nav className="splash-nav">
        <Link to="/" className="item">
          Logo
        </Link>
        <Link to="/login" className="item">
          Login
        </Link>
        <Link to="/signup" className="item">
          Signup
        </Link>
      </nav>
    </header>
    <main className="splash-body">
      <h1>{'<App name>'}</h1>
      <p>Create and take quizzes</p>
      <p>{'<splash page image>'}</p>
    </main>
  </div>
)

export default SplashPage
