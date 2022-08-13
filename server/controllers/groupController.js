const getGroups = async (req, res) => {
    res.status(200).json({ message: 'Parties route' });
};

const getGroup = async (req, res) => {
    const { id } = req.params;
    res.status(200).json({ message: `Group route: ${id}` });
};

const createGroup = async (req, res) => {
    res.status(200).json({ message: 'Group POST route' });
};

const updateGroup = async (req, res) => {
    const { id } = req.params;
    res.status(200).json({ message: `Group PATCH route: ${id}` });
};

const deleteGroup = async (req, res) => {
    res.status(200).json({ message: 'Group DELETE route' });
};

module.exports = {
    getGroups,
    getGroup,
    createGroup,
    updateGroup,
    deleteGroup,
};
