import {
    createStyles,
    Card,
    Avatar,
    Text,
    Group,
    Stack,
    ThemeIcon,
} from '@mantine/core';
import {
    IconUser,
    IconUsers,
    IconSearch,
    IconQuestionMark,
} from '@tabler/icons';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

const useStyles = createStyles((theme) => ({
    link: {
        color: 'inherit',
        textDecoration: 'none',
    },

    card: {
        backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        borderTop: `1px solid ${
            theme.colorScheme === 'dark'
                ? theme.colors.dark[6]
                : theme.colors.gray[2]
        }`,
        borderRadius: 0,
        overflow: 'hidden',
        whiteSpace: 'nowrap',

        [`@media (min-width: ${theme.breakpoints.md}px)`]: {
            padding: 0,
            border: 'none',
            borderRadius: theme.radius.lg,
            boxShadow: 'rgba(0, 0, 0, 0.04) 0px 3px 5px',
            transition: 'all 0.25s',

            '&:hover': {
                boxShadow:
                    'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
                transform: 'translateY(-1px)',
            },
        },
    },

    inner: {
        padding: 0,

        [`@media (min-width: ${theme.breakpoints.md}px)`]: {
            padding: `${theme.spacing.sm}px`,
            paddingLeft: `${theme.spacing.xl}px`,
        },
    },

    partyImage: {
        width: 60,
        height: 60,
        flexShrink: 0,

        [`@media (min-width: ${theme.breakpoints.xs}px)`]: {
            width: 70,
            height: 70,
        },
    },

    mobileHidden: {
        display: 'none',

        [`@media (min-width: 390px)`]: {
            display: 'inline',
        },
    },

    userIcon: {
        color: theme.colors.teal[7],
        fill: theme.colors.teal[7],
    },

    searchIcon: {
        color: theme.colors.violet[7],
    },
}));

const PartyCard = ({ party }) => {
    const { classes } = useStyles();
    const openings = party.lookingFor - (party.members.length - 1); // Subtract one for the slot filled by leader

    return (
        <Link to={party._id} className={classes.link}>
            <Card className={classes.card}>
                <Group className={classes.inner} noWrap spacing="lg">
                    <Avatar
                        className={classes.partyImage}
                        src={party.game.cover ? party.game.cover.url : null}
                        radius="lg"
                    >
                        <IconQuestionMark />
                    </Avatar>
                    <Stack spacing={0}>
                        <Text color="dimmed" size="xs">
                            {dayjs(party.date).format('dddd, MMMM D')}
                        </Text>
                        <Text weight={600} className={classes.partyName}>
                            {party.name}
                        </Text>
                        <Text size="xs" color="dimmed" mb={8}>
                            {party.game.name}
                        </Text>
                        <Group spacing="sm">
                            <Group noWrap spacing={5}>
                                {party.members.length > 1 ? (
                                    <IconUsers
                                        className={classes.userIcon}
                                        size={16}
                                    />
                                ) : (
                                    <IconUser
                                        size={16}
                                        className={classes.userIcon}
                                    />
                                )}
                                <Text size="xs" weight={500}>
                                    {party.members.length}{' '}
                                    <span className={classes.mobileHidden}>
                                        member
                                        {party.members.length > 1 && 's'}
                                    </span>
                                </Text>
                            </Group>
                            <Group
                                className={classes.memberDetails}
                                noWrap
                                spacing={4}
                            >
                                <IconSearch
                                    className={classes.searchIcon}
                                    size={16}
                                />
                                <Text size="xs" weight={500}>
                                    {openings > 0 ? (
                                        <>
                                            <span
                                                className={classes.mobileHidden}
                                            >
                                                Looking for
                                            </span>{' '}
                                            {openings}{' '}
                                            <span
                                                className={classes.mobileHidden}
                                            >
                                                more
                                            </span>
                                        </>
                                    ) : (
                                        'Filled'
                                    )}
                                </Text>
                            </Group>
                        </Group>
                    </Stack>
                </Group>
            </Card>
        </Link>
    );
};

export default PartyCard;
