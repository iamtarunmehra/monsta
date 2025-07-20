import React from 'react'


export default function DashboardPart() {
    return (
        <>
            <h1 className='text-[35px] text-center mt-5 font-bold'>My Dashboard</h1>
            <div className='flex justify-center items-center gap-[10px]'><span>Home</span><FaAngleRight /><span className='text-amber-500'>My Dashboard</span></div>
            <div className='grid grid-cols-[25%_auto] max-w-[1320px] m-[40px_auto]'>
                <div className='max-w-[300px]'>
                    <ul>
                        <li className='py-[10px] my-[10px] px-[25px] duration-500 w-[280px] hover:w-[290px] bg-amber-700 text-white rounded-l-[25px] text-[14px] rounded-r-[5px] hover:rounded-l-[5px] hover:rounded-r-[20px] cursor-pointer hover:bg-amber-500'>My Dashboard</li>
                        <li className='py-[10px] my-[10px] px-[25px] duration-500 w-[280px] hover:w-[290px] bg-amber-700 text-white rounded-l-[25px] text-[14px] rounded-r-[5px] hover:rounded-l-[5px] hover:rounded-r-[20px] cursor-pointer hover:bg-amber-500'>Orders</li>
                        <li className='py-[10px] my-[10px] px-[25px] duration-500 w-[280px] hover:w-[290px] bg-amber-700 text-white rounded-l-[25px] text-[14px] rounded-r-[5px] hover:rounded-l-[5px] hover:rounded-r-[20px] cursor-pointer hover:bg-amber-500'>Addresses</li>
                        <li className='py-[10px] my-[10px] px-[25px] duration-500 w-[280px] hover:w-[290px] bg-amber-700 text-white rounded-l-[25px] text-[14px] rounded-r-[5px] hover:rounded-l-[5px] hover:rounded-r-[20px] cursor-pointer hover:bg-amber-500'>My Profile</li>
                        <li className='py-[10px] my-[10px] px-[25px] duration-500 w-[280px] hover:w-[290px] bg-amber-700 text-white rounded-l-[25px] text-[14px] rounded-r-[5px] hover:rounded-l-[5px] hover:rounded-r-[20px] cursor-pointer hover:bg-amber-500'>Change Passowrd</li>
                        <li className='py-[10px] my-[10px] px-[25px] duration-500 w-[280px] hover:w-[290px] bg-amber-700 text-white rounded-l-[25px] text-[14px] rounded-r-[5px] hover:rounded-l-[5px] hover:rounded-r-[20px] cursor-pointer hover:bg-amber-500'>Logout</li>
                    </ul>
                </div>
                <div>
                    <h2 className='mt-2 text-[25px]'>My Dashboard</h2>
                    <p className='mt-2'>From your account dashboard. you can easily check & view your recent orders, manage your shipping and billing addresses and Edit your password and account details.</p>
                </div>
            </div>

        </>
    )
}
