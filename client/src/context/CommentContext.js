import { createContext, useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

export const CommentContext = createContext();

export const CommentProvider = ({ children }) => {
    const [likedComments, setLikedComments] = useState(null);

    // Check localstorage to see if user is stored
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('pu_user'));

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

        if (user) {
            getLikedComments();
        }
    }, []);

    return (
        <CommentContext.Provider value={likedComments}>
            {children}
        </CommentContext.Provider>
    );
};
