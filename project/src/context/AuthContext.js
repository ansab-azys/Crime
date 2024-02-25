import React, { useContext, useEffect, useState } from 'react'
import {auth} from '../config/firebase'
import { useNavigate } from 'react-router-dom';

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false);

        })
    },[user, navigate])


    const value = {user};

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}