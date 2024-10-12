import React from 'react'
import SideNavBar from '../components/SideNavBar'
import TopVerticalBar from '../components/TopVerticalBar'
import AddUser from '../components/admin/AddUser'
import AdminUserList from '../components/admin/AdminUserList'
import AdminUserListUser from '../components/admin/AdminUserListUser'
import { useSelector } from 'react-redux'

function AdminPage() {

    const adminNavigation = useSelector((store) => store.adminNavigationSlice)

    return (
        <div className='w-screen'>
            <div className='grid grid-cols-5 gap-0'>
                <div className='col-span-1 h-screen'>
                    <SideNavBar userType='admin' />
                </div>
                <div className='col-span-4 flex flex-col'>
                    <TopVerticalBar />
                    <div className='mt-14'>
                        {
                            adminNavigation.isClickedCreateUser ?
                                <AddUser /> : <></>
                        }
                        {
                            adminNavigation.isClickedUserList ?
                                adminNavigation.isClickedUserListView ?
                                    <AdminUserListUser /> : <AdminUserList />
                                : <></>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminPage
