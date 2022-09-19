import { Modal, Button, Stack, Group, Center, Text } from '@mantine/core';

const ConfirmationModal = ({
    isConfirming,
    setIsConfirming,
    title,
    body,
    action,
    isPending,
}) => {
    return (
        <Modal
            opened={isConfirming}
            onClose={() => setIsConfirming(false)}
            centered
            radius="lg"
        >
            <Center pb="md">
                <Stack sx={{ textAlign: 'center' }}>
                    <Text size={20} weight={500}>
                        {title}
                    </Text>
                    <Text>{body}</Text>
                    <Group spacing="xs" mt="xs" mx="auto">
                        <Button
                            radius="lg"
                            onClick={action}
                            loading={isPending}
                            color="red.8"
                        >
                            Confirm
                        </Button>
                        <Button
                            radius="lg"
                            variant="default"
                            onClick={() => setIsConfirming(false)}
                            disabled={isPending}
                        >
                            Cancel
                        </Button>
                    </Group>
                </Stack>
            </Center>
        </Modal>
    );
};

export default ConfirmationModal;
