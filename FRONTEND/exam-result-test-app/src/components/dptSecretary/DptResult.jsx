import React, { useState, useEffect, useRef  } from 'react';
import ResultTable from '../ResultTable';
import DropDown from '../DropDown';
import { useSelector, useDispatch } from 'react-redux';
import { host } from '../../utils/hostingPort'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaComment, FaCommentSlash } from 'react-icons/fa6';
import { setStudentResultsSheets } from '../../store/reducers/LectureNavigationSlice'; 
import { setStudentResultsSheetsDs } from '../../store/reducers/DptSecretaryNavigationSlice'; 

function DptResult() {
    const statusOptions = ['Medical', 'Absent'];
    const resultsSheets = useSelector((store) => store.dptSecretaryNavigationSlice?.resultsSheets || []);
    const currentSheetId = useSelector((store) => store.dptSecretaryNavigationSlice?.pendingSecSheetId || []); 
    const updatedStudents = useSelector((store) => store.dptSecretaryNavigationSlice?.studentResultsSheetsDs || []);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const hasInitialized = useRef(false);

    const [students, setStudents] = useState([]);
    const [studentsubmit, setStudentsubmit] = useState([]);
    const [newIndex, setNewIndex] = useState('');
    const [newStatus, setNewStatus] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [currentSheet, setCurrentSheet] = useState(null);   
    const [error, setError] = useState('');
    const [data,setData] = useState([])      
    const [showComment, setShowComment] = useState(false);  

    // Save access token, refresh token, and role to localStorage
    const personId = localStorage.getItem('userId'); 

    useEffect(() => {
        if (!hasInitialized.current) {
            const sheet = resultsSheets.find(sheet => sheet.id === currentSheetId);
            if (sheet) {
                const formattedStudents = sheet.studentResults.map(student => ({
                    no: student.no,
                    index: student.index,
                    grade: student.grade,
                }));

                setStudents(formattedStudents);
                setCurrentSheet(sheet);
            }
            // Mark the initialization as completed
            hasInitialized.current = true;
        }
    }, [resultsSheets, currentSheetId]);

    console.log(students)

    const handleAddResult = () => {
        // Validate inputs
        if (!newIndex || !newStatus) {
            setErrorMessage('Please fill in both the Index Number and Status.'); 
            return;
        }
        // Clear any previous error message
        setErrorMessage('');

        // Get the last 'no' from students or start from 1 if empty
        const lastNo = students.length > 0 ? students[students.length - 1].no : 0;

        // Create a new result entry
        const newResult = {
            no: lastNo + 1, 
            index: newIndex,
            grade: newStatus,
        };
        // Update the students array with the new result
        setStudentsubmit((prevStudents) => [...prevStudents, newResult]);
        setStudents((prevStudents) => [...prevStudents, newResult]);

        // Clear input fields after adding
        setNewIndex('');
        setNewStatus('');
        dispatch(setStudentResultsSheetsDs(students));
        
    };

    console.log('hi')
 
    console.log(students)
 
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!currentSheet) {
            setError("No sheet selected.");
            return;
        }
        const updatedSheet = {
            ...currentSheet,
            studentResults: students,
            depSecretaryID: personId
        };
        console.log(students)
        if(currentSheet.rejectStatus === 'lecture'){
            try {
                await axios.put(`${host}/api/results/rejectSec/${currentSheetId}/${personId}`, updatedSheet, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                alert("Results updated successfully!");
                window.location.reload();   
            } catch (err) {
                console.error(err);
                setError("An error occurred while updating the results.");
            }
            
        }else{
        try {
            await axios.post(`${host}/api/results/updateByDepSecretary/${currentSheetId}`, updatedSheet, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            alert("Results updated successfully!");
            window.location.reload();
        } catch (err) {
            console.error(err);
            setError("An error occurred while updating the results.");
        }
        }

    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!currentSheet) {
            setError("No sheet selected.");
            return;   
        }

        const updatedSheet = {
            ...currentSheet,
            studentResults: students,   
            depSecretaryID:personId  

        };

        try {
            await axios.put(`${host}/api/results/updateBySec/${currentSheetId}/${personId}`, updatedSheet, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            window.location.reload();
            alert("Results updated successfully!");
        
        } catch (err) {
            console.error(err);
            setError("An error occurred while updating the results.");
        }
    };

    const handleViewReason = () => { 
        setShowComment((prev) => !prev);
    };



    return (
        <div>
            <div className='mt-5 w-full flex flex-col'>
                <div className='w-full flex flex-col items-center'>
                    <h3 className='text-xl text-primary-txt'>Results Sheet</h3>
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
                                    type="Status"
                                    options={statusOptions}
                                    setValue={setNewStatus}
                                />
                            </div>
                            <div className='col-span-1 bg-primary'>
                                <button
                                    onClick={handleAddResult}
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
                    <ResultTable students={students} setStudents={setStudents} user='dptSecretary' />
                </div>
                {currentSheet && currentSheet.rejectStatus === 'lecture' && (
                    <div className='mt-7 mx-10 flex gap-3 justify-between'>
                        <div onClick={handleViewReason} className='flex gap-3 cursor-pointer'>
                            {!showComment ? <FaComment className='text-2xl text-secondary' /> : <FaCommentSlash className='text-2xl text-secondary' />}
                            <p className='text-secondary text-lg'>{showComment ? 'Hide Reason' : 'View Reason'}</p>
                        </div>
                        <div className='flex gap-3'>
                            <button onClick={handleUpdate} className='mt-3 py-2 px-10 bg-transperant hover:bg-secondary hover:text-white text-black border-btn-border text-[16px] border-[1px]'>Update</button>
                            <button onClick={handleSubmit} className='mt-3 py-2 px-10 bg-secondary text-white border-btn-border text-[16px] border-[1px]'>Send</button>
                        </div>
                    </div>
                )}

            </div>
            <div>
                {
                    currentSheet && currentSheet.rejectStatus !== 'lecture' && (
                        <div className='mt-4 mr-10 flex gap-3 justify-end'>              
                            <button onClick={handleUpdate} className='mt-3 py-2 px-10 bg-transperant hover:bg-secondary text-black hover:text-white border-btn-border text-[16px] border-[1px]'>Update</button>
                            <button onClick={handleSubmit} className='mt-3 py-2 px-10 bg-secondary text-white border-btn-border text-[16px] border-[1px]'>Send</button>
                        </div>
                    )
                }
            </div>
            {showComment && currentSheet && (
                <div className='fixed top-72 left-72 flex items-center'>
                    <div className='mt-5 ml-8 py-10 w-5/12 flex flex-col items-center bg-white border-[1px] border-black rounded-lg'>
                        <h2 className='w-5/6 text-center text-2xl font-semibold text-primary-txt'>The Reason To Not Approve</h2>
                        <p className='w-5/6 mt-5 text-justify text-sm text-black' style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                            {currentSheet.rejectMessage || 'No reason provided.'}
                        </p>
                        <button onClick={handleViewReason} className='mt-4 text-secondary'>Close</button>
                    </div>
                </div>

            )}
        </div>
    );
}

export default DptResult;
