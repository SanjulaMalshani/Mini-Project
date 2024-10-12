import React from 'react'
import SideNavBar from '../components/SideNavBar'
import TopVerticalBar from '../components/TopVerticalBar'
import DetailsForm from '../components/lecture/DetailsForm'
import ResultForm from '../components/lecture/ResultForm'

import ApprovePendingResultList from '../components/lecture/ApprovePendingResultList'
import ApprovePendingResult from '../components/lecture/ApprovePendingResult'
import { useSelector } from 'react-redux'
import ApprovedResultList from '../components/lecture/ApprovedResultList'
import ApprovelRequestResultList from '../components/lecture/ApprovelRequestResultList'
import ApprovelRequestResult from '../components/lecture/ApprovelRequestResult'
import ApprovedResult from '../components/lecture/ApprovedResult'



function LecturePage() {

  const lectureNavigation = useSelector((store) => store.lectureNavigationSlice)


  return (
    <div className='w-screen'>
      <div className='grid grid-cols-5 gap-0'>
        <div className='col-span-1 h-screen'>
          <SideNavBar userType="lecture" />
        </div>
        <div className='col-span-4 flex flex-col'>
          <TopVerticalBar />
          <div className='mt-14'>
            {
              lectureNavigation.isClickedAddResult ?
                lectureNavigation.isSetupDetails ?
                  <ResultForm />
                  : <DetailsForm  />
                : <></>
            }
            {
              lectureNavigation.isClickedApprovalPendingResults ?
                lectureNavigation.isclickedViewResult ?
                  <ApprovePendingResult />
                  : <ApprovePendingResultList />
                : <></>
            }
            {
              lectureNavigation.isClickedApprovalRequestResults ?
                lectureNavigation.isClickedApprovalRequestView ?
                  <ApprovelRequestResult /> : <ApprovelRequestResultList />
                : <></>
            }
            {
              lectureNavigation.isClickedHistory ?
                lectureNavigation.isClickedHistoryView ?
                  <ApprovedResult /> : <ApprovedResultList />
                : <></>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default LecturePage
