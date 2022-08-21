import { createContext, useState } from 'react'
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';

// Create a context

const AuthContext = createContext()

export default AuthContext;

// Provider

export const AuthProvider = ({children}) => {
    
    let [authTokens, setAuthTokens] = useState( ()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    console.log(localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState( ()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    console.log(localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    
    const history = useNavigate()

    let loginUser = async (e) => {
        e.preventDefault()
        let response = await fetch('http://127.0.0.1:8000/api/token/', {
            method :'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'username':e.target.username.value, 'password':e.target.password.value})
        })

        let data = await response.json()

        if (response.status === 200) {
                setAuthTokens(data)
                setUser(jwt_decode(data.access))
                localStorage.setItem('authTokens', JSON.stringify(data))
                history('/');
                console.log('sucessAuthContent promise resolve')
        }
        else {
            alert('Something went wong | incorrect credentials')
        }
    }

    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        history('/login');
    }

    let contextData = {
        user:user,
        loginUser:loginUser,
        logoutUser:logoutUser,
    }

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}