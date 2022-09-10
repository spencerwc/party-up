import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Tooltip, createStyles } from '@mantine/core';
import {
    IconHome2,
    IconDeviceGamepad2,
    IconLogout,
    IconLogin,
} from '@tabler/icons';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useLogout } from '../../hooks/useLogout';

const useStyles = createStyles((theme) => ({
    nav: {
        position: 'fixed',
        bottom: 0,
        top: 'auto',
        flexDirection: 'row',
        border: 'none',
        borderTop: `1px solid ${
            theme.colorScheme === 'dark'
                ? theme.colors.dark[5]
                : theme.colors.gray[3]
        }`,
        height: 'fit-content',
        width: '100%',
        backgroundColor:
            theme.colorScheme === 'dark'
                ? theme.colors.dark[8]
                : theme.colors.gray[1],
        boxShadow:
            'rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px',

        [`@media (min-width: ${theme.breakpoints.md}px)`]: {
            position: 'sticky',
            top: 0,
            flexDirection: 'column',
            gap: `${theme.spacing.sm}px`,
            height: '100vh',
            width: 'auto',
            border: 'none',
            borderRight: `1px solid ${
                theme.colorScheme === 'dark'
                    ? theme.colors.dark[5]
                    : theme.colors.gray[3]
            }`,
            boxShadow: 'none',
        },
    },

    links: {
        display: 'flex',
        justifyContent: 'space-between',

        [`@media (min-width: ${theme.breakpoints.md}px)`]: {
            flexDirection: 'column',
            justifyContent: 'flex-start',
            gap: `${theme.spacing.sm}px`,
            height: '100%',
        },
    },

    link: {
        width: 35,
        height: 35,
        borderRadius: theme.radius.md,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color:
            theme.colorScheme === 'dark'
                ? theme.colors.dark[0]
                : theme.colors.gray[7],

        '&:hover': {
            backgroundColor:
                theme.colorScheme === 'dark'
                    ? theme.colors.dark[7]
                    : theme.colors.gray[2],
        },

        '&:last-child': {
            marginTop: 'auto',
        },

        [`@media (min-width: ${theme.breakpoints.md}px)`]: {
            height: 50,
            width: 50,
            borderRadius: theme.radius.lg,
        },
    },

    active: {
        '&, &:hover': {
            backgroundColor: theme.fn.variant({
                variant: 'filled',
                color: theme.primaryColor,
            }).background,
            color: theme.fn.variant({
                variant: 'filled',
                color: theme.primaryColor,
            }).color,
        },
    },
}));

function NavbarLink({ icon: Icon, label, destination }) {
    const { classes, cx } = useStyles();

    return (
        <Tooltip label={label} position="right" transitionDuration={0}>
            <NavLink
                to={`${destination}`}
                className={({ isActive }) =>
                    cx(classes.link, { [classes.active]: isActive })
                }
            >
                <Icon stroke={1.5} />
            </NavLink>
        </Tooltip>
    );
}

const links = [
    { icon: IconHome2, label: 'Home', destination: '/' },
    { icon: IconDeviceGamepad2, label: 'Parties', destination: '/parties' },
];

const NavbarMinimal = () => {
    const { classes } = useStyles();
    const { user } = useAuthContext();
    const { logout } = useLogout();
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        logout();
        navigate('/login');
    };

    return (
        <Navbar className={classes.nav} width={{ base: 80 }} p="md">
            <Navbar.Section grow className={classes.links}>
                {links.map((link) => (
                    <NavbarLink {...link} key={link.label} />
                ))}

                {user ? (
                    <Tooltip
                        label="Logout"
                        position="right"
                        transitionDuration={0}
                    >
                        <div className={classes.link} onClick={handleLogout}>
                            <IconLogout stroke={1.5} />
                        </div>
                    </Tooltip>
                ) : (
                    <NavbarLink
                        icon={IconLogin}
                        label="Login"
                        destination="/login"
                    />
                )}
            </Navbar.Section>
        </Navbar>
    );
};

export default NavbarMinimal;
