import { NavLink } from 'react-router-dom';
import { Navbar, Tooltip, createStyles } from '@mantine/core';
import { IconHome2, IconDeviceGamepad2, IconLogout } from '@tabler/icons';

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
                : theme.colors.gray[2]
        }`,
        height: 'fit-content',
        width: '100%',
        boxShadow:
            'rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px',

        [`@media (min-width: ${theme.breakpoints.md}px)`]: {
            position: 'static',
            flexDirection: 'column',
            gap: `${theme.spacing.sm}px`,
            height: 'calc(100vh - var(--mantine-header-height, 0px) - var(--mantine-footer-height, 0px))',
            width: 'auto',
            border: 'none',
            borderRight: `1px solid ${
                theme.colorScheme === 'dark'
                    ? theme.colors.dark[5]
                    : theme.colors.gray[2]
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
        width: 50,
        height: 50,
        borderRadius: theme.radius.md,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color:
            theme.colorScheme === 'dark'
                ? theme.colors.dark[0]
                : theme.colors.gray[7],

        '&:hover': {
            backgroundColor:
                theme.colorScheme === 'dark'
                    ? theme.colors.dark[5]
                    : theme.colors.gray[0],
        },
        '&:last-of-type': {
            marginTop: 'auto',
        },
    },

    active: {
        '&, &:hover': {
            backgroundColor: theme.fn.variant({
                variant: 'light',
                color: theme.primaryColor,
            }).background,
            color: theme.fn.variant({
                variant: 'light',
                color: theme.primaryColor,
            }).color,
        },
    },

    logout: {
        backgroundColor: 'red',
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

    return (
        <Navbar className={classes.nav} width={{ base: 80 }} p="md">
            <Navbar.Section grow className={classes.links}>
                {links.map((link) => (
                    <NavbarLink {...link} key={link.label} />
                ))}
                <NavbarLink
                    icon={IconLogout}
                    label="Logout"
                    destination="/logout"
                />
            </Navbar.Section>
        </Navbar>
    );
};

export default NavbarMinimal;
