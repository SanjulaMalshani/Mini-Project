import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    number: 0,
    isSetupDetails: false,
    isClickedAddResult: true,
    isClickedApprovalPendingResults: false,
    isclickedViewResult: false,
    isClickedHistory: false,
    isClickedApprovalRequestResults:false,
    facultyName: '', 
    departmentName: '',
    degreeName: '',
    batchName: '',
    semesterName: '',
    subjectName: '',
    subjectCode: '',
    selectedDate:'',
    subjectCredit:'',
    pendingSheetId:'',
    resultsSheets: [],  
    studentResultsSheets: [],
    studentPendingResultsSheets: [],
    studentHistoryResultsSheets: [],
    isClickedApprovalRequestView:false,
    isClickedHistory:false,
    isClickedHistoryView:false
};

const lectureNavigationSlice = createSlice({
    name: "lectureNavaigations",
    initialState,
    reducers: {
        clickAddResult:(state,action)=>{
            state.isClickedAddResult = action.payload
          },
          clickDetailsProceed:(state, action)=>{
              state.isSetupDetails = action.payload
          },
          clickedAprovalPendingResults:(state,action)=>{
              state.isClickedApprovalPendingResults = action.payload
          },
          clickViewResult:(state,action)=>{
              state.isclickedViewResult = action.payload
          },
          clickHistory: (state,action)=>{
              state.isClickedHistory = action.payload
          } ,
          clickApprovalRequestResults:(state,action)=>{
            state.isClickedApprovalRequestResults = action.payload
        },
        clickApprovalRequestView:(state,action)=>{
            state.isClickedApprovalRequestView = action.payload
        },
        clickHistory: (state,action)=>{
            state.isClickedHistory = action.payload
        },
        clickHistoryView:(state,action)=>{
            state.isClickedHistoryView = action.payload
        },

        setDetails: (state, action) => {
            // Update state with the details passed in
            const { facultyName, departmentName, degreeName,  batchName, semesterName, subjectName, subjectCode,selectedDate,subjectCredit } = action.payload;
            state.facultyName = facultyName;
            state.departmentName = departmentName;
            state.degreeName = degreeName;
            state.batchName = batchName;
            state.semesterName = semesterName;
            state.subjectName = subjectName;
            state.subjectCode = subjectCode;
            state.selectedDate = selectedDate;
            state.subjectCredit = subjectCredit;
        },
        setResultsSheets: (state, action) => {
            state.resultsSheets = action.payload; 
        },
        setPendingSheetId: (state, action) => {
            state.pendingSheetId = action.payload; 
        },
        setStudentResultsSheets: (state,action) =>{
            state.studentResultsSheets = action.payload;
        },
        setStudentPendingResultsSheets: (state,action) =>{
            state.studentPendingResultsSheets = action.payload;
        },
        setStudentHistoryResultsSheets: (state,action) =>{
            state.studentHistoryResultsSheets = action.payload;
        }
    },
});

// Export the new action
export const { 
    clickDetailsProceed, 
    setDetails, 
    clickApprovalRequestView,
    clickHistoryView, 
    clickApprovalRequestResults, 
    clickedAprovalPendingResults, 
    clickViewResult, 
    clickAddResult, 
    clickHistory, 
    setResultsSheets, 
    setPendingSheetId, 
    setStudentPendingResultsSheets,
    setStudentResultsSheets,
    setStudentHistoryResultsSheets
} = lectureNavigationSlice.actions;

export default lectureNavigationSlice.reducer;
