import { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { Stack, Title } from '@mantine/core';
import RequestList from '../components/general/RequestList';
import MinimalLoader from '../components/general/MinimalLoader';

const Alerts = () => {
    const { user } = useAuthContext();
    const [friendRequests, setFriendRequests] = useState(null);

    useEffect(() => {
        const getFriendRequests = async () => {
            const response = await fetch(
                `/api/users/${user.username}/friends/requests`,
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );

            const json = await response.json();

            if (response.ok) {
                setFriendRequests(json);
            }
        };

        if (user) {
            getFriendRequests();
        }
    }, [user]);

    if (friendRequests) {
        return (
            <Stack mt="md" spacing={0}>
                <Title mx="md" order={1} size={20}>
                    Alerts
                </Title>

                <RequestList
                    title="Friend Requests"
                    type="received"
                    requests={friendRequests.friendRequestsReceived}
                />

                <RequestList
                    title="Sent Requests"
                    type="sent"
                    requests={friendRequests.friendRequestsSent}
                />
            </Stack>
        );
    }

    return <MinimalLoader />;
};

export default Alerts;
