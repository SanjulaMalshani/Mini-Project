import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isClickedCreateUser:true,
    isClickedUserList:false,
    isClickedUserListView:false,
    users: [],
    pendingAdminId:'',
}

const adminNavigationSlice = createSlice({
    name:'adminNavigation', 
    initialState,
    reducers:{
        adminClickCreateUser: (state,action)=>{
            state.isClickedCreateUser = action.payload
        },
        adminClickUserList: (state,action)=>{
            state.isClickedUserList = action.payload
        },
        adminClickUserListView:(state,action)=>{
            state.isClickedUserListView = action.payload
        },
        setPendingAdminId: (state, action) => {
            state.pendingAdminId = action.payload; 
        },
        setUsers: (state, action) => {
            state.users = action.payload; 
        },
    }
})

export const {
    adminClickCreateUser,
    adminClickUserList,
    adminClickUserListView,
    setPendingAdminId,
    setUsers,
} = adminNavigationSlice.actions

export default adminNavigationSlice.reducer