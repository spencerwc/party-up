import { Textarea, Box, Button, Group, Text } from '@mantine/core';
import { useForm } from '@mantine/form';

const CommentForm = ({ addComment, isPending, error }) => {
    const commentForm = useForm({
        initialValues: {
            comment: '',
        },

        validate: {
            comment: (value) =>
                value.length <= 0
                    ? 'Comments cannot be empty'
                    : value.length > 100
                    ? 'Comments must have fewer than 250 characters'
                    : null,
        },
    });

    const handleSubmit = async (values) => {
        await addComment(values);

        if (!error) {
            commentForm.reset();
        }
    };

    const handleCancel = () => {
        console.log('Canceled');
    };

    return (
        <Box px="md" radius="lg">
            <form
                aria-label="Add a comment"
                onSubmit={commentForm.onSubmit(handleSubmit)}
            >
                <Textarea
                    radius="md"
                    placeholder="Add a comment"
                    {...commentForm.getInputProps('comment')}
                    minRows={2}
                />
                {error && (
                    <Text size="sm" color="red" m="sm">
                        {error}
                    </Text>
                )}
                <Group mt="md" spacing="xs" position="right">
                    <Button type="submit" radius="lg" disabled={isPending}>
                        Submit
                    </Button>
                    <Button
                        variant="outline"
                        radius="lg"
                        onClick={handleCancel}
                        disabled={isPending}
                    >
                        Cancel
                    </Button>
                </Group>
            </form>
        </Box>
    );
};

export default CommentForm;
