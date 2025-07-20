import Link from 'next/link'
import React from 'react'
import { FaAngleRight } from 'react-icons/fa6'
import { FaHeart } from "react-icons/fa";
import Image from 'next/image';

export default function Page() {
    return (
        <div className='w-[100%]'>
            <div className='bg-amber-200 py-[10px] lg:rounded-b-[40%]'>
                <h1 className='text-center justify-center lg:text-3xl text-2xl font-semibold text-gray-800 lg:pb-[20px] py-[5px] flex items-center gap-[15px]'>My Wishlist <FaHeart className='text-[25px] text-gray-800' /></h1>
                <div className='text-center flex justify-center mb-[0px]'>
                    <Link className='hover:text-red-400  flex gap-[10px] items-center ' href={'/'}>Home <FaAngleRight /> &nbsp;</Link>
                    <span className='text-red-400 '>My Wishlist</span>
                </div>
            </div>
            <div className=''>
                <Image alt='' className='mx-auto mb-[25px]' src='https://wscubetech.co/Assignments/furniture/public/frontend/img/icon/wishlist-Empty.jpg' />
            </div>
        </div>
    )
}
