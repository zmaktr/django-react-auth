import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext';


const Header = () => {
  let {user} =useContext(AuthContext)
  return (

    <div>

        <Link to='/'>Home</Link>
        {/* <span> | </span>
        <Link to='/login'>Login </Link> */}
        <span> | </span>
        {user ? (<Link to='/logout'>Logout</Link>) : <Link to='/login'>Login </Link>}

        {user && <p>{user.username} welcome to the app</p>}

    </div>
  )
}

export default Header
