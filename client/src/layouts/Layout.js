import { useState } from 'react';
import { Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { createStyles, Header, Button, Anchor, Group } from '@mantine/core';
import { IconConfetti } from '@tabler/icons';
import NavbarMinimal from '../components/general/NavbarMinimal';
import AsideMinimal from '../components/general/AsideMinimal';
import Dashboard from '../pages/Dashboard';
import PartyDashboard from '../pages/PartyDashboard';
import Parties from '../pages/Parties';
import Party from '../pages/Party';
import CreateParty from '../pages/CreateParty';
import EditParty from '../pages/EditParty';
import PartyMembers from '../pages/PartyMembers';
import RegisterModal from '../components/general/RegisterModal';
import User from '../pages/User';
import UserFriends from '../pages/UserFriends';
import Alerts from '../pages/Alerts';
import FriendDashboard from '../pages/FriendDashboard';
import NotFound from '../pages/NotFound';

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
        paddingBottom: 80,
    },

    header: {
        position: 'sticky',
        top: 0,
        padding: `${theme.spacing.sm}px ${theme.spacing.md}px`,
        borderBottom: `1px solid ${
            theme.colorScheme === 'dark'
                ? theme.colors.dark[5]
                : theme.colors.gray[3]
        }`,
        backgroundColor:
            theme.colorScheme === 'dark'
                ? theme.colors.dark[8]
                : theme.colors.gray[1],
        boxShadow:
            'rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px',

        [`@media (min-width: ${theme.breakpoints.md}px)`]: {
            display: 'none',
        },
    },

    logo: {
        margin: '0 !important',

        svg: {
            transform: 'rotate(-45deg)',
            color: theme.colors.teal[6],
            fill: theme.colors.teal[6],
            width: 36,
            height: 36,
        },
    },
}));

const Layout = () => {
    const { user } = useAuthContext();
    const { classes } = useStyles();
    const [isRegistering, setIsRegistering] = useState(false);
    const navigate = useNavigate();

    const handleStartParty = () => {
        if (!user) {
            setIsRegistering(true);
        } else {
            navigate('/parties/new');
        }
    };

    return (
        <>
            <Header className={classes.header}>
                <Group position="apart">
                    <Anchor
                        component={Link}
                        to="/"
                        mx="auto"
                        className={classes.logo}
                    >
                        <IconConfetti />
                    </Anchor>
                    <Button size="xs" onClick={handleStartParty}>
                        Start a Party
                    </Button>
                </Group>
            </Header>

            {/* Displayed on action if user is not logged in or registered */}
            <RegisterModal
                isOpen={isRegistering}
                setIsOpen={setIsRegistering}
            />

            <div className={classes.container}>
                <NavbarMinimal />

                <main className={classes.content}>
                    <Routes>
                        <Route
                            path="/dashboard"
                            element={
                                user ? <Dashboard /> : <Navigate to="/login" />
                            }
                        />
                        <Route path="parties" element={<Parties />} />
                        <Route
                            path="parties/new"
                            element={
                                user ? (
                                    <CreateParty />
                                ) : (
                                    <Navigate to="/login" />
                                )
                            }
                        />
                        <Route
                            path="parties/:id"
                            element={
                                <Party setIsRegistering={setIsRegistering} />
                            }
                        />
                        <Route
                            path="parties/:id/edit"
                            element={
                                user ? <EditParty /> : <Navigate to="/login" />
                            }
                        />
                        <Route
                            path="parties/:id/members"
                            element={<PartyMembers />}
                        />
                        <Route
                            path="/users/:username"
                            element={
                                <User setIsRegistering={setIsRegistering} />
                            }
                        />
                        <Route
                            path="/users/:username/friends"
                            element={
                                <UserFriends
                                    setIsRegistering={setIsRegistering}
                                />
                            }
                        />
                        <Route
                            path="/alerts"
                            element={
                                user ? <Alerts /> : <Navigate to="/login" />
                            }
                        />
                        <Route
                            path="/friends"
                            element={
                                user ? (
                                    <FriendDashboard />
                                ) : (
                                    <Navigate to="/login" />
                                )
                            }
                        />
                        <Route
                            path="/my/parties"
                            element={
                                user ? (
                                    <PartyDashboard />
                                ) : (
                                    <Navigate to="/login" />
                                )
                            }
                        />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>

                <AsideMinimal setIsRegistering={setIsRegistering} />
            </div>
        </>
    );
};

export default Layout;
