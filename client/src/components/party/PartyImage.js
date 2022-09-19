import { Image, createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    gameImage: {
        display: 'none',

        [`@media (min-width: 375px)`]: {
            display: 'block',
            maxWidth: 100,
            boxShadow: `${theme.colors.indigo[8]}66 0px 5px, 
            ${theme.colors.indigo[8]}4D 0px 10px, 
            ${theme.colors.indigo[8]}33 0px 15px
            `,
            marginBottom: 'auto',
        },

        [`@media (min-width: ${theme.breakpoints.xs}px)`]: {
            maxWidth: 160,
            boxShadow: `${theme.colors.indigo[8]}66 5px 5px, 
                ${theme.colors.indigo[8]}4D 10px 10px, 
                ${theme.colors.indigo[8]}33 15px 15px`,
            marginRight: 10,
            marginBottom: 0,
        },
    },
}));

const PartyImage = ({ imageId }) => {
    const { classes } = useStyles();

    return (
        <Image
            className={classes.gameImage}
            src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${imageId}.jpg`}
        />
    );
};

export default PartyImage;
