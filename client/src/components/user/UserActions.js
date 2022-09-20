import { Box, ActionIcon, Group, Tooltip } from '@mantine/core';
import {
    IconMessage,
    IconUserPlus,
    IconUserMinus,
    IconUserX,
} from '@tabler/icons';

const UserActions = ({
    isFriend,
    sendFriendRequest,
    hasRequestedFriend,
    setIsConfirmingRemove,
    setIsConfirmingCancel,
}) => {
    const handleRequest = () => {
        if (!hasRequestedFriend) {
            sendFriendRequest();
        }
    };

    if (hasRequestedFriend) {
        return (
            <Box m="md" mt={20}>
                <Tooltip label="Cancel Request">
                    <ActionIcon
                        radius="md"
                        variant="filled"
                        onClick={() => setIsConfirmingCancel(true)}
                    >
                        <IconUserX size={20} stroke={1.5} />
                    </ActionIcon>
                </Tooltip>
            </Box>
        );
    }

    if (isFriend) {
        return (
            <Group m="md" mt={20} spacing={6}>
                <Tooltip label="Message">
                    <ActionIcon radius="md" variant="filled" color="">
                        <IconMessage size={20} stroke={1.5} />
                    </ActionIcon>
                </Tooltip>

                <Tooltip label="Remove Friend">
                    <ActionIcon
                        radius="md"
                        variant="filled"
                        color="red.8"
                        onClick={() => setIsConfirmingRemove(true)}
                    >
                        <IconUserMinus size={20} stroke={1.5} />
                    </ActionIcon>
                </Tooltip>
            </Group>
        );
    }

    return (
        <Group m="md" mt={20}>
            <Tooltip label="Add friend">
                <ActionIcon
                    radius="md"
                    variant="filled"
                    color=""
                    onClick={handleRequest}
                    disabled={hasRequestedFriend}
                >
                    <IconUserPlus size={20} stroke={1.5} />
                </ActionIcon>
            </Tooltip>
        </Group>
    );
};

export default UserActions;
