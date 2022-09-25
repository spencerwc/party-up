import { Link } from 'react-router-dom';
import {
    Title,
    Group,
    Stack,
    Text,
    Avatar,
    Anchor,
    createStyles,
    MediaQuery,
} from '@mantine/core';
import { IconUsers, IconSearch } from '@tabler/icons';
import dayjs from 'dayjs';

const useStyles = createStyles((theme) => ({
    partyAvatar: {
        display: 'none',

        [`@media (min-width: 350px)`]: {
            display: 'block',
            marginBottom: 'auto',
            marginTop: theme.spacing.md,
        },

        [`@media (min-width: 550px)`]: {
            display: 'none',
        },
    },
}));

const PartyDetails = ({ party, members, openings }) => {
    const { classes } = useStyles();

    return (
        <Stack spacing={0}>
            <MediaQuery largerThan="xs" styles={{ display: 'none' }}>
                <Text color="dimmed" weight={500}>
                    {dayjs(party.date).format('ddd, MMM. D, YYYY, h:mm A')}
                </Text>
            </MediaQuery>
            <MediaQuery smallerThan="xs" styles={{ display: 'none' }}>
                <Text color="dimmed" weight={500}>
                    {dayjs(party.date).format('dddd, MMMM D, YYYY, h:mm A')}
                </Text>
            </MediaQuery>
            <Title size={24}>{party.name}</Title>
            <Text color="dimmed" size={15}>
                {party.game.name}
            </Text>

            <Group spacing="xs" mt={4}>
                <Group spacing={4} align="flex-start">
                    <Text color="teal.7">
                        <IconUsers size={15} />
                    </Text>
                    <Text size="sm">
                        <strong>{members.length}</strong>{' '}
                        <span className={classes.mobileHidden}>
                            member{members.length !== 1 && 's'}
                        </span>
                    </Text>
                </Group>

                <Group spacing={4} align="flex-start">
                    <Text color="violet.7">
                        <IconSearch size={14} />
                    </Text>
                    {openings > 0 ? (
                        <Text size="sm">
                            <strong>{openings}</strong>{' '}
                            <span className={classes.mobileHidden}>
                                opening{openings !== 1 && 's'}
                            </span>
                        </Text>
                    ) : (
                        <Text size="sm" weight={600}>
                            Filled
                        </Text>
                    )}
                </Group>
            </Group>

            <Anchor
                component={Link}
                to={`/users/${[party.leader.username]}`}
                underline={false}
                variant="text"
                mt="sm"
            >
                <Group spacing="xs">
                    <Avatar src={party.leader.avatar} size={50} radius="xl" />
                    <Stack spacing={0}>
                        <Text size="sm">Led by</Text>
                        <Text weight={500}>{party.leader.username}</Text>
                    </Stack>
                </Group>
            </Anchor>
        </Stack>
    );
};

export default PartyDetails;
