import { createStyles } from '@mantine/core';
import PartyCard from './PartyCard';

const useStyles = createStyles((theme) => ({
    parties: {
        display: 'flex',
        flexDirection: 'column',
        listStyle: 'none',
        padding: 0,
        margin: 0,

        [`@media (min-width: ${theme.breakpoints.md}px)`]: {
            gap: theme.spacing.sm,
        },
    },
}));

const PartiesList = ({ parties }) => {
    const { classes } = useStyles();

    return (
        <ul className={classes.parties}>
            {parties.map((party) => (
                <li key={party._id}>
                    <PartyCard party={party} />
                </li>
            ))}
        </ul>
    );
};

export default PartiesList;
