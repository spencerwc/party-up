import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { Link } from 'react-router-dom';
import {
    Box,
    Title,
    Group,
    Stack,
    Anchor,
    ActionIcon,
    createStyles,
} from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons';
import CreatePartyForm from '../components/party/CreatePartyForm';

const useStyles = createStyles((theme) => ({
    backButton: {
        '&:hover': {
            backgroundColor:
                theme.colorScheme === 'dark'
                    ? theme.colors.dark[7]
                    : theme.colors.gray[2],
        },
    },
}));

const CreateParty = () => {
    const { user } = useAuthContext();
    const { classes } = useStyles();

    if (!user) {
        return <Navigate to="/login" />;
    } else {
        return (
            <Box p="md">
                <Group>
                    <ActionIcon
                        className={classes.backButton}
                        component={Link}
                        to="/parties"
                    >
                        <IconChevronLeft />
                    </ActionIcon>
                    <Stack spacing={0}>
                        <Title order={1} size={20}>
                            Start a Party
                        </Title>
                        <Anchor component={Link} to="/parties" weight={500}>
                            Parties
                        </Anchor>
                    </Stack>
                </Group>
                <CreatePartyForm />
            </Box>
        );
    }
};

export default CreateParty;
