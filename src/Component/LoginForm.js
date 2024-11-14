import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../utils/constant';
import { useNavigate } from 'react-router-dom'

export default function LoginForm() {

    //navigation
    const navigate = useNavigate();

    //states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validationError, setValidationError] = useState(false);
    const [error, setError] = useState('');
    // const [token, setToken] = useState('');

    //token will expire in 2mins
    const tokenLifeSpan = 1200000;

    //functions
    const handleButtonClick = async () => {
        if (email === '' || password === '') {
            setValidationError(true);
            return;
        } else {
            setValidationError(false);
        }

        try {
            const response = await fetch(`${BASE_URL}/api/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            // console.log(data);

            if (response.ok) {
                const expireTime = Date.now() + tokenLifeSpan
                localStorage.setItem("token", data.token);
                localStorage.setItem("expireTime", expireTime);

                setError('');
                navigate("/users");
            } else {
                setError(data.error);
            }
        } catch (error) {
            setError("Something went wrong. Please try again.");
        }
    };

    //JSX
    return (
        <div className=' bg-gray-900 min-h-screen flex flex-col items-center'>
            <div className=''>
            <h1 className='text-2xl text-center mt-3 sm:text-3xl mt-8 pb-5 font-bold text-white mb-4'>Please log in to access user data</h1>
            </div>
            <div className="flex items-center justify-center w-full mt-28">
                

                <form onSubmit={(e) => e.preventDefault()} className="bg-black max-w-md w-full sm:w-10/12 md:w-6/12 lg:w-4/12 p-8 sm:p-10 md:p-12 bg-opacity-80 rounded-md mx-4">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">Sign In</h1>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-gray-700 w-full px-4 py-3 mb-4 opacity-65 rounded-md placeholder-white text-white"
                        value={email}
                        type="email"
                        placeholder="Email"
                    />
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-gray-700 w-full px-4 py-3 mb-4 opacity-70 rounded-md placeholder-white text-white"
                        value={password}
                        type="password"
                        placeholder="Password"
                    />
                    <button onClick={handleButtonClick} className="bg-blue-700 w-full px-4 py-2 mt-4 text-white rounded-md">
                        Sign In
                    </button>

                    {validationError && <p className="text-red-600 text-xs mt-1">Please fill all the details</p>}
                    {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
                </form>
            </div>
        </div>
    );
}
