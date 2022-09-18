import Register from './views/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './views/Login';
import Home from './views/Home';
import UserContextProvider from './context/UserContext';

function App() {
	return (
		<UserContextProvider>
			<BrowserRouter>
				<Routes>
					<Route path='/register' element={<Register />} />
					<Route path='/login' element={<Login />} />
					<Route path='/' element={<Home />} />
				</Routes>
			</BrowserRouter>
		</UserContextProvider>
	);
}
export default App;
