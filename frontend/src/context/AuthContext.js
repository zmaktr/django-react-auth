import { createContext, useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';

// Create a context

const AuthContext = createContext()

export default AuthContext;

// Provider

export const AuthProvider = ({children}) => {
    
    let [authTokens, setAuthTokens] = useState( ()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState( ()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [loading, setLoading] = useState(true)
    
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

    let updateToken = async () => {
        console.log('update token called')
        let response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
            method :'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'refresh':authTokens.refresh})
        })
        let data = await response.json()

        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        }
        else{
            logoutUser()
        }
    }

    let contextData = {
        user:user,
        loginUser:loginUser,
        logoutUser:logoutUser,
    }

    useEffect(()=> {
        let fourandHalfMinutes = 1000 * 60 * 4.5
        let interval =setInterval(()=> {
            if(authTokens){
                updateToken()
            }
        }, fourandHalfMinutes)
        return ()=> clearInterval(interval)
    }, [authTokens, loading])

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}