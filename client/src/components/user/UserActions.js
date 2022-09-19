import { Group } from '@mantine/core';
import { IconMessage, IconUserPlus, IconUserMinus } from '@tabler/icons';

const UserActions = () => {
    return (
        <Group m="md" mt={20}>
            <IconMessage size={20} stroke={1.5} />
            <IconUserPlus size={20} stroke={1.5} />
            <IconUserMinus size={20} stroke={1.5} />
        </Group>
    );
};

export default UserActions;
