import { useAuthContext } from '../hooks/useAuthContext';

export const useLogout = () => {
    const { dispatch } = useAuthContext();

    const logout = () => {
        localStorage.removeItem('pu_user');
        dispatch({ type: 'LOGOUT' });
    };

    return { logout };
};
