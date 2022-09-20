import { useState, useEffect } from 'react';
import { useFetch } from '../hooks/useFetch';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { Stack, Group, Text, Title } from '@mantine/core';
import MinimalLoader from '../components/general/MinimalLoader';
import UserDetails from '../components/user/UserDetails';
import UserActions from '../components/user/UserActions';
import UserCardList from '../components/users/UserCardList';
import ConfirmationModal from '../components/general/ConfirmationModal';

const User = () => {
    const { username } = useParams();
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const { data: userData, error } = useFetch(`/api/users/${username}`);
    const [friendRequests, setFriendRequests] = useState(null);
    const [isFriend, setIsFriend] = useState(false);
    const [hasRequestedFriend, setHasRequestedFriend] = useState(false);
    const [isConfirmingCancel, setIsConfirmingCancel] = useState(false);
    const [isConfirmingRemove, setIsConfirmingRemove] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [friendError, setFriendError] = useState(null);

    const sendFriendRequest = async () => {
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
            setFriendError(json.error);
            setIsPending(false);
        }

        if (response.ok) {
            // Update requested state and Notify that the request was sent
            setHasRequestedFriend(true);
        }
    };

    const cancelFriendRequest = async () => {
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
            setFriendError(json.error);
            setIsConfirmingCancel(false);
        }

        if (response.ok) {
            // Update requested state and Notify that the request was canceled
            setHasRequestedFriend(false);
            setIsConfirmingCancel(false);
        }
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
            setFriendError(json.error);
            setIsPending(false);
        }

        if (response.ok) {
            navigate(0);
        }
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
        const checkIfFriend = () => {
            const index = userData.friends.findIndex(
                (friend) => friend.username === user.username
            );

            if (index !== -1) {
                setIsFriend(true);
            }
        };

        if (user && userData) {
            checkIfFriend();
        }
    }, [userData, user, friendRequests]);

    // Check user friend requests for existing request
    useEffect(() => {
        const checkIfRequested = async () => {
            const index = friendRequests.friendRequestsSent.findIndex(
                (user) => user.username === userData.username
            );

            if (index !== -1) {
                setHasRequestedFriend(true);
            }
        };

        if (user && userData && friendRequests) {
            checkIfRequested();
        }
    }, [user, userData, friendRequests]);

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
                    <UserDetails user={userData} />

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

                {userData.friends.length > 0 ? (
                    <UserCardList
                        title="Friends"
                        seeAllLink="friends"
                        users={userData.friends}
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

    if (error) {
        return (
            <Text m="md" color="dimmed">
                {error}
            </Text>
        );
    }

    return <MinimalLoader />;
};

export default User;
