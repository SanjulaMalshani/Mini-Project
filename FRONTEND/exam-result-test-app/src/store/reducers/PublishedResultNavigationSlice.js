import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isClickedCollection:true,
    isClickedCollectionView: false,
    isClickedResultSheetsCollectionView: false,
    studentCollectionResultsSheetsSD: [],
    studentCollectionItemResultsSheetsSD: [],
    pendingCollectionSDSheetId:'',
    pendingSDSheetId:'',
}

const pulishedResultNavigationSlice = createSlice({
    name: 'publishedResultNavigation',
    initialState,
    reducers:{
        clickCollection:(state,action)=>{
             state.isClickedCollection = action.payload
        },
        clickCollectionView:(state,action)=>{
            state.isClickedCollectionView = action.payload
        },
        clickResultSheetsCollectionView:(state,action)=>{
            state.isClickedResultSheetsCollectionView = action.payload
        },
        setPendingSDSheetId: (state, action) => {
            state.pendingSDSheetId = action.payload; 
        },
        setStudentCollectionResultsSheetsSD: (state, action) => {
            state.studentCollectionResultsSheetsSD = action.payload; 
        },
        setStudentCollectionItemResultsSheetsSD: (state, action) => {
            state.studentCollectionItemResultsSheetsSD = action.payload; 
        },
        setPendingCollectionSDSheetId: (state, action) => {
            state.pendingCollectionSDSheetId = action.payload; 
        },
    }
}) 

export const {
        clickCollection,
        clickCollectionView,
        clickResultSheetsCollectionView,
        setStudentCollectionResultsSheetsSD,
        setStudentCollectionItemResultsSheetsSD,
        setPendingCollectionSDSheetId,
        setPendingSDSheetId,
    } = pulishedResultNavigationSlice.actions

export default pulishedResultNavigationSlice.reducer