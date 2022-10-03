import { useAuthContext } from '../hooks/useAuthContext';
import { Link } from 'react-router-dom';
import { Navbar, Anchor, createStyles, Center } from '@mantine/core';
import { IconConfetti } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
    nav: {
        position: 'fixed',
        bottom: 0,
        top: 'auto',
        flexDirection: 'row',
        border: 'none',
        height: 'fit-content',
        padding: `${theme.spacing.sm}px ${theme.spacing.md}px`,
        borderTop: `1px solid ${
            theme.colorScheme === 'dark'
                ? theme.colors.dark[5]
                : theme.colors.gray[3]
        }`,
        backgroundColor:
            theme.colorScheme === 'dark'
                ? theme.colors.dark[8]
                : theme.colors.gray[1],
        boxShadow:
            'rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px',

        [`@media (min-width: ${theme.breakpoints.md}px)`]: {
            position: 'sticky',
            top: 0,
            borderTop: 'none',
            borderBottom: `1px solid ${
                theme.colorScheme === 'dark'
                    ? theme.colors.dark[5]
                    : theme.colors.gray[3]
            }`,
            boxShadow:
                'rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px',
        },
    },

    links: {
        display: 'flex',
        justifyContent: 'space-between',
        maxWidth: 1000,
        marginRight: 'auto',
        marginLeft: 'auto',
        gap: theme.spacing.xl,
        fontWeight: 500,
        fontSize: theme.fontSizes.sm,

        [`@media (min-width: ${theme.breakpoints.md}px)`]: {
            fontSize: theme.fontSizes.md,
        },
    },

    logo: {
        display: 'inlin-block',

        svg: {
            transform: 'rotate(-45deg)',
            color: theme.colors.teal[6],
            fill: theme.colors.teal[6],
            width: 40,
            height: 40,
        },
    },

    register: {
        color: theme.colors.indigo[7],
    },
}));

const Home = () => {
    const { classes } = useStyles();
    const { user } = useAuthContext();

    return (
        <>
            <Navbar className={classes.nav}>
                <Navbar.Section className={classes.links} grow>
                    <Anchor component={Link} to="/" className={classes.logo}>
                        <IconConfetti />
                    </Anchor>
                    <Center>
                        <Anchor component={Link} to="/parties" variant="text">
                            Parties
                        </Anchor>
                    </Center>

                    {!user && (
                        <Center>
                            <Anchor component={Link} to="/login" variant="text">
                                Log In
                            </Anchor>
                        </Center>
                    )}
                    {!user && (
                        <Center>
                            <Anchor
                                className={classes.register}
                                component={Link}
                                to="/signup"
                                variant="text"
                            >
                                Sign Up
                            </Anchor>
                        </Center>
                    )}
                    {user && (
                        <Center>
                            <Anchor component={Link} to="/dashboard">
                                Dashboard
                            </Anchor>
                        </Center>
                    )}
                </Navbar.Section>
            </Navbar>
        </>
    );
};

export default Home;
