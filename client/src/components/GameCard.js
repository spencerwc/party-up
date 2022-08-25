import { Avatar, Text, Group, Badge, ActionIcon, Tooltip } from '@mantine/core';
import { IconX } from '@tabler/icons';

const GameCard = ({ game, setGame }) => {
    const handleClear = () => {
        setGame(null);
    };

    return (
        <Group noWrap mt="md">
            <Avatar
                src={game.cover ? game.cover.url : null}
                size={90}
                radius="md"
            />
            <div>
                <Text size="lg" weight={500}>
                    {game.name}
                </Text>
                <Badge>{game.genres && game.genres[0].name}</Badge>
            </div>
            <Tooltip label="Clear Game">
                <ActionIcon ml="xl" onClick={handleClear}>
                    <IconX stroke={1.5} />
                </ActionIcon>
            </Tooltip>
        </Group>
    );
};

export default GameCard;
