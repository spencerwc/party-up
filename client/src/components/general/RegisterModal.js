import { Modal, Button, Stack, Text, Center } from '@mantine/core';
import { Link } from 'react-router-dom';

const RegisterModal = ({ isOpen, setIsOpen }) => {
    return (
        <Modal
            opened={isOpen}
            onClose={() => setIsOpen(false)}
            centered
            radius="lg"
        >
            <Center pb="md">
                <Stack>
                    <Text weight={500} size={20} mx="auto">
                        Ready to party?
                    </Text>
                    <Text size={60} mx="auto">
                        🎉
                    </Text>
                    <Text mx="auto">Set up an account to get started!</Text>
                    <Button component={Link} to="/signup" radius="lg">
                        Sign up
                    </Button>
                    <Text mx="auto">Already have an account?</Text>
                    <Button
                        component={Link}
                        to="/login"
                        radius="lg"
                        variant="default"
                    >
                        Log in
                    </Button>
                </Stack>
            </Center>
        </Modal>
    );
};

export default RegisterModal;
