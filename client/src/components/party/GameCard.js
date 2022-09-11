import {
    Avatar,
    Text,
    Group,
    Badge,
    ActionIcon,
    Tooltip,
    Paper,
    createStyles,
} from '@mantine/core';
import { IconX, IconQuestionMark } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
    wrapper: {
        backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        boxShadow: 'rgba(0, 0, 0, 0.04) 0px 3px 5px',
        padding: theme.spacing.md,

        [`@media (min-width: ${theme.breakpoints.md}px)`]: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            padding: 0,
        },
    },
}));

const GameCard = ({ game, setGame }) => {
    const { classes } = useStyles();

    const handleClear = () => {
        setGame(null);
    };

    return (
        <Paper className={classes.wrapper}>
            <Group noWrap>
                <Avatar
                    src={game.cover ? game.cover.url : null}
                    size={70}
                    radius="lg"
                >
                    <IconQuestionMark size={30} />
                </Avatar>
                <div>
                    <Text weight={500}>{game.name}</Text>
                    {game.genres && (
                        <Badge size="sm" variant="filled">
                            {game.genres[0].name}
                        </Badge>
                    )}
                </div>
                <Tooltip label="Clear Game">
                    <ActionIcon ml="auto" onClick={handleClear}>
                        <IconX stroke={1.5} />
                    </ActionIcon>
                </Tooltip>
            </Group>
        </Paper>
    );
};

export default GameCard;
