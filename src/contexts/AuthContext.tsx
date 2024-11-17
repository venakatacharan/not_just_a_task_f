'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axios from 'axios';

interface User {
    id: string;
    email: string;
    name: string;
    photo: string;
}

interface AuthContextProps {
    loading: boolean
    user: User;
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login/success`;
                const { data } = await axios.get(url,{withCredentials: true});
                console.log(data)
                setUser(data.user);
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const login = () => {
        window.open(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google?next=${process.env.NEXT_PUBLIC_CLIENT_URL}/dashboard`,
            "_self"
        )
    };

    const logout = async () => {
        setUser(null);
        window.open(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`,
            "_self"
        )
    };

    return (
        <AuthContext.Provider value={{ loading, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
