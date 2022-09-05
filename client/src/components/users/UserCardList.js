import { Link } from 'react-router-dom';
import { Group, Stack, Title, Anchor } from '@mantine/core';
import UserCard from './UserCard';

const UserCardList = ({ title, seeAllLink, users }) => {
    return (
        <Stack mt="lg">
            <Group position="apart">
                <Title order={2} size={21}>
                    {title}
                </Title>
                <Anchor component={Link} to={seeAllLink}>
                    See All
                </Anchor>
            </Group>
            <Group>
                {users.map((user) => (
                    <UserCard key={user.username} user={user} />
                ))}
            </Group>
        </Stack>
    );
};

export default UserCardList;
