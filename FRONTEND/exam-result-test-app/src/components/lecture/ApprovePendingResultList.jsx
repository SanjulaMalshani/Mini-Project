import React, { useState, useEffect } from 'react';
import DropDown from '../DropDown';
import { TfiMenuAlt } from "react-icons/tfi";
import { PiSquaresFourBold } from "react-icons/pi";
import ResultSheetList from '../ResultSheetList';
import data from '../../utils/data';
import { host } from '../../utils/hostingPort';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setResultsSheets } from '../../store/reducers/LectureNavigationSlice';

function ApprovePendingResultList() {
    const [degreePrograms, setDegreePrograms] = useState([]);
    const [degreeProgram, setDegreeProgram] = useState('');
    
    const [batches, setBatches] = useState([]);
    const [batch, setBatch] = useState('');

    const [subjects, setSubjects] = useState([]);
    const [subjectName, setSubjectName] = useState('');

    const [resultSheets, setResultSheets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const dispatch = useDispatch();

    // Save access token, refresh token, and role to localStorage
    const token = localStorage.getItem('accessToken');
    const refresh = localStorage.getItem('refreshToken');
    const userRole = localStorage.getItem('role');
    const lectureId = localStorage.getItem('userId');

    useEffect(() => {
        const getResultSheets = async () => {
            try {
                const data = await fetchPendingSubjectResultSheets(lectureId);
                setResultSheets(data);
                dispatch(setResultsSheets(data));
                
                // Extract unique degree programs and batches from result sheets
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
            const response = await axios.get(`${host}/api/results/getApproved/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };

    const handleSort = () => {
        const filteredResultSheets = resultSheets.filter(sheet => {
            const matchesDegreeProgram = degreeProgram ? sheet.degreeProgram.toLowerCase() === degreeProgram.toLowerCase() : true;
            const matchesBatch = batch ? sheet.batch.toLowerCase() === batch.toLowerCase() : true;
            const matchesSubject = subjectName ? sheet.subjectName.toLowerCase() === subjectName.toLowerCase() : true;

            return matchesDegreeProgram && matchesBatch && matchesSubject;
        });

        setResultSheets(filteredResultSheets);
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
                        {/* <div className='col-span-2'>
                            <DropDown dropDownType="resultList" type="Subject" options={subjects} setValue={setSubjectName} />
                        </div> */}
                        <div 
                           onClick={handleSort}
                           className='col-span-1 flex items-center justify-center gap-2 bg-secondary rounded-lg cursor-pointer'>
                            <TfiMenuAlt size={25} color='white' />
                            <PiSquaresFourBold size={25} color='white' />
                        </div>
                    </div>
                </div>
                <ResultSheetList userType="lecture" resultSheets={resultSheets} />
            </div>
        </div>
    );
}

export default ApprovePendingResultList;
