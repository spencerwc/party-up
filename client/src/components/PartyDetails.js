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
    MediaQuery,
} from '@mantine/core';
import { Link } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
    content: {
        [theme.fn.smallerThan('md')]: {},
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
        <Container m="md" p={0}>
            <Group noWrap sx={{ justifyContent: 'space-between' }}>
                <Stack className={classes.content} spacing={0}>
                    <Title className={classes.title}>{party.name}</Title>
                    <Text color="dimmed" mt="md" size="xl">
                        {party.date.toLocaleString()}
                    </Text>
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
                        <Group mt="lg">
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

                    {openings > 0 && (
                        <Text color="dimmed" mt="xl" size="lg">
                            Looking for {openings} more
                        </Text>
                    )}

                    <Group mt={30}>
                        {membershipAction}
                        {error && <Text>{error}</Text>}
                    </Group>
                </Stack>
                <MediaQuery smallerThan="xs" styles={{ display: 'none' }}>
                    <Image
                        src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${party.game.cover.image_id}.jpg`}
                        width={200}
                        mr="xl"
                        withPlaceholder
                    />
                </MediaQuery>
                <MediaQuery largerThan="xs" styles={{ display: 'none' }}>
                    <Image
                        src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${party.game.cover.image_id}.jpg`}
                        width={120}
                        withPlaceholder
                        mb="auto"
                    />
                </MediaQuery>
            </Group>
        </Container>
    );
};

export default PartyDetails;
