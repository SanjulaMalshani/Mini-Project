import React from 'react'
import SideNavBar from '../components/SideNavBar'
import TopVerticalBar from '../components/TopVerticalBar'
import VCResultCollection from '../components/vc/VCResultCollection'
import VCResultCollectionResult from '../components/vc/VCResultCollectionResult'
import VCResultSheetsCollection from '../components/vc/VCResultSheetsCollection'
import { useSelector } from 'react-redux'
import store from '../store/Store'
import VCApprovedResultCollection from '../components/vc/VCApprovedResultCollection'
import VCApprovedResultSheetsCollection from '../components/vc/VCApprovedResultSheetsCollection'
import VCApprovedResultCollectionResult from '../components/vc/VCApprovedResultCollectionResult'

function VCPage() {

    const vcNavigation = useSelector((store) => store.vcNavigationSlice)
    return (
        <div className='w-screen'>
            <div className='grid grid-cols-5 gap-0'>
                <div className='col-span-1 h-screen'>
                    <SideNavBar userType='vc' />
                </div>
                <div className='col-span-4 flex flex-col'>
                    <TopVerticalBar />
                    <div className='mt-14'>
                        {
                            vcNavigation.isClickedCollection ?
                                vcNavigation.isClickedCollectionView ?
                                    vcNavigation.isClickedResultSheetsCollectionView ?
                                        <VCResultCollectionResult /> : <VCResultSheetsCollection />
                                    : <VCResultCollection />
                                : <></>
                        }
                        {
                            vcNavigation.isClickedApprovedCollection ?
                                vcNavigation.isClickedApprovedCollectionView ?
                                    vcNavigation.isClickedApprovedResultSheetsCollectionView ?
                                        <VCApprovedResultCollectionResult /> : <VCApprovedResultSheetsCollection />
                                    : <VCApprovedResultCollection />
                                : <></>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VCPage
