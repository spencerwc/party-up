import {
    Avatar,
    Badge,
    Table,
    Group,
    Text,
    ActionIcon,
    Stack,
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

const GameTable = ({ games }) => {
    const { classes } = useStyles();

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
                    <tr key={game.id}></tr>
                ))}
            </tbody>
        </Table>
    );
};

export default GameTable;
