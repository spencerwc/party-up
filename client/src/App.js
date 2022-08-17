import { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import Layout from './layouts/Layout';
import Signup from './pages/Signup';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

const App = () => {
    const { user } = useAuthContext();

    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route
                    path="/signup"
                    element={!user ? <Signup /> : <Navigate to="/" />}
                />
                <Route
                    path="/login"
                    element={!user ? <h1>Login</h1> : <Navigate to="/" />}
                />
                <Route path="*" element={<Layout />} />
            </Routes>
        </>
    );
};

export default App;
