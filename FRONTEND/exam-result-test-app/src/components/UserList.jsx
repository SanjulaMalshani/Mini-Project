import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { adminClickUserListView,setPendingAdminId,setUsers } from '../store/reducers/AdminNavigationSlice'

function UserList({users}) {
    const [userList, setUserList] = useState([])

    const dispatch = useDispatch()

    const handleViewUser = (id) => {
       
        dispatch(setPendingAdminId(id))
        dispatch(adminClickUserListView(true))

    }
    useEffect(()=>{
       setUserList(users)
    },[users])
    return (
        <div className='w-10/12'>
            <div className='mt-8 w-full'>
                <div className='pb-2 w-full grid grid-cols-12 gap-1 border-black border-b-[1px]'>
                    <div className='h-10 col-span-3 flex items-center justify-center'>
                        <p className='text-lg text-black'>ID</p>
                    </div>
                    <div className='h-10 col-span-4 flex items-center justify-center'>
                        <p className='ml-5 text-lg text-primary-txt'>User Name</p>
                    </div>
                    <div className='h-10 col-span-3 flex items-center justify-center'>
                        <p className='ml-3 text-lg text-black'>User Role</p>
                    </div>
                    <div className='h-10 col-span-2 flex items-center justify-center'>
                        <p className='text-lg text-black'>Action</p>
                    </div>
                </div>
            </div>
            <div className='mb-10 max-h-80 overflow-y-auto scrollbar-hide'>
                {userList.map((user, index) => (
                    <div key={index} className='py-2 w-full grid grid-cols-12 gap-1 gradient-border-bottom border-b-[1px]'>
                        <div className='h-10 col-span-3 flex items-center justify-center'>
                            <p className='text-lg text-black'>{user.id}</p>
                        </div>
                        <div className='h-10 col-span-4 flex items-center justify-center'>
                            <p className='text-lg text-primary-txt'>{user.name}</p>
                        </div>
                        <div className='h-10 col-span-3 flex items-center justify-center'>
                            <p className='text-lg text-black'>{user.role}</p>
                        </div>
                       
                        <div className='h-10 col-span-2 flex items-center justify-center gap-3'>
                            <button
                                onClick={() => handleViewUser(user.userId)}
                                className='py-1 px-4 flex itmes-center justify-center bg-view-btn-bg text-black text-[14px] rounded-3xl'
                            >
                                View
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UserList
