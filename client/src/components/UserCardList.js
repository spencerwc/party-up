import { Link } from 'react-router-dom';
import { createStyles, Group, Stack, Title, Anchor } from '@mantine/core';
import UserCard from './UserCard';

const useStyles = createStyles((theme) => ({
    cardList: {
        justifyContent: 'center',

        [theme.fn.largerThan('xs')]: {
            justifyContent: 'flex-start',
        },
    },
}));

const UserCardList = ({ title, seeAllLink, users }) => {
    const { classes } = useStyles();

    return (
        <Stack mt="lg">
            <Group position="apart">
                <Title order={2}>{title}</Title>
                <Anchor component={Link} to={seeAllLink}>
                    See All
                </Anchor>
            </Group>
            <Group className={classes.cardList}>
                {users.map((user) => (
                    <UserCard key={user.username} user={user} />
                ))}
            </Group>
        </Stack>
    );
};

export default UserCardList;
