import Register from './views/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './views/Login';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/register' element={<Register />} />
				<Route path='/login' element={<Login />} />
			</Routes>
		</BrowserRouter>
	);
}
export default App;
