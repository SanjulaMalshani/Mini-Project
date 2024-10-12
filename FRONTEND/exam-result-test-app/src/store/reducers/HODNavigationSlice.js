import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isClickedAllResult:true,
    isClickedHistory:false,
    isClickedViewResult:false,
    isClickedApprovedResultView:false,
    resultsSheets: [],
    pendingHodSheetId:'',
    studentHistoryResultsSheets: [],
}

const hodNavigationSlice = createSlice({
    name:"hodNavigations",
    initialState,
    reducers:{
        hodClickAllResult:(state,action)=>{
            state.isClickedAllResult = action.payload
        },
        hodClickHistory:(state,action)=>{
            state.isClickedHistory = action.payload
        },
        hodClickViewResult:(state,action)=>{
            state.isClickedViewResult = action.payload
        },
        setResultsSheets: (state, action) => {
            state.resultsSheets = action.payload; 
        },
        setPendingHodSheetId: (state, action) => {
            state.pendingHodSheetId = action.payload; 
        },
        hodClickApprovedResultView:(state,action)=>{
            state.isClickedApprovedResultView = action.payload
        },
        setStudentHistoryResultsSheets: (state,action) =>{
            state.studentHistoryResultsSheets = action.payload;
        }
    }
})


export const {hodClickAllResult, hodClickHistory,hodClickApprovedResultView, hodClickViewResult,setPendingHodSheetId,setResultsSheets,setStudentHistoryResultsSheets} = hodNavigationSlice.actions

export default hodNavigationSlice.reducer