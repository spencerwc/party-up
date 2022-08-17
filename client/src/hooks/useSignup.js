import { useState } from 'react';

export const useSignup = () => {
    const [isLoading, setIsLoading] = useState(null);
    const [error, setError] = useState(null);

    const signUp = async (email, username, password) => {
        setIsLoading(true);

        if (error) {
            setError(null);
        }

        const response = await fetch('/api/users/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, username, password }),
        });

        const json = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
        }

        if (response.ok) {
            console.log(json);
            setIsLoading(false);
        }
    };

    return { signUp, isLoading, error };
};
