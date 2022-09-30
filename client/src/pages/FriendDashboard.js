import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useFetch } from '../hooks/useFetch';
import { Stack, Title } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import {
    getSuccessNotification,
    getErrorNotification,
} from '../utils/notifications';
import FriendList from '../components/users/FriendList';
import MinimalLoader from '../components/general/MinimalLoader';
import ConfirmationModal from '../components/general/ConfirmationModal';

const FriendDashboard = () => {
    const { user } = useAuthContext();
    const { data: userData, error } = useFetch(`/api/users/${user.username}`);
    const [friends, setFriends] = useState(null);
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [isConfirmingRemove, setIsConfirmingRemove] = useState(false);

    const removeFriend = async () => {
        setIsPending(true);

        const response = await fetch(
            `/api/users/${selectedFriend}/friends/remove`,
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
                `You removed ${selectedFriend} from your friends.`
            );
            showNotification(notification);
            setFriends(
                friends.filter((friend) => friend.username !== selectedFriend)
            );
        }

        setIsPending(false);
        setIsConfirmingRemove(false);
        setSelectedFriend(null);
    };

    useEffect(() => {
        if (userData) {
            setFriends(
                userData.friends.sort((a, b) =>
                    a.username.localeCompare(b.username)
                )
            );
        }
    }, [userData]);

    useEffect(() => {
        if (error) {
            const notification = getErrorNotification(error);

            showNotification(notification);
        }
    }, [error]);

    if (friends) {
        return (
            <Stack pt="md" spacing={0}>
                <Title mx="md" size={20} order={1}>
                    Your Friends
                </Title>
                {/* Confirmation for canceling a request */}

                <ConfirmationModal
                    isConfirming={isConfirmingRemove}
                    setIsConfirming={setIsConfirmingRemove}
                    title="Remove friend?"
                    body={`You will no longer be friends with ${selectedFriend}.`}
                    action={removeFriend}
                    isPending={isPending}
                />

                <FriendList
                    username={userData.username}
                    friends={friends}
                    setSelectedFriend={setSelectedFriend}
                    setIsConfirmingRemove={setIsConfirmingRemove}
                />
            </Stack>
        );
    }

    return <MinimalLoader />;
};

export default FriendDashboard;
