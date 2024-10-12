import ResultSheetsCollection from '../ResultSheetsCollection'
import { IoChevronBack } from 'react-icons/io5'
import { vcClickApprovedCollectionView } from '../../store/reducers/VCNavigationSlice'
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { host } from '../../utils/hostingPort';
import axios from 'axios';
import GPATable from '../GPATable';

function VCApprovedResultSheetsCollection() {
 // Select pendingSheetId and resultsSheets from Redux store
 const pendingSheetId = useSelector((store) => store.vcNavigationSlice.pendingCollectionVCSheetId);
 const resultsSheets = useSelector((store) => store.vcNavigationSlice.studentCollectionResultsSheetsVC || []);
 const personId = localStorage.getItem('userId');
 const [students, setStudents] = useState([]);
console.log(resultsSheets);
 // Find the specific collection that matches the pendingSheetId
 const selectedCollection = resultsSheets.find(sheet => sheet.id === pendingSheetId);

 const dispatch = useDispatch();
    const handleBack = () => {
        dispatch(vcClickApprovedCollectionView(false))
    }

    console.log(pendingSheetId) 

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission if this is within a form context
        try {
            const response = await axios.get(`${host}/api/results/downloadResultsPdf/${pendingSheetId}`, {
                responseType: 'blob', // Important: Set response type to blob
                headers: {
                    'Content-Type': 'application/pdf' // You can set this or just rely on the server to send the correct type
                }
            });
            
            // Create a URL for the PDF blob
            const url = window.URL.createObjectURL(new Blob([response.data]));
            
            // Create a link element, set the URL, and trigger the download
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${selectedCollection.faculty}_${selectedCollection.department}_${selectedCollection.degreeProgram}_${selectedCollection.batch}_${selectedCollection.semester}_results.pdf`); // Set the name for the downloaded file
            document.body.appendChild(link);
            link.click(); // Simulate click to trigger download
            link.remove(); // Clean up the DOM
    
            alert("Results downloaded successfully!");
        } catch (err) {
            console.error(err);
            alert("An error occurred while downloading the results.");
        }
    };
    
    useEffect(() => {
        if (selectedCollection) {
            setStudents(selectedCollection.studentGPAS || []);
        }
    }, [selectedCollection]);
 
    return (
        <div>
            <div className='flex flex-col items-center'>
                <div className='mt-5 w-11/12 flex items-center justify-start gap-3'>
                    <IoChevronBack 
                       onClick={handleBack}
                       size={20} 
                       className='cursor-pointer' 
                    />
                    <h3 className='text-xl text-primary-txt'>Collection</h3>
                </div>
                <div className='mt-2 py-2 px-5 w-11/12 flex flex-col items-start gap-0 bg-tertiary-bg'>
                    <p>University : {selectedCollection.university}</p>
                    <p>Faculty: {selectedCollection.faculty}</p>
                    <p>Department: {selectedCollection.department}</p>
                    <p>Batch: {selectedCollection.batch}</p>
                    <p>Semester: {selectedCollection.semester}</p>
                </div>
                <ResultSheetsCollection userType="vc" resultSheets={selectedCollection} />
                <h3 className='mt-5 text-xl text-primary-txt text-center'>Current GPA For Results</h3>
                <div className='mb-5 w-full flex justify-center'>
                    <GPATable students={students} setStudents={setStudents} user='student' />
                </div>
                <div className='w-11/12 flex justify-end'>
                    <button 
                       onClick={handleSubmit}
                       className='mt-0 py-2 px-10 bg-secondary text-white border-btn-border text-[16px] border-[1px]'
                    >
                        DOWNLOAD
                    </button>
                </div>
            </div>
        </div>
    )
}

export default VCApprovedResultSheetsCollection
