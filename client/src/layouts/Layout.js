import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { createStyles, Header } from '@mantine/core';
import NavbarMinimal from '../components/general/NavbarMinimal';
import AsideMinimal from '../components/general/AsideMinimal';
import Parties from '../pages/Parties';
import Party from '../pages/Party';
import CreateParty from '../pages/CreateParty';
import EditParty from '../pages/EditParty';
import PartyMembers from '../pages/PartyMembers';
import RegisterModal from '../components/general/RegisterModal';
import User from '../pages/User';
import UserFriends from '../pages/UserFriends';

const useStyles = createStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',

        // Media query with value from theme
        [`@media (min-width: ${theme.breakpoints.md}px)`]: {
            flexDirection: 'row',
            maxWidth: '1210px',
            margin: '0 auto',
            gap: theme.spacing.sm,
        },
    },
    content: {
        minWidth: 0,
        width: '100%',
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
    const [isRegistering, setIsRegistering] = useState(false);

    return (
        <>
            <Header height={60} className={classes.header} />

            {/* Displayed on action if user is not logged in or registered */}
            <RegisterModal
                isOpen={isRegistering}
                setIsOpen={setIsRegistering}
            />

            <div className={classes.container}>
                <NavbarMinimal />

                <main className={classes.content}>
                    <Routes>
                        <Route path="/" element={<h1>Home</h1>} />
                        <Route path="parties" element={<Parties />} />
                        <Route path="parties/new" element={<CreateParty />} />
                        <Route
                            path="parties/:id"
                            element={
                                <Party setIsRegistering={setIsRegistering} />
                            }
                        />
                        <Route
                            path="parties/:id/edit"
                            element={<EditParty />}
                        />
                        <Route
                            path="parties/:id/members"
                            element={<PartyMembers />}
                        />
                        <Route
                            path="/users/:username"
                            element={<User setIsRegistering={isRegistering} />}
                        />
                        <Route
                            path="/users/:username/friends"
                            element={
                                <UserFriends setIsRegistering={isRegistering} />
                            }
                        />
                    </Routes>
                </main>

                <AsideMinimal setIsRegistering={setIsRegistering} />
            </div>
        </>
    );
};

export default Layout;
