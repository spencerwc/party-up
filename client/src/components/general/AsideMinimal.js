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
            <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
                <Button onClick={() => navigate('/parties/new')} radius="md">
                    Start a Party
                </Button>
                <Paper my="md" p="md" radius="lg">
                    <Center>
                        <ColorSchemeToggle />
                    </Center>
                </Paper>
            </Aside>
        </MediaQuery>
    );
};

export default AsideMinimal;
