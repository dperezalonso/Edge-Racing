// contexts/AuthContext.tsx
'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { login, logout, setupAuthFromLocalStorage } from '@/services/authService';
import apiClient from '@/services/api';

interface User {
    id: string;
    name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

// Crear contexto con valores predeterminados
const AuthContext = createContext<AuthContextType>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
    login: async () => { },
    logout: async () => { },
});

// Hook para usar el contexto de autenticación
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    // Verificar estado de autenticación al cargar
    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                setIsLoading(true);
                // Asegurar que se configure el token desde localStorage
                setupAuthFromLocalStorage();

                // Verificar si existe un token en localStorage
                const token = localStorage.getItem('token');
                if (!token) {
                    setUser(null);
                    return;
                }

                // Intentar obtener información del usuario actual (esto dependerá de tu API)
                try {
                    const response = await apiClient.get('/user'); // Endpoint para obtener usuario actual
                    setUser(response.data);
                } catch (error) {
                    console.error('Error al obtener usuario:', error);
                    // Si hay error, probablemente el token es inválido o expiró
                    localStorage.removeItem('token');
                    setUser(null);
                }
            } catch (error) {
                console.error('Error al verificar autenticación:', error);
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuthStatus();
    }, []);

    // Función para iniciar sesión
    // Versión modificada sin redirección
const handleLogin = async (email: string, password: string) => {
    try {
        setIsLoading(true);
        setError(null);

        const response = await login({ email, password });
        setUser(response.user);
        
        // Eliminamos la redirección automática
    } catch (error: any) {
        console.error('Error de inicio de sesión:', error);
        setError(error.response?.data?.message || 'Error al iniciar sesión');
        throw error;
    } finally {
        setIsLoading(false);
    }
};

    // Función para cerrar sesión
    const handleLogout = async () => {
        try {
            setIsLoading(true);
            await logout();
            setUser(null);
            
            // Eliminamos la redirección automática
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Valores del contexto
    const value = {
        user,
        isAuthenticated: !!user,
        isLoading,
        error,
        login: handleLogin,
        logout: handleLogout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}