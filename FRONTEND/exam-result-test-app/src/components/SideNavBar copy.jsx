import React, { useEffect, useState } from 'react'
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { MdOutlinePendingActions } from "react-icons/md";
import { TbHistory } from "react-icons/tb";
import { BiSolidLogOut } from "react-icons/bi";
import { PiSquaresFourBold } from "react-icons/pi";
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { clickAddResult, clickApprovalRequestResults, clickApprovalRequestView, clickDetailsProceed, clickedAprovalPendingResults, clickHistory, clickHistoryView, clickViewResult } from '../store/reducers/LectureNavigationSlice';
import { dptClickAllResult, dptClickApprovedResultView, dptClickHistory, dptClickViewResult } from '../store/reducers/DptSecretaryNavigationSlice';
import { hodClickAllResult, hodClickApprovedResultView, hodClickHistory, hodClickViewResult } from '../store/reducers/HODNavigationSlice';
import { deanClickAllReultSheets, deanClickApprovedResultView, deanClickCollection, deanClickCollectionView, deanClickHistory, deanClickResultSheetsCollectionView, deanClickViewResult } from '../store/reducers/DeanNavigationSlice';

function SideNavBar({ userType }) {

    const lectureNavLinks = [
        {
            name: 'Add Results',
            icon: <MdOutlineSpaceDashboard size={20} color='white' />
        },
        {
            name: 'Approve Pending Results',
            icon: <MdOutlinePendingActions size={20} color='white' />
        },
        {
            name: 'Approval Request Results',
            icon: <IoSend size={20} color='white' />
        },
        {
            name: 'History',
            icon: <TbHistory size={20} color='white' />
        }
    ]

    const dptSecretaryNavLinks = [
        {
            name: 'All Results',
            icon: <MdOutlineSpaceDashboard size={20} color='white' />
        },
        {
            name: 'History',
            icon: <TbHistory size={20} color='white' />
        }
    ]

    const hodNavLinks = [
        {
            name: 'All Result Sheets',
            icon: <MdOutlineSpaceDashboard size={20} color='white' />
        },
        {
            name: 'History',
            icon: <TbHistory size={20} color='white' />
        }

    ]

    const deanNavLinks = [
        {
            name: 'All Result Sheets',
            icon: <MdOutlineSpaceDashboard size={20} color='white' />
        },
        {
            name: 'History',
            icon: <TbHistory size={20} color='white' />
        },
        {
            name: 'Collection',
            icon: <PiSquaresFourBold size={20} color='white' />
        }

    ]

    const [sideNavLinks, setSideNavLinks] = useState([])
    const [activeLink, setActiveLink] = useState('')

    const handleUserType = (userType) => {
        if (userType === 'lecture') {
            setSideNavLinks(lectureNavLinks)
            setActiveLink('Add Results')
        } else if (userType === 'dptSecretary') {
            setSideNavLinks(dptSecretaryNavLinks)
            setActiveLink('All Results')
        } else if (userType === 'HOD') {
            setSideNavLinks(hodNavLinks)
            setActiveLink('All Result Sheets')
        } else if (userType === 'dean') {
            setSideNavLinks(deanNavLinks)
            setActiveLink('All Result Sheets')
        }
    }

    const handleNavLinkClick = (name) => {
        setActiveLink(name)
        if(userType === 'lecture'){

            if (name === 'Add Results') {
                if (!lectureNavigation.isClickedAddResult) {
                    dispatch(clickAddResult(true))
                    dispatch(clickDetailsProceed(false))
                }
                if (lectureNavigation.isClickedApprovalPendingResults) {
                    dispatch(clickedAprovalPendingResults(false))
                    dispatch(clickViewResult(false))
                }
                if(lectureNavigation.isClickedApprovalRequestResults){
                    dispatch(clickApprovalRequestResults(false))
                    dispatch(clickApprovalRequestView(false))
                }
                if (lectureNavigation.isClickedHistory) {
                    dispatch(clickHistory(false))
                    dispatch(clickHistoryView(false))
                }
            } 
            if (name === 'Approve Pending Results') {
                if (!lectureNavigation.isClickedApprovalPendingResults) {
                    dispatch(clickedAprovalPendingResults(true))
                    dispatch(clickViewResult(false))
                }
                if (lectureNavigation.isClickedAddResult) {
                    dispatch(clickAddResult(false))
                    dispatch(clickDetailsProceed(false))
                }
                if(lectureNavigation.isClickedApprovalRequestResults){
                    dispatch(clickApprovalRequestResults(false))
                    dispatch(clickApprovalRequestView(false))
                }
                if (lectureNavigation.isClickedHistory) {
                    dispatch(clickHistory(false))
                    dispatch(clickHistoryView(false))
                }
    
            }
            if(name === 'Approval Request Results'){
                if(!lectureNavigation.isClickedApprovalRequestResults){
                    dispatch(clickApprovalRequestResults(true))
                    dispatch(clickApprovalRequestView(false))
                }
                if (lectureNavigation.isClickedAddResult) {
                    dispatch(clickAddResult(false))
                    dispatch(clickDetailsProceed(false))
                }
                if (lectureNavigation.isClickedApprovalPendingResults) {
                    dispatch(clickedAprovalPendingResults(false))
                    dispatch(clickViewResult(false))
                }
                if (lectureNavigation.isClickedHistory) {
                    dispatch(clickHistory(false))
                    dispatch(clickHistoryView(false))
                }
            }
            if(name==='History'){
                if (!lectureNavigation.isClickedHistory) {
                    dispatch(clickHistory(true))
                    dispatch(clickHistoryView(false))
                }
                if (lectureNavigation.isClickedAddResult) {
                    dispatch(clickAddResult(false))
                    dispatch(clickDetailsProceed(false))
                }
                if(lectureNavigation.isClickedApprovalRequestResults){
                    dispatch(clickApprovalRequestResults(false))
                    dispatch(clickApprovalRequestView(false))
                }
                if (lectureNavigation.isClickedApprovalPendingResults) {
                    dispatch(clickedAprovalPendingResults(false))
                    dispatch(clickViewResult(false))
                }
            }
        }

        if (userType === 'dptSecretary') {

            if (name === 'All Results') {
                if (!dptSecretaryNavigation.isClickedAllResults) {
                    dispatch(dptClickAllResult(true))
                    dispatch(dptClickViewResult(false))
                }
                if(dptSecretaryNavigation.isClickedHistory){
                    dispatch(dptClickHistory(false))
                    dispatch(dptClickApprovedResultView(false))
                }
            }
            if(name === 'History'){
                if(!dptSecretaryNavigation.isClickedHistory){
                    dispatch(dptClickHistory(true))
                    dispatch(dptClickApprovedResultView(false))
                }
                if (dptSecretaryNavigation.isClickedAllResults) {
                    dispatch(dptClickAllResult(false))
                    dispatch(dptClickViewResult(false))
                }
            }
        }

        if (userType === 'HOD') {
            if (name === 'All Result Sheets') {
                //console.log("All Result Sheets")
                if (!hodNavigation.isClickedAllResult) {
                    dispatch(hodClickAllResult(true))
                    dispatch(hodClickViewResult(false))
                }
                if (hodNavigation.isClickedHistory) {
                    dispatch(hodClickHistory(false))
                    dispatch(hodClickApprovedResultView(false))
                }
                
            }

            if (name === 'History') {
                if (!hodNavigation.isClickedHistory) {
                    dispatch(hodClickHistory(true))
                    dispatch(hodClickApprovedResultView(false))
                }
                if (hodNavigation.isClickedAllResult) {
                    dispatch(hodClickAllResult(false))
                    dispatch(hodClickViewResult(false))
                }
            }
        }

        if (userType === 'dean') {
            if (name === 'All Result Sheets') {
                if (!deanNavigation.isClickedAllReultSheets) {
                    dispatch(deanClickAllReultSheets(true))
                }
                if (deanNavigation.isClickedViewResult) {
                    dispatch(deanClickViewResult(false))
                }
                if (deanNavigation.isClickedHistory) {
                    dispatch(deanClickHistory(false))
                }
                if (deanNavigation.isClickedCollection){
                    dispatch(deanClickCollection(false))
                }
            }

            if (name === 'History') {
                if (!deanNavLinks.isClikedHistory) {
                    dispatch(deanClickHistory(true))
                }
                if(deanNavigation.isClickedApprovedResultView){
                    dispatch(deanClickApprovedResultView(false))
                }
                if (deanNavigation.isClickedAllReultSheets) {
                    dispatch(deanClickAllReultSheets(false))
                }
                if (deanNavigation.isClickedViewResult) {
                    dispatch(deanClickViewResult(false))
                }
                if (deanNavigation.isClickedCollection) {
                    dispatch(deanClickCollection(false))
                }
            }

            if (name === 'Collection') {
                if (!deanNavigation.isClickedCollection) {
                    dispatch(deanClickCollection(true))
                }
                if(deanNavigation.isClickedCollectionView){
                    dispatch(deanClickCollectionView(false))
                }
                if(deanNavigation.isClickedResultSheetsCollectionView){
                    dispatch(deanClickResultSheetsCollectionView(false))
                }
                if (deanNavigation.isClickedAllReultSheets) {
                    dispatch(deanClickAllReultSheets(false))
                }
                if (deanNavigation.isClickedHistory) {
                    dispatch(deanClickHistory(false))
                }
            }
        }

    }



    const lectureNavigation = useSelector((store) => store.lectureNavigationSlice)
    const dptSecretaryNavigation = useSelector((store) => store.dptSecretaryNavigationSlice)
    const hodNavigation = useSelector((store) => store.hodNavigationSlice)
    const deanNavigation = useSelector((store) => store.deanNavigationSlice)

    const dispatch = useDispatch()

    useEffect(() => {
        handleUserType(userType)
    }, [userType])

    return (
        <div>
            <div className='fixed w-1/5 flex flex-col h-screen max-h-screen bg-primary'>

                <div className='flex items-center justify-center h-32 w-full'>
                    <h1 className='text-white text-2xl font-bold'>Logo</h1>
                </div>

                <div className='mt-10 basis-7/12 flex flex-col items-center'>

                    {sideNavLinks.map((link, index) =>
                    (<div className={`mx-0 my-1 flex items-center w-11/12 h-12 ${activeLink === link.name ? "bg-secondary" : ""} 
                        rounded-md cursor-pointer hover:bg-secondary`}
                        onClick={() => handleNavLinkClick(link.name)} key={index}
                    >
                        <div className='ml-5'>
                            {link.icon}
                        </div>
                        <p className='ml-2 text-white'>{link.name}</p>
                    </div>))}

                </div>

                <div className='mt-5 flex justify-center'>
                    <button className='mt-10 w-full h-12 flex items-center justify-start gap-3'>
                        <BiSolidLogOut size={20} color='white' className='ml-8' />
                        <p className='text-white'>Logout</p>
                    </button>
                </div>

            </div>
        </div>
    )
}


export default SideNavBar
