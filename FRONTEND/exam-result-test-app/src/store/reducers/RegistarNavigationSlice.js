import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isClickedCollection: true,
    isClickedCollectionView: false,
    isClickedResultSheetsCollectionView: false,
    isClickedApprovedCollection: false,
    isClickedApprovedCollectionView: false,
    isClickedApprovedResultSheetsCollectionView: false,
    studentCollectionResultsSheetsRT: [],
    studentCollectionItemResultsSheetsRT: [],
    pendingCollectionRTSheetId:'',
    pendingRTSheetId:'',
}

const RegistarNavigationSlice = createSlice({
    name: 'registarNavigation',
    initialState,
    reducers: {
        registarClickCollection: (state, action) => {
            state.isClickedCollection = action.payload
        },
        registarClickCollectionView: (state, action) => {
            state.isClickedCollectionView = action.payload
        },
        registarClickResultSheetsCollectionView: (state, action) => {
            state.isClickedResultSheetsCollectionView = action.payload
        },
        registarClickApprovedCollection: (state, action) => {
            state.isClickedApprovedCollection = action.payload
        },
        registarClickApprovedCollectionView: (state, action) => {
            state.isClickedApprovedCollectionView = action.payload
        },
        registarClickApprovedResultSheetsCollectionView: (state, action) => {
            state.isClickedApprovedResultSheetsCollectionView = action.payload
        },
        setPendingRTSheetId: (state, action) => {
            state.pendingRTSheetId = action.payload; 
        },
        setStudentCollectionResultsSheetsRT: (state, action) => {
            state.studentCollectionResultsSheetsRT = action.payload; 
        },
        setStudentCollectionItemResultsSheetsRT: (state, action) => {
            state.studentCollectionItemResultsSheetsRT = action.payload; 
        },
        setPendingCollectionRTSheetId: (state, action) => {
            state.pendingCollectionRTSheetId = action.payload; 
        },
    }
})

export const {
    registarClickCollection,
    registarClickCollectionView,
    registarClickResultSheetsCollectionView,
    registarClickApprovedCollection,
    registarClickApprovedCollectionView,
    registarClickApprovedResultSheetsCollectionView,
    setStudentCollectionResultsSheetsRT,
    setStudentCollectionItemResultsSheetsRT,
    setPendingCollectionRTSheetId,
    setPendingRTSheetId,

} = RegistarNavigationSlice.actions

export default RegistarNavigationSlice.reducer