import { Modal, Button, Stack, Group } from '@mantine/core';

const ConfirmationModal = ({
    isConfirming,
    setIsConfirming,
    title,
    body,
    action,
}) => {
    return (
        <Modal
            opened={isConfirming}
            onClose={() => setIsConfirming(false)}
            title={title}
            centered
            radius="lg"
        >
            <Stack>
                {body}
                <Group spacing="xs" mt="xs">
                    <Button radius="lg" onClick={action}>
                        Confirm
                    </Button>
                    <Button
                        radius="lg"
                        variant="default"
                        onClick={() => setIsConfirming(false)}
                    >
                        Cancel
                    </Button>
                </Group>
            </Stack>
        </Modal>
    );
};

export default ConfirmationModal;
