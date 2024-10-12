import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isClickedCollection: true,
    isClickedCollectionView: false,
    isClickedResultSheetsCollectionView: false,
    isClickedApprovedCollection: false,
    isClickedApprovedCollectionView: false,
    isClickedApprovedResultSheetsCollectionView: false,
    studentCollectionResultsSheetsEx: [],
    studentCollectionItemResultsSheetsEx: [],
    pendingCollectionExSheetId:'',
    pendingExamSheetId:'',
}

const ExamDepartmentSlice = createSlice({
    name: 'examDepartment',
    initialState,
    reducers: {
        examDepartmentClickCollection: (state, action) => {
            state.isClickedCollection = action.payload
        },
        examDepartmentClickCollectionView: (state, action) => {
            state.isClickedCollectionView = action.payload
        },
        examDepartmentClickResultSheetsCollectionView: (state, action) => {
            state.isClickedResultSheetsCollectionView = action.payload
        },
        examDepartmentClickApprovedCollection: (state, action) => {
            state.isClickedApprovedCollection = action.payload
        },
        examDepartmentClickApprovedCollectionView: (state, action) => {
            state.isClickedApprovedCollectionView = action.payload
        },
        examDepartmentClickApprovedResultSheetsCollectionView: (state, action) => {
            state.isClickedApprovedResultSheetsCollectionView = action.payload
        },
        setPendingExamSheetId: (state, action) => {
            state.pendingExamSheetId = action.payload; 
        },
        
        setStudentCollectionResultsSheetsEx: (state, action) => {
            state.studentCollectionResultsSheetsEx = action.payload; 
        },
        setStudentCollectionItemResultsSheetsEx: (state, action) => {
            state.studentCollectionItemResultsSheetsEx = action.payload; 
        },
        setPendingCollectionExSheetId: (state, action) => {
            state.pendingCollectionExSheetId = action.payload; 
        },
    }
})

export const { 
    examDepartmentClickCollection, 
    examDepartmentClickCollectionView, 
    examDepartmentClickResultSheetsCollectionView,
    examDepartmentClickApprovedCollection,
    examDepartmentClickApprovedCollectionView,
    examDepartmentClickApprovedResultSheetsCollectionView,
    setStudentCollectionResultsSheetsEx,
    setStudentCollectionItemResultsSheetsEx,
    setPendingCollectionExSheetId,
    setPendingExamSheetId,
} = ExamDepartmentSlice.actions

export default ExamDepartmentSlice.reducer