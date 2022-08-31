import { Modal, Button, Stack, Group } from '@mantine/core';

const ConfirmationModal = ({
    isConfirming,
    setIsConfirming,
    title,
    body,
    action,
}) => {
    return (
        <>
            <Modal
                opened={isConfirming}
                onClose={() => setIsConfirming(false)}
                title={title}
                centered
            >
                <Stack>
                    {body}
                    <Group>
                        <Button onClick={action}>Confirm</Button>
                    </Group>
                </Stack>
            </Modal>
        </>
    );
};

export default ConfirmationModal;
