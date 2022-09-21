import { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { Stack, Title } from '@mantine/core';
import RequestList from '../components/general/RequestList';
import MinimalLoader from '../components/general/MinimalLoader';
import ConfirmationModal from '../components/general/ConfirmationModal';

const Alerts = () => {
    const { user } = useAuthContext();
    const [friendRequests, setFriendRequests] = useState(null);
    const [friendError, setFriendError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [targetRequest, setTargetRequest] = useState(null);
    const [isConfirmingDeclined, setIsConfirmingDecline] = useState(false);
    const [isConfirmingCancel, setIsConfirmingCancel] = useState(false);

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

    const acceptFriendRequest = async (username) => {
        setIsPending(true);

        const response = await fetch(`/api/users/${username}/friends/add`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });

        if (!response.ok) {
            const json = await response.json();
            setFriendError(json.error);
        }

        if (response.ok) {
            // Update requested state and Notify that the request was sent
            setFriendRequests({
                ...friendRequests,
                friendRequestsReceived:
                    friendRequests.friendRequestsReceived.filter(
                        (request) => request.username !== username
                    ),
            });
        }

        setIsPending(false);
    };

    const declineFriendRequest = async () => {
        setIsPending(true);

        const response = await fetch(
            `/api/users/${targetRequest}/friends/request/decline`,
            {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            }
        );

        if (!response.ok) {
            const json = await response.json();
            setFriendError(json.error);
            setTargetRequest(null);
            setIsConfirmingDecline(false);
            // Notify error
        }

        if (response.ok) {
            setTargetRequest(null);
            setIsConfirmingDecline(false);
            setFriendRequests({
                ...friendRequests,
                friendRequestsReceived:
                    friendRequests.friendRequestsReceived.filter(
                        (request) => request.username !== targetRequest
                    ),
            });
            // Notify of decline
        }
        setIsPending(false);
    };

    const cancelFriendRequest = async () => {
        setIsPending(true);

        const response = await fetch(
            `/api/users/${targetRequest}/friends/request/cancel`,
            {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            }
        );

        if (!response.ok) {
            const json = await response.json();
            setFriendError(json.error);
            setTargetRequest(null);
            setIsConfirmingCancel(false);
            // Notify error
        }

        if (response.ok) {
            setTargetRequest(null);
            setIsConfirmingCancel(false);
            setFriendRequests({
                ...friendRequests,
                friendRequestsSent: friendRequests.friendRequestsSent.filter(
                    (request) => request.username !== targetRequest
                ),
            });
            // Notify of removal
        }
        setIsPending(false);
    };

    if (friendRequests) {
        return (
            <Stack mt="md" spacing={0}>
                <Title mx="md" order={1} size={20}>
                    Alerts
                </Title>

                {/* Confirmation for declining a request */}
                <ConfirmationModal
                    isConfirming={isConfirmingDeclined}
                    setIsConfirming={setIsConfirmingDecline}
                    title="Decline friend request?"
                    body={`The request from ${targetRequest} will be removed.`}
                    action={declineFriendRequest}
                    isPending={isPending}
                />

                {/* Confirmation for canceling a request */}
                <ConfirmationModal
                    isConfirming={isConfirmingCancel}
                    setIsConfirming={setIsConfirmingCancel}
                    title="Cancel friend request?"
                    body={`Your request to ${targetRequest} will be withdrawn.`}
                    action={cancelFriendRequest}
                    isPending={isPending}
                />

                <RequestList
                    title="Friend Requests"
                    type="received"
                    requests={friendRequests.friendRequestsReceived}
                    setTargetRequest={setTargetRequest}
                    acceptRequest={acceptFriendRequest}
                    setIsConfirming={setIsConfirmingDecline}
                />

                <RequestList
                    title="Sent Requests"
                    type="sent"
                    requests={friendRequests.friendRequestsSent}
                    setTargetRequest={setTargetRequest}
                    setIsConfirming={setIsConfirmingCancel}
                />
            </Stack>
        );
    }

    return <MinimalLoader />;
};

export default Alerts;
