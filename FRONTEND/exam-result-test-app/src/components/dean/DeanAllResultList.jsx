import React, { useState, useEffect } from 'react';
import DropDown from '../DropDown';
import { TfiMenuAlt } from "react-icons/tfi";
import { PiSquaresFourBold } from "react-icons/pi";
import ResultSheetList from '../ResultSheetList';
import data from '../../utils/data';
import axios from 'axios';
import { host } from '../../utils/hostingPort';
import { useDispatch } from 'react-redux';
import { setResultsSheets } from '../../store/reducers/DeanNavigationSlice';

function DeanAllResultList() {

    const [facultyName, setFacultyName] = useState('');
    const dispatch = useDispatch();

    const [departments, setDepartments] = useState([]);
    const [departmentName, setDepartmentName] = useState('');

    const [subjects, setSubjects] = useState([]);
    const [subjectName, setSubjectName] = useState('');

    const [originalResultSheets, setOriginalResultSheets] = useState([]); 
    const [filteredResultSheets, setFilteredResultSheets] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [degreePrograms, setDegreePrograms] = useState([]);
    const [degreeProgram, setDegreeProgram] = useState('');
    const [batches, setBatches] = useState([]);
    const [batch, setBatch] = useState('');

    const lectureId = localStorage.getItem('userId');    

    useEffect(() => {
        if (facultyName !== '') {
            const selectedFaculty = data.find((faculty) => faculty.faculty === facultyName);
            setDepartments(selectedFaculty ? selectedFaculty.departments.map((dpt) => dpt.dptName) : []);
            setDepartmentName('');
        }
    }, [facultyName]);

    useEffect(() => {
        if (departmentName !== '') {
            const selectedFaculty = data.find((faculty) => faculty.faculty === facultyName);
            const selectedDepartment = selectedFaculty.departments.find((dpt) => dpt.dptName === departmentName);
            let allSubjects = [];
            selectedDepartment.degrees.forEach((degree) => {
                degree.batches.forEach((batch) => {
                    batch.semesters.forEach((semester) => {
                        allSubjects = [...allSubjects, ...semester.subjects.map((subject) => subject.subjectName)];
                    });
                });
            });
            setSubjects(allSubjects);
            setSubjectName('');
        }
    }, [departmentName]);

    const handleSort = () => {
        const filteredSheets = originalResultSheets.filter(sheet => {
            const matchesDegreeProgram = degreeProgram ? sheet.degreeProgram.toLowerCase() === degreeProgram.toLowerCase() : true;
            const matchesBatch = batch ? sheet.batch.toLowerCase() === batch.toLowerCase() : true;
            const matchesSubject = subjectName ? sheet.subjectName.toLowerCase() === subjectName.toLowerCase() : true;

            return matchesDegreeProgram && matchesBatch && matchesSubject;
        });

        setFilteredResultSheets(filteredSheets); // Update filtered sheets state
    };

    useEffect(() => {
        const getResultSheets = async () => {
            try {
                const data = await fetchPendingSubjectResultSheets(lectureId);
                setOriginalResultSheets(data); // Set original data
                setFilteredResultSheets(data); // Also set the initial filtered data
                dispatch(setResultsSheets(data));
                const uniqueDegreePrograms = [...new Set(data.map(sheet => sheet.degreeProgram))];
                const uniqueBatches = [...new Set(data.map(sheet => sheet.batch))];
    
                setDegreePrograms(uniqueDegreePrograms);
                setBatches(uniqueBatches);
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
            const response = await axios.get(`${host}/api/results/dean/notApproved/${id}`);
            return response.data;
            dispatch(setResultsSheets(data));
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };
    
    if (loading) return <p><br/>Loading...</p>;
    if (error) return <p><br/>Error: {error}</p>;

    return (
        <div>
            <div className='flex flex-col items-center'>
            <div className='mt-7 w-11/12 flex items-center justify-between'>
                    <h3 className='text-xl text-primary-txt'>Approve Pending Result</h3>
                    <div className='basis-9/12 grid grid-cols-7 gap-2'>
                        <div className='col-span-2'>
                            <DropDown dropDownType="resultList" type="Degree Program" options={degreePrograms} setValue={setDegreeProgram} />
                        </div>
                        <div className='col-span-2'>
                            <DropDown dropDownType="resultList" type="Batch" options={batches} setValue={setBatch} />
                        </div>
                        <div 
                           onClick={handleSort}
                           className='col-span-1 flex items-center justify-center gap-2 bg-secondary rounded-lg cursor-pointer'>
                            <TfiMenuAlt size={25} color='white' />
                            <PiSquaresFourBold size={25} color='white' />
                        </div>
                    </div>
                </div>
                <ResultSheetList userType="dean" resultSheets={originalResultSheets} />
            </div>
        </div>
    )
}

export default DeanAllResultList
