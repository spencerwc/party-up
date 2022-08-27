import { Link } from 'react-router-dom';
import {
    createStyles,
    Image,
    Title,
    Group,
    Stack,
    Text,
    Avatar,
    Anchor,
    MediaQuery,
} from '@mantine/core';
import dayjs from 'dayjs';

const useStyles = createStyles((theme) => ({
    title: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontSize: 44,
        lineHeight: 1.2,
        fontWeight: 700,

        [theme.fn.smallerThan('xs')]: {
            fontSize: 28,
        },
    },
}));

const PartyDetails = ({ party, openings }) => {
    const { classes } = useStyles();

    return (
        <Group noWrap sx={{ justifyContent: 'space-between' }}>
            <Stack spacing="xs" mb="auto" pb="md">
                <Title className={classes.title}>{party.name}</Title>
                <Text color="dimmed" size="xl">
                    {dayjs(party.date).format('dddd, MMMM D YYYY')}
                </Text>
                {openings > 0 && (
                    <Text color="dimmed" size="lg">
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
                    <Group mt="sm">
                        <Avatar
                            src={party.leader.avatar}
                            alt="avatar"
                            size="lg"
                            radius="xl"
                        />
                        <Stack spacing={0}>
                            <Text>Led by</Text>
                            <Text weight="bold">{party.leader.username}</Text>
                        </Stack>
                    </Group>
                </Anchor>
            </Stack>
            <MediaQuery smallerThan="xs" styles={{ display: 'none' }}>
                <Image
                    src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${party.game.cover.image_id}.jpg`}
                    width={180}
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
    );
};

export default PartyDetails;
