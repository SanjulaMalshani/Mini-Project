import React, { useState } from 'react'
import ResultSheetsCollection from '../ResultSheetsCollection'
import { IoChevronBack } from "react-icons/io5";
import { deanClickApprovedCollectionView} from '../../store/reducers/DeanNavigationSlice';
import { useSelector, useDispatch } from 'react-redux';
import { deanClickCollectionView } from '../../store/reducers/DeanNavigationSlice';
import { host } from '../../utils/hostingPort';
import axios from 'axios';

function DeanApprovedResultSheetsCollection() {
    // Select pendingSheetId and resultsSheets from Redux store
    const pendingSheetId = useSelector((store) => store.deanNavigationSlice.pendingCollectionDeanSheetId);
    const resultsSheets = useSelector((store) => store.deanNavigationSlice.studentCollectionResultsSheets || []);
    const personId = localStorage.getItem('userId');

    // Find the specific collection that matches the pendingSheetId
    const selectedCollection = resultsSheets.find(sheet => sheet.id === pendingSheetId);

    const dispatch = useDispatch();
    const handleBack = () => {
        dispatch(deanClickApprovedCollectionView(false))
    }

    return (
        <div>
            <div className='flex flex-col items-center'>
                <div className='mt-5 w-11/12 flex items-center justify-start gap-3'>
                    <IoChevronBack 
                       onClick={handleBack}
                       size={20} 
                       className='cursor-pointer' 
                    />
                    <h3 className='text-xl text-primary-txt'>Collection History</h3>
                </div>
                <div className='mt-2 py-2 px-5 w-11/12 flex flex-col items-start gap-0 bg-tertiary-bg'>
                    <p>University : {selectedCollection.university}</p>
                    <p>Faculty: {selectedCollection.faculty}</p>
                    <p>Department: {selectedCollection.department}</p>
                    <p>Batch: {selectedCollection.batch}</p>
                    <p>Semester: {selectedCollection.semester}</p>
                </div>
                <ResultSheetsCollection userType="dean" resultSheets={selectedCollection} />
            </div>
        </div>
    )
}

export default DeanApprovedResultSheetsCollection
