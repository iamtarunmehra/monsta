import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import { apiBaseUrl } from '../confilg'

export default function Testimonials() {
    const [testimonialData, setTestimonialData] = useState([])
    const [staticPath, setStaticPath] = useState('')

    const getTestimonial = () => {
        axios.get(`${apiBaseUrl}/home-page/testimonial-view`)
            .then((res) => res.data)
            .then((finalRes) => {
                setTestimonialData(finalRes.testimonialRes || [])
                setStaticPath(finalRes.staticPath || '')
            })
            .catch((err) => {
                console.error("Error fetching testimonial data:", err)
            })
    }

    useEffect(() => {
        getTestimonial()
    }, [])

    const settings = {
        dots: true,
        infinite: true,
        speed: 1500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: false,
    }

    return (
        <div className='px-5'>
            <h1 className='text-2xl my-[20px] font-semibold text-center'>
                What Our Customers Say?
            </h1>

            <div className='max-w-[1320px] mx-auto lg:my-[50px]'>
                {testimonialData.length > 1 ? (
                    <Slider {...settings} id="homeSlider">
                        {testimonialData.map((item, index) => (
                            <div key={index} className='px-5'>
                                <p className='text-center my-[10px]'>{item.testimonialDescription}</p>
                                <img
                                    className='w-[100px] h-[100px] mx-auto object-cover rounded-full'
                                    src={staticPath + item.testimonialImage}
                                    alt={item.testimonialName}
                                />
                                <h4 className='mt-[10px] text-center font-semibold'>{item.testimonialName}</h4>
                                <p className='text-center text-yellow-600 font-medium'>Rating: {item.testimonialRating}</p>
                                <p className='text-center my-[10px] text-gray-600'>{item.testimonialDesignation}</p>
                            </div>
                        ))}
                    </Slider>
                ) : testimonialData.length === 1 ? (
                    <div className='px-5'>
                        <p className='text-center my-[10px]'>{testimonialData[0].testimonialDescription}</p>
                        <img
                            className='w-[100px] h-[100px] mx-auto object-cover rounded-full'
                            src={staticPath + testimonialData[0].testimonialImage}
                            alt={testimonialData[0].testimonialName}
                        />
                        <h4 className='mt-[10px] text-center font-semibold'>{testimonialData[0].testimonialName}</h4>
                        <p className='text-center text-yellow-600 font-medium'>Rating: {testimonialData[0].testimonialRating}</p>
                        <p className='text-center my-[10px] text-gray-600'>{testimonialData[0].testimonialDesignation}</p>
                    </div>
                ) : (
                    <p className='text-center text-gray-500'>No testimonials available.</p>
                )}
            </div>
        </div>
    )
}
