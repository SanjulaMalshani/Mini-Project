import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function AdminUserListUser() {
    const [userDetails, setUserDetails] = useState(null);

    const userId = useSelector((store) => store.adminNavigationSlice?.pendingAdminId);
    const users = useSelector((store) => store.adminNavigationSlice?.users || []);

    console.log(users)

    useEffect(() => {
        // Find the user with the matching userId
        const user = users.find((u) => u.id === userId); // Adjust property name if different
        if (user) {
            setUserDetails(user);
        }
    }, [userId, users]);

    if (!userDetails) {
        return <p className='text-xl'><br/>User not found.</p>; 
    }

    const { fullName, role, email, faculty, department, employeeId } = userDetails;

    return (
        <div className='mt-10 w-full'>
            <div className='flex w-full flex-col items-center'>
                <div className='mt-3 w-11/12 flex items-center justify-between'>
                    <h3 className='text-2xl text-primary-txt'>User Details</h3>
                </div>
                <div className='mt-8 py-4 px-7 w-11/12 flex flex-col items-start gap-0 bg-tertiary-bg'>
                    <p className='py-2 text-xl'>Full Name: {fullName}</p>
                    <p className='py-2 text-xl'>User Role: {role}</p>
                    <p className='py-2 text-xl'>Email: {email}</p>
                    {role === 'LECTURE' || role === 'SECRETARY' || role === 'HOD' || role === 'DEAN'  ? (
                        <p className='py-2 text-xl'>Faculty: {faculty}</p>
                    ) : null}
                    {role === 'LECTURE' || role === 'SECRETARY' || role === 'HOD' ? (
                        <p className='py-2 text-xl'>Department: {department}</p>
                    ) : null}
                    {role === 'EXAMINATIONBRANCH' || role === 'REGISTRAR' || role === 'VC' ? (
                        <p className='py-2 text-xl'>Employee ID: {employeeId}</p>
                    ) : null}
                </div>
            </div>
        </div>
    );
}

export default AdminUserListUser;
