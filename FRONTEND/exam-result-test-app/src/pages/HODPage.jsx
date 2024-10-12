import React from 'react'
import SideNavBar from '../components/SideNavBar'
import TopVerticalBar from '../components/TopVerticalBar'
import { useSelector } from 'react-redux'
import HODAllResultList from '../components/HOD/HODAllResultList'
import HODResult from '../components/HOD/HODResult'
import HODApprovedResultList from '../components/HOD/HODApprovedList'
import HODApprovedResult from '../components/HOD/HODApprovedResult'

function HODPage() {

    const hodNavigation = useSelector((store) => store.hodNavigationSlice)

    return (
        <div className='w-screen'>
            <div className='grid grid-cols-5 gap-0'>
                <div className='col-span-1 h-screen'>
                    <SideNavBar userType='HOD' />
                </div>
                <div className='col-span-4 flex flex-col'>
                    <TopVerticalBar />
                    <div className='mt-14'>
                        {
                            hodNavigation.isClickedAllResult ?
                                hodNavigation.isClickedViewResult ?
                                    <HODResult /> : <HODAllResultList />
                                : <></>
                        }
                        {
                            hodNavigation.isClickedHistory ?
                                hodNavigation.isClickedApprovedResultView ?
                                    <HODApprovedResult /> : <HODApprovedResultList />
                                : <></>

                        }
                    </div>
                </div>
            </div>
        </div>
    )

}

export default HODPage
