import {
    Avatar,
    Badge,
    Table,
    Group,
    Text,
    ActionIcon,
    Paper,
    createStyles,
} from '@mantine/core';
import { IconChevronRight, IconQuestionMark } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
    wrapper: {
        boxShadow: 'rgba(0, 0, 0, 0.04) 0px 3px 5px',

        [`@media (min-width: ${theme.breakpoints.md}px)`]: {
            backgroundColor:
                theme.colorScheme === 'dark'
                    ? theme.colors.dark[7]
                    : theme.white,
            borderRadius: theme.radius.lg,
            marginRight: theme.spacing.md,
            marginLeft: theme.spacing.md,
        },
    },

    genre: {
        display: 'none',

        [theme.fn.largerThan('xs')]: {
            display: 'table-cell',
        },
    },

    avatar: {
        width: '40px',
        height: '40px',

        [theme.fn.largerThan('xs')]: {
            width: '50px',
            height: '50px',
        },
    },
}));

const GameTable = ({ games, handleSelect }) => {
    const { classes } = useStyles();

    return (
        <Paper className={classes.wrapper} mt="md">
            <Table verticalSpacing="sm" horizontalSpacing="md">
                <thead>
                    <tr>
                        <th>Game</th>
                        <th className={classes.genre}>Genre</th>
                        <th>Select</th>
                    </tr>
                </thead>
                <tbody>
                    {games.map((game) => (
                        <tr key={game.id}>
                            <td>
                                <Group
                                    spacing="sm"
                                    style={{
                                        flexWrap: 'nowrap',
                                    }}
                                >
                                    <Avatar
                                        className={classes.avatar}
                                        src={game.cover ? game.cover.url : null}
                                        radius="lg"
                                    >
                                        <IconQuestionMark size={30} />
                                    </Avatar>
                                    <Text weight={500}>
                                        {game.name.length > 45
                                            ? `${game.name
                                                  .slice(0, 45)
                                                  .trim()}...`
                                            : game.name}
                                    </Text>
                                </Group>
                            </td>
                            <td className={classes.genre}>
                                {game.genres ? (
                                    <Badge size="sm" variant="filled">
                                        {game.genres[0].name}
                                    </Badge>
                                ) : (
                                    ''
                                )}
                            </td>

                            <td>
                                <ActionIcon onClick={() => handleSelect(game)}>
                                    <IconChevronRight stroke={1.5} />
                                </ActionIcon>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Paper>
    );
};

export default GameTable;
