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
        setUser(user);
    }

    const logout = () => {
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, login, logout}} >
            {children}
        </AuthContext.Provider>
    )
}