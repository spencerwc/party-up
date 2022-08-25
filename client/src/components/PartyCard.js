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

        '&:hover': {
            backgroundColor:
                theme.colorScheme === 'dark'
                    ? theme.colors.dark[6]
                    : theme.colors.gray[0],
        },

        [`@media (min-width: ${theme.breakpoints.md}px)`]: {
            padding: 0,
            border: `1px solid ${
                theme.colorScheme === 'dark'
                    ? theme.colors.dark[6]
                    : theme.colors.gray[2]
            }`,
            borderRadius: theme.radius.md,
        },
    },

    inner: {
        padding: 0,

        [`@media (min-width: ${theme.breakpoints.md}px)`]: {
            padding: `${theme.spacing.sm}px`,
            paddingLeft: `${theme.spacing.md}px`,
        },
    },

    title: {
        fontWeight: 700,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        lineHeight: 1.2,
    },

    memberDetails: {
        width: '100%',

        [`@media (min-width: ${theme.breakpoints.xs}px)`]: {
            width: 'auto',
        },
    },
}));

const PartyCard = ({ party }) => {
    const { classes } = useStyles();
    const openings = party.lookingFor - (party.members.length - 1); // Subtract one for the slot filled by leader

    return (
        <li>
            <Link to={party._id} className={classes.link}>
                <Card className={classes.card}>
                    <Group className={classes.inner} noWrap spacing="md">
                        <Avatar
                            src={party.game.cover ? party.game.cover.url : null}
                            size={90}
                        >
                            <IconQuestionMark />
                        </Avatar>
                        <Stack spacing={0}>
                            <Text color="dimmed">
                                {dayjs(party.date).format('dddd, MMMM D')}
                            </Text>
                            <Text className={classes.title} my={6}>
                                {party.name}
                            </Text>
                            <Text size="sm" color="dimmed" mb="sm">
                                {party.game.name}
                            </Text>
                            <Group spacing="sm">
                                <Group
                                    className={classes.memberDetails}
                                    noWrap
                                    spacing="sm"
                                >
                                    <ThemeIcon variant="light" radius="xl">
                                        {party.members.length > 1 ? (
                                            <IconUsers size={16} />
                                        ) : (
                                            <IconUser size={16} />
                                        )}
                                    </ThemeIcon>
                                    <Text size="sm" color="dimmed">
                                        {party.members.length} member
                                        {party.members.length > 1 && 's'}
                                    </Text>
                                </Group>
                                <Group
                                    className={classes.memberDetails}
                                    noWrap
                                    spacing="sm"
                                >
                                    <ThemeIcon variant="light" radius="xl">
                                        <IconSearch size={16} />
                                    </ThemeIcon>
                                    <Text size="sm" color="dimmed">
                                        {openings > 0
                                            ? `Looking for ${openings} more`
                                            : 'Filled'}
                                    </Text>
                                </Group>
                            </Group>
                        </Stack>
                    </Group>
                </Card>
            </Link>
        </li>
    );
};

export default PartyCard;
