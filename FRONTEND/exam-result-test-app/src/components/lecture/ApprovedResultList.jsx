import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clickViewResult,setStudentHistoryResultsSheets } from '../../store/reducers/LectureNavigationSlice';
import ResultSheetList from '../ResultSheetList';
import axios from 'axios';
import { host } from '../../utils/hostingPort';

function ApprovedResultList() {

  const lectureNavigation = useSelector((store) => store.lectureNavigationSlice)
  const dispatch = useDispatch()
  const [resultSheets, setResultSheets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [degreePrograms, setDegreePrograms] = useState([]);
  const [degreeProgram, setDegreeProgram] = useState('');
  const [batches, setBatches] = useState([]);
  const [batch, setBatch] = useState('');

      // Save access token, refresh token, and role to localStorage
      const token = localStorage.getItem('accessToken');
      const refresh = localStorage.getItem('refreshToken');
      const userRole = localStorage.getItem('role');
      const lectureId = localStorage.getItem('userId');

  const handleViewResult = () => {
    if (lectureNavigation.isClickedApprovalPendingResults) {
      dispatch(clickViewResult(true))
    }
  }

  useEffect(() => {
    const getResultSheets = async () => {
        try {
            const data = await fetchPendingSubjectResultSheets(lectureId);
            setResultSheets(data);
             dispatch(setStudentHistoryResultsSheets(data));
            
            // Extract unique degree programs and batches from result sheets
            const uniqueDegreePrograms = [...new Set(data.map(sheet => sheet.degreeProgram))];
            const uniqueBatches = [...new Set(data.map(sheet => sheet.batch))];

            //setDegreePrograms(uniqueDegreePrograms);
            //setBatches(uniqueBatches);
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
        const response = await axios.get(`${host}/api/results/lecApproved/${id}`);
        return response.data;
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
        <div className='mt-3 w-5/6 flex items-center justify-between'>
          <h3 className='text-xl text-primary-txt'>History</h3>
        </div>
        <div className='w-full flex justify-start'>
           <div className='ml-20 mt-3 px-8 py-2 flex items-center justify-center bg-approval-btn-bg'>Approved</div>
        </div>
        <ResultSheetList userType="lecture" resultSheets={resultSheets} />
      </div>
    </div>
  )
}

export default ApprovedResultList
