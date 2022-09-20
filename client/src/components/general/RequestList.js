import { Stack, Title, Text } from '@mantine/core';

const RequestList = ({ title, type, requests }) => {
    return (
        <Stack>
            <Title mx="md" mt="md" order={2} size={17} weight={500}>
                {title}
            </Title>

            {requests.length > 0 ? (
                requests.map((request, index) => (
                    <Text key={index} mx="md">
                        {request.username}
                    </Text>
                ))
            ) : (
                <Text mx="md" color="dimmed">
                    You have no requests.
                </Text>
            )}
        </Stack>
    );
};

export default RequestList;
