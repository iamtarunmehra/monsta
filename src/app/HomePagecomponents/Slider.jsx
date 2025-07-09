import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import { apiBaseUrl } from '../confilg'

export default function BannerSlider() {
    let [sliderData, setSliderData] = useState([])
    let [staticPath, setStaticPath] = useState('')

    // PRODUCT DATA
    // SLIDER DATA
    let getSlider = () => {
        axios.get(`${apiBaseUrl}/home-page/slider`)
            .then((res) => res.data)
            .then((finalRes) => {
                setStaticPath(finalRes.staticPath)
                setSliderData(finalRes.sliderRes)
            })
    }
    useEffect(() => { getSlider() }, [])

    const settings = {
        dots: true,
        infinite: true,
        speed: 1500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,            // Add this
        autoplaySpeed: 3000,
        pauseOnHover: false,      // Slide changes every 3 seconds
    };
    return (
        <div className='w-[100%] h-[auto]'>
            <Slider {...settings}>
                {sliderData.length >= 1 ?
                    sliderData.map((items, index) => {
                        return (
                            <div className='w-[100vw] h-[70vh] z-10'>
                                <img className='w-[100%] h-[100%] object-cover' src={staticPath + items.sliderImage} />
                            </div>
                        )
                    })
                    :
                    <div className="w-full h-[70vh] bg-gray-200 animate-blink"></div>
                }
            </Slider>
        </div>
    )
}
