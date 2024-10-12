import React, { useState, useEffect } from 'react';
import DropDown from '../DropDown';
import { TfiMenuAlt } from "react-icons/tfi";
import { PiSquaresFourBold } from "react-icons/pi";
import ResultCollection from '../ResultCollection';
import { host } from '../../utils/hostingPort';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setResultsSheets } from '../../store/reducers/LectureNavigationSlice';

function PublishedResultCollection() {
    const [degreePrograms, setDegreePrograms] = useState([]);
    const [degreeProgram, setDegreeProgram] = useState('');

    const [departments, setDepartments] = useState([]); // State for departments
    const [department, setDepartment] = useState(''); // Rename batch to department

    const [faculties, setFaculties] = useState([]); // State for faculties
    const [faculty, setFaculty] = useState('');

    const [resultSheets, setResultSheets] = useState([]);
    const [filteredResultSheets, setFilteredResultSheets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const dispatch = useDispatch();

    const token = localStorage.getItem('accessToken');
    const refresh = localStorage.getItem('refreshToken');
    const userRole = localStorage.getItem('role');
    const lectureId = localStorage.getItem('userId');

    useEffect(() => {
        const getResultSheets = async () => {
            try {
                const data = await fetchPendingSubjectResultSheets(lectureId);
                setResultSheets(data);
                setFilteredResultSheets(data); // Initialize filtered sheets
                dispatch(setResultsSheets(data));
                
                // Get unique degree programs, departments, and faculties
                const uniqueDegreePrograms = [...new Set(data.map(sheet => sheet.degreeProgram))];
                const uniqueDepartments = [...new Set(data.map(sheet => sheet.department))]; // Change to department
                const uniqueFaculties = [...new Set(data.map(sheet => sheet.faculty))]; // Get unique faculties

                setDegreePrograms(uniqueDegreePrograms);
                setDepartments(uniqueDepartments); // Set unique departments
                setFaculties(uniqueFaculties); // Set unique faculties
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getResultSheets();
    }, [lectureId, dispatch]);

    const fetchPendingSubjectResultSheets = async (id) => {
        try {
            const response = await axios.get(`${host}/api/results/student`);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };

    const handleSort = () => {
        console.log('Filtering with:', { degreeProgram, department, faculty }); // Debugging line
        const filteredSheets = resultSheets.filter(sheet => {
            const matchesDegreeProgram = degreeProgram ? sheet.degreeProgram.toLowerCase() === degreeProgram.toLowerCase() : true;
            const matchesDepartment = department ? sheet.department.toLowerCase() === department.toLowerCase() : true; // Change batch to department
            const matchesFaculty = faculty ? sheet.faculty.toLowerCase() === faculty.toLowerCase() : true;

            return matchesDegreeProgram && matchesDepartment && matchesFaculty;
        });

        setFilteredResultSheets(filteredSheets);
    };

    if (loading) return <p><br />Loading...</p>;
    if (error) return <p><br />Error: {error}</p>;
    
    return (
        <div>
            <div className='flex flex-col items-center'>
                <div className='mt-10 w-11/12 flex items-center justify-between'>
                    <h3 className='text-xl text-primary-txt'>Published Results</h3>
                    <div className='basis-9/12 grid grid-cols-7 gap-2'>
                        <div className='col-span-2'>
                            <DropDown 
                                dropDownType="resultList" 
                                type="Degree Program" 
                                options={degreePrograms} 
                                setValue={setDegreeProgram} 
                            />
                        </div>
                        <div className='col-span-2'>
                            <DropDown 
                                dropDownType="resultList" 
                                type="Department" // Change label from Batch to Department
                                options={departments} // Use the unique departments here
                                setValue={setDepartment} // Change batch to department
                            />
                        </div>
                        <div className='col-span-2'>
                            <DropDown 
                                dropDownType="resultList" 
                                type="Faculty" 
                                options={faculties} 
                                setValue={setFaculty} 
                            />
                        </div>
                        <div
                            onClick={handleSort}
                            className='col-span-1 flex items-center justify-center gap-2 bg-secondary rounded-lg cursor-pointer'>
                            <TfiMenuAlt size={25} color='white' />
                            <PiSquaresFourBold size={25} color='white' />
                        </div>
                    </div>
                </div>
                {/* Use filteredResultSheets to display the results */}
                <ResultCollection userType="student" resultSheets={filteredResultSheets} />
            </div>
        </div>
    );
}

export default PublishedResultCollection;
