import { Link } from 'react-router-dom';
import {
    Anchor,
    Avatar,
    ActionIcon,
    Text,
    Tooltip,
    Group,
    createStyles,
} from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
    request: {
        borderTop: `1px solid ${
            theme.colorScheme === 'dark'
                ? theme.colors.dark[6]
                : theme.colors.gray[2]
        }`,

        '&:first-of-type': {
            borderTop: '0px',
        },

        [`@media (min-width: ${theme.breakpoints.md}px)`]: {
            transition: 'all 0.25s',

            '&:hover': {
                boxShadow: 'rgba(0, 0, 0, 0.04) 0px 3px 5px',

                '&:last-child': {
                    boxShadow: 'none',
                },
            },
        },
    },
}));

const Request = ({ type, request, handleCancel }) => {
    const { classes } = useStyles();

    return (
        <Group
            className={classes.request}
            p="sm"
            pr="md"
            position="apart"
            noWrap
        >
            <Group spacing="xs" noWrap>
                <Anchor component={Link} to={`/users/${request.username}`}>
                    <Avatar src={request.avatar} size={60} radius={120} />
                </Anchor>
                <Anchor
                    component={Link}
                    to={`/users/${request.username}`}
                    variant="text"
                >
                    <Text weight={500}>{request.username}</Text>
                </Anchor>
            </Group>
            {type === 'sent' ? (
                <Tooltip label="Cancel Request">
                    <ActionIcon onClick={() => handleCancel(request.username)}>
                        <IconX size={18} stroke={1.5} />
                    </ActionIcon>
                </Tooltip>
            ) : (
                <Group spacing={6}>
                    <Tooltip label="Accept request">
                        <ActionIcon>
                            <IconCheck size={18} stroke={1.5} />
                        </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Deny Request">
                        <ActionIcon>
                            <IconX size={18} stroke={1.5} />
                        </ActionIcon>
                    </Tooltip>
                </Group>
            )}
        </Group>
    );
};

export default Request;
