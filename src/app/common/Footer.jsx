import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import axios from 'axios';
import { apiBaseUrl } from '../confilg';

export default function Footer() {
  let [topRated, setTopRated] = useState([])
  let [staticPath, setStaticPath] = useState('')

  let getTopRatedProduct = () => {
    axios.get(`${apiBaseUrl}/home-page/top-rated`)
      .then((res) => res.data)
      .then((finalRes) => {
        setTopRated(finalRes.topRatedProductRes)
        setStaticPath(finalRes.staticPath)
      })
  }

  useEffect(() => {
    getTopRatedProduct()
  }, [])

  return (
    <footer style={{ backgroundImage: "url('https://static.vecteezy.com/system/resources/previews/035/209/885/non_2x/ai-generated-cozy-green-armchair-on-empty-soft-green-wall-background-in-minimalist-the-living-room-3d-render-illustration-with-copy-space-photo.jpg')" }} className='w-[100%] z-[1] relative bg-fixed h-auto bg-no-repeat bg-cover bg-center py-[20px] p-[20px]'>
      <div className='bg-[rgba(0,0,0,0.5)] w-[100%] h-[100%] z-[-1] absolute top-0 left-0'></div>
      <div className='flex flex-wrap justify-between max-w-[1320px] mx-auto z-[-1]'>
        <ul className='lg:w-[20%] md:w-[48%] w-[100%]'>
          <li className='my-[10px] text-white'><p className='text-[24px] font-semibold my-[20px]  rounded-t-[10px] py-[7px]'>Contact Us</p></li>
          <li className='my-[10px] text-[14px] text-white hover:text-amber-600 cursor-pointer'>Address: Claritas est etiam processus dynamicus</li>
          <li className='my-[10px] text-[14px] text-white hover:text-amber-600 cursor-pointer'>Phone: 9781234560</li>
          <li className='my-[10px] text-[14px] text-white hover:text-amber-600 cursor-pointer'>Email: furniture@gmail.com</li>
          <li className='my-[10px] text-[14px] text-white hover:text-amber-600 cursor-pointer'></li>
        </ul>
        <ul className='lg:w-[20%] md:w-[48%] w-[100%]'>
          <li className='my-[10px] text-[14px] text-white'><p className='text-[24px] font-semibold my-[20px]  rounded-t-[10px]  py-[7px]'>Information</p></li>
          <Link href={'/about-us'}><li className='my-[10px] hover:text-amber-600 cursor-pointer text-[14px] text-white'>About Us</li></Link>
          <li className='my-[10px] hover:text-amber-600 cursor-pointer text-[14px] text-white'>Contact Us</li>
          <li className='my-[10px] hover:text-amber-600 cursor-pointer text-[14px] text-white'>Frequently Questions</li>
        </ul>
        <ul className='lg:w-[20%] md:w-[48%] w-[100%]'>
          <li className='my-[10px] text-[14px] text-white'><p className='text-[24px] font-semibold my-[20px]  rounded-t-[10px] py-[7px]'>My Account</p></li>
          <li className='my-[10px] text-[14px] text-white hover:text-amber-600 cursor-pointer'>My Dashboard</li>
          <li className='my-[10px] text-[14px] text-white hover:text-amber-600 cursor-pointer'>Wishlist</li>
          <li className='my-[10px] text-[14px] text-white hover:text-amber-600 cursor-pointer'>Cart</li>
          <li className='my-[10px] text-[14px] text-white hover:text-amber-600 cursor-pointer'>Checkout</li>
        </ul>
        <ul className='lg:w-[35%] md:w-[48%] w-[100%]'>
          <li className='my-[10px] text-[14px] text-white'><p className='text-[24px] font-semibold my-[20px]  rounded-t-[10px] py-[7px]'>Top Rated Products</p></li>
          <li className='my-[10px] text-[14px] text-white'>

            {topRated.map((items) => {
              return (
                <div className='flex items-center lg:gap-[20px] gap-[10px]'>
                  <img className='w-[140px] h-[100px] object-contain' src={staticPath + items.productImage} alt="" />
                  <div>
                    <p className='text-[18px]'>{items.parentCategory.categoryName}</p>
                    <h4 className='lg:text-[16px] text-[12px] font-semibold text-white my-[5px]'>{items.productName}</h4>
                    <div className='flex lg:gap-[14px] gap-[5px] lg:items-center items-start lg:flex-row flex-col'>
                      <p className='line-through lg:text-[15px] font-semibold text-[12px]'>Rs. {items.ProductSalePrice}</p>
                      <p className='lg:text-[18px] text-[14px] font-semibold'>Rs. {items.ProductActualPrice}</p>
                    </div>
                  </div>
                </div>
              )
            })}


          </li>

        </ul>
      </div>
      <div>
        <ul className='justify-center lg:my-[40px] my-[10px] flex flex-wrap gap-[20px] lg:py-[20px] py-[10px]'>
          <li className='text-white text-[18px] hover:text-amber-300 cursor-pointer'>Home</li>
          <li className='text-white text-[18px] hover:text-amber-300 cursor-pointer'>Online Store</li>
          <li className='text-white text-[18px] hover:text-amber-300 cursor-pointer'>Privacy Policy</li>
          <li className='text-white text-[18px] hover:text-amber-300 cursor-pointer'>Terms of Use</li>
        </ul>
        <p className='text-center text-[12px] text-white'>All Rights Reserved By Furniture | © 2025</p>
        <img className='mx-auto w-[190px] lg:my-[25px] my-[10px]' src='https://wscubetech.co/Assignments/furniture/public/frontend/img/icon/papyel2.png' />
      </div>
    </footer>
  )
}
