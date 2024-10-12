//Added new content here
import React, { useRef } from 'react'

function ForgotPassword({setClickForgotPassword}) {
    const email = 'admin@example.com';
    const subject = 'Login Problem';
    const body = 'This is the body of the email.';
  
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    const handleClose = () => {
        setClickForgotPassword(false)
    }
    
   
    return (
        <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 backdrop-blur-sm text-white'>
            <div className='py-10 w-4/12 flex flex-col items-center bg-white'>
                <h2 className='w-5/6 text-center text-2xl font-semibold text-primary-txt'>Forgot Password ?</h2>
                <p className='w-5/6 mt-5 text-center text-sm text-black'>If you have any issue with login to the system. Please contact our admin through  
                   <a 
                     href={mailtoLink} 
                     className='text-lg text-secondary'>  admin@gmail.com </a>
                </p>
               
                <div className='w-5/6 flex justify-end gap-3 mt-6'>
                    <button
                        onClick={handleClose}
                        className='mt-3 py-2 px-10 hover:bg-secondary text-black hover:text-white text-[16px] border-black hover:border-btn-border border-[1px]'
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
