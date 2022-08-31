import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { useAuthContext } from '../hooks/useAuthContext';
import { Container, Group, Text } from '@mantine/core';
import PartyDetails from '../components/PartyDetails';
import PartyMembershipActions from '../components/PartyMembershipActions';
import UserCardList from '../components/UserCardList';
import TextBlock from '../components/TextBlock';
import ConfirmationModal from '../components/ConfirmationModal';
import PartyLeaderActions from '../components/PartyLeaderActions';

const Party = () => {
    const { user } = useAuthContext();
    const { id } = useParams();
    const { data: party, error } = useFetch(`/api/parties/${id}`);
    const [openings, setOpenings] = useState(0);
    const [isMember, setIsMember] = useState(false);
    const [isLeader, setIsLeader] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
    const [memberError, setMemberError] = useState(null);

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
        }

        if (res.ok) {
            setIsMember(true);
            setOpenings(openings - 1);
        }

        setIsPending(false);
    };

    const handleLeave = async () => {
        setIsPending(true);

        const res = await fetch(`/api/parties/${party._id}/members/leave`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });

        if (res.ok) {
            setIsMember(false);
            setOpenings(openings + 1);
        }

        setIsPending(false);
    };

    const handleDelete = async () => {
        console.log('Deleted');
        setIsConfirmingDelete(false);
    };

    // Set available party openings
    useEffect(() => {
        if (party) {
            setOpenings(party.lookingFor - (party.members.length - 1));
        }
    }, [party]);

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
        return (
            <Container p="md">
                <PartyDetails party={party} openings={openings} />
                <Group>
                    <PartyMembershipActions
                        openings={openings}
                        isMember={isMember}
                        isLeader={isLeader}
                        isPending={isPending}
                        handleJoin={handleJoin}
                        handleLeave={handleLeave}
                        memberError={memberError}
                    />
                    {memberError && <Text color="red">{memberError}</Text>}
                </Group>

                {isLeader && (
                    <PartyLeaderActions
                        setIsConfirmingDelete={setIsConfirmingDelete}
                    />
                )}

                <ConfirmationModal
                    isConfirming={isConfirmingDelete}
                    setIsConfirming={setIsConfirmingDelete}
                    title="Are you sure you want to disband?"
                    body="This action cannot be undone."
                    action={handleDelete}
                />

                <TextBlock title="About the Party" body={party.details} />

                <UserCardList
                    title="Members"
                    seeAllLink={`members`}
                    users={party.members}
                />
            </Container>
        );
    }

    if (error) {
        return <div>{error}</div>;
    }

    return <div>Loading</div>;
};

export default Party;
