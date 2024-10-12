import React from 'react'
import PublishedResultCollection from '../components/student/PublishedResultCollection'
import TopVerticalBar from '../components/TopVerticalBar'
import PublishedResultSheetsCollection from '../components/student/PublishedResultSheetsCollection'
import PublishedResultCollectionResult from '../components/student/PublishedResultCollectionResult'
import { useSelector } from 'react-redux'

function PublishedResultPage() {

  const publishedResultNavigation = useSelector((store) => store.publishedResultNavigationSlice)
  return (
    <div className='flex flex-col'>
            <TopVerticalBar  userType="student"/>
        <div className='mt-14'>
            {
                publishedResultNavigation.isClickedCollection ?
                    publishedResultNavigation.isClickedCollectionView ?
                        publishedResultNavigation.isClickedResultSheetsCollectionView ?
                            <PublishedResultCollectionResult /> : <PublishedResultSheetsCollection />
                        : <PublishedResultCollection />
                    : <></>
            }
        </div>
    </div>
  )
}

export default PublishedResultPage
