import axios from 'axios';
import { useEffect, useState } from 'react';
import { BASE_API_URL } from '../config';
import { useUserContext } from '../context/UserContext';

export default function Cart() {
	const [cart, setCart] = useState(null);
	const [error, setError] = useState(null);
	const { user } = useUserContext();

	useEffect(() => {
		axios
			.get(`${BASE_API_URL}/cart`, { withCredentials: true })
			.then(({ data }) => {
				setCart(data);
			})

			.catch((err) => {
				setError(err.response.data.message);
			});
	}, []);
	console.log(cart);

	const handleCheckout = () => {
		axios
			.post(
				`${BASE_API_URL}/checkout`,
				{ cart, user },
				{ withCredentials: true }
			)
			.then(({ data }) => {
				console.log(data);
			})
			.catch((err) => {
				console.error(err);
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
		<>
			{cart ? (
				<div className='container mx-auto mt-10'>
					<div className='flex shadow-md my-10'>
						<div className='w-3/4 bg-white px-10 py-10'>
							<div className='flex justify-between border-b pb-8'>
								<h1 className='font-semibold text-2xl'>Carrito</h1>
								<h2 className='font-semibold text-2xl'>
									{cart.products.length} Items
								</h2>
							</div>
							<div className='flex mt-10 mb-5'>
								<h3 className='font-semibold text-gray-600 text-xs uppercase w-2/5'>
									Detalles del producto
								</h3>
								<h3 className='font-semibold text-center text-gray-600 text-xs uppercase w-1/5'>
									Cantidad
								</h3>
								<h3 className='font-semibold text-gray-600 text-xs uppercase w-1/5 text-center'>
									Precio unitario
								</h3>
								<h3 className='font-semibold text-center text-gray-600 text-xs uppercase w-1/5'>
									Total
								</h3>
							</div>
							{cart.products.map((product) => (
								<div
									className='flex items-center hover:bg-gray-100 -mx-8 px-6 py-5'
									key={product.productId._id}
								>
									<div className='flex w-2/5'>
										{' '}
										{/* product */}
										<div className='w-20'>
											<img className='h-24' src='' alt='' />
										</div>
										<div className='flex flex-col justify-between ml-4 flex-grow'>
											<span className='font-bold text-sm'>
												{product.productId.name}
											</span>
											<span className='text-red-500 text-xs'>
												{product.productId._id}
											</span>
											<a
												href='#'
												className='font-semibold hover:text-red-500 text-gray-500 text-xs'
											>
												Eliminar
											</a>
										</div>
									</div>
									<div className='flex justify-center w-1/5'>
										<svg
											className='fill-current text-gray-600 w-3'
											viewBox='0 0 448 512'
										>
											<path d='M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z' />
										</svg>
										<input
											className='mx-2 border text-center w-8'
											type='text'
											defaultValue={product.quantity}
										/>
										<svg
											className='fill-current text-gray-600 w-3'
											viewBox='0 0 448 512'
										>
											<path d='M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z' />
										</svg>
									</div>
									<span className='text-center w-1/5 font-semibold text-sm'>
										${product.productId.price}
									</span>
									<span className='text-center w-1/5 font-semibold text-sm'>
										${product.productId.price * product.quantity}
									</span>
								</div>
							))}
						</div>
						<div id='summary' className='w-1/4 px-8 py-10 bg-gray-200'>
							<div className='flex gap-6'>
								<h1 className='font-semibold text-2xl border-b pb-8'>
									{user.name}
								</h1>
								<picture>
									<img
										height='50'
										width='50'
										src={`http://localhost:8080/${user.avatar.split('\\')[1]}`}
										alt={user.name}
									/>
								</picture>
							</div>

							<div className='flex justify-between mt-10 mb-5'>
								<span className='font-semibold text-sm uppercase'>
									{user.name}
								</span>
								<span className='font-semibold text-sm'>Edad: {user.age}</span>
							</div>
							<div>
								<p className='font-medium inline-block text-sm uppercase'>
									{user.email}
								</p>
							</div>
							<div className='py-4'>
								<p className='font-semibold inline-block mb-3 text-sm uppercase'>
									Telefono: {user.phone}
								</p>
							</div>
							<div className='border-t mt-8'>
								<div className='flex font-semibold justify-between py-6 text-sm uppercase'>
									<span>Costo total</span>
									<span>
										{cart.products.length > 0 &&
											cart.products
												.map((el) => el.productId.price * el.quantity)
												.reduce((acc, curr) => acc + curr)}
									</span>
								</div>
								<button
									className='bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full'
									onClick={() => handleCheckout()}
								>
									Checkout
								</button>
							</div>
						</div>
					</div>
				</div>
			) : (
				<h1 className='text-white text-4xl text-center mt-4 font-bold'>
					No tenes un carrito creado
				</h1>
			)}
		</>
	);
}
