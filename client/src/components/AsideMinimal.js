import { MediaQuery, Aside, Text } from '@mantine/core';

const AsideMinimal = () => {
    return (
        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
            <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
                <Text>Sidebar</Text>
            </Aside>
        </MediaQuery>
    );
};

export default AsideMinimal;
