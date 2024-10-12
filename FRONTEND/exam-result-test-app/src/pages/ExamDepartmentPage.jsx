import React from 'react'
import SideNavBar from '../components/SideNavBar'
import TopVerticalBar from '../components/TopVerticalBar'
import ExamDptResultCollection from '../components/examDepartment/ExamDptResultCollection'
import ExamDptResultSheetsCollection from '../components/examDepartment/ExamDptResultSheetsCollection'
import ExamDptResultCollectionResult from '../components/examDepartment/ExamDptResultCollectionResult'
import { useSelector } from 'react-redux'
import ExamDptApprovedResultCollection from '../components/examDepartment/ExamDptApprovedResultCollection'
import ExamDptApprovedResultSheetsCollection from '../components/examDepartment/ExamDptApprovedResultSheetsCollection'
import ExamDptApprovedResultCollectionResult from '../components/examDepartment/ExamDptApprovedResultCollectionResult'

function ExamDepartmentPage() {

    const examDptNavigation = useSelector((store) => store.examDptNavigationSlice)

    return (
        <div className='w-screen'>
            <div className='grid grid-cols-5 gap-0'>
                <div className='col-span-1 h-screen'>
                    <SideNavBar userType='examDpt' />
                </div>
                <div className='col-span-4 flex flex-col'>
                    <TopVerticalBar />
                    <div className='mt-14'>
                        {
                            examDptNavigation.isClickedCollection ?
                                examDptNavigation.isClickedCollectionView ?
                                    examDptNavigation.isClickedResultSheetsCollectionView ?
                                        <ExamDptResultCollectionResult /> : <ExamDptResultSheetsCollection />
                                    : <ExamDptResultCollection />
                                : <></>
                        }
                        {
                            examDptNavigation.isClickedApprovedCollection ?
                                examDptNavigation.isClickedApprovedCollectionView ?
                                    examDptNavigation.isClickedApprovedResultSheetsCollectionView ?
                                        <ExamDptApprovedResultCollectionResult /> : <ExamDptApprovedResultSheetsCollection />
                                    : <ExamDptApprovedResultCollection />
                                : <></>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExamDepartmentPage
