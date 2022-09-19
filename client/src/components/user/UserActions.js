import { ActionIcon, Group } from '@mantine/core';
import { IconMessage, IconUserPlus, IconUserMinus } from '@tabler/icons';

const UserActions = ({ isFriend, addFriend, setIsConfirmingRemove }) => {
    if (isFriend) {
        return (
            <Group m="md" mt={20} spacing={4}>
                <ActionIcon radius="md">
                    <IconMessage size={20} stroke={1.5} />
                </ActionIcon>
                <ActionIcon
                    radius="md"
                    onClick={() => setIsConfirmingRemove(true)}
                >
                    <IconUserMinus size={20} stroke={1.5} />
                </ActionIcon>
            </Group>
        );
    } else {
        return (
            <Group m="md" mt={20}>
                <ActionIcon onClick={addFriend} radius="md">
                    <IconUserPlus size={20} stroke={1.5} />
                </ActionIcon>
            </Group>
        );
    }
};

export default UserActions;
