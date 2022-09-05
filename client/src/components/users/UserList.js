const UserList = ({ users }) => {
    return (
        <ul>
            {users.map((user) => (
                <li key={user.username}>{user.username}</li>
            ))}
        </ul>
    );
};

export default UserList;
