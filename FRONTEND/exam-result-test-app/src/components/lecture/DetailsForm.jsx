import React, { useEffect, useState } from 'react';
import DropDown from '../DropDown';
import { useDispatch, useSelector } from 'react-redux';
import { clickDetailsProceed, setDetails } from '../../store/reducers/LectureNavigationSlice';
import data from '../../utils/data';

function DetailsForm() {
    const dispatch = useDispatch();
    const faculty = localStorage.getItem('faculty');

    console.log(faculty)

    const [facultyName, setFacultyName] = useState(faculty);
    const [departmentName, setDepartmentName] = useState('');
    const [degreeName, setDegreeName] = useState('');
    const [batchName, setBatchName] = useState('');
    const [semesterName, setSemesterName] = useState('');
    const [subjectName, setSubjectName] = useState('');
    const [subjectCode, setSubjectCode] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [subjectCredit, setSubjectCredit] = useState(0);

    // Filter departments based on selected faculty
    const departments = data.find(fac => fac.faculty === facultyName)?.departments || [];

    // Filter degrees based on selected department
    const degrees = departments.find(dpt => dpt.dptName === departmentName)?.degrees || [];

    // Filter batches based on selected degree
    const batches = degrees.find(deg => deg.degreeName === degreeName)?.batches || [];

    // Filter semesters based on selected batch
    const semesters = batches.find(batch => batch.batchName === batchName)?.semesters || [];

    // Filter subjects based on selected semester
    const subjects = semesters.find(sem => sem.semesterName === semesterName)?.subjects || [];

    // Subject codes based on selected subject
    const subjectCodes = subjects.map(subject => subject.subjectCode);

    useEffect(() => {
        if (subjectName !== '') {
            const faculty = data.find(fac => fac.faculty === facultyName);
            const department = faculty.departments.find(dpt => dpt.dptName === departmentName);
            const degree = department.degrees.find(deg => deg.degreeName === degreeName);
            const batch = degree.batches.find(batch => batch.batchName === batchName);
            const semester = batch.semesters.find(sem => sem.semesterName === semesterName);
            const subject = semester.subjects.find(sub => sub.subjectName === subjectName);
            if (subject) {
                setSubjectCredit(subject.credits);
            }
        }
    }, [facultyName, departmentName, degreeName, batchName, semesterName, subjectName]);

    const handleProceed = () => {
        if (!facultyName || !departmentName || !degreeName || !batchName || !semesterName || !subjectName || !subjectCode || !selectedDate) {
            alert("Please fill in all fields before proceeding."); // Alert user
            return; // Exit the function if any field is empty
        }

        // Dispatch the action to save the details in the Redux store
        dispatch(setDetails({
            facultyName,
            departmentName,
            degreeName,
            batchName,
            semesterName,
            subjectName,
            subjectCode,
            subjectCredit,
            selectedDate
        }));

        // Optionally dispatch the clickDetailsProceed action if needed
        dispatch(clickDetailsProceed(true));
    };

    return (
        <div>
            <div className='mx-7 mt-10 flex flex-col'>
                <h3 className='text-xl text-txt-primary'>Enter Details</h3>
                <div className='m-10 grid grid-cols-2 gap-5'>
                    <DropDown type="Faculty Name" options={[facultyName]} setValue={setFacultyName} />
                    <DropDown type="Department Name" options={departments.map(dpt => dpt.dptName)} setValue={setDepartmentName} />
                    <DropDown type="Degree Name" options={degrees.map(deg => deg.degreeName)} setValue={setDegreeName} />
                    <DropDown type="Batch Name" options={batches.map(batch => batch.batchName)} setValue={setBatchName} />
                    <DropDown type="Semester Name" options={semesters.map(sem => sem.semesterName)} setValue={setSemesterName} />
                    <div>
                        <input 
                            type='date' 
                            className='p-4 w-full h-12 border-[1px] border-black rounded-lg focus:border-secondary focus:border-2 active:border-white duration-300'
                            value={selectedDate} 
                            onChange={(e) => setSelectedDate(e.target.value)} 
                        />
                    </div>
                    <DropDown type="Subject Name" options={subjects.map(subject => subject.subjectName)} setValue={setSubjectName} />
                    <DropDown type="Subject Code" options={subjectCodes} setValue={setSubjectCode} />
                    <div>
                        <div className='p-4 w-full h-12 flex items-center justify-between border-[1px] border-black rounded-lg focus:border-secondary focus:border-2 active:border-white duration-300'>
                            <p>Number of Credits</p>
                            <p className='text-lg'>{subjectCredit}</p>
                        </div>
                    </div>
                </div>
                <div className='mx-10 mt-5 flex justify-end gap-10'>
                    <button className='min-w-36 h-12 hover:bg-secondary text-black hover:text-white text-[16px] border-black hover:border-btn-border border-[1px]'>Cancel</button>
                    <button onClick={handleProceed} className='min-w-36 h-12 bg-secondary text-white border-btn-border text-[16px] border-[1px]'>
                        Proceed
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DetailsForm;
