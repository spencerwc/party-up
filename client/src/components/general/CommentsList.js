import { Stack, Title } from '@mantine/core';
import Comment from './Comment';

const CommentsList = ({ title, comments }) => {
    return (
        <Stack mt="lg">
            <Title order={2} size={21}>
                {title}
            </Title>
            {comments.map((comment) => (
                <Comment
                    key={comment._id}
                    author={comment.user}
                    comment={comment.comment}
                    createdAt={comment.createdAt}
                    likes={comment.likes ? comment.likes : 0}
                />
            ))}
        </Stack>
    );
};

export default CommentsList;
