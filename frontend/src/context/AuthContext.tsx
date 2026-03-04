'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getStoredToken, setStoredToken, removeStoredToken, loginUser, registerUser } from '@/lib/api';

interface AuthContextType {
    isAuthenticated: boolean;
    token: string | null;
    isLoading: boolean;
    login: (username: string, email: string, password: string) => Promise<void>;
    register: (username: string, email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check for stored token on mount
        const storedToken = getStoredToken();
        if (storedToken) {
            setToken(storedToken);
        }
        setIsLoading(false);
    }, []);

    const login = async (username: string, email: string, password: string) => {
        const response = await loginUser(username, email, password);
        setToken(response.access_token);
        setStoredToken(response.access_token);
    };

    const register = async (username: string, email: string, password: string) => {
        await registerUser(username, email, password);
        // Auto-login after registration
        await login(username, email, password);
    };

    const logout = () => {
        setToken(null);
        removeStoredToken();
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated: !!token,
                token,
                isLoading,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
