import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

export default class NoPage extends PureComponent {
  render() {
    return (
      <div>
        Error 404! Page not found.
        <br></br>
        <Link to="/">Go back</Link>
      </div>
    )
  }
}
