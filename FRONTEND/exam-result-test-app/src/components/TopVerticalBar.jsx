import React from 'react'
import uniLogo from '../assets/uniLogo.png'
import { IoNotificationsOutline } from "react-icons/io5";
import { IoIosSettings } from "react-icons/io";

function TopVerticalBar() {
    return (
        <div >
            <div className='fixed px-10 w-4/5 flex justify-between bg-tertiary-bg'>
                <div className='py-3 flex items-center gap-3'>
                    <img src={uniLogo}></img>
                    <h2 className='text-lg'>Sabaragamuwa University of Sri Lanka</h2>
                </div>
                <div className='flex items-center gap-4'>
                    <div>
                        <IoNotificationsOutline size={25}/>
                    </div>
                    <div>
                        <IoIosSettings size={25}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopVerticalBar
