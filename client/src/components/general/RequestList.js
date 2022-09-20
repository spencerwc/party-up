import { Stack, Title, Text, Paper, createStyles } from '@mantine/core';
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

const RequestList = ({ title, type, requests }) => {
    const { classes } = useStyles();

    return (
        <Stack>
            <Title mx="md" mt="md" order={2} size={17} weight={500}>
                {title}
            </Title>

            {requests.length > 0 ? (
                <Paper className={classes.requests}>
                    {requests.map((request, index) => (
                        <Request key={index} type={type} request={request} />
                    ))}
                </Paper>
            ) : (
                <Text mx="md" color="dimmed">
                    You have no requests.
                </Text>
            )}
        </Stack>
    );
};

export default RequestList;
