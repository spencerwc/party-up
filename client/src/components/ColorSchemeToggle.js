import { useMantineColorScheme, ActionIcon, Group } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons';

const ColorSchemeToggle = () => {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();

    return (
        <ActionIcon
            onClick={() => toggleColorScheme()}
            size="lg"
            sx={(theme) => ({
                backgroundColor:
                    theme.colorScheme === 'dark'
                        ? theme.colors.dark[6]
                        : theme.colors.gray[0],
                color:
                    theme.colorScheme === 'dark'
                        ? theme.colors.yellow[4]
                        : theme.colors.blue[6],
                height: 50,
                width: 50,
                borderRadius: theme.radius.lg,
            })}
        >
            {colorScheme === 'dark' ? (
                <IconSun stroke={1.5} />
            ) : (
                <IconMoonStars stroke={1.5} />
            )}
        </ActionIcon>
    );
};

export default ColorSchemeToggle;
