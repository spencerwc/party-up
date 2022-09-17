import { Box, Group, Text } from '@mantine/core';
import {
    TwitterIcon,
    TwitterShareButton,
    RedditShareButton,
    RedditIcon,
    FacebookShareButton,
    FacebookIcon,
} from 'react-share';

const PartyShare = ({ message }) => {
    const url = window.location.href;

    return (
        <Group mx="md" mt="sm" spacing="xs">
            <Text weight={500}>Share</Text>
            <FacebookShareButton url={url} quote={message}>
                <FacebookIcon size={25} round />
            </FacebookShareButton>
            <TwitterShareButton url={url} title={message}>
                <TwitterIcon size={25} round />
            </TwitterShareButton>
            <RedditShareButton url={url} title={message}>
                <RedditIcon size={25} round />
            </RedditShareButton>
        </Group>
    );
};

export default PartyShare;
