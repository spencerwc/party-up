import { useNavigate } from 'react-router-dom';
import { MediaQuery, Aside, Button } from '@mantine/core';

const AsideMinimal = () => {
    const navigate = useNavigate();

    return (
        <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
            <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
                <Button onClick={() => navigate('/parties/new')}>
                    Start a Party
                </Button>
            </Aside>
        </MediaQuery>
    );
};

export default AsideMinimal;
