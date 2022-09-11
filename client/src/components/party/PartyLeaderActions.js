import { useNavigate } from 'react-router-dom';
import { Menu, Button } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons';

const PartyLeaderActions = ({ setIsConfirmingDelete }) => {
    const navigate = useNavigate();

    const handleDeleteConfirmation = () => {
        setIsConfirmingDelete(true);
    };

    return (
        <Menu
            shadow="md"
            width={200}
            radius="lg"
            trigger="hover"
            position="bottom-start"
        >
            <Menu.Target>
                <Button radius="lg">Party Actions</Button>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Label>Actions</Menu.Label>
                <Menu.Item
                    icon={<IconEdit size={14} />}
                    onClick={() => navigate('edit')}
                >
                    Edit Party
                </Menu.Item>
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
