import React, { useEffect, useRef, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import DropDown from '../DropDown';
import data from '../../utils/data';
import axios from 'axios';
import { host } from '../../utils/hostingPort';


function AddUser() {
    const [showPassword, setShowPassword] = useState(false);
    const userRoles = ['Student', 'Lecture', 'Department Secretary', 'HOD', 'DEAN', 'Exam Department', 'Registrar', 'VC'];
    const [userRole, setUserRole] = useState('');
    const fullName = useRef();
    const email = useRef();
    const password = useRef();
    const employeeId = useRef();
    const studentId = useRef();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleRegister = async () => {
        const requestBody = {
            fullName: fullName.current.value,
            email: email.current.value,
            password: password.current.value,
            faculty: userRole === 'Lecture' || userRole === 'Department Secretary' || userRole === 'HOD' || userRole === 'DEAN' ? facultyName : undefined,
            department: (userRole === 'Lecture' || userRole === 'Department Secretary' || userRole === 'HOD') && departmentName !== '' ? departmentName : undefined,
            employeeId: userRole !== 'Student' ? employeeId.current.value : undefined,
        };

        try {
            let response;
            switch (userRole) {
                case 'Student':
                    response = await axios.post(`${host}/api/v1/auth/register/student`, requestBody);
                    break;
                case 'Lecture':
                    response = await axios.post(`${host}/api/v1/auth/register/lecture`, requestBody);
                    break;
                case 'Department Secretary':
                    response = await axios.post(`${host}/api/v1/auth/register/depSecretary`, requestBody);
                    break;
                case 'HOD':
                    response = await axios.post(`${host}/api/v1/auth/register/hod`, requestBody);
                    break;
                case 'DEAN':
                    response = await axios.post(`${host}/api/v1/auth/register/dean`, requestBody);
                    break;
                case 'Exam Department':
                    response = await axios.post(`${host}/api/v1/auth/register/examBran`, requestBody);
                    break;
                case 'Registrar':
                    response = await axios.post(`${host}/api/v1/auth/register/registrar`, requestBody);
                    break;
                case 'VC':
                    response = await axios.post(`${host}/api/v1/auth/register/vc`, requestBody);
                    break;
                default:
                    alert('Please select a user role');
                    return;
            }
            console.log('User registered successfully:', response.data);
            alert("User registered successfully");
            window.location.reload();
        } catch (error) {
            console.error('Error registering user:', error);
            alert('An error occurred while registering the user.');
        }
    };

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
        <div className='mt-10 w-full flex flex-col items-center'>
            <div className='w-11/12 flex flex-col items-start '>
                <h3 className='mb-2 text-2xl text-primary-txt font-semibold'>Create User</h3>
                <div className='py-4 mx-14 w-full grid grid-cols-2 items-center bg-opacity-70'>
                    <div className='w-3/4 flex flex-col'>
                        <label className='text-primary-txt text-[16px]'>Full Name</label>
                        <input
                            ref={fullName}
                            type='text'
                            placeholder='Full Name'
                            className='mt-2  px-3 w-full h-12 bg-transparent border-[1px] border-black rounded-lg focus:outline-none placeholder:text-[16px] placeholder:text-lg-placeholder-txt'
                        />
                    </div>
                    <div className='w-3/4 flex flex-col'>
                        <label className='text-primary-txt text-[16px]'>Email</label>
                        <input
                            ref={email}
                            type='text'
                            placeholder='Email'
                            className='mt-2  px-3 w-full h-12 bg-transparent border-[1px] border-black rounded-lg focus:outline-none placeholder:text-[16px] placeholder:text-lg-placeholder-txt'
                        />
                    </div>
                    <div className='mt-3 w-3/4 flex flex-col'>
                        <label className='text-primary-txt text-[16px]'>Password</label>
                        <div className='flex items-center'>
                            <input
                                ref={password}
                                type={showPassword ? 'text' : 'password'}
                                placeholder='Password'
                                className='mt-2 px-3 w-5/6 h-12 bg-transparent border-[1px] border-r-0 border-black rounded-lg rounded-tr-none rounded-br-none focus:outline-none placeholder:text-[16px] placeholder:text-lg-placeholder-txt '
                            />
                            <div
                                className='mt-2 w-1/6 h-12 flex justify-center items-center text-primary-txt bg-transparent border-[1px] border-l-0 border-black rounded-tr-lg rounded-br-lg cursor-pointer'
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </div>
                        </div>
                    </div>
                    <div className='mt-3 w-3/4 flex flex-col'>
                        <label className='mb-2 text-primary-txt text-[16px]'>Select User Role</label>
                        <DropDown type="User" options={userRoles} setValue={setUserRole} />
                    </div>
                    {
                        (userRole === 'Lecture' || userRole === 'Department Secretary' || userRole === 'HOD' || userRole === 'DEAN') &&
                        <div className='mt-3 w-3/4 flex flex-col'>
                            <label className='mb-2 text-primary-txt text-[16px]'>Select Your Faculty</label>
                            <DropDown type="Faculty" options={faculties} setValue={setFacultyName} />
                        </div>
                    }
                    {
                        (userRole === 'Lecture' || userRole === 'Department Secretary' || userRole === 'HOD') &&
                        <div className='mt-3 w-3/4 flex flex-col'>
                            <label className='mb-2 text-primary-txt text-[16px]'>Select Department</label>
                            <DropDown type="Department" options={departments} setValue={setDepartmentName} />
                        </div>
                    }
                    {
                        userRole !== 'Student' && userRole !== '' &&
                        <div className='mt-3 w-3/4 flex flex-col'>
                            <label className='mb-2 text-primary-txt text-[16px]'>Enter Employee Id</label>
                            <input
                                ref={employeeId}
                                type='text'
                                placeholder='Employee Id'
                                className='mt-2  px-3 w-full h-12 bg-transparent border-[1px] border-black rounded-lg focus:outline-none placeholder:text-[16px] placeholder:text-lg-placeholder-txt'
                            />
                        </div>
                    }
                    {
                        userRole === 'Student' && userRole !== '' &&
                        <div className='mt-3 w-3/4 flex flex-col'>
                            <label className='mb-2 text-primary-txt text-[16px]'>Enter Student Id</label>
                            <input
                                ref={studentId}
                                type='text'
                                placeholder='Student Id'
                                className='mt-2  px-3 w-full h-12 bg-transparent border-[1px] border-black rounded-lg focus:outline-none placeholder:text-[16px] placeholder:text-lg-placeholder-txt'
                            />
                        </div>
                    }
                    <button
                        onClick={handleRegister}
                        className='mt-7 w-3/4 h-12 bg-primary text-white rounded-3xl'
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddUser;
