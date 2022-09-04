import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { useAuthContext } from '../hooks/useAuthContext';
import { Container, Group, Text } from '@mantine/core';
import MinimalLoader from '../components/general/MinimalLoader';
import PartyDetails from '../components/party/PartyDetails';
import PartyMembershipActions from '../components/party/PartyMembershipActions';
import UserCardList from '../components/users/UserCardList';
import TextBlock from '../components/general/TextBlock';
import ConfirmationModal from '../components/general/ConfirmationModal';
import PartyLeaderActions from '../components/party/PartyLeaderActions';

const Party = () => {
    const { user } = useAuthContext();
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: party, error } = useFetch(`/api/parties/${id}`);
    const [isMember, setIsMember] = useState(false);
    const [isLeader, setIsLeader] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [isConfirmingLeave, setIsConfirmingLeave] = useState(false);
    const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
    const [memberError, setMemberError] = useState(null);
    const [partyError, setPartyError] = useState(null);

    const handleJoin = async () => {
        setIsPending(true);

        const res = await fetch(`/api/parties/${party._id}/members/join`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });

        if (!res.ok) {
            setMemberError('Could not join party');
            setIsPending(false);
        }

        if (res.ok) {
            navigate(0);
        }
    };

    const handleLeave = async () => {
        setIsPending(true);

        const res = await fetch(`/api/parties/${party._id}/members/leave`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });

        if (!res.ok) {
            setMemberError('Could not leave party');
            setIsPending(false);
        }

        if (res.ok) {
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
    useEffect(() => {
        const checkIfMember = () => {
            if (user) {
                const index = party.members.findIndex(
                    (member) => member.username === user.username
                );

                if (index !== -1) {
                    setIsMember(true);
                }
            }
        };

        if (party) {
            checkIfMember();
        }
    }, [party, user]);

    // Check if the user is the leader
    useEffect(() => {
        const checkIfLeader = () => {
            if (user && user.username === party.leader.username) {
                setIsLeader(true);
            }
        };

        if (party) {
            checkIfLeader();
        }
    }, [party, user]);

    if (party) {
        const openings = party.lookingFor - (party.members.length - 1);

        return (
            <Container p="md">
                {/* General party details */}
                <PartyDetails party={party} openings={openings} />

                {/* Actions for joining / leaving the party */}
                <Group>
                    <PartyMembershipActions
                        openings={openings}
                        isMember={isMember}
                        isLeader={isLeader}
                        isPending={isPending}
                        handleJoin={handleJoin}
                        setIsConfirmingLeave={setIsConfirmingLeave}
                        memberError={memberError}
                    />
                    {memberError && <Text color="red">{memberError}</Text>}
                </Group>

                {/* Confirm leaving the party */}
                <ConfirmationModal
                    isConfirming={isConfirmingLeave}
                    setIsConfirming={setIsConfirmingLeave}
                    title="Are you sure you want to leave?"
                    body="You will be removed from the party."
                    action={handleLeave}
                />

                {/* These management actions are only displayed to the leader */}

                {isLeader && (
                    <Group>
                        <PartyLeaderActions
                            setIsConfirmingDelete={setIsConfirmingDelete}
                        />
                        {/* Display any errors from leader actions */}
                        {partyError && (
                            <Text color="red" mt="lg">
                                {partyError}
                            </Text>
                        )}
                    </Group>
                )}

                {/* Party deletion confirmation */}
                <ConfirmationModal
                    isConfirming={isConfirmingDelete}
                    setIsConfirming={setIsConfirmingDelete}
                    title="Are you sure you want to disband?"
                    body="This action cannot be undone."
                    action={handleDelete}
                />

                {/* Party Description */}
                <TextBlock title="About the Party" body={party.details} />

                {/* Party members list */}
                <UserCardList
                    title="Members"
                    seeAllLink={`members`}
                    users={party.members.slice(0, 5)}
                />
            </Container>
        );
    }

    if (error) {
        return <div>{error}</div>;
    }

    return <MinimalLoader />;
};

export default Party;
