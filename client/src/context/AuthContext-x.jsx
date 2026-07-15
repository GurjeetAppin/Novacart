import React, { createContext, useState} from "react";

export const AuthContext = createContext();
export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null); // useState() function is use to initalized a value and we can change it.
    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("userInfo", JSON.stringify(userData));
    };
    const logout = () => {
        setUser(null);
        localStorage.removeItem("userInfo");
    };
    
    return (
        <AuthContext.Provider value={{user,login,login}}>
            {children}
        </AuthContext.Provider>
    );
};

