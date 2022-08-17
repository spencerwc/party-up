import { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(null);
    const [error, setError] = useState(null);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setIsLoading(true);

        if (error) {
            setError(null);
        }

        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const json = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
        }

        if (response.ok) {
            localStorage.setItem('pu_user', JSON.stringify(json));
            dispatch({ type: 'LOGIN', payload: json });
            setIsLoading(false);
        }
    };

    return { login, isLoading, error };
};
