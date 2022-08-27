import { useAuthContext } from '../hooks/useAuthContext';
import { Button, Text } from '@mantine/core';

const PartyMembershipActions = ({
    openings,
    isMember,
    isLeader,
    isPending,
    handleJoin,
    handleLeave,
    memberError,
}) => {
    const { user } = useAuthContext();

    // If user is leader, notify them
    if (isLeader) {
        return <Text color="dimmed">You are the leader of this party.</Text>;
    }

    // Otherwise - if user is a member, allow them to leave
    if (isMember) {
        return (
            <Button size="md" onClick={handleLeave} disabled={isPending}>
                Leave Party
            </Button>
        );
    }

    // If user is not a member and no openings are available, membership is not allowed
    if (openings === 0) {
        return <Text color="dimmed">The party has filled.</Text>;
    }

    // Default action to join the party
    return (
        <Button
            size="md"
            disabled={!user || isPending || memberError}
            onClick={handleJoin}
        >
            Join Party
        </Button>
    );
};

export default PartyMembershipActions;
