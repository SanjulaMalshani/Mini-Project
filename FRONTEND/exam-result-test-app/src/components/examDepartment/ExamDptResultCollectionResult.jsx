import ResultTable from '../ResultTable'
import { IoChevronBack } from 'react-icons/io5'
import { examDepartmentClickResultSheetsCollectionView } from '../../store/reducers/ExamDptNavigationSlice'
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';


function ExamDptResultCollectionResult() {

    const [currentSheet, setCurrentSheet] = useState(null);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true); // Optional: Loading state
    const pendingSheetId = useSelector((store) => store.examDptNavigationSlice?.pendingExamSheetId);
    const resultsSheets = useSelector((store) => store.examDptNavigationSlice?.studentCollectionItemResultsSheetsEx || []);
    const dispatch = useDispatch();

    console.log(resultsSheets)
    console.log(pendingSheetId)

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



    const handleBack = () => {
       dispatch(examDepartmentClickResultSheetsCollectionView(false))
    }

    return (

        <div>
            <div className='mt-5 w-full flex flex-col items-center'>
                <div className='w-10/12 flex flex-col items-start'>
                    <div className='mt-5 w-11/12 flex items-center justify-start gap-3' >
                    <IoChevronBack 
                       onClick={handleBack}
                       size={20} 
                       className='cursor-pointer' 
                    />
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
                </div>
                <div className='mt-5 w-full'>
                    <ResultTable students={students} setStudents={setStudents} user='examDpt' status='null' />
                </div>
            </div>
        </div>
    )
}

export default ExamDptResultCollectionResult
