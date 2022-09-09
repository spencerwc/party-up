import { createContext, useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

export const CommentContext = createContext();

export const CommentProvider = ({ children }) => {
    const { user } = useAuthContext();
    const [likedComments, setLikedComments] = useState(null);

    // Check localstorage to see if user is stored
    useEffect(() => {
        const getLikedComments = async () => {
            const response = await fetch(`/api/comments/likes`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });

            const json = await response.json();

            if (!response.ok) {
                console.error(json.error);
            }

            if (response.ok) {
                setLikedComments(json.likedComments);
            }
        };

        // If user is already stored, update auth state to logged in
        if (user) {
            getLikedComments();
        }
    }, [user]);

    return (
        <CommentContext.Provider value={likedComments}>
            {children}
        </CommentContext.Provider>
    );
};
