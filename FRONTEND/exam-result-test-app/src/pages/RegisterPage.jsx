import React, { useEffect, useRef, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import DropDown from '../components/DropDown';
import data from '../utils/data';

function RegisterPage() {

    const [showPassword, setShowPassword] = useState(false);
    
    const fullName = useRef();
    const email = useRef();
    const password = useRef();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const handleRegister = () => {
        console.log(fullName.current.value, email.current.value, password.current.value, facultyName, departmentName);
    }
   
    const faculties = data.map((faculty) => faculty.faculty);
    const [facultyName, setFacultyName] = useState('');

    
    const [departments, setDepartments] = useState([]);
    const [departmentName, setDepartmentName] = useState('');

    useEffect(() => {
        if (facultyName !== '') {
            const selectedFaculty = data.find((faculty) => faculty.faculty === facultyName);
            setDepartments(selectedFaculty ? selectedFaculty.departments.map((dpt) => dpt.dptName) : []);
            setDepartmentName(''); 
        }
    }, [facultyName]);


    return (
        <div>
            <div className='w-screen flex justify-center items-center min-h-screen bg-login-bg'>
                <div className='py-4 basis-4/12 flex flex-col items-center bg-white bg-opacity-70'>
                    <h1 className='mb-2 text-3xl text-primary-txt font-semibold'>Register Here</h1>
                    <div className='w-3/4 flex flex-col'>
                        <label className='text-primary-txt text-[16px]'>Full Name</label>
                        <input
                            ref={fullName}
                            type='text'
                            placeholder='Full Name'
                            className='mt-2  px-3 w-full h-12 bg-transparent border-[2px] border-black rounded-lg focus:outline-none placeholder:text-[16px] placeholder:text-lg-placeholder-txt'
                        />
                    </div>
                    <div className='w-3/4 flex flex-col'>
                        <label className='text-primary-txt text-[16px]'>Email</label>
                        <input
                            ref={email}
                            type='text'
                            placeholder='Email'
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
                    <div className='mt-3 w-3/4 flex flex-col'>
                        <label className='mb-2 text-primary-txt text-[16px]'>Select Your Faculty</label>
                        <DropDown type="Faculty" options={faculties} setValue={setFacultyName} />
                    </div>
                    <div className='mt-3 w-3/4 flex flex-col'>
                        <label className='mb-2 text-primary-txt text-[16px]'>Select Your Department</label>
                        <DropDown type="Department" options={departments} setValue={setDepartmentName}/>
                    </div>
                    <button
                        onClick={handleRegister}
                        className='mt-7 w-3/4 h-12 bg-primary text-white rounded-3xl'
                    >
                        Register
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage
