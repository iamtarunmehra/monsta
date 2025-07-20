"use client"
import Link from 'next/link';
import React from 'react'
import { FaAngleRight } from "react-icons/fa6";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image';

export default function Page() {
    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    }
    return (
        <div className='w-[100%]'>
            <div className='bg-amber-100 lg:py-[20px] py-[10px] lg:px-[0px] px-[10px]'>
                <h1 className='text-center text-3xl font-semibold text-gray-800 py-[20px] flex items-center gap-[10px] justify-center'>About Us</h1>
                <div className='text-center flex justify-center mb-[15px]'>
                    <Link className='hover:text-amber-500 flex gap-[10px] items-center' href={'/'}>Home <FaAngleRight /> &nbsp;</Link>
                    <span className='text-amber-500'>About Us</span>
                </div>
            </div>
            <div className='max-w-[1320px] mx-auto mb-[10px] lg:p-[0px] p-[15px]'>
                <Image alt='' className='w-[100%] lg:h-[80vh] h-[40vh]' src='https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/home-page/983cc349-1718-4290-b7cd-c8eb20459536-1671213069.jpg' />
                <h4 className='mt-[10px] text-2xl my-[20px] font-semibold text-center '>Welcome to Monsta!</h4>
                <p className='text-center text-[14px] text-gray-800 mb-[20px]'>Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam, est usus legentis in iis qui facit eorum claritatem.</p>
                <p className='text-amber-600 text-center italic mb-[20px]'>“There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.”</p>
            </div>
            <div className='max-w-[1320px] mx-auto mb-[10px]'>
                <h2 className='text-2xl my-[20px] font-semibold text-center'>Why chose us?</h2>
                <div className='grid lg:grid-cols-3 grid-cols-1 md:grid-cols-2 justify-center  gap-[10px] flex-wrap'>
                    <div className='flex flex-col items-center justify-center p-[10px] my-[30px]'>
                        <Image alt='' src='https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/why_choose_us/c65c4789-c1eb-4cfc-9961-3ab025317e08-1670161041.jpg' />
                        <p className='my-[10px]'>Creative Design</p>
                        <p className='text-center my-[10px] text-gray-600'>Erat metus sodales eget dolor consectetuer, porta ut purus at et alias, nulla ornare velit amet enim</p>
                    </div>
                    <div className='flex flex-col items-center justify-center p-[10px] my-[30px]'>
                        <Image alt='' src='https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/why_choose_us/89df96b6-b70d-463b-affb-58a74d49ed6b-1670161065.jpg' />
                        <p className='my-[10px]'>100% Money Back Guarantee</p>
                        <p className='text-center my-[10px] text-gray-600'>Erat metus sodales eget dolor consectetuer, porta ut purus at et alias, nulla ornare velit amet enim</p>
                    </div>
                    <div className='flex flex-col items-center justify-center p-[10px] my-[30px]'>
                        <Image alt='' src='https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/why_choose_us/eb6a7519-f0f9-469f-af25-4ba0536060fd-1670161090.jpg' />
                        <p className='my-[10px]'>Online Support 24/7</p>
                        <p className='text-center my-[10px] text-gray-600'>Erat metus sodales eget dolor consectetuer, porta ut purus at et alias, nulla ornare velit amet enim</p>
                    </div>
                </div>
            </div>

            <h1 className='text-2xl my-[20px] font-semibold text-center '> What Our Custumers Say ?</h1>
            <div className='max-w-[1320px] mx-auto lg:my-[50px] cursor-grab'>
                <Slider {...settings} id="homeSlider">
                    <div className=''>
                        <p className='text-center my-[10px]'>These guys have been absolutely outstanding. Perfect Themes and the best of all that you have many options to choose! Best Support team ever! Very fast responding! Thank you very much! I highly recommend this theme and these people!</p>
                        <Image alt='' className='w-[100px] mx-auto rounded-[50%]' src='https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/testimonial/35b5a0a0-e80f-4038-a75a-2811de92118b-1670161614.png' />
                        <h4 className='mt-[10px] text-center'>Kathy Young</h4>
                        <p className='text-center my-[10px]'>CEO of SunPark</p>
                    </div>
                    <div className=''>
                        <p className='text-center my-[10px]'>These guys have been absolutely outstanding. Perfect Themes and the best of all that you have many options to choose! Best Support team ever! Very fast responding! Thank you very much! I highly recommend this theme and these people!</p>
                        <Image alt='' className='w-[100px] mx-auto rounded-[50%]' src='https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/testimonial/c6381687-5a5e-4914-9373-9cbec4937be6-1670161604.jpg' />
                        <h4 className='mt-[10px] text-center'>Kathy Young</h4>
                        <p className='text-center my-[10px]'>CEO of SunPark</p>
                    </div>
                    <div className=''>
                        <p className='text-center my-[10px]'>These guys have been absolutely outstanding. Perfect Themes and the best of all that you have many options to choose! Best Support team ever! Very fast responding! Thank you very much! I highly recommend this theme and these people!</p>
                        <Image alt='' className='w-[100px] mx-auto rounded-[50%]' src='https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/testimonial/3023f95a-ce85-434c-b9c5-2b0943b865e2-1670161621.jpg' />
                        <h4 className='mt-[10px] text-center'>Kathy Young</h4>
                        <p className='text-center my-[10px]'>CEO of SunPark</p>
                    </div>
                </Slider>
            </div>
        </div>
    )
}
