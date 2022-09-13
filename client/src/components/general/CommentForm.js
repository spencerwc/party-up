import { Textarea, Box, Button, Group } from '@mantine/core';
import { useForm } from '@mantine/form';

const CommentForm = () => {
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
        console.log(values);
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
                    {...commentForm.getInputProps('comment')}
                    minRows={2}
                />
                <Group mt="md" spacing="xs" position="right">
                    <Button type="submit" radius="lg">
                        Submit
                    </Button>
                    <Button
                        variant="outline"
                        radius="lg"
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                </Group>
            </form>
        </Box>
    );
};

export default CommentForm;
