import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { useAuthContext } from '../hooks/useAuthContext';
import { Box, Group, Stack, Text } from '@mantine/core';
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
    const [isPending, setIsPending] = useState(false);
    const [isConfirmingLeave, setIsConfirmingLeave] = useState(false);
    const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
    const [memberError, setMemberError] = useState(null);
    const [partyError, setPartyError] = useState(null);

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
                setMemberError('Could not join party');
                setIsPending(false);
            }

            if (response.ok) {
                navigate(0);
            }
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
            setMemberError('Could not leave party');
            setIsPending(false);
        }

        if (response.ok) {
            navigate(0);
        }
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
            navigate('/parties');
        }

        if (!response.ok) {
            setPartyError(json.error);
        }
    };

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

    if (isLoading) {
        return <MinimalLoader />;
    }

    if (party) {
        const openings = party.lookingFor - (party.members.length - 1);
        const isLeader = checkIfLeader();
        const isMember = checkIfMember();

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
                        <PartyDetails party={party} openings={openings} />

                        {/* Actions for joining / leaving the party */}
                        <Stack>
                            <PartyMembershipActions
                                openings={openings}
                                isMember={isMember}
                                isLeader={isLeader}
                                isPending={isPending}
                                handleJoin={handleJoin}
                                setIsConfirmingLeave={setIsConfirmingLeave}
                                memberError={memberError}
                            />
                            {memberError && (
                                <Text size="sm" color="red">
                                    {memberError}
                                </Text>
                            )}
                        </Stack>

                        {/* These management actions are only displayed to the leader */}
                        {isLeader && (
                            <Stack>
                                <PartyLeaderActions
                                    setIsConfirmingDelete={
                                        setIsConfirmingDelete
                                    }
                                />
                                {/* Display any errors from leader actions */}
                                {partyError && (
                                    <Text size="sm" color="red">
                                        {partyError}
                                    </Text>
                                )}
                            </Stack>
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
                        users={party.members.slice(0, 5)}
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

    if (error) {
        return <div>{error}</div>;
    }

    return <MinimalLoader />;
};

export default Party;
