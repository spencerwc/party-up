import { Routes, Route } from 'react-router-dom';

const App = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<h1>Home</h1>} />
				<Route path="parties" element={<h1>Parties</h1>}></Route>
				<Route path="parties/:partyId" element={<h1>Party</h1>} />
			</Routes>
		</>
	);
};

export default App;
