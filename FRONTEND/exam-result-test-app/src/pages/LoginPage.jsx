import React, { useRef, useState } from 'react'
import loginUniLogo from '../assets/login/loginUniLogo.png'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { host } from '../utils/hostingPort'; 
import ForgotPassword from '../components/ForgotPassword';

function LoginPage() {

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [clickForgotPassword, setClickForgotPassword] = useState(false)

    const username = useRef();
    const password = useRef();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const handleLogin = () => {
        console.log("Login button clicked");
        authenticateUser();
        
    }

    const handleForgotPassword = () => {
        setClickForgotPassword(true)
    }

    const authenticateUser = async () => {
        try {
            console.log("Sending request to authenticate user...");
            const response = await fetch(`${host}/api/v1/auth/authenticate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: username.current.value,  
                    password: password.current.value
                })
            });

            console.log("Request sent, awaiting response...");

            if (!response.ok) {
                throw new Error("Authentication failed");
            }

            const data = await response.json();
            console.log("Authentication successful, received data:", data);

            // Save access token, refresh token, and role to localStorage
            localStorage.setItem('accessToken', data.access_token);
            localStorage.setItem('refreshToken', data.refresh_token);
            localStorage.setItem('role', data.role);
            localStorage.setItem('userId', data.userId);
            localStorage.setItem('faculty', data.faculty);
    
            // Navigate to the correct dashboard based on the user's role
            if (data.role === 'LECTURE') {
              
                navigate('/lecture');
            } else if (data.role === 'SECRETARY') {
                navigate('/dptSecretary');
            } else if (data.role === 'HOD') {
                navigate('/hod');
            } else if (data.role === 'DEAN') {
                navigate('/dean');
            }else if(data.role === 'EXAMINATIONBRANCH'){
                navigate('/examDepartment')
            }else if(data.role === 'REGISTRAR'){
                navigate('/registar')
            }else if(data.role === 'VC'){
                navigate('/vc')
            }else if(data.role  === 'STUDENT'){
                navigate('/publishedResult')
            }else if(data.role === 'ADMIN'){
                navigate('/admin')
            }

        } catch (err) {
            console.log("Login failed: ", err);
            alert("Login failed: ", err);
        }
    }

    return (
        <div>
            <div className='w-screen flex items-center justify-center h-screen bg-login-bg bg-cover bg-center'>
                <div className='py-4 basis-4/12 flex flex-col items-center bg-white bg-opacity-70'>
                    <div>
                        <img src={loginUniLogo} alt='uniLogo' className='w-20 h-20 mt-5' />
                    </div>
                    <h1 className='mb-7 text-3xl text-primary-txt font-semibold'>Welcome Again</h1>
                    <div className='w-3/4 flex flex-col'>
                        <label className='text-primary-txt text-[16px]'>Username</label>
                        <input
                            ref={username}
                            type='text'
                            placeholder='Username'
                            className='mt-2  px-3 w-full h-12 bg-transparent border-[2px] border-black rounded-lg focus:outline-none placeholder:text-[16px] placeholder:text-lg-placeholder-txt'
                        />
                    </div>
                    <div className='mt-3 w-3/4 flex flex-col'>
                        <label className='text-primary-txt text-[16px]'>Password</label>
                        <div className='flex items-center'>
                            <input
                                ref={password}
                                type={showPassword ? 'text' : 'password'}
                                placeholder='Password'
                                className='mt-2 px-3 w-5/6 h-12 bg-transparent border-[2px] border-r-0 border-black rounded-lg rounded-tr-none rounded-br-none focus:outline-none placeholder:text-[16px] placeholder:text-lg-placeholder-txt '
                            />
                            <div
                                className='mt-2 w-1/6 h-12 flex justify-center items-center text-primary-txt bg-transparent border-[2px] border-l-0 border-black rounded-tr-lg rounded-br-lg cursor-pointer'
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </div>
                        </div>
                    </div>
                    <div
                        onClick={handleForgotPassword}
                        className='mt-4 w-3/4 flex justify-end text-primary-txt hover:text-secondary hover:font-semibold cursor-pointer transition-all'
                    >
                        <p>Forgot Password ?</p>
                    </div>
                    <button
                        onClick={handleLogin}
                        className='mt-7 mb-32 w-3/4 h-12 bg-primary text-white rounded-3xl'
                    >
                        Login
                    </button>
                </div>
            </div>
            {
                clickForgotPassword ?
                    <ForgotPassword setClickForgotPassword={setClickForgotPassword} /> : <></>
            }
        </div>
    )
}

export default LoginPage;