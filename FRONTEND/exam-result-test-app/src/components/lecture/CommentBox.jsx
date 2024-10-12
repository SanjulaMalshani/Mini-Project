//Added new content
import React, { useRef } from 'react'

function CommentBox({ setAppearState }) {
    
    const commetRef = useRef()

    const handleCancel = () => {
        setAppearState(false)
    }
    
    const handleSend = () => {
        console.log(commetRef.current.value)
        setAppearState(false)
    }

    return (
        <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 backdrop-blur-sm text-white'>
            <div className='py-10 w-4/12 flex flex-col items-center bg-white'>
                <h2 className='w-5/6 text-center text-2xl font-semibold text-primary-txt'>Add Comment</h2>
                <p className='w-5/6 mt-5 text-center text-sm text-black'>Please enter the reason which cause to not approve the received result from department secretary.</p>
                <textarea 
                   ref={commetRef}
                   typeof='text' 
                   className='mt-5 px-3 py-4 w-5/6 h-40  bg-transparent text-primary-txt border-[1px] border-black focus:outline-2 focus:outline-secondary rounded-lg '
                ></textarea>
                <div className='w-5/6 flex justify-end gap-3 mt-6'>
                    <button
                        onClick={handleCancel}
                        className='mt-3 py-2 px-10 hover:bg-secondary text-black hover:text-white text-[16px] border-black hover:border-btn-border border-[1px]'
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSend}
                        className='mt-3 py-2 px-10 bg-secondary text-white border-btn-border text-[16px] border-[1px]'
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CommentBox
//