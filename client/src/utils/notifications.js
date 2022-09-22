import { IconCheck, IconX } from '@tabler/icons';

export const getSuccessNotification = (title, message) => {
    return {
        title: title,
        message: message,
        icon: <IconCheck />,
        radius: 'lg',
    };
};

export const getErrorNotification = (message) => {
    return {
        title: 'Something went wrong',
        message: message,
        color: 'red.8',
        icon: <IconX />,
        radius: 'lg',
    };
};
