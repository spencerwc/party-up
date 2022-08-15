import { createStyles, Card, Image, Avatar, Text, Group } from '@mantine/core';
import { Link } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
    link: {
        color: 'inherit',
        textDecoration: 'none',
    },

    card: {
        backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        borderTop: `1px solid ${
            theme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2]
        }`,
        borderRadius: 0,

        '&:hover': {
            backgroundColor:
                theme.colorScheme === 'dark'
                    ? theme.colors.dark[0]
                    : theme.colors.gray[0],
        },

        [`@media (min-width: ${theme.breakpoints.md}px)`]: {
            padding: 0,
            border: `1px solid ${
                theme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2]
            }`,
            borderRadius: theme.radius.md,
        },
    },

    image: {
        objectFit: 'cover',
    },

    title: {
        fontWeight: 700,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        lineHeight: 1.2,
    },

    body: {
        padding: theme.spacing.md,
    },
}));

const PartyCard = ({ party }) => {
    const { classes } = useStyles();

    return (
        <li>
            <Link to={party._id} className={classes.link}>
                <Card className={classes.card}>
                    <Group noWrap spacing={0}>
                        <Image
                            src={party.cover}
                            height={120}
                            width={120}
                            className={classes.image}
                        />
                        <div className={classes.body}>
                            <Text color="dimmed" weight={700} size="xs">
                                {party.date.toLocaleString()}
                            </Text>
                            <Text className={classes.title} mt="xs" mb="md">
                                {party.name}
                            </Text>
                            <Group noWrap spacing="xs">
                                {/* <Group spacing="xs" noWrap>
                                    <Avatar size={20} src={leader.avatar} />
                                    <Text size="xs">{leader.name}</Text>
                                </Group> */}
                                <Text size="xs" color="dimmed">
                                    {party.memberCount} member
                                    {party.memberCount > 1 && 's'}
                                </Text>
                                <Text size="xs" color="dimmed">
                                    •
                                </Text>
                                <Text size="xs" color="dimmed">
                                    {party.lookingFor > 0
                                        ? `Looking for ${party.lookingFor} more`
                                        : 'Filled'}
                                </Text>
                            </Group>
                        </div>
                    </Group>
                </Card>
            </Link>
        </li>
    );
};

export default PartyCard;
