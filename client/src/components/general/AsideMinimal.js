import { useNavigate } from 'react-router-dom';
import {
    MediaQuery,
    Aside,
    Button,
    Paper,
    Center,
    createStyles,
} from '@mantine/core';
import ColorSchemeToggle from '../general/ColorSchemeToggle';
import { useAuthContext } from '../../hooks/useAuthContext';

const useStyles = createStyles((theme) => ({
    aside: {
        display: 'none',

        [`@media (min-width: ${theme.breakpoints.md}px)`]: {
            width: 550,
            position: 'sticky',
            top: 0,
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            backgroundColor: 'transparent',
            border: 'none',
        },
    },
}));

const AsideMinimal = ({ setIsRegistering }) => {
    const { classes } = useStyles();
    const { user } = useAuthContext();
    const navigate = useNavigate();

    const handleStartPartyClick = () => {
        if (!user) {
            setIsRegistering(true);
        } else {
            navigate('/parties/new');
        }
    };

    return (
        <MediaQuery className={classes.aside}>
            <Aside py="md" pr="md" hiddenBreakpoint="sm">
                <Button onClick={handleStartPartyClick} radius="md">
                    Start a Party
                </Button>
                <Paper
                    my="md"
                    p="md"
                    radius="lg"
                    sx={{
                        boxShadow: 'rgba(0, 0, 0, 0.04) 0px 3px 5px',
                    }}
                >
                    <Center>
                        <ColorSchemeToggle />
                    </Center>
                </Paper>
            </Aside>
        </MediaQuery>
    );
};

export default AsideMinimal;
