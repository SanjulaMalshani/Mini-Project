import React, { useState, useEffect } from 'react';
import DropDown from '../DropDown';
import ResultTable from '../ResultTable';
import { useSelector, useDispatch } from 'react-redux';
import { setStudentResultsSheets } from '../../store/reducers/LectureNavigationSlice';
import axios from 'axios';
import { host } from '../../utils/hostingPort'; 
import { useRef } from 'react'

function ApprovePendingResult() {
    const results = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'E', 'F'];

    // Get the resultsSheets and pendingSheetId from Redux store
    const resultsSheets = useSelector((store) => store.lectureNavigationSlice?.resultsSheets || []);
    const pendingSheetId = useSelector((store) => store.lectureNavigationSlice?.pendingSheetId);
    const updatedStudents = useSelector((store) => store.lectureNavigationSlice?.studentResultsSheets || []);
    const [pendingSheet, setPendingSheet] = useState([]);
    const [students, setStudents] = useState([]);
    const [newIndex, setNewIndex] = useState('');
    const [newGrade, setNewGrade] = useState(''); // Will be updated by DropDown component
    const [errorMessage, setErrorMessage] = useState('');
    const [currentSheet, setCurrentSheet] = useState(null);
    const dispatch = useDispatch();
    const [error, setError] = useState('');
    const [isCommentBoxOpen, setIsCommentBoxOpen] = useState(false)
    const commetRef = useRef();

    // Save access token, refresh token, and role to localStorage
    const token = localStorage.getItem('accessToken');
    const refresh = localStorage.getItem('refreshToken');
    const userRole = localStorage.getItem('role');
    const personId = localStorage.getItem('userId');

    // Filter to get the pending result sheet that matches the pendingSheetId
    useEffect(() => {
        if (resultsSheets.length > 0 && pendingSheetId) {
            const pendingSheet = resultsSheets.find((sheet) => sheet.id === pendingSheetId);
            setPendingSheet(pendingSheet);
            if (pendingSheet && students.length === 0) {  // Only initialize students if it's empty
                const formattedStudents = pendingSheet.studentResults.map((student) => ({
                    no: student.no,
                    index: student.index,
                    grade: student.grade,
                }));
                setStudents(formattedStudents);
                setCurrentSheet(pendingSheet);    
            } 
        }

        console.log(updatedStudents)
    }, [resultsSheets, pendingSheetId]);
    

    const addNewResults = () => {
        // Validate inputs
        if (!newIndex || !newGrade) {
            setErrorMessage('Please fill in both the Index Number and Grade.');
            return;
        }

        // Clear any previous error message
        setErrorMessage('');

        // Get the last 'no' from updatedStudents or start from 1 if empty
        const lastNo = updatedStudents.length > 0 ? updatedStudents[updatedStudents.length - 1].no : 0;

        // Create a new result entry
        const newResult = {
            no: lastNo + 1,
            index: newIndex,
            grade: newGrade,
        };

        // Update the students array with the new result
        setStudents((prevStudents) => [...prevStudents, newResult]);

        // Optionally: clear input fields after adding
        setNewIndex('');
        setNewGrade(''); // Reset the grade to default
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!currentSheet) {
            setError("No sheet selected.");
            return;
        }

        // Replace the studentResults field with the updated students state
        const updatedSheet = {
            ...currentSheet,
            studentResults: students,
            lectureID: personId
        };


        console.log(updatedSheet)

        try {
            const response = await axios.put(`${host}/api/results/lecApproved/${personId}/${pendingSheetId}`, updatedSheet, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            window.location.reload();
            console.log("Response: ", response.data);
            alert("Results updated successfully!");
            
        } catch (err) {
            console.error(err);
            setError("An error occurred while updating the results.");
        }
    };

    const handleUpdate = async (e) => {
        console.log(updatedStudents)
        e.preventDefault();

        if (!currentSheet) {
            setError("No sheet selected.");
            return;
        }

        // Replace the studentResults field with the updated students state
        const updatedSheet = {
            ...currentSheet,
            studentResults: updatedStudents,
        };
        try {console.log(updatedSheet)
            const response = await axios.put(`${host}/api/results/update/${pendingSheetId}/${personId}`, updatedSheet, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log("Response: ", response.data);
            alert("Results updated successfully!");
            window.location.reload();
        } catch (err) {
            console.error(err);
            setError("An error occurred while updating the results.");
        }
    };

    const handleCancel = () => {
        setIsCommentBoxOpen(false)
    }
    
    const handleSend = async () => {
        console.log(commetRef.current.value)
        setIsCommentBoxOpen(false)
        const updatedSheet = {
            ...currentSheet,
            rejectMessage: commetRef.current.value,
            studentResults: students
        };
        try {
            const response = await axios.put(`${host}/api/results/rejectLec/${pendingSheetId}/${personId}`, updatedSheet, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log("Response: ", response.data);
            alert("Results updated successfully!");
            window.location.reload();
        } catch (err) {
            alert("Results updated unsuccessfully!");
            console.error(err);
            setError("An error occurred while updating the results.");
        }
    }

    const handleNotApprove =async ()=>{
        setIsCommentBoxOpen(true);

    }
    return (
        <div>
            <div className='mt-5 w-full flex flex-col'>
                <div className='w-full flex flex-col items-center'>
                    <div>
                        <h3 className='text-xl text-primary-txt'>
                            {pendingSheet.subject || "No Pending Sheet"} - {students[0]?.subject || "Result Sheet"}
                        </h3>
                        <h3 className='text-xl text-primary-txt'>
                            {pendingSheet.batch || "No Pending Sheet"} - {pendingSheet.batch || "No Pending Sheet"}
                        </h3>
                    </div>
                    <div className='mt-3'>
                        <div className='grid grid-cols-7 gap-3'>
                            <div className='col-span-3'>
                                <input
                                    type='text'
                                    placeholder='Enter Index Number'
                                    className='p-4 w-full h-12 border-[1px] bg-transparent border-black rounded-lg focus:border-secondary focus:border-2 focus:outline-none placeholder-table-txt placeholder-opacity-100'
                                    value={newIndex}
                                    onChange={(e) => setNewIndex(e.target.value)}
                                />
                            </div>
                            <div className='col-span-3'>
                                <DropDown
                                    dropDownType="resultList"
                                    options={results}
                                    type={newGrade || "Select Grade"} // Display default text or selected value
                                    setValue={setNewGrade} // Update newGrade state when value changes
                                />
                            </div>
                            <div className='col-span-1 bg-primary'>
                                <button
                                    onClick={addNewResults}
                                    className='w-full h-12 bg-secondary text-white border-btn-border text-[16px] border-[1px]'
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                        {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
                    </div>
                </div>
                <div className='mt-2'>
                    <ResultTable students={students} setStudents={setStudents} user="lecturer" />
                </div>
                {/* <div className='mt-4 mr-10 flex gap-3 justify-end'>
                <button onClick={handleUpdate}
                        className='mt-3 py-2 px-10 bg-secondary text-white border-btn-border text-[16px] border-[1px]'
                    >
                        update
                    </button>
                    <button onClick={handleSubmit}
                        className='mt-3 py-2 px-10 bg-secondary text-white border-btn-border text-[16px] border-[1px]'
                    >
                        Send
                    </button>
                </div> */}

        {
          pendingSheet.rejectStatus !== 'lecture' ?
            <div className='mt-4 mr-10 flex gap-3 justify-end'>
              <button
                onClick={handleNotApprove}
                className='mt-3 py-2 px-10 hover:bg-secondary text-black hover:text-white border-btn-border text-[16px] border-[1px]'
              >
                Not Approved
              </button>
              <button onClick={handleUpdate} className='mt-3 py-2 px-10 bg-transperant hover:bg-secondary text-black hover:text-white border-btn-border text-[16px] border-[1px]'>Update</button>
              <button onClick={handleSubmit} className='mt-3 py-2 px-10 bg-secondary text-white border-btn-border text-[16px] border-[1px]'>Send</button>
            </div>
            : <></>
        }
            {isCommentBoxOpen && (
                <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 backdrop-blur-sm text-white'>
                    <div className='py-10 w-4/12 flex flex-col items-center bg-white'>
                        <h2 className='w-5/6 text-center text-2xl font-semibold text-primary-txt'>Add Comment</h2>
                        <p className='w-5/6 mt-5 text-center text-sm text-black'>Please enter the reason which caused the non-approval of the received result from the department secretary.</p>
                        <textarea 
                            ref={commetRef}
                            type='text' 
                            className='mt-5 px-3 py-4 w-5/6 h-40 bg-transparent text-primary-txt border-[1px] border-black focus:outline-2 focus:outline-secondary rounded-lg'
                        ></textarea>
                        <div className='w-5/6 flex justify-end gap-3 mt-6'>
                            <button
                                onClick={handleCancel}
                                className='mt-3 py-2 px-10 hover:bg-secondary text-black hover:text-white text-[16px] border-black hover:border-btn-border border-[1px]'
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleSend}
                                className='mt-3 py-2 px-10 bg-secondary text-white border-btn-border text-[16px] border-[1px]'
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            )}

            </div>
        </div>
    );
}

export default ApprovePendingResult;
