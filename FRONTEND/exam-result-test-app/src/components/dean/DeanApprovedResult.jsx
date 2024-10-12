import React, { useState, useEffect } from 'react';
import ResultTable from '../ResultTable'
import { useSelector, useDispatch } from 'react-redux';
import { host } from '../../utils/hostingPort'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function DeanApprovedResult() {
    const [currentSheet, setCurrentSheet] = useState(null);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true); // Optional: Loading state
    const pendingSheetId = useSelector((store) => store.deanNavigationSlice?.pendingDeanSheetId);
    const resultsSheets = useSelector((store) => store.deanNavigationSlice?.studentHistoryResultsSheets || []);
    const dispatch = useDispatch();

    // Save access token, refresh token, and role to localStorage
    const token = localStorage.getItem('accessToken');
    const refresh = localStorage.getItem('refreshToken');
    const userRole = localStorage.getItem('role');
    const personId = localStorage.getItem('userId');

    // Filter to get the pending result sheet that matches the pendingSheetId
    useEffect(() => {
        console.log(resultsSheets)
        if (resultsSheets.length > 0 && pendingSheetId) {
            const pendingSheet = resultsSheets.find((sheet) => sheet.id === pendingSheetId);
            if (pendingSheet) {
                // Extract student results from the pending sheet and set them in state
                const formattedStudents = pendingSheet.studentResults.map((student) => ({
                    no: student.no,
                    index: student.index,
                    grade: student.grade,
                }));
                setStudents(formattedStudents);
                setCurrentSheet(pendingSheet);
            } else {
                // If no pending sheet found, reset the states
                setCurrentSheet(null);
                setStudents([]);
            }
        }
        setLoading(false); // Set loading to false after fetching
    }, [resultsSheets, pendingSheetId]);
    return (

        <div>
            <div className='mt-5 w-full flex flex-col'>
                <div className='w-full flex flex-col items-center'>
                <div className='mt-5'>
                        {loading ? ( // Display loading state if needed
                            <h3 className='text-xl text-primary-txt'>Loading...</h3>
                        ) : currentSheet ? ( // Conditional rendering based on currentSheet
                            <>
                                <h3 className='text-xl text-primary-txt'>
                                    {currentSheet.subject || "No Subject"} - {students[0]?.subject || "Result Sheet"}
                                </h3>
                                <h3 className='text-xl text-primary-txt'>
                                    {currentSheet.batch || "No Batch"} - {currentSheet.semester || "No Batch"}
                                </h3>
                            </>
                        ) : (
                            <h3 className='text-xl text-primary-txt'>No Pending Sheet</h3>
                        )}
                    </div>
                </div>
                <div className='mt-5 w-full'>
                    <ResultTable students={students} setStudents={setStudents} user='dean' status='null' />
                </div>
            </div>
        </div>
    )
}

export default DeanApprovedResult
