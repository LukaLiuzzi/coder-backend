import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useUserContext } from '../context/UserContext';

export default function Home() {
	const { user } = useUserContext();
	const navigate = useNavigate();
	useEffect(() => {
		if (!user) {
			navigate('/login');
		}
	}, [user, navigate]);
	return <>{user && <Navbar user={user} />}</>;
}
