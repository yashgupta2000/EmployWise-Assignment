import { useEffect, createContext, useState, useContext } from 'react';
import React from 'react';
import { BASE_URL } from '../utils/constant';
import UsersCards from '../Component/UsersCards';
import SearchBar from '../Component/SearchBar';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState('');
   
    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserContext.Provider>
    );
};

export default function Users() {
    
    const { setUserData } = useContext(UserContext);
   

    
    useEffect(() => {
        fetchUsersData();
    }, []);

    const fetchUsersData = async (page = 1) => {
        try {
            const response = await fetch(`${BASE_URL}/api/users?page=${page}`);

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const jsonData = await response.json();
            setUserData(jsonData);
            // console.log(jsonData);
        } catch (error) {
            console.error("Failed to fetch data:", error.message);
        }
    };

    return (
        <div className='bg-gray-900 min-h-screen'>
            <h1 className="text-2xl pt-3 sm:text-3xl font-bold text-white text-center mb-4">USER'S DATA</h1>
            
            <UsersCards/>
        </div>
    );
}
