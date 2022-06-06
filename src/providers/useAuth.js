import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () =>{
    const auth = useContext(AuthContext);
    console.log(auth.user)
    return auth;
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (user) => {
        console.log(user)
        setUser(user);
    }

    const logout = () => {
        setUser(null)
    }

    const isAdmin = () =>{
        return user.rol.id == 1
    }
    
    return (
        <AuthContext.Provider value={{ user, login, logout, isAdmin}} >
            {children}
        </AuthContext.Provider>
    )
}