import { Button, Text, Stack } from '@mantine/core';

const PartyMembershipActions = ({
    openings,
    isMember,
    isLeader,
    isPending,
    handleJoin,
    setIsConfirmingLeave,
}) => {
    // If user is leader, notify them
    if (isLeader) {
        return <Text color="dimmed">You are the leader of this party.</Text>;
    }

    // Otherwise - if user is a member, allow them to leave
    if (isMember) {
        return (
            <Stack>
                <Text color="dimmed">You are a member of this party.</Text>
                <Button
                    radius="lg"
                    color="red.8"
                    onClick={() => setIsConfirmingLeave(true)}
                    sx={{ width: 'fit-content' }}
                >
                    Leave Party
                </Button>
            </Stack>
        );
    }

    // If user is not a member and no openings are available, membership is not allowed
    if (openings === 0) {
        return <Text color="dimmed">The party has filled.</Text>;
    }

    // Default action to join the party
    return (
        <Button
            radius="lg"
            mt="sm"
            loading={isPending}
            onClick={handleJoin}
            sx={{ width: 'fit-content' }}
        >
            Join Party
        </Button>
    );
};

export default PartyMembershipActions;
