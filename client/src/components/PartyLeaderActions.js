import { Menu, Button } from '@mantine/core';
import { IconTrash } from '@tabler/icons';

const PartyLeaderActions = ({ setIsConfirmingDelete }) => {
    const handleDeleteConfirmation = () => {
        setIsConfirmingDelete(true);
    };

    return (
        <Menu
            shadow="md"
            width={200}
            mt="lg"
            trigger="hover"
            position="bottom-start"
        >
            <Menu.Target>
                <Button>Party Actions</Button>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Label>Actions</Menu.Label>
                <Menu.Divider />
                <Menu.Label>Danger zone</Menu.Label>
                <Menu.Item
                    color="red"
                    icon={<IconTrash size={14} />}
                    onClick={handleDeleteConfirmation}
                >
                    Disband Party
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
};

export default PartyLeaderActions;
