import { useForm } from '@mantine/form';
import { DatePicker } from '@mantine/dates';
import { NumberInput, TextInput, Textarea, Button } from '@mantine/core';

const CreatePartyForm = () => {
    const form = useForm({
        initialValues: {
            name: '',
            date: new Date(Date.now()),
            lookingFor: 1,
            details: '',
        },

        validate: {
            name: (value) =>
                value.length < 2 ? 'Name must have at least 2 letters' : null,
            date: (value) =>
                value.length <= 0 ? 'Date must be selected' : null,
            lookingFor: (value) =>
                value < 1 || value > 100
                    ? 'Looking for must be between 1 to 100 members'
                    : null,
            details: (value) =>
                value.length <= 0 ? 'Details must be included' : null,
        },
    });

    const handleSubmit = async (values) => {
        console.log(values);
    };

    return (
        <form
            aria-label="Start a Party"
            onSubmit={form.onSubmit((values) => handleSubmit(values))}
        >
            <TextInput
                mt="md"
                label="Party Name"
                placeholder="My Cool Party"
                {...form.getInputProps('name')}
                withAsterisk
            />
            <DatePicker
                mt="sm"
                placeholder="Date of the event"
                label="When to Meet"
                {...form.getInputProps('date')}
                withAsterisk
            />
            <NumberInput
                mt="sm"
                label="Looking For"
                placeholder="# of Members"
                min={1}
                max={100}
                {...form.getInputProps('lookingFor')}
                withAsterisk
            />
            <Textarea
                mt="sm"
                placeholder="Details about your party"
                label="Party Details"
                {...form.getInputProps('details')}
                minRows={4}
                withAsterisk
            />
            <Button type="submit" mt="sm">
                Submit
            </Button>
        </form>
    );
};

export default CreatePartyForm;
