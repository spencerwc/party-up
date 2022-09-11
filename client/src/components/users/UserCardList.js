import { Link } from 'react-router-dom';
import { Group, Stack, Title, Anchor, ScrollArea } from '@mantine/core';
import UserCard from './UserCard';

const UserCardList = ({ title, seeAllLink, users }) => {
    return (
        <Stack px="md">
            <Group position="apart">
                <Title order={2} size={20}>
                    {title}
                </Title>
                <Anchor component={Link} to={seeAllLink} weight={500}>
                    See All
                </Anchor>
            </Group>
            <ScrollArea>
                <Group noWrap pb="md">
                    {users.map((user) => (
                        <UserCard key={user.username} user={user} />
                    ))}
                </Group>
            </ScrollArea>
        </Stack>
    );
};

export default UserCardList;
