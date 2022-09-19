import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_API_URL } from '../config';

export default function RegisterForm() {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		name: '',
		address: '',
		phone: '',
		age: '',
		avatar: '',
	});

	const handleSubmit = (e) => {
		e.preventDefault();

		const data = new FormData();
		data.append('email', formData.email);
		data.append('password', formData.password);
		data.append('name', formData.name);
		data.append('address', formData.address);
		data.append('phone', formData.phone);
		data.append('age', formData.age);
		data.append('avatar', formData.avatar);

		axios
			.post(`${BASE_API_URL}/auth/register`, data)
			.then((res) => {
				navigate('/login');
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<section className='bg-gray-50 dark:bg-gray-900'>
			<div className='flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0'>
				<span className='my-4 text-3xl font-bold text-white'>
					Ecommerce CoderHouse
				</span>
				<div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
					<div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
						<h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
							Crear una cuenta
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
							<div>
								<label
									htmlFor='name'
									className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
								>
									Nombre
								</label>
								<input
									type='text'
									name='name'
									id='name'
									placeholder='Luka'
									className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
									required={true}
									autoComplete='on'
									onChange={(e) =>
										setFormData({
											...formData,
											[e.target.name]: e.target.value,
										})
									}
									value={formData.name}
								/>
							</div>
							<div>
								<label
									htmlFor='address'
									className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
								>
									Direccion
								</label>
								<input
									type='text'
									name='address'
									id='address'
									placeholder='Mi casa 123'
									className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
									required={true}
									autoComplete='on'
									onChange={(e) =>
										setFormData({
											...formData,
											[e.target.name]: e.target.value,
										})
									}
									value={formData.address}
								/>
							</div>
							<div>
								<label
									htmlFor='age'
									className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
								>
									Edad
								</label>
								<input
									type='number'
									name='age'
									id='age'
									placeholder='20'
									className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
									required={true}
									autoComplete='on'
									onChange={(e) =>
										setFormData({
											...formData,
											[e.target.name]: e.target.value,
										})
									}
									value={formData.age}
								/>
							</div>
							<div>
								<label
									htmlFor='phone'
									className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
								>
									Numero de telefono
								</label>
								<input
									type='number'
									name='phone'
									id='phone'
									placeholder='+542611345678'
									className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
									required={true}
									autoComplete='on'
									onChange={(e) =>
										setFormData({
											...formData,
											[e.target.name]: e.target.value,
										})
									}
									value={formData.phone}
								/>
							</div>
							<div>
								<label
									htmlFor='avatar'
									className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
								>
									Avatar
								</label>
								<input
									type='file'
									name='avatar'
									id='avatar'
									className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
									required={true}
									autoComplete='on'
									onChange={(e) =>
										setFormData({
											...formData,
											[e.target.name]: e.target.files[0],
										})
									}
								/>
							</div>

							<button
								type='submit'
								className='w-full text-white bg-green-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
							>
								Crear cuenta
							</button>
							<p className='text-sm font-light text-gray-500 dark:text-gray-400'>
								Ya tenes cuenta?{' '}
								<Link
									to={'/login'}
									className='font-medium text-primary-600
									hover:underline dark:text-primary-500'
								>
									Logueate aca!
								</Link>
							</p>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}
