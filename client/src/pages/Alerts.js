import { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { showNotification } from '@mantine/notifications';
import {
    getSuccessNotification,
    getErrorNotification,
} from '../utils/notifications';
import { Stack, Title } from '@mantine/core';
import RequestList from '../components/general/RequestList';
import MinimalLoader from '../components/general/MinimalLoader';
import ConfirmationModal from '../components/general/ConfirmationModal';

const Alerts = () => {
    const { user } = useAuthContext();
    const [friendRequests, setFriendRequests] = useState(null);
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

            if (!response.ok) {
                const notification = getErrorNotification(json.error);
                showNotification(notification);
            }

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
            const notification = getErrorNotification(json.error);

            showNotification(notification);
        }

        if (response.ok) {
            // Update requested state and Notify that the request was sent
            const notification = getSuccessNotification(
                'Request Accepted',
                `${username} has been added to your friends.`
            );

            showNotification(notification);
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
            const notification = getErrorNotification(json.error);

            showNotification(notification);
            setTargetRequest(null);
            setIsConfirmingDecline(false);
        }

        if (response.ok) {
            const notification = getSuccessNotification(
                'Request Declined',
                `You declined the request from ${targetRequest}`
            );

            showNotification(notification);
            setTargetRequest(null);
            setIsConfirmingDecline(false);

            setFriendRequests({
                ...friendRequests,
                friendRequestsReceived:
                    friendRequests.friendRequestsReceived.filter(
                        (request) => request.username !== targetRequest
                    ),
            });
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
            const notification = getErrorNotification(json.error);

            showNotification(notification);
            setTargetRequest(null);
            setIsConfirmingCancel(false);
        }

        if (response.ok) {
            const notification = getSuccessNotification(
                'Request Canceled',
                `Your request to ${targetRequest} was canceled.`
            );

            showNotification(notification);
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
            <Stack mt="md" pb={68} spacing={0}>
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
