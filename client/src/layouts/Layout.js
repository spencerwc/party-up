import { Routes, Route } from 'react-router-dom';
import { createStyles, Header } from '@mantine/core';
import NavbarMinimal from '../components/NavbarMinimal';
import Parties from '../pages/Parties';
import Party from '../pages/Party';
import CreateParty from '../pages/CreateParty';

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
    header: {
        position: 'sticky',
        top: 0,
        boxShadow:
            'rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px',

        [`@media (min-width: ${theme.breakpoints.md}px)`]: {
            display: 'none',
        },
    },
}));

const Layout = () => {
    const { classes } = useStyles();

    return (
        <>
            <Header height={60} className={classes.header} />

            <div className={classes.container}>
                <NavbarMinimal />

                <main className={classes.content}>
                    <Routes>
                        <Route path="/" element={<h1>Home</h1>} />
                        <Route path="parties" element={<Parties />} />
                        <Route path="parties/new" element={<CreateParty />} />
                        <Route path="parties/:id" element={<Party />} />
                    </Routes>
                </main>

                {/* TODO: Add Aside */}
            </div>
        </>
    );
};

export default Layout;
