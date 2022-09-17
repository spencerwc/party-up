import { Link } from 'react-router-dom';
import {
    Title,
    Group,
    Stack,
    Text,
    Avatar,
    Anchor,
    Badge,
    Center,
    createStyles,
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

const PartyDetails = ({ party, openings }) => {
    const { classes } = useStyles();

    return (
        <Stack spacing={0}>
            <Group noWrap>
                <Avatar
                    className={classes.partyAvatar}
                    size={60}
                    src={party.game.cover.url}
                    radius="lg"
                />
                <div>
                    <Text color="dimmed" weight={500}>
                        {dayjs(party.date).format('dddd, MMMM D YYYY')}
                    </Text>
                    <Title size={24}>{party.name}</Title>
                    <Text color="dimmed">{party.game.name}</Text>
                </div>
            </Group>

            <Group spacing="xs">
                <Badge
                    mt="sm"
                    radius="md"
                    variant="filled"
                    color="teal.7"
                    sx={{ width: 'fit-content' }}
                    leftSection={
                        <Center>
                            <IconUsers size={14} />
                        </Center>
                    }
                >
                    {party.members.length}{' '}
                    <span className={classes.mobileHidden}>members</span>
                </Badge>
                <Badge
                    mt="sm"
                    radius="md"
                    variant="filled"
                    color="violet.7"
                    sx={{ width: 'fit-content' }}
                    leftSection={
                        <Center>
                            <IconSearch size={14} />
                        </Center>
                    }
                >
                    {openings}{' '}
                    <span className={classes.mobileHidden}>openings</span>
                </Badge>
            </Group>

            <Anchor
                component={Link}
                to={`/users/${[party.leader.username]}`}
                underline={false}
                variant="text"
                mt="xl"
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
