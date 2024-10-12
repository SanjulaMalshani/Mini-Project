import React from 'react'
import SideNavBar from '../components/SideNavBar'
import TopVerticalBar from '../components/TopVerticalBar'
import RegistarResultCollection from '../components/registar/RegistarResultCollection'
import RegistarResultSheetsCollection from '../components/registar/RegistarResultSheetsCollection'
import RegistarResultCollectionResult from '../components/registar/RegistarResultCollectionResult'
import { useSelector } from 'react-redux'
import RegistarApprovedResultCollectionResult from '../components/registar/RegistarApprovedResultCollectionResult'
import RegistarApprovedResultSheetsCollection from '../components/registar/RegistarApprovedResultSheetsCollection'
import RegistarApprovedResultCollection from '../components/registar/RegistarApprovedResultCollection'

function RegistarPage() {

  const registarNavigation = useSelector((store) => store.registarNavigationSlice)

  return (
    <div className='w-screen'>
            <div className='grid grid-cols-5 gap-0'>
                <div className='col-span-1 h-screen'>
                    <SideNavBar userType='registar' />
                </div>
                <div className='col-span-4 flex flex-col'>
                    <TopVerticalBar />
                    <div className='mt-14'>
                      {
                            registarNavigation.isClickedCollection ?
                                registarNavigation.isClickedCollectionView ?
                                    registarNavigation.isClickedResultSheetsCollectionView ?
                                        <RegistarResultCollectionResult /> : <RegistarResultSheetsCollection />
                                    : <RegistarResultCollection />
                                : <></>
                      }
                      {
                            registarNavigation.isClickedApprovedCollection ?
                                registarNavigation.isClickedApprovedCollectionView ?
                                    registarNavigation.isClickedApprovedResultSheetsCollectionView ?
                                        <RegistarApprovedResultCollectionResult/> : <RegistarApprovedResultSheetsCollection />
                                    : <RegistarApprovedResultCollection />
                                : <></>
                      }
                    </div>
                </div>
            </div>
        </div>
  )
}

export default RegistarPage
