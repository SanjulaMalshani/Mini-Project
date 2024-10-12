import React, { useEffect, useState } from 'react'
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { MdOutlinePendingActions } from "react-icons/md";
import { TbHistory } from "react-icons/tb";
import { BiSolidLogOut } from "react-icons/bi";
import { PiSquaresFourBold } from "react-icons/pi";
import { IoSend } from "react-icons/io5";
import { FaHourglassEnd } from "react-icons/fa6";
import { TiUserAdd } from "react-icons/ti";
import { useDispatch, useSelector } from 'react-redux';
import { clickAddResult, clickApprovalRequestResults, clickApprovalRequestView, clickDetailsProceed, clickedAprovalPendingResults, clickHistory, clickHistoryView, clickViewResult } from '../store/reducers/LectureNavigationSlice';
import { dptClickAllResult, dptClickApprovedResultView, dptClickHistory, dptClickViewResult } from '../store/reducers/DptSecretaryNavigationSlice';
import { hodClickAllResult, hodClickApprovedResultView, hodClickHistory, hodClickViewResult } from '../store/reducers/HODNavigationSlice';
import { deanClickAllReultSheets, deanClickApprovedCollection, deanClickApprovedCollectionView, deanClickApprovedResultSheetsCollectionView, deanClickApprovedResultView, deanClickCollection, deanClickCollectionView, deanClickHistory, deanClickResultSheetsCollectionView, deanClickViewResult } from '../store/reducers/DeanNavigationSlice';
import { examDepartmentClickApprovedCollection, examDepartmentClickApprovedCollectionView, examDepartmentClickApprovedResultSheetsCollectionView, examDepartmentClickCollection, examDepartmentClickCollectionView, examDepartmentClickResultSheetsCollectionView } from '../store/reducers/ExamDptNavigationSlice';
import { registarClickApprovedCollection, registarClickApprovedCollectionView, registarClickApprovedResultSheetsCollectionView, registarClickCollection, registarClickCollectionView, registarClickResultSheetsCollectionView } from '../store/reducers/RegistarNavigationSlice';
import { vcClickApprovedCollection, vcClickApprovedCollectionView, vcClickApprovedResultSheetsCollectionView, vcClickCollection, vcClickCollectionView, vcClickResultSheetsCollectionView } from '../store/reducers/VCNavigationSlice';
import { adminClickCreateUser, adminClickUserList, adminClickUserListView } from '../store/reducers/AdminNavigationSlice';
import { useNavigate } from 'react-router-dom';

function SideNavBar({ userType }) {

    const navigate = useNavigate();

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
        },
        {
            name: 'Collection History',
            icon: <FaHourglassEnd size={20} color='white' />
        }

    ]

    const examDepartmentNavLinks = [
        {
            name: 'Collection',
            icon: <PiSquaresFourBold size={20} color='white' />
        },
        {
            name: 'Collection History',
            icon: <FaHourglassEnd size={20} color='white' />
        }
    ]

    const registarNavLinks = [
        {
            name:'Collection',
            icon:<PiSquaresFourBold size={20} color='white' />
        },
        {
            name:'Collection History',
            icon:<FaHourglassEnd size={20} color='white' />
        }
    ]

    const vcNavLinks = [
        {
            name:'Collection',
            icon:<PiSquaresFourBold size={20} color='white' />
        },
        {
            name:'Collection History',
            icon:<FaHourglassEnd size={20} color='white' />
        }
    ]

    const adminNavLinks = [
        {
            name:'Create User',
            icon: <TiUserAdd size={20} color='white' />
        },
        {
            name: 'User List',
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
        }else if(userType === 'examDpt'){
            setSideNavLinks(examDepartmentNavLinks)
            setActiveLink('Collection')
        }else if(userType === 'registar'){
            setSideNavLinks(registarNavLinks)
            setActiveLink('Collection')
        }else if(userType === 'vc'){
            setSideNavLinks(vcNavLinks)
            setActiveLink('Collection')
        }else if(userType === 'admin'){
            setSideNavLinks(adminNavLinks)
            setActiveLink('Create User')
        }
    }

    const handleNavLinkClick = (name) => {
        setActiveLink(name)
        if (userType === 'lecture') {

            if (name === 'Add Results') {
                if (!lectureNavigation.isClickedAddResult) {
                    dispatch(clickAddResult(true))
                }
                if(lectureNavigation.isSetupDetails){
                    dispatch(clickDetailsProceed(false))
                }
                if (lectureNavigation.isClickedApprovalPendingResults) {
                    dispatch(clickedAprovalPendingResults(false))
                }
                if (lectureNavigation.isClickedApprovalRequestResults) {
                    dispatch(clickApprovalRequestResults(false))
                }
                if (lectureNavigation.isClickedHistory) {
                    dispatch(clickHistory(false))
                }
            }
            if (name === 'Approve Pending Results') {
                if (!lectureNavigation.isClickedApprovalPendingResults) {
                    dispatch(clickedAprovalPendingResults(true))
                }
                if(lectureNavigation.isclickedViewResult){
                    dispatch(clickViewResult(false))
                }
                if (lectureNavigation.isClickedAddResult) {
                    dispatch(clickAddResult(false))
                }
                if (lectureNavigation.isClickedApprovalRequestResults) {
                    dispatch(clickApprovalRequestResults(false))
                }
                if (lectureNavigation.isClickedHistory) {
                    dispatch(clickHistory(false))
                }

            }
            if (name === 'Approval Request Results') {
                if (!lectureNavigation.isClickedApprovalRequestResults) {
                    dispatch(clickApprovalRequestResults(true))
                }
                if(lectureNavigation.isClickedApprovalRequestView){
                    dispatch(clickApprovalRequestView(false))
                }
                if (lectureNavigation.isClickedAddResult) {
                    dispatch(clickAddResult(false))
                }
                if (lectureNavigation.isClickedApprovalPendingResults) {
                    dispatch(clickedAprovalPendingResults(false))
                }
                if (lectureNavigation.isClickedHistory) {
                    dispatch(clickHistory(false))
                }
            }
            if (name === 'History') {
                if (!lectureNavigation.isClickedHistory) {
                    dispatch(clickHistory(true))
                }
                if(lectureNavigation.isClickedHistoryView){
                    dispatch(clickHistoryView(false))
                }
                if (lectureNavigation.isClickedAddResult) {
                    dispatch(clickAddResult(false))
                }
                if (lectureNavigation.isClickedApprovalRequestResults) {
                    dispatch(clickApprovalRequestResults(false))
                }
                if (lectureNavigation.isClickedApprovalPendingResults) {
                    dispatch(clickedAprovalPendingResults(false))
                }
            }
        }

        if (userType === 'dptSecretary') {

            if (name === 'All Results') {
                if (!dptSecretaryNavigation.isClickedAllResults) {
                    dispatch(dptClickAllResult(true))
                }
                if(dptSecretaryNavigation.isClickedViewResult){
                    dispatch(dptClickViewResult(false))
                }
                if (dptSecretaryNavigation.isClickedHistory) {
                    dispatch(dptClickHistory(false))
                }
            }
            if (name === 'History') {
                if (!dptSecretaryNavigation.isClickedHistory) {
                    dispatch(dptClickHistory(true))
                }
                if(dptSecretaryNavigation.isClickedApprovedResultView){
                    dispatch(dptClickApprovedResultView(false))
                }
                if (dptSecretaryNavigation.isClickedAllResults) {
                    dispatch(dptClickAllResult(false))
                }
            }
        }

        if (userType === 'HOD') {
            if (name === 'All Result Sheets') {
                //console.log("All Result Sheets")
                if (!hodNavigation.isClickedAllResult) {
                    dispatch(hodClickAllResult(true))
                }
                if (hodNavigation.isClickedViewResult){
                    dispatch(hodClickViewResult(false))
                }
                if (hodNavigation.isClickedHistory) {
                    dispatch(hodClickHistory(false))
                }

            }

            if (name === 'History') {
                if (!hodNavigation.isClickedHistory) {
                    dispatch(hodClickHistory(true))
                }
                if(hodNavigation.isClickedApprovedResultView){
                    dispatch(hodClickApprovedResultView(false))
                }
                if (hodNavigation.isClickedAllResult) {
                    dispatch(hodClickAllResult(false))
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
                if (deanNavigation.isClickedCollection) {
                    dispatch(deanClickCollection(false))
                }
                if(deanNavigation.isClickedApprovedCollection){
                    dispatch(deanClickApprovedCollection(false))
                }
            }

            if (name === 'History') {
                if (!deanNavLinks.isClikedHistory) {
                    dispatch(deanClickHistory(true))
                }
                if (deanNavigation.isClickedApprovedResultView) {
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
                if(deanNavigation.isClickedApprovedCollection){
                    dispatch(deanClickApprovedCollection(false))
                }
            }

            if (name === 'Collection') {
                if (!deanNavigation.isClickedCollection) {
                    dispatch(deanClickCollection(true))
                }
                if (deanNavigation.isClickedCollectionView) {
                    dispatch(deanClickCollectionView(false))
                }
                if (deanNavigation.isClickedResultSheetsCollectionView) {
                    dispatch(deanClickResultSheetsCollectionView(false))
                }
                if (deanNavigation.isClickedAllReultSheets) {
                    dispatch(deanClickAllReultSheets(false))
                }
                if (deanNavigation.isClickedHistory) {
                    dispatch(deanClickHistory(false))
                }
                if(deanNavigation.isClickedApprovedCollection){
                    dispatch(deanClickApprovedCollection(false))
                }
            }

            if (name === 'Collection History') {
                if (!deanNavigation.isClickedApprovedCollection) {
                    dispatch(deanClickApprovedCollection(true))
                }
                if (deanNavigation.isClickedApprovedCollectionView) {
                     dispatch(deanClickApprovedCollectionView(false))
                }
                if (deanNavigation.isClickedApprovedResultSheetsCollectionView) {
                    dispatch(deanClickApprovedResultSheetsCollectionView(false))
                }
                if (deanNavigation.isClickedAllReultSheets) {
                    dispatch(deanClickAllReultSheets(false))
                }
                if (deanNavigation.isClickedHistory) {
                    dispatch(deanClickHistory(false))
                }
                if (deanNavigation.isClickedCollection) {
                    dispatch(deanClickCollection(false))
                }

            }
        }

        if(userType === 'examDpt'){
            if(name === 'Collection'){
                if(!examDptNavigation.isClickedCollection){
                    dispatch(examDepartmentClickCollection(true))
                }
                if(examDptNavigation.isClickedCollectionView){
                    dispatch(examDepartmentClickCollectionView(false))
                }
                if(examDptNavigation.isClickedResultSheetsCollectionView){
                    dispatch(examDepartmentClickResultSheetsCollectionView(false))
                }
                if(examDptNavigation.isClickedApprovedCollection){
                    dispatch(examDepartmentClickApprovedCollection(false))
                }
            }
            if(name === 'Collection History'){
                if(!examDptNavigation.isClickedApprovedCollection){
                    dispatch(examDepartmentClickApprovedCollection(true))
                }
                if(examDptNavigation.isClickedApprovedCollectionView){
                    dispatch(examDepartmentClickApprovedCollectionView(false))
                }
                if(examDptNavigation.isClickedApprovedResultSheetsCollectionView){
                    dispatch(examDepartmentClickApprovedResultSheetsCollectionView(false))
                }
                if(examDptNavigation.isClickedCollection){
                    dispatch(examDepartmentClickCollection(false))
                }
            }
        }

        if(userType === 'registar'){
            if(name === 'Collection'){
                if(!registarNavigation.isClickedCollection){
                    dispatch(registarClickCollection(true))
                }
                if(registarNavigation.isClickedCollectionView){
                    dispatch(registarClickCollectionView(false))
                }
                if(registarNavigation.isClickedResultSheetsCollectionView){
                    dispatch(registarClickResultSheetsCollectionView(false))
                }
                if(registarNavigation.isClickedApprovedCollection){
                    dispatch(registarClickApprovedCollection(false))
                }
            }
            if(name === 'Collection History'){
                if(!registarNavigation.isClickedApprovedCollection){
                    dispatch(registarClickApprovedCollection(true))
                }
                if(registarNavigation.isClickedApprovedCollectionView){
                    dispatch(registarClickApprovedCollectionView(false)) 
                }
                if(registarNavigation.isClickedApprovedResultSheetsCollectionView){
                    dispatch(registarClickApprovedResultSheetsCollectionView(false))
                }
                if(registarNavigation.isClickedCollection){
                    dispatch(registarClickCollection(false))
                }
            }
        }

        if(userType === 'vc'){
            if(name === 'Collection'){
                if(!vcNavigation.isClickedCollection){
                    dispatch(vcClickCollection(true))
                }
                if(vcNavigation.isClickedCollectionView){
                    dispatch(vcClickCollectionView(false))
                }
                if(vcNavigation.isClickedResultSheetsCollectionView){
                    dispatch(vcClickResultSheetsCollectionView(false))
                }
                if(vcNavigation.isClickedApprovedCollection){
                    dispatch(vcClickApprovedCollection(false))
                }
            }
            if(name === 'Collection History'){
                if(!vcNavigation.isClickedApprovedCollection){
                    dispatch(vcClickApprovedCollection(true))
                }
                if(vcNavigation.isClickedApprovedCollectionView){
                    dispatch(vcClickApprovedCollectionView(false)) 
                }
                if(vcNavigation.isClickedApprovedResultSheetsCollectionView){
                    dispatch(vcClickApprovedResultSheetsCollectionView(false))
                }
                if(vcNavigation.isClickedCollection){
                    dispatch(vcClickCollection(false))
                }
            }
        }

        if(userType === 'admin'){
            if(name==='Create User'){
                if(!adminNavigation.isClickedCreateUser){
                    dispatch(adminClickCreateUser(true))
                }
                if(adminNavigation.isClickedUserList){
                    dispatch(adminClickUserList(false))
                }
            }
            if(name === 'User List'){
                if(!adminNavigation.isClickedUserList){
                    dispatch(adminClickUserList(true))
                }
                if(adminNavigation.isClickedUserListView){
                    dispatch(adminClickUserListView(false))
                }
                if(adminNavigation.isClickedCreateUser){
                    dispatch(adminClickCreateUser(false))
                }
            }
        }

    }

    const lectureNavigation = useSelector((store) => store.lectureNavigationSlice)
    const dptSecretaryNavigation = useSelector((store) => store.dptSecretaryNavigationSlice)
    const hodNavigation = useSelector((store) => store.hodNavigationSlice)
    const deanNavigation = useSelector((store) => store.deanNavigationSlice)
    const examDptNavigation = useSelector((store) => store.examDptNavigationSlice)
    const registarNavigation = useSelector((store) => store.registarNavigationSlice)
    const vcNavigation = useSelector((store)=> store.vcNavigationSlice)
    const adminNavigation = useSelector((store)=>store.adminNavigationSlice)

    const dispatch = useDispatch()

    useEffect(() => {
        handleUserType(userType)
    }, [userType])

    const handleLogOut =()=>{
        navigate('/');
        localStorage.removeItem('userId');
        localStorage.removeItem('role');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('faculty');
    }

    return (
        <div>
            <div className='fixed w-1/5 min-w-[273px] flex flex-col h-screen max-h-screen bg-primary'>

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
                    <button className='mt-10 w-full h-12 flex items-center justify-start gap-3' onClick={handleLogOut}>
                        <BiSolidLogOut size={20} color='white' className='ml-8' />
                        <p className='text-white'>Logout</p>
                    </button>
                </div>

            </div>
        </div>
    )
}


export default SideNavBar