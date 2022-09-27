import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { useAuthContext } from '../hooks/useAuthContext';
import { showNotification } from '@mantine/notifications';
import {
    getSuccessNotification,
    getErrorNotification,
} from '../utils/notifications';
import { Box, Group, Stack } from '@mantine/core';
import dayjs from 'dayjs';
import MinimalLoader from '../components/general/MinimalLoader';
import PartyDetails from '../components/party/PartyDetails';
import PartyImage from '../components/party/PartyImage';
import PartyMembershipActions from '../components/party/PartyMembershipActions';
import UserCardList from '../components/users/UserCardList';
import TextBlock from '../components/general/TextBlock';
import ConfirmationModal from '../components/general/ConfirmationModal';
import PartyLeaderActions from '../components/party/PartyLeaderActions';
import CommentsList from '../components/general/CommentsList';
import PartyShare from '../components/party/PartyShare';

const Party = ({ setIsRegistering }) => {
    const { user } = useAuthContext();
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: party, isLoading, error } = useFetch(`/api/parties/${id}`);
    const [members, setMembers] = useState([]);
    const [openings, setOpenings] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [isConfirmingLeave, setIsConfirmingLeave] = useState(false);
    const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
    const [isMember, setIsMember] = useState(false);
    const [isLeader, setIsLeader] = useState(false);
    const PARTY_MEMBER_CARDS = 10;

    const handleJoin = async () => {
        if (!user) {
            setIsRegistering(true);
            return;
        } else {
            setIsPending(true);

            const response = await fetch(
                `/api/parties/${party._id}/members/join`,
                {
                    method: 'PATCH',
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );

            if (!response.ok) {
                const notification = getErrorNotification(
                    'Failed to join the party.'
                );

                showNotification(notification);
            }

            if (response.ok) {
                const notification = getSuccessNotification(
                    'Party Joined',
                    `You joined ${party.name}.`
                );

                showNotification(notification);
                setIsMember(true);
                setOpenings(openings - 1);

                setMembers([
                    ...members,
                    {
                        avatar: user.avatar,
                        username: user.username,
                    },
                ]);
            }
            setIsPending(false);
        }
    };

    const handleLeave = async () => {
        setIsPending(true);

        const response = await fetch(
            `/api/parties/${party._id}/members/leave`,
            {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            }
        );

        if (!response.ok) {
            const notification = getErrorNotification(
                'Failed to leave the party.'
            );

            showNotification(notification);
        }

        if (response.ok) {
            const notification = getSuccessNotification(
                'Party left',
                `You left ${party.name}.`
            );

            showNotification(notification);
            setIsMember(false);
            setOpenings(openings + 1);

            setMembers(
                members.filter((member) => member.username !== user.username)
            );
        }
        setIsConfirmingLeave(false);
        setIsPending(false);
    };

    const handleDelete = async () => {
        setIsConfirmingDelete(false);

        const response = await fetch(`/api/parties/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });

        const json = await response.json();

        if (response.ok) {
            const notification = getSuccessNotification(
                'Party Disbanded',
                `You disbanded ${party.name}.`
            );

            showNotification(notification);
            navigate('/parties');
        }

        if (!response.ok) {
            const notification = getErrorNotification(json.error);

            showNotification(notification);
        }
    };

    useEffect(() => {
        // Check if the user is currently a member
        const checkIfMember = () => {
            if (user) {
                const index = party.members.findIndex(
                    (member) => member.username === user.username
                );

                return index !== -1;
            }
        };

        // Check if the user is the leader
        const checkIfLeader = () => {
            return user && user.username === party.leader.username;
        };

        if (party) {
            setMembers(party.members);
            setOpenings(party.lookingFor - (party.members.length - 1));
            setIsLeader(checkIfLeader());
            setIsMember(checkIfMember());
        }
    }, [party, user]);

    useEffect(() => {
        if (error) {
            showNotification(getErrorNotification(error));
        }
    }, [error]);

    if (isLoading) {
        return <MinimalLoader />;
    }

    if (party) {
        return (
            <Box
                sx={(theme) => ({
                    paddingBottom: 68,

                    [`@media (min-width: ${theme.breakpoints.md}px)`]: {
                        paddingBottom: theme.spacing.md,
                    },
                })}
            >
                {/* Confirm leaving the party */}
                <ConfirmationModal
                    isConfirming={isConfirmingLeave}
                    setIsConfirming={setIsConfirmingLeave}
                    title="Are you sure you want to leave?"
                    body="You will be removed from the party."
                    action={handleLeave}
                    isPending={isPending}
                />

                {/* Party deletion confirmation */}
                <ConfirmationModal
                    isConfirming={isConfirmingDelete}
                    setIsConfirming={setIsConfirmingDelete}
                    title="Are you sure you want to disband?"
                    body="This action cannot be undone."
                    action={handleDelete}
                    isPending={isPending}
                />

                {/* General party details */}
                <Group p="md" position="apart" noWrap>
                    <Stack>
                        <PartyDetails
                            party={party}
                            members={members}
                            openings={openings}
                        />

                        {/* Actions for joining / leaving the party */}
                        <PartyMembershipActions
                            openings={openings}
                            isMember={isMember}
                            isLeader={isLeader}
                            isPending={isPending}
                            handleJoin={handleJoin}
                            setIsConfirmingLeave={setIsConfirmingLeave}
                        />

                        {/* These management actions are only displayed to the leader */}
                        {isLeader && (
                            <PartyLeaderActions
                                setIsConfirmingDelete={setIsConfirmingDelete}
                            />
                        )}
                    </Stack>

                    {party.game.cover && (
                        <PartyImage imageId={party.game.cover.image_id} />
                    )}
                </Group>

                <Stack spacing="lg">
                    <PartyShare
                        message={`Party up with me for ${party.name} on ${dayjs(
                            party.date
                        ).format('dddd, MMMM D YYYY')}!`}
                    />
                    {/* Party Description */}
                    <TextBlock title="About the Party" body={party.details} />

                    {/* Party members list */}
                    <UserCardList
                        title="Members"
                        seeAllLink={`members`}
                        users={members.slice(0, PARTY_MEMBER_CARDS)}
                    />

                    {/* Party Comments */}
                    <CommentsList
                        title="Comments"
                        commentData={party.comments}
                        uri={`/api/parties/${id}/comments`}
                        setIsRegistering={setIsRegistering}
                    />
                </Stack>
            </Box>
        );
    }

    return <MinimalLoader />;
};

export default Party;
