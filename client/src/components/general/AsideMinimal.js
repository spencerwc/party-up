import { useNavigate } from 'react-router-dom';
import {
    MediaQuery,
    Aside,
    Button,
    Paper,
    Center,
    createStyles,
} from '@mantine/core';
import ColorSchemeToggle from '../ColorSchemeToggle';

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

const AsideMinimal = () => {
    const { classes } = useStyles();
    const navigate = useNavigate();

    return (
        <MediaQuery className={classes.aside}>
            <Aside py="md" pr="md" hiddenBreakpoint="sm">
                <Button onClick={() => navigate('/parties/new')} radius="md">
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
