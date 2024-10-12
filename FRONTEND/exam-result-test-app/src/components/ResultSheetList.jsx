import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clickViewResult,clickHistoryView, setPendingSheetId, clickApprovalRequestView } from '../store/reducers/LectureNavigationSlice'; // Import setPendingSheetId
import { MdEdit } from "react-icons/md";
import { dptClickApprovedResultView,dptClickViewResult,setPendingSecSheetId } from '../store/reducers/DptSecretaryNavigationSlice';
import {hodClickApprovedResultView, hodClickViewResult, setPendingHodSheetId } from '../store/reducers/HODNavigationSlice';
import { deanClickApprovedResultView,  deanClickViewResult,setPendingDeanSheetId } from '../store/reducers/DeanNavigationSlice';


function ResultSheetList({ userType, resultSheets }) {
    const lectureNavigation = useSelector((store) => store.lectureNavigationSlice);
    const dptSecretaryNavigation = useSelector((store)=> store.dptSecretaryNavigationSlice);
    const hodNavigation = useSelector((store)=> store.hodNavigationSlice);
    const deanNavigation = useSelector((store) => store.deanNavigationSlice)
    const dispatch = useDispatch();

    const handleViewResult = (sheetId) => {
        if (userType === 'lecture') {
            dispatch(setPendingSheetId(sheetId));
            if (!lectureNavigation.isclickedViewResult) {
                dispatch(clickViewResult(true))
            }
            if (!lectureNavigation.isClickedApprovalRequestView) {
                dispatch(clickApprovalRequestView(true))
            }
            if(!lectureNavigation.isClickedHistoryView){
                dispatch(clickHistoryView(true))
            }
        } else if (userType === 'dptSecretary') {
            dispatch(setPendingSecSheetId(sheetId));
            if (!dptSecretaryNavigation.isClickedViewResult) {
                dispatch(dptClickViewResult(true))
            }
            if(!dptSecretaryNavigation.isClickedApprovedResultView){
                dispatch(dptClickApprovedResultView(true))
            }
        } else if (userType === 'HOD') {
            dispatch(setPendingHodSheetId(sheetId));
            if (!hodNavigation.isClickedViewResult) {
                dispatch(hodClickViewResult(true))
            }
            if(!hodNavigation.isClickedApprovedResultView){
                dispatch(hodClickApprovedResultView(true))
            }
        }
        else if (userType === 'dean') {
            dispatch(setPendingDeanSheetId(sheetId));
            if (!deanNavigation.isClickedViewResult) {
                dispatch(deanClickViewResult(true))
            }
            if(!deanNavigation.isClickedApprovedResultView){
                dispatch(deanClickApprovedResultView(true))
            }
        }
    };

    return (
        <div>
            <div className='mt-8'>
                <div className='pb-2 w-full grid grid-cols-12 gap-1 border-black border-b-[1px]'>
                    <div className='h-10 col-span-1 flex items-center justify-start'></div>
                    <div className='h-10 col-span-2 flex items-center justify-start'>
                        <p className='text-lg text-black'>Subject Code and Subject Name</p>
                    </div>
                    <div className='h-10 col-span-3 flex items-center mx-5 justify-start'>
                        <p className='ml-5 text-lg text-primary-txt mx-5'>Degree Program</p>
                    </div>
                    <div className='h-10 col-span-2 flex items-center justify-start'>
                        <p className='ml-3 text-lg text-black'>Batch and semester</p>
                    </div>
                    <div className='h-10 col-span-2 flex items-center justify-start'>
                        <p className='ml-2 text-lg text-black'>Department</p>
                    </div>
                    <div className='h-10 col-span-2 flex items-center justify-center'>
                        <p className='text-lg text-black'>Action</p>
                    </div>
                </div>
            </div>
            <div className='mb-10 max-h-80 overflow-y-auto'>
            <br/>
                {resultSheets.map((sheet, index) => (
                    <div key={index} className='py-2 w-full grid grid-cols-12 gap-1 gradient-border-bottom border-b-[1px]'>
                      
                        <div className='h-10 col-span-1 flex items-center justify-start'></div>
                        <div className='h-10 col-span-2 flex items-center justify-start'>
                            <p className='ml-5 mx-5 text-lg text-black'>{sheet.subjectCode + " - " +sheet.subject}</p> 
                        </div>
                        <div className='h-10 col-span-3 flex mx-5 items-center justify-start'>
                            <p className='text-lg text-primary-txt'>{sheet.degreeProgram}</p> 
                        </div>
                        <div className='h-10 col-span-2 flex items-center justify-start'>
                            <p className='text-lg text-black'>{sheet.batch +" - "+ sheet.semester}</p> 
                        </div>
                        <div className='h-10 col-span-2 flex items-center justify-start'>
                            <p className='text-lg text-black'>{sheet.department}</p> 
                        </div>
                        <div className='h-10 col-span-2 flex items-center justify-center gap-3'>
                            <MdEdit size={20} className='text-edit-icon-bg cursor-pointer' />
                            {/* <button
                                 onClick={() => handleViewResult(sheet.id)}
                                className='py-1 px-4 flex items-center justify-center bg-view-btn-bg text-black text-[14px] rounded-3xl'
                            >
                                View
                            </button> */}
                            <button
                               onClick={() => handleViewResult(sheet.id)}
                                className={`py-1 px-4 flex itmes-center justify-center 
                                    ${sheet.rejectStatus === 'lecture'? "bg-red-400": sheet.rejectStatus === 'dptSecretary'?"bg-yellow-200":"bg-view-btn-bg"} 
                                    text-black text-[14px] rounded-3xl`}
                            >
                                View
                            </button>
                        </div>
                        <br/>
                    </div>
                    
                ))}
            </div>
        </div>
    );
}

export default ResultSheetList;
