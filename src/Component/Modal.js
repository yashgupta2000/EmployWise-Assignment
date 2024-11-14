import React, { useState } from 'react'
import { BASE_URL } from '../utils/constant'

export default function Modal({ closeModal, selectedUser, updatedUser, userUpdatedNotification, errorUserUpdatedNotification }) {
    //state
    const [updatedFirstName, setUpdatedFirstName] = useState(selectedUser.first_name);
    const [updatedLastName, setUpdatedLastName] = useState(selectedUser.last_name);
    const [updatedEmail, setUpdatedEmail] = useState(selectedUser.email);



    //function
    const updateUserData = async (id) => {
        const response = await fetch(`${BASE_URL}/api/users/${id}`, {
            method: 'PUT', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({ first_name: updatedFirstName, last_name: updatedLastName, email: updatedEmail, id: selectedUser.id, avatar: selectedUser.avatar })
        })

        if (response.ok) {
            userUpdatedNotification();
            const updatedUserData = await response.json();
            closeModal();
            updatedUser(updatedUserData);
        }
        else {
            errorUserUpdatedNotification();
        }
    }

    //jsx
    return (
        <div className='fixed inset-0 bg-slate-800 bg-opacity-75 flex justify-center items-center  '>

            <div className='p-4 sm:w-60 ml-3 mr-3 md:w-80 lg:w-96 bg-zinc-900'>
                <svg onClick={closeModal} width={15} className='ml-auto cursor-pointer' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" fill='white' /></svg>
                <h1 className=' text-center text-lg sm:text-3xl font-bold text-white mb-2'>EDIT USER</h1>
                <form onSubmit={(e) => e.preventDefault()}>
                    <input
                        className="bg-slate-600     w-full px-4 py-3 mb-4 opacity-65 rounded-md placeholder-white text-white"
                        type="text"
                        value={updatedFirstName}
                        placeholder="First Name"
                        onChange={(e) => setUpdatedFirstName(e.target.value)}

                    />
                    <input
                        className="bg-slate-600     w-full px-4 py-3 mb-4 opacity-65 rounded-md placeholder-white text-white"
                        type="text"
                        value={updatedLastName}
                        placeholder="Last Name"
                        onChange={(e) => setUpdatedLastName(e.target.value)}
                    />
                    <input
                        className="bg-slate-600 w-full px-4 py-3 mb-4 opacity-65 rounded-md placeholder-white text-white"
                        type="text"
                        value={updatedEmail}
                        placeholder="Email"
                        onChange={(e) => setUpdatedEmail(e.target.value)}
                    />
                    <button onClick={() => updateUserData(selectedUser.id)} className="bg-blue-700 w-full px-4 py-2 mt-4 text-white rounded-md">
                        Update
                    </button>
                </form>
            </div>

        </div>
    )
}
