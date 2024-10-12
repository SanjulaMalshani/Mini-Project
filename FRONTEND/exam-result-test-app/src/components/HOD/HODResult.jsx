import React, { useState, useEffect } from 'react';
import ResultTable from '../ResultTable';
import DropDown from '../DropDown';
import { host } from '../../utils/hostingPort';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

function HODResult() {
    const [currentSheet, setCurrentSheet] = useState(null);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true); // Optional: Loading state
    const pendingSheetId = useSelector((store) => store.hodNavigationSlice?.pendingHodSheetId);
    const resultsSheets = useSelector((store) => store.hodNavigationSlice?.resultsSheets || []);
    const dispatch = useDispatch();

    // Save access token, refresh token, and role to localStorage
    const token = localStorage.getItem('accessToken');
    const refresh = localStorage.getItem('refreshToken');
    const userRole = localStorage.getItem('role');
    const personId = localStorage.getItem('userId');

    // Filter to get the pending result sheet that matches the pendingSheetId
    useEffect(() => {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!currentSheet) {
            alert("No sheet selected."); // Improved error handling
            return;
        }
        const updatedSheet = {
            ...currentSheet,
            hodID: personId
        };
        try {
            const response = await axios.put(`${host}/api/results/hod/${personId}/${pendingSheetId}`, updatedSheet, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log("Response: ", response.data);
            alert("Results updated successfully!");
            window.location.reload();
        } catch (err) {
            console.error(err);
            alert("An error occurred while updating the results."); // Improved error handling
        }
    };

    const handleAddResult = () => {
        console.log('Add Result');
    };

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
                                    {currentSheet.batch || "No Batch"} - {currentSheet.semester|| "No Batch"}
                                </h3>
                            </>
                        ) : (
                            <h3 className='text-xl text-primary-txt'>No Pending Sheet</h3>
                        )}
                    </div>
                </div>
                <div className='mt-5 w-full'>
                    <ResultTable students={students} setStudents={setStudents} user='hod' />
                </div>
                <div className='mt-4 mr-20 flex gap-3 justify-end'>
                    <button onClick={handleSubmit}
                        className='mt-3 mr-44 py-2 px-10 bg-secondary text-white border-btn-border text-[16px] border-[1px]'
                    >
                        Approve
                    </button>
                </div>
            </div>
        </div>
    );
}

export default HODResult;
