import Register from './views/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './views/Login';
import Home from './views/Home';
import UserContextProvider from './context/UserContext';
import ProductsContainer from './components/ProductsContainer';
import Cart from './components/Cart';

function App() {
	return (
		<UserContextProvider>
			<BrowserRouter>
				<Routes>
					<Route path='/register' element={<Register />} />
					<Route path='/login' element={<Login />} />
					<Route path='/' element={<Home />}>
						<Route path='products' element={<ProductsContainer />} />
						<Route path='cart' element={<Cart />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</UserContextProvider>
	);
}
export default App;
