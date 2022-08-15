const PartiesList = ({ parties }) => {
    if (parties.length === 0) {
        return <p>No parties found.</p>;
    }

    return (
        <ul>
            {parties.map((party) => (
                <li key={party._id}>{party.name}</li>
            ))}
        </ul>
    );
};

export default PartiesList;
