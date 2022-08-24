import {
    Avatar,
    Badge,
    Table,
    Group,
    Text,
    ActionIcon,
    useMantineTheme,
    createStyles,
} from '@mantine/core';
import { IconChevronRight, IconQuestionMark } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
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
    const theme = useMantineTheme();

    return (
        <Table mt="sm" verticalSpacing="sm">
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
                                    radius="md"
                                >
                                    <IconQuestionMark size={30} />
                                </Avatar>
                                <Text weight={500}>
                                    {game.name.length > 45
                                        ? `${game.name.slice(0, 45).trim()}...`
                                        : game.name}
                                </Text>
                            </Group>
                        </td>
                        <td className={classes.genre}>
                            {game.genres ? (
                                <Badge
                                    variant={
                                        theme.colorScheme === 'dark'
                                            ? 'light'
                                            : 'outline'
                                    }
                                >
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
    );
};

export default GameTable;
