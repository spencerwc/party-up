const getParties = async (req, res) => {
    res.status(200).json({ message: 'Parties route' });
};

const getParty = async (req, res) => {
    const { id } = req.params;
    res.status(200).json({ message: `Party route: ${id}` });
};

const createParty = async (req, res) => {
    res.status(200).json({ message: 'Party POST route' });
};

const updateParty = async (req, res) => {
    const { id } = req.params;
    res.status(200).json({ message: `Party PATCH route: ${id}` });
};

const deleteParty = async (req, res) => {
    res.status(200).json({ message: 'Party DELETE route' });
};

module.exports = {
    getParties,
    getParty,
    createParty,
    updateParty,
    deleteParty,
};
