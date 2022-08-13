const getUser = (req, res) => {
    const { id } = req.params;
    res.status(200).json({ message: `User route: ${id}` });
};

const updateUser = (req, res) => {
    const { id } = req.params;
    res.status(200).json({ message: `User PATCH route: ${id}` });
};

const login = (req, res) => {
    res.status(200).json({ message: 'Login route' });
};

const signup = (req, res) => {
    res.status(200).json({ message: 'Signup route' });
};

module.exports = { getUser, updateUser, login, signup };
