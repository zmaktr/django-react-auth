import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const LoginPage = () => {
  let {loginUser} = useContext(AuthContext)
  return (
    <div>
      <p>Please fill in to login</p>
        <form onSubmit={loginUser}>
            <input type='text' name='username' placeholder='Enter Username'/>
            <input type='password' name='password' placeholder='Enter Password' autoComplete='on'/>
            <input type='submit'/>
        </form>
    </div>
  )
}

export default LoginPage