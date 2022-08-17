import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
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
    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<h1>Login</h1>} />
                <Route path="*" element={<Layout />} />
            </Routes>
        </>
    );
};

export default App;
