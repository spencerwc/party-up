import { Text, Stack, Title } from '@mantine/core';

const TextBlock = ({ title, body }) => {
    return (
        <Stack mt="lg">
            <Title order={2} size={21}>
                {title}
            </Title>
            <Text>{body}</Text>
        </Stack>
    );
};

export default TextBlock;
