import { TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons';

const FilterForm = ({ placeholder, filter }) => {
    const handleChange = (e) => {
        filter(e.target.value);
    };

    return (
        <TextInput
            mt="md"
            icon={<IconSearch size={18} stroke={1.5} />}
            radius="md"
            placeholder={placeholder}
            rightSectionWidth={42}
            onChange={handleChange}
        />
    );
};

export default FilterForm;
