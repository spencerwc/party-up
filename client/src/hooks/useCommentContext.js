import { useContext } from 'react';
import { CommentContext } from '../context/CommentContext';

export const useCommentContext = () => {
    const context = useContext(CommentContext);

    if (!context) {
        throw Error('Context must be used inside of CommentProvider');
    }

    return context;
};
