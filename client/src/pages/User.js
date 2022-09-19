import { useState, useEffect } from 'react';
import { useFetch } from '../hooks/useFetch';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { Stack, Group, Text } from '@mantine/core';
import MinimalLoader from '../components/general/MinimalLoader';
import UserDetails from '../components/user/UserDetails';
import UserActions from '../components/user/UserActions';
import UserCardList from '../components/users/UserCardList';
import ConfirmationModal from '../components/general/ConfirmationModal';

const User = ({ setIsRegistering }) => {
    const { username } = useParams();
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const { data: userData, error } = useFetch(`/api/users/${username}`);
    const [isFriend, setIsFriend] = useState(false);
    const [isConfirmingRemove, setIsConfirmingRemove] = useState(false);
    const [friendError, setFriendError] = useState(null);
    const [isPending, setIsPending] = useState(false);

    const addFriend = async () => {
        // Connect fetch request here
        if (!user) {
            setIsRegistering(true);
        } else {
            setIsPending(true);

            const response = await fetch(
                `/api/users/${userData.username}/friends/add`,
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
    }, [userData, user]);

    if (userData) {
        return (
            <Stack>
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

                    {user.username !== username && (
                        <UserActions
                            isFriend={isFriend}
                            addFriend={addFriend}
                            setIsConfirmingRemove={setIsConfirmingRemove}
                            setIsRegistering={setIsRegistering}
                        />
                    )}
                </Group>

                {userData.friends.length > 0 && (
                    <UserCardList
                        title="Friends"
                        seeAllLink="friends"
                        users={userData.friends}
                    />
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
