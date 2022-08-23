import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import {
    createStyles,
    Image,
    Container,
    Title,
    Button,
    Group,
    Stack,
    Text,
    Avatar,
    Anchor,
} from '@mantine/core';
import { Link } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
    inner: {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,

        [theme.fn.largerThan('xs')]: {
            justifyContent: 'space-between',
        },
    },

    content: {
        maxWidth: 480,
        marginRight: theme.spacing.xl * 3,

        [theme.fn.smallerThan('md')]: {
            maxWidth: '100%',
            marginRight: 0,
        },
    },

    title: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontSize: 44,
        lineHeight: 1.2,
        fontWeight: 900,

        [theme.fn.smallerThan('xs')]: {
            fontSize: 28,
        },
    },

    control: {
        [theme.fn.smallerThan('xs')]: {
            flex: 1,
        },
    },

    image: {
        objectFit: 'cover',
        backgroundColor: theme.colors.gray[2],
        maxWidth: '250px',
        borderRadius: theme.radius.md,

        [theme.fn.smallerThan('xs')]: {
            display: 'none',
        },
    },
}));

const PartyDetails = ({ party }) => {
    const { classes } = useStyles();
    const { user } = useAuthContext();
    const [isMember, setIsMember] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const [openings, setOpenings] = useState(
        party.lookingFor - (party.members.length - 1)
    );

    useEffect(() => {
        if (user) {
            const index = party.members.findIndex(
                (member) => member.username === user.username
            );

            if (index !== -1) {
                setIsMember(true);
            }
        }
    }, [party, user]);

    const handleJoin = async () => {
        setIsPending(true);

        const res = await fetch(`/api/parties/${party._id}/members/join`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });

        if (!res.ok) {
            setError('Could not join party');
        }

        if (res.ok) {
            setIsMember(true);
            setOpenings(openings - 1);
        }

        setIsPending(false);
    };

    const handleLeave = async () => {
        setIsPending(true);

        const res = await fetch(`/api/parties/${party._id}/members/leave`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });

        if (res.ok) {
            setIsMember(false);
            setOpenings(openings + 1);
        }

        setIsPending(false);
    };

    // Default action to join the party
    let membershipAction = (
        <Button
            size="md"
            className={classes.control}
            disabled={!user || isPending || error}
            onClick={handleJoin}
        >
            Join Party
        </Button>
    );

    // If user is leader, notify them
    if (user.username === party.leader.username) {
        membershipAction = (
            <Text color="dimmed">You are the leader of this party.</Text>
        );
    }

    // Otherwise - if user is a member, allow them to leave
    if (isMember && user.username !== party.leader.username) {
        membershipAction = (
            <Button
                size="md"
                className={classes.control}
                onClick={handleLeave}
                disabled={isPending}
            >
                Leave Party
            </Button>
        );
    }

    // If user is not a member and no openings are available, membership is not allowed
    if (openings === 0 && !isMember) {
        membershipAction = <Text color="dimmed">The party has filled.</Text>;
    }

    return (
        <>
            <div className={classes.banner}>
                <Container m="md" p={0}>
                    <div className={classes.inner}>
                        <div className={classes.content}>
                            <Title className={classes.title}>
                                {party.name}
                            </Title>
                            <Text color="dimmed" mt="md" size="xl">
                                {party.date.toLocaleString()}
                            </Text>

                            {openings > 0 && (
                                <Text color="dimmed" mt="md" size="lg">
                                    Looking for {openings} more
                                </Text>
                            )}

                            <Anchor
                                component={Link}
                                to={`/users/${[party.leader.username]}`}
                                underline={false}
                                sx={(theme) => ({
                                    color:
                                        theme.colorScheme === 'dark'
                                            ? theme.white
                                            : theme.black,
                                })}
                            >
                                <Group mt={30}>
                                    <Avatar
                                        src={party.leader.avatar}
                                        alt="avatar"
                                        size="lg"
                                        radius="xl"
                                    />
                                    <Stack spacing={0}>
                                        <Text>Led by</Text>
                                        <Text weight="bold">
                                            {party.leader.username}
                                        </Text>
                                    </Stack>
                                </Group>
                            </Anchor>

                            <Group mt={30}>
                                {membershipAction}
                                {error && <Text>{error}</Text>}
                            </Group>
                        </div>
                        <Image src="" className={classes.image} mr="xl" />
                    </div>
                </Container>
            </div>
            <Text m="md">{party.details}</Text>
        </>
    );
};

export default PartyDetails;
