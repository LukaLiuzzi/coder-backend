import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProductsContainer from '../components/ProductsContainer';
import { useUserContext } from '../context/UserContext';

export default function Home() {
	const { user } = useUserContext();
	const navigate = useNavigate();
	const { pathname } = useLocation();
	useEffect(() => {
		if (!user) {
			navigate('/login');
		}
	}, [user, navigate]);
	return (
		<>
			{user && <Navbar user={user} />}
			{pathname === '/' && <ProductsContainer />}
			{user && <Outlet />}
		</>
	);
}
