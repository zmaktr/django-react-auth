import { createContext } from 'react'

// Create a context

const AuthContext = createContext()

export default AuthContext;

// Provider

export const AuthProvider = ({children}) => {
    return(
        <AuthContext.Provider value={{'name':'zaeem'}}>
            {children}
        </AuthContext.Provider>
    )
}