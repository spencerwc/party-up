import { Box, Title } from '@mantine/core';
import { useFetch } from '../hooks/useFetch';
import MinimalLoader from '../components/general/MinimalLoader';
import PartiesList from '../components/parties/PartiesList';

const Parties = () => {
    const { data: parties, error } = useFetch('/api/parties');

    if (parties) {
        return (
            <Box
                sx={(theme) => ({
                    paddingTop: theme.spacing.md,
                    paddingBottom: 68,

                    [`@media (min-width: ${theme.breakpoints.md}px)`]: {
                        padding: theme.spacing.md,
                    },
                })}
            >
                <Title
                    order={1}
                    size={20}
                    mb="sm"
                    sx={(theme) => ({
                        marginLeft: theme.spacing.md,

                        [`@media (min-width: ${theme.breakpoints.md}px)`]: {
                            marginLeft: 0,
                        },
                    })}
                >
                    Parties
                </Title>
                <PartiesList parties={parties} />
            </Box>
        );
    }

    if (error) {
        return <div>{error}</div>;
    }

    return <MinimalLoader />;
};

export default Parties;
