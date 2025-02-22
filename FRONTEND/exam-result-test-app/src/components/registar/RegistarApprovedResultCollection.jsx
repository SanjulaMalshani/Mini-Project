import ResultCollection from '../ResultCollection'
import React, { useState, useEffect } from 'react'
import { host } from '../../utils/hostingPort'; 
import axios from 'axios';

function RegistarApprovedResultCollection() {
    const [resultSheets, setResultSheets] = useState([])
    const userId = localStorage.getItem('userId');
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchResultSheets = async () => {
            try {
                const response = await axios.get(`${host}/api/results/examinationBranch/approve/collection/${userId}`); 
                setResultSheets(response.data);  
            } catch (error) {
                console.error('Error fetching result sheets:', error);
            }
        }

        fetchResultSheets();
    }, [userId]);


    console.log(resultSheets);

    return (
        <div>
            <div className='flex flex-col items-center'>
                <div className='mt-10 w-11/12 flex items-center justify-start'>
                    <h3 className='text-xl text-primary-txt'>Collection History</h3>
                </div>
                <ResultCollection userType="registar" resultSheets={resultSheets}/>
            </div>
        </div>
    )
}

export default RegistarApprovedResultCollection
