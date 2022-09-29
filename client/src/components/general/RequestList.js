import { Stack, Title, Text, Paper, createStyles, Group } from '@mantine/core';
import { IconMailOff } from '@tabler/icons';
import Request from './Request';

const useStyles = createStyles((theme) => ({
    requests: {
        boxShadow: 'rgba(0, 0, 0, 0.04) 0px 3px 5px',

        [`@media (min-width: ${theme.breakpoints.md}px)`]: {
            marginRight: theme.spacing.md,
            marginLeft: theme.spacing.md,
            borderRadius: theme.radius.lg,
        },
    },
}));

const RequestList = ({
    title,
    type,
    requests,
    setTargetRequest,
    acceptRequest,
    setIsConfirming,
}) => {
    const { classes } = useStyles();

    const handleConfirm = (request) => {
        setTargetRequest(request);
        setIsConfirming(true);
    };

    return (
        <Stack>
            <Title mx="md" mt="md" order={2} size={17} weight={500}>
                {title}
            </Title>

            {requests.length > 0 ? (
                <Paper className={classes.requests}>
                    {requests.map((request, index) => (
                        <Request
                            key={index}
                            type={type}
                            request={request}
                            acceptRequest={acceptRequest}
                            handleConfirm={handleConfirm}
                        />
                    ))}
                </Paper>
            ) : (
                <Group spacing="xs" mx="md" align="start">
                    <Text color="dimmed">
                        <IconMailOff stroke={1.5} />
                    </Text>
                    <Text color="dimmed">You have no requests.</Text>
                </Group>
            )}
        </Stack>
    );
};

export default RequestList;
