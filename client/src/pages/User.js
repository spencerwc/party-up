import { useState, useEffect } from 'react';
import { useFetch } from '../hooks/useFetch';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { Stack, Group, Text, Title } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import {
    getSuccessNotification,
    getErrorNotification,
} from '../utils/notifications';
import MinimalLoader from '../components/general/MinimalLoader';
import UserDetails from '../components/user/UserDetails';
import UserActions from '../components/user/UserActions';
import UserCardList from '../components/users/UserCardList';
import ConfirmationModal from '../components/general/ConfirmationModal';

const User = () => {
    const { username } = useParams();
    const { user } = useAuthContext();
    const {
        data: userData,
        isLoading,
        error,
    } = useFetch(`/api/users/${username}`);
    const [friends, setFriends] = useState([]);
    const [friendRequests, setFriendRequests] = useState(null);
    const [isFriend, setIsFriend] = useState(false);
    const [hasRequestedFriend, setHasRequestedFriend] = useState(false);
    const [isConfirmingCancel, setIsConfirmingCancel] = useState(false);
    const [isConfirmingRemove, setIsConfirmingRemove] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const FRIEND_CARD_LIMIT = 10;

    const sendFriendRequest = async () => {
        setIsPending(true);

        const response = await fetch(
            `/api/users/${userData.username}/friends/request`,
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
        }

        if (response.ok) {
            // Update requested state and Notify that the request was sent
            setHasRequestedFriend(true);

            const notification = getSuccessNotification(
                'Request Sent',
                `Your request to ${username} was sent.`
            );

            showNotification(notification);
        }

        setIsPending(false);
    };

    const cancelFriendRequest = async () => {
        setIsPending(true);

        const response = await fetch(
            `/api/users/${userData.username}/friends/request/cancel`,
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
            setIsConfirmingCancel(false);
        }

        if (response.ok) {
            // Update requested state and Notify that the request was canceled
            setHasRequestedFriend(false);
            setIsConfirmingCancel(false);

            const notification = getSuccessNotification(
                'Request Canceled',
                `Your request to ${username} was canceled.`
            );

            showNotification(notification);
        }

        setIsPending(false);
    };

    const removeFriend = async () => {
        setIsPending(true);

        const response = await fetch(
            `/api/users/${userData.username}/friends/remove`,
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
        }

        if (response.ok) {
            const notification = getSuccessNotification(
                'Friend Removed',
                `You removed ${username} from your friends.`
            );
            showNotification(notification);

            setFriends(
                friends.filter((friend) => friend.username !== user.username)
            );
        }

        setIsPending(false);
        setIsConfirmingRemove(false);
    };

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

    useEffect(() => {
        if (userData) {
            setFriends(userData.friends);
        }
    }, [userData]);

    useEffect(() => {
        const checkIfFriend = () => {
            const index = friends.findIndex(
                (friend) => friend.username === user.username
            );

            if (index !== -1) {
                setIsFriend(true);
            }
        };

        if (user && friends) {
            checkIfFriend();
        }
    }, [user, friends, friendRequests]);

    // Check user friend requests for existing request
    useEffect(() => {
        const checkIfRequested = async () => {
            const index = friendRequests.friendRequestsSent.findIndex(
                (user) => user.username === userData.username
            );

            if (index !== -1) {
                setHasRequestedFriend(true);
            } else {
                setHasRequestedFriend(false);
            }
        };

        if (user && userData && friendRequests) {
            checkIfRequested();
        }
    }, [user, userData, friendRequests]);

    useEffect(() => {
        if (error) {
            const notification = getErrorNotification(error);
            showNotification(notification);
        }
    }, [error]);

    if (isLoading) {
        return <MinimalLoader />;
    }

    if (userData) {
        return (
            <Stack>
                {/* Confirmation for canceling a request */}
                <ConfirmationModal
                    isConfirming={isConfirmingCancel}
                    setIsConfirming={setIsConfirmingCancel}
                    title="Cancel friend request?"
                    body={`Your request to ${userData.username} will be withdrawn.`}
                    action={cancelFriendRequest}
                    isPending={isPending}
                />

                {/* Confirmation for removing a friend */}
                <ConfirmationModal
                    isConfirming={isConfirmingRemove}
                    setIsConfirming={setIsConfirmingRemove}
                    title={`Remove ${userData.username}?`}
                    body="You will no longer be friends and your messages will be locked."
                    action={removeFriend}
                    isPending={isPending}
                />

                <Group spacing="xs" noWrap position="apart" align="flex-start">
                    <UserDetails user={userData} friends={friends} />

                    {user && user.username !== username && friendRequests && (
                        <UserActions
                            isFriend={isFriend}
                            sendFriendRequest={sendFriendRequest}
                            hasRequestedFriend={hasRequestedFriend}
                            setIsConfirmingRemove={setIsConfirmingRemove}
                            setIsConfirmingCancel={setIsConfirmingCancel}
                        />
                    )}
                </Group>

                {friends.length > 0 ? (
                    <UserCardList
                        title="Friends"
                        seeAllLink="friends"
                        users={friends}
                    />
                ) : (
                    <Stack px="md" spacing="xs">
                        <Title order={2} size={20}>
                            Friends
                        </Title>
                        <Text color="dimmed">
                            {userData.username} hasn't added any friends yet.
                        </Text>
                    </Stack>
                )}
            </Stack>
        );
    }

    return <MinimalLoader />;
};

export default User;
