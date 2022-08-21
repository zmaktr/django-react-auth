import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext';


const Header = () => {
  let {user, logoutUser} =useContext(AuthContext)
  return (

    <div>
        <Link to='/'>Home</Link>
        {/* <span> | </span>
        <Link to='/login'>Login </Link> */}
        <span> | </span>
        <Link to='/about'>About</Link>
        <span> | </span>
        {user ? (<span onClick={logoutUser}>Logout</span>) : <Link to='/login'>Login </Link>}

        {user && <p> user = <b>{user.username}</b> welcome to the app</p>}

    </div>
  )
}

export default Header
