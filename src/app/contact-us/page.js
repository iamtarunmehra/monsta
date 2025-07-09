"use client"
import React from 'react'
import { FaAngleRight } from 'react-icons/fa6'
import { FaHeart } from "react-icons/fa";
import Link from 'next/link';
import { FaPhoneAlt } from "react-icons/fa";
import { FaAddressCard } from "react-icons/fa6";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

export default function Page() {
    return (
        <div className='w-[100%]'>
            <div className=''>
                <h1 className='text-center lg:rounded-t-[40%] lg:pb-[20px] lg:mt-[20px] max-w-[1320px] mx-auto lg:my-[10px] bg-blue-400 justify-center lg:text-[25px] text-xl font-semibold text-white lg:py-[20px] py-[5px] flex items-center gap-[15px]'>Contact Us <FaPhoneAlt className='lg:text-[25px] text-[16px]' /></h1>
                {/* <div className='text-center flex justify-center my-[20px]'>
                    <Link className=' flex gap-[10px] items-center ' href={'/'}>Home <FaAngleRight /> &nbsp;</Link>
                    <span className=''>Contact Us</span>
                </div> */}
            </div>
            <div className='my-[20px] max-w-[1320px] mx-auto lg:h-[500px] h-[300px]'>
                <div className="w-full h-full rounded-lg overflow-hidden shadow-md lg:rounded-b-[10%]">
                    <iframe
                        className="w-full h-full"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24163.1506010768!2d-74.01014125!3d40.7127281!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjgiTiA3NMKwMDAnMjAuNSJX!5e0!3m2!1sen!2sus!4v1615217183304!5m2!1sen!2sus"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
            <div className='max-w-[1320px] flex-wrap mx-auto flex gap-[50px] my-[50px] lg:p-[0px] p-[20px]'>
                <ul className='lg:w-[48%] w-[100%]'>
                    <li className='border-b border-gray-300 mt-[15px] font-semibold text-2xl'> Contact Us</li>
                    <li className='flex items-center gap-[10px] border-b border-gray-300 pb-[10px] mt-[15px] text-gray-700 text-[14px]'><FaAddressCard className='text-[20px]' /> Address : Claritas est etiam processus dynamicus</li>
                    <li className='flex items-center gap-[10px] border-b border-gray-300 pb-[10px] mt-[15px] text-gray-700 text-[14px]'> <FaPhoneSquareAlt className='text-[20px]' /> 9781234560</li>
                    <li className='flex items-center gap-[10px] border-b border-gray-300 pb-[10px] mt-[15px] text-gray-700 text-[14px]'> <IoMdMail className='text-[20px]' /> furniture@gmail.com</li>
                </ul>
                <form className='lg:w-[48%] w-[100%]'>
                    <h2 className='mt-[15px] font-semibold text-2xl'>Tell us your question</h2>
                    <div className='my-[20px]'>
                        <p className='font-semibold text-[14px] text-gray-800'>Your Name (required)</p>
                        <input type='text' className='w-[100%] text-[14px] mt-[10px] p-[8px] ps-[15px] border-[1px] border-gray-200' name='name' placeholder='Name *' />
                    </div>
                    <div className='my-[20px]'>
                        <p className='font-semibold text-[14px] text-gray-800'>Your Email (required)</p>
                        <input type='email' className='w-[100%] text-[14px] mt-[10px] p-[8px] ps-[15px] border-[1px] border-gray-200' name='email' placeholder='Email *' />
                    </div>
                    <div className='my-[20px]'>
                        <p className='font-semibold text-[14px] text-gray-800'>Your Mobile Number (required)</p>
                        <input type='number' className='w-[100%] text-[14px] mt-[10px] p-[8px] ps-[15px] border-[1px] border-gray-200' name='number' placeholder='Mobile Number *' />
                    </div>
                    <div className='my-[20px]'>
                        <p className='font-semibold text-[14px] text-gray-800'>Your Name (required)</p>
                        <input type='text' className='w-[100%] text-[14px] mt-[10px] p-[8px] ps-[15px] border-[1px] border-gray-200' name='subject' placeholder='Subject *' />
                    </div>
                    <div className='my-[20px]'>
                        <p className='font-semibold text-[14px] text-gray-800'>Your Name (required)</p>
                        <textarea type='text' className='w-[100%] h-[150px] text-[14px] mt-[10px] p-[8px] ps-[15px] border-[1px] border-gray-200' name='message' placeholder='Message *' />
                    </div>
                    <button className='bg-gray-900 hover:bg-gray-700 text-white px-[30px] text-[14px] cursor-pointer py-[8px] rounded-[5px]' type='submit'>Send</button>
                </form>
            </div>

        </div>
    )
}
