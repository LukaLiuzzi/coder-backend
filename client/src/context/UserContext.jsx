import { createContext, useContext, useEffect, useMemo, useState } from 'react';

export const UserContext = createContext(null);

export default function UserContextProvider({ children }) {
	const [user, setUser] = useState(
		JSON.parse(window.localStorage.getItem('user')) || null
	);

	useEffect(() => {
		window.localStorage.setItem('user', JSON.stringify(user));
	}, [user]);

	const value = useMemo(
		() => ({
			user,
			setUser,
		}),
		[user]
	);

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUserContext = () => {
	return useContext(UserContext);
};
