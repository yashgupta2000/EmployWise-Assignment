import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../Pages/Users';
import Modal from './Modal';
import { BASE_URL } from '../utils/constant';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';


export default function UsersCards({ notifySuccess }) {
    //navigation
    const navigate = useNavigate();


    //states
    const { userData, setUserData } = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    // const [currentTime, setcurrentTime] = useState();
    const [updatedSearchedData, setUpdatedSearchedData] = useState(null);
    const [filteredData, setFilteredData] = useState(userData?.data || [])

    // console.log(userData);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    useEffect(() => {
        const isTokenExpire = () => {

            const expireTime = localStorage.getItem("expireTime");
            if (expireTime && Date.now() > expireTime) {
                navigate('/');
            }


        }
        const interval = setInterval(isTokenExpire, 1000);

        return () => clearInterval(interval);
    }, [])



    //notifications
    const deleteUserNotification = () => toast("User delete successfully!");
    const errorDeletingUser = () => toast("failed to delete user");
    const userUpdatedNotification = () => toast("User details updated successfully!");
    const errorUserUpdatedNotification = () => toast("Failed! to update user");





    //functions

    const updatedUser = (updatedUser) => {
        console.log(updatedUser)
        setUserData((prev) => ({ ...prev, data: prev.data.map((item) => item.id === updatedUser.id ? updatedUser : item) }))
    }
    const handleEdit = (user) => {
        setIsModalOpen(true)
        // console.log(user);   
        setSelectedUser(user);
    }
    const closeModal = () => {
        setIsModalOpen(false)
    }

    const handleDelete = async (id) => {
        const response = await fetch(`${BASE_URL}/api/users/${id}`, { method: 'DELETE' });
        console.log(response)
        if (response.ok) {
            setUserData((prev) => ({ ...prev, data: prev.data.filter((item) => item.id != id) }))
            deleteUserNotification();

        }
        else {
            errorDeletingUser();
        }
    }
    const handleSearchData = (data) => {
        setFilteredData(data || userData?.data);
    };
    // const displayedData = userData?.data || filteredData ;
    const displayedData = filteredData && filteredData.length > 0 ? filteredData : userData?.data;
    

    //jsx
    return (
        <div>
            <ToastContainer position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <SearchBar onSearchData={handleSearchData} />

            {loading ? (<div className="flex flex-wrap justify-center">

                <div className="flex flex-wrap w-full min-h-screen justify-between">
                    {userData?.data?.map((item, index) => (
                        <div
                            key={index}
                            className="bg-transparent  w-full sm:w-1/2 md:w-1/3 lg:w-1/4 m-4 p-2 rounded-sm border border-white flex flex-col items-center relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 animate-pulse rounded-sm"></div>

                            <div className="flex flex-col items-center">
                                <div className="bg-gray-300 w-24 h-24 rounded-full mb-4"></div>
                                <div className="bg-gray-300 w-3/4 h-6 mb-2"></div>
                                <div className="bg-gray-300 w-1/2 h-6"></div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>) : (<div className="flex flex-wrap justify-center">

                {
                    <div className="flex flex-wrap w-full justify-between">
                        {displayedData && Array.isArray(displayedData)&& displayedData.length > 0 ? displayedData?.map((item, index) => (
                            <div
                                key={index}
                                className="bg-slate-400 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 m-4 p-2 rounded-sm border border-white flex flex-col items-center"
                            >
                                <img className="rounded-full" src={item.avatar} alt={`${item.first_name}'s avatar`} />
                                <p className="text-center mt-2"><strong>{item.first_name} {item.last_name}</strong> </p>
                                <p>{item.email}</p>
                                <div className="flex w-3/4 justify-around mt-4">
                                    <svg onClick={() => handleEdit(item)} className='cursor-pointer' xmlns="http://www.w3.org/2000/svg" width={16} viewBox="0 0 512 512">
                                        <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z" fill="green" />
                                    </svg>
                                    <svg className='cursor-pointer' onClick={() => handleDelete(item.id)} xmlns="http://www.w3.org/2000/svg" width={16} viewBox="0 0 448 512">
                                        <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" fill="red" />
                                    </svg>
                                </div>
                            </div>
                        )) : <p>No users found.</p>}
                    </div>
                }
            </div>)}

            {/* CRUD operstion component (MODAL) */}
            {isModalOpen && (<Modal closeModal={closeModal} selectedUser={selectedUser} updatedUser={updatedUser} notifySuccess={notifySuccess} userUpdatedNotification={userUpdatedNotification} errorUserUpdatedNotification={errorUserUpdatedNotification} />)}



        </div>

    )
}
