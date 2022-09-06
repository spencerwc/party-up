import { Stack, Title } from '@mantine/core';

const CommentsList = ({ title, comments }) => {
    return (
        <Stack mt="lg">
            <Title order={2} size={21}>
                {title}
            </Title>
            Comments Here
        </Stack>
    );
};

export default CommentsList;
