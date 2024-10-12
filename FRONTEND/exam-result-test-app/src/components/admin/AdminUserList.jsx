import React, { useEffect, useState } from 'react';
import axios from 'axios';  // Import axios
import UserList from '../UserList';
import { useDispatch } from 'react-redux';
import { host } from '../../utils/hostingPort';
import { setUsers } from '../../store/reducers/AdminNavigationSlice';

function AdminUserList() {
    const [users, setUser] = useState([]); 
    const [searchId, setSearchId] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const dispatch = useDispatch();

    const handleSearchChange = (e) => {
        const searchValue = e.target.value; 
        setSearchId(searchValue);

        // Filter users based on search input
        const newFilteredUsers = users.filter((user) =>
            user.id && user.id.toLowerCase().includes(searchValue.toLowerCase()) 
        );

        setFilteredUsers(newFilteredUsers); 
    };
    
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${host}/api/results/admin`);
                dispatch(setUsers(response.data));
                
                const fetchedUsers = response.data.map(user => ({
                    userId: user.id,
                    id: user.employeeId,
                    name: user.fullName || 'Unknown',
                    role: user.role || 'N/A' 
                }));

                setUser(fetchedUsers);
                setFilteredUsers(fetchedUsers);  // Set the initial state for filtered users
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []); 

    return (
        <div className='mt-5 w-full'>
            <div className='flex w-full flex-col items-center'>
                <div className='mt-3 w-5/6 flex items-center justify-between'>
                    <h3 className='text-2xl text-primary-txt font-semibold'>User List</h3>
                    <div className='mt-4 mb-6'>
                        <input
                            type='text'
                            value={searchId}
                            onChange={handleSearchChange}
                            placeholder='Search by User ID'
                            className='p-2 border border-gray-400 rounded-md w-full'
                        />
                    </div>
                </div>
                <UserList users={filteredUsers} />
            </div>
        </div>
    );
}

export default AdminUserList;
