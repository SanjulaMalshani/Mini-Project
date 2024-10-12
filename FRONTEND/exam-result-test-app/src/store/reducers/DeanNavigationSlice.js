import { createSlice } from "@reduxjs/toolkit"

const intialState = {
    isClickedAllReultSheets:true,
    isClickedViewResult:false,
    isClickedHistory:false,
    isClickedApprovedResultView:false,
    isClickedCollection:false,
    isClickedCollectionView:false,
    isClickedResultSheetsCollectionView:false,
    isClickedApprovedCollection:false,
    isClickedApprovedCollectionView:false,
    isClickedApprovedResultSheetsCollectionView:false,
    resultsSheets: [],
    pendingDeanSheetId:'',
    studentHistoryResultsSheets: [],
    studentCollectionResultsSheets: [],
    studentCollectionItemResultsSheets: [],
    pendingCollectionDeanSheetId:'',
}

const DeanNavigationSlice = createSlice({
    name:'DeanNavigation',
    initialState:intialState,
    reducers:{
        deanClickAllReultSheets:(state, action)=>{
            state.isClickedAllReultSheets = action.payload
        },
        deanClickViewResult:(state, action)=>{
            state.isClickedViewResult = action.payload
        },
        deanClickHistory: (state,action)=>{
            state.isClickedHistory = action.payload
        },
        deanClickApprovedResultView:(state,action)=>{
            state.isClickedApprovedResultView = action.payload
        },
        deanClickCollection: (state,action)=>{
            state.isClickedCollection = action.payload
        },
        deanClickCollectionView:(state,action)=>{
            state.isClickedCollectionView = action.payload
        },
        deanClickResultSheetsCollectionView:(state,action)=>{
            state.isClickedResultSheetsCollectionView = action.payload
        },
        deanClickApprovedCollection:(state,action)=>{
            state.isClickedApprovedCollection = action.payload
        },
        deanClickApprovedCollectionView:(state,action)=>{
            state.isClickedApprovedCollectionView = action.payload
        },
        deanClickApprovedResultSheetsCollectionView:(state,action)=>{
            state.isClickedApprovedResultSheetsCollectionView = action.payload
        },
        setStudentHistoryResultsSheets: (state,action) =>{
            state.studentHistoryResultsSheets = action.payload;
        },
        setResultsSheets: (state, action) => {
            state.resultsSheets = action.payload; 
        },
        setPendingDeanSheetId: (state, action) => {
            state.pendingDeanSheetId = action.payload; 
        },
        setStudentCollectionResultsSheets: (state, action) => {
            state.studentCollectionResultsSheets = action.payload; 
        },
        setStudentCollectionItemResultsSheets: (state, action) => {
            state.studentCollectionItemResultsSheets = action.payload; 
        },
        setPendingCollectionDeanSheetId: (state, action) => {
            state.pendingCollectionDeanSheetId = action.payload; 
        },
    }
})

export const {
    deanClickAllReultSheets, 
    deanClickViewResult, 
    deanClickHistory, 
    deanClickApprovedResultView,
    deanClickCollection,
    deanClickCollectionView,
    deanClickResultSheetsCollectionView,
    deanClickApprovedCollection,
    deanClickApprovedCollectionView,
    deanClickApprovedResultSheetsCollectionView,
    setPendingDeanSheetId,
    setResultsSheets,
    setStudentHistoryResultsSheets,
    setStudentCollectionResultsSheets,
    setStudentCollectionItemResultsSheets,
    setPendingCollectionDeanSheetId
} = DeanNavigationSlice.actions

export default DeanNavigationSlice.reducer