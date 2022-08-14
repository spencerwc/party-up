import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './layouts/Layout';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

const App = () => {
    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route path="/signup" element={<h1>Sign Up</h1>} />
                <Route path="/login" element={<h1>Login</h1>} />
                <Route path="*" element={<Layout />} />
            </Routes>
        </>
    );
};

export default App;
