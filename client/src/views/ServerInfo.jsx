import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_API_URL } from '../config';
import { useUserContext } from '../context/UserContext';

export default function ServerInfo() {
	const [info, setInfo] = useState(null);
	const [error, setError] = useState(null);
	const navigate = useNavigate();
	const { user } = useUserContext();

	useEffect(() => {
		if (!user || user.role !== 'admin') {
			navigate('/login');
			return;
		}
		axios
			.get(`${BASE_API_URL}/serverinfo`, {
				withCredentials: true,
			})
			.then((res) => {
				setInfo(res.data);
			})
			.catch((err) => {
				setError(err.response.data.message);
			});
	}, [user]);

	if (error)
		return (
			<div>
				<h1 className='text-center text-white text-2xl'>Error</h1>
				<div className='flex text-white justify-center items-center flex-col'>
					<p>{error}</p>
				</div>
			</div>
		);

	return (
		<div>
			<h1 className='text-center text-white text-2xl'>Server Info</h1>
			{info && (
				<>
					<div className='flex text-white justify-center items-center flex-col'>
						<p>Server Port: {info.serverPort}</p>
						<p>Server Cluster: {info.cluster}</p>
						<p>Server Environment: {info.enviroment}</p>
						<p>Server Cors Origin: {info.corsOrigin}</p>
						<p>Server OS: {info.serverOS}</p>
						<p>Server Arch: {info.serverArch}</p>
						<p>Server CPU: {info.serverCPUs.system}</p>
						<p>Server Memory: {info.serverMemory.rss}</p>
						<p>Server Version: {info.serverVersion}</p>
						<p>Server Disk: {info.serverDisk}</p>
						<p>Server Uptime: {info.serverUptime}</p>
					</div>

					<div className='text-center my-4'>
						<Link to='/'>
							<button className='p-4 text-white bg-black text-center rounded'>
								Volver a la home
							</button>
						</Link>
					</div>
				</>
			)}
		</div>
	);
}
