import { Routes, Route } from 'react-router-dom';
import { createStyles, Header } from '@mantine/core';
import NavbarMinimal from '../components/NavbarMinimal';
import Parties from '../pages/Parties';
import Party from '../pages/Party';

const useStyles = createStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: `${theme.spacing.md}px`,

        // Media query with value from theme
        [`@media (min-width: ${theme.breakpoints.md}px)`]: {
            flexDirection: 'row',
            maxWidth: '1200px',
            margin: '0 auto',
        },
    },
    content: {
        flexGrow: 1,
    },
}));

const Layout = () => {
    const { classes } = useStyles();

    return (
        <>
            <Header height={60} />

            <div className={classes.container}>
                <NavbarMinimal />

                <main className={classes.content}>
                    <Routes>
                        <Route path="/" element={<h1>Home</h1>} />
                        <Route path="parties" element={<Parties />} />
                        <Route path="parties/:id" element={<Party />} />
                    </Routes>
                </main>

                {/* TODO: Add Aside */}
            </div>
        </>
    );
};

export default Layout;
