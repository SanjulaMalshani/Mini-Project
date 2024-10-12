import React, { useEffect, useState } from 'react';
import ResultSheetList from '../ResultSheetList';
import DropDown from '../DropDown';
import { TfiMenuAlt } from "react-icons/tfi";
import { PiSquaresFourBold } from "react-icons/pi";
import data from '../../utils/data';
import { host } from '../../utils/hostingPort';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setResultsSheets } from '../../store/reducers/DptSecretaryNavigationSlice';

function DptAllResultList() {
    const [batches, setBatches] = useState([]); // State for batches
    const [batchName, setBatchName] = useState(''); // Selected batch
    const [degrees, setDegrees] = useState([]); // State for degree programs
    const [degreeProgramName, setDegreeProgramName] = useState(''); // Selected degree program
    const [resultSheets, setResultSheets] = useState([]);
    const [filteredResultSheets, setFilteredResultSheets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const secretaryId = localStorage.getItem('userId');

    // Fetch result sheets from the API
    useEffect(() => {
        const fetchResultSheets = async () => {
            try {
                const response = await axios.get(`${host}/api/results/getApprovedBySec/${secretaryId}`);
                setResultSheets(response.data);  
                console.log(response.data);
                dispatch(setResultsSheets(response.data));
                setFilteredResultSheets(response.data);
            } catch (err) {
                // Check if the error response exists
                if (err.response) {
                    // The request was made, but the server responded with a status code
                    // that falls out of the range of 2xx
                    setError(err.response.data.message || "An error occurred while fetching data."); // Set error message
                } else if (err.request) {
                    // The request was made but no response was received
                    setError("No response received from server.");
                } else {
                    // Something happened in setting up the request that triggered an Error
                    setError( err.message);
                }
            } finally {
                setLoading(false);
            }
        };
        
        fetchResultSheets();
    }, [secretaryId, dispatch]);

    // Fetch batches and degrees based on selected faculty
    useEffect(() => {
        const selectedDegrees = [];
        const selectedBatches = [];

        resultSheets.forEach(sheet => {
            if (!selectedDegrees.includes(sheet.degreeProgram)) {
                selectedDegrees.push(sheet.degreeProgram);
            }
            if (!selectedBatches.includes(sheet.batch)) {
                selectedBatches.push(sheet.batch);
            }
        });

        setDegrees(selectedDegrees);
        setBatches(selectedBatches);
    }, [resultSheets]);

    // Filter results based on selected batch and degree program
    const handleSort = () => {
        const filteredResults = resultSheets.filter(sheet => {
            const matchesBatch = batchName ? sheet.batch.toLowerCase() === batchName.toLowerCase() : true;
            const matchesDegreeProgram = degreeProgramName ? sheet.degreeProgram.toLowerCase() === degreeProgramName.toLowerCase() : true;

            return matchesBatch && matchesDegreeProgram;
        });

        setFilteredResultSheets(filteredResults);
    };

    // Loading and error handling
    if (loading) return <p><br/>Loading...</p>;
    if (error) return <h4><br/> {error}</h4>;

    return (
        <div>
            <div className='flex flex-col items-center'>
                <div className='mt-7 w-11/12 flex items-center justify-between'>
                    <h3 className='text-xl text-primary-txt'>Approve Pending Result</h3>
                    <div className='basis-9/12 grid grid-cols-5 gap-2'> {/* Change the number of columns to 5 */}
                        <div className='col-span-2'>
                            <DropDown 
                                dropDownType="resultList" 
                                type={degreeProgramName || "Degree Program"} 
                                options={degrees} 
                                setValue={setDegreeProgramName} 
                            />
                        </div>
                        <div className='col-span-2'>
                            <DropDown 
                                dropDownType="resultList" 
                                type={batchName || "Batch"} 
                                options={batches} 
                                setValue={setBatchName} 
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
                <ResultSheetList userType="dptSecretary" resultSheets={filteredResultSheets} />
            </div>
        </div>
    );
}

export default DptAllResultList;
