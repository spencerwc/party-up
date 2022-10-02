import { Center, Stack, Title } from '@mantine/core';

const NotFound = () => {
    return (
        <Center height="100vh">
            <Stack mt="lg" spacing="xs">
                <Title order={1} mx="auto">
                    404
                </Title>
                <Title order={2} weight={500} size={20}>
                    Page Not Found
                </Title>
            </Stack>
        </Center>
    );
};

export default NotFound;
