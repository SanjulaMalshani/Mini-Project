import React, { useState, useEffect } from 'react';

function GPATable(props) {
  const [students, setStudents] = useState(props.students);

  // Update the state whenever props.students changes
  useEffect(() => {
    setStudents(props.students);
  }, [props.students]);

  return (
    <div className={`mt-5 w-full flex justify-center`}>
      <div className='w-2/5 flex flex-col items-center'>
        <div className={`w-full mt-3`}>
          <div className='grid grid-cols-5 gap-[1px]'>
            <div className='p-2 col-span-3 flex items-center justify-center bg-primary'>
              <h3 className='text-lg text-white'>Student Index</h3>
            </div>
            <div className='col-span-2 flex items-center justify-center bg-primary'>
              <h3 className='text-lg text-white'>Current GPA</h3>
            </div>
          </div>
        </div>

        <div className={`w-full max-h-96 overflow-y-scroll scrollbar-hide`}>
          {students.map((student, index) => (
            <div key={index} className='w-full mb-1'>
              <div className='grid grid-cols-5 gap-[1px]'>
                <div className='p-3 col-span-3 flex items-center justify-center bg-table-bg'>
                  <p className='text-lg text-table-txt'>{student.index}</p>
                </div>
                <div className='p-0 col-span-2 flex items-center justify-center bg-table-bg'>
                  <p className='text-lg text-table-txt'>{student.gpa}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GPATable;
