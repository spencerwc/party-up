import { Text, Stack, Title } from '@mantine/core';

const TextBlock = ({ title, body }) => {
    return (
        <Stack mt="lg" mx="md">
            <Title order={2} size={20}>
                {title}
            </Title>
            <Text>{body}</Text>
        </Stack>
    );
};

export default TextBlock;
