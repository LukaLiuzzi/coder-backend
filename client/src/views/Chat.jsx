import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import socket from '../utils/socket';

export default function Chat() {
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);
	const { user } = useUserContext();
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) {
			navigate('/login');
			return;
		}
	}, [user]);

	// useEffect(() => {
	// 	socket.on('server:messages', (messages) => {
	// 		setMessages(messages);
	// 	});

	// 	return () => {
	// 		socket.off('server:messages');
	// 	};
	// }, [messages]);
	useEffect(() => {
		socket.emit('client:messages');
		socket.on('server:messages', (messages) => {
			setMessages(messages);
		});
		return () => {
			socket.off('server:messages');
		};
	}, [messages]);

	useEffect(() => {
		socket.on('server:message', (message) => {
			setMessages((messages) => [...messages, message]);
		});

		return () => {
			socket.off('server:message');
		};
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		socket.emit('client:message', { user, message });
		setMessage('');
	};
	return (
		<div>
			<h1 className='text-center text-white text-2xl'>Chat</h1>
			<ul>
				{messages.map((message) => (
					<li key={message._id} className='text-white font-bold'>
						<span className='text-red-700 font-normal'>{message.type}</span>:{' '}
						{message.message}
					</li>
				))}
			</ul>
			<form
				onSubmit={handleSubmit}
				className='flex justify-center items-center max-w-7xl mx-auto'
			>
				<input
					type='text'
					className='w-full p-2 rounded-lg'
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<button type='submit' className='p-4 text-white bg-black rounded'>
					Enviar
				</button>
			</form>
			<div className='text-center my-4'>
				<Link to='/'>
					<button className='text-white bg-black p-4 rounded'>
						Volver a la home
					</button>
				</Link>
			</div>
		</div>
	);
}
