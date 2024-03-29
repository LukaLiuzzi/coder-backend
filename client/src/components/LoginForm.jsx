import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { useUserContext } from '../context/UserContext';
import { BASE_API_URL } from '../config';

export default function LoginForm() {
	const navigate = useNavigate();
	const { setUser } = useUserContext();
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const [error, setError] = useState(null);

	const handleSubmit = (e) => {
		e.preventDefault();

		axios
			.post(
				`${BASE_API_URL}/auth/login`,
				{
					email: formData.email,
					password: formData.password,
				},
				{ withCredentials: true }
			)
			.then((res) => {
				setUser(res.data.user);
				navigate('/');
			})
			.catch((err) => {
				setError(err.response.data.message);
			});
	};

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
		<section className='bg-gray-50 dark:bg-gray-900'>
			<div className='flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0'>
				<span className='my-4 text-3xl font-bold text-white'>
					Ecommerce CoderHouse
				</span>
				<div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
					<div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
						<h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
							Loguearse
						</h1>
						<form className='space-y-4 md:space-y-6' onSubmit={handleSubmit}>
							<div>
								<label
									htmlFor='email'
									className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
								>
									Tu email
								</label>
								<input
									type='email'
									name='email'
									id='email'
									className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
									placeholder='luka@gmail.com'
									required={true}
									autoComplete='on'
									onChange={(e) =>
										setFormData({
											...formData,
											[e.target.name]: e.target.value,
										})
									}
									value={formData.email}
								/>
							</div>
							<div>
								<label
									htmlFor='password'
									className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
								>
									Contraseña
								</label>
								<input
									type='password'
									name='password'
									id='password'
									placeholder='••••••••'
									className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
									required={true}
									autoComplete='on'
									onChange={(e) =>
										setFormData({
											...formData,
											[e.target.name]: e.target.value,
										})
									}
									value={formData.password}
								/>
							</div>
							<button
								type='submit'
								className='w-full text-white bg-green-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
							>
								Entrar
							</button>
							<p className='text-sm font-light text-gray-500 dark:text-gray-400'>
								No tenes cuenta?{' '}
								<Link
									to={'/register'}
									className='font-medium text-primary-600
									hover:underline dark:text-primary-500'
								>
									Registrate aca!
								</Link>
							</p>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}
