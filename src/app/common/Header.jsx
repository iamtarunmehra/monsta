"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { IoSearchSharp } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";
import { HiBars3BottomRight } from "react-icons/hi2";
import { SlClose } from "react-icons/sl";
import { IoChevronDownOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../slice/loginSlice';
import Swal from 'sweetalert2';
import AddToCart from '../HomePagecomponents/AddToCart';
import axios from 'axios';
import { imageBasePath, showCart, totalAmount } from '../slice/cartSlice';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { apiBaseUrl } from '../confilg';

export default function Header() {

    let userData = useSelector((store) => store.loginStore.user)
    let cartData = useSelector((store) => store.cartStore.cartAllData)
    let staticPath = useSelector((store) => store.cartStore.imageBasePath)
    let token = useSelector((store) => store.loginStore.token)
    let subTotal = useSelector((store) => store.cartStore.totalAmount)


    let dispatch = useDispatch()

    let [openMobileMenu, setOpenMobileMenu] = useState(false)

    let [categories, setCategories] = useState([])
    let [subCategories, setSubCategories] = useState([])



    let [livingMenuMb, setlivingMenuMb] = useState(false)
    let [pagesMenuMb, setPagesMenuMb] = useState(false)
    let [sofaMenuMb, setSofaMenuMb] = useState(false)

    let [addToCart, setAddToCart] = useState(false)
    let [addToCartColor, setAddToCartColor] = useState(false)

    // let [isCartAvailibe, setIsCartAvailible] = useState(false)

    //for fetch company details logo email or phone
    let [companyData, setCompanyData] = useState([])
    let [companyStaticPath, setCompanyStaticPath] = useState('')

    let getCompanyProfile = () => {
        axios.get(`${apiBaseUrl}/home-page/company-profile`)
            .then((res) => res.data)
            .then((finalRes) => {
                setCompanyData(finalRes.companyDetails[0])
                setCompanyStaticPath(finalRes.staticPath)
            })
    }

    console.log(companyStaticPath)
    console.log(companyData)

    useEffect(() => {
        getCompanyProfile()
    }, [])

    // for handle all submenus ***

    let handleLiving = () => {
        setlivingMenuMb(!livingMenuMb)
        setPagesMenuMb(false)
        setSofaMenuMb(false)
    }

    let handleSofa = () => {
        setSofaMenuMb(!sofaMenuMb)
        setPagesMenuMb(false)
        setlivingMenuMb(false)
    }

    let handlePages = () => {
        setPagesMenuMb(!pagesMenuMb)
        setlivingMenuMb(false)
        setSofaMenuMb(false)
    }

    let logout = () => {
        Swal.fire({
            title: "Are you sure want to Logout?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#401A1A",
            cancelButtonColor: "#AB8989",
            confirmButtonText: "Yes"
        })
            .then((res) => {
                if (res.isConfirmed) {
                    Swal.fire({
                        title: "Successfully Logout",
                        icon: "success"
                    });
                    dispatch(logoutUser())
                    redirect('/')
                }
            })
    }

    let showCartItems = () => {
        axios.post(`${apiBaseUrl}/cart/view-cart`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => res.data)
            .then((finalRes) => {
                dispatch(showCart(finalRes.cartRes))
                dispatch(imageBasePath(finalRes.staticPath))
                let finalTotal = finalRes.cartRes.reduce((total, item) => total + (item.product.ProductActualPrice * item.quantity), 0)
                dispatch(totalAmount(finalTotal))
            })
    }

    useEffect(() => {
        showCartItems()
    }, [])

    // let handleCheckout = () => {
    //     setAddToCart(false)
    //     if (cartData.length >= 1) {
    //         setIsCartAvailible(true)
    //     }

    // }

    // useEffect(() => {
    //     if (isCartAvailibe) {
    //         redirect('/checkout')
    //     }
    //     else {
    //         Swal.fire({
    //             title: 'Your Cart is empty',
    //             icon: 'warning'
    //         })
    //     }
    // }, [isCartAvailibe])s


    let getCategories = () => {
        axios.get(`${apiBaseUrl}/home-page/mega-menu`)
            .then((res) => res.data)
            .then((finalRes) => {
                setCategories(finalRes.finalAns)
                // setSubCategories(finalRes.finalAns.subCategoryData)
            })
    }

    // console.log(categories)


    useEffect(() => {
        getCategories()
    }, [])



    return (

        // mobile menu  *** 

        <>
            {/* for overlay when menu and cart open */}
            {/* 
            <div className={`${openMobileMenu ? "block" : "hidden"} overlay w-[100%] h-[100%] bg-[rgba(0,0,0,0.5)] fixed top-0 left-0 lg:hidden delay-100`}></div> */}

            <div className={`${addToCart ? "block" : "hidden"} overlay w-[100%] h-[100%] bg-[rgba(0,0,0,0.5)] fixed top-0 left-0 delay-100 z-20`}></div>


            {/* for mobile toggle menu */}

            <div className={`w-[100%] h-[100vh] lg:hidden block fixed ${openMobileMenu ? "left-[0px]" : "left-[-1000px]"} top-0 bg-white z-20 p-[20px] duration-500`}>
                <p className='text-[13px] my-[10px] text-black mt-[30px] text-center'>Contact us 24/7 : +91-9781234560 </p>
                <p className='text-[13px] my-[10px] text-black text-center'>furniture@gmail.com </p>
                <span onClick={() => setOpenMobileMenu(false)} className='absolute top-[20px] right-[15px] text-[25px] text-gray-400'><SlClose /></span>
                <ul className='py-[10px]'>
                    <Link href={'/'}><li onClick={() => setOpenMobileMenu(false)} className={`bg-amber-400 my-[15px] text-white rounded-[10px] ps-[10px] relative border-b-[1px] text-[14px] border-gray-200 py-[10px]`}>Home</li></Link>

                    <li onClick={handleLiving} className={`${livingMenuMb ? "bg-amber-700" : "bg-amber-400"} my-[15px] text-white rounded-[10px] ps-[10px] relative border-b-[1px] text-[14px] border-gray-200 py-[10px]`}>Living <IoChevronDownOutline className='absolute top-4 right-[5px]' />
                        <ul className={`${livingMenuMb ? "block" : "hidden"} py-[5px] ps-[20px]`}>
                            <li className='text-white py-[10px]'>Tables</li>
                            <li className='text-white py-[10px]'>Living Storage</li>
                            <li className='text-white py-[10px]'>Mirrors</li>
                        </ul>
                    </li>

                    <li onClick={handleSofa} className={`${sofaMenuMb ? "bg-amber-700" : "bg-amber-400"} text-white ps-[10px] rounded-[10px] relative border-b-[1px] text-[14px] border-gray-200 py-[10px]`}>Sofa <IoChevronDownOutline className='absolute top-4 right-[5px]' />
                        <ul className={`${sofaMenuMb ? "block" : "hidden"} py-[5px] ps-[20px]`}>
                            <li className='text-white py-[10px]'>Sofa Cum Bed</li>
                            <li className='text-white py-[10px]'>Sofa Sets</li>
                            <li className='text-white py-[10px]'>Swing Jhula </li>
                        </ul>
                    </li>

                    <li onClick={handlePages} className={`${pagesMenuMb ? "bg-amber-700" : "bg-amber-400"} my-[15px] text-white rounded-[10px] ps-[10px] relative border-b-[1px] text-[14px] border-gray-200 py-[10px]`}>Pages <IoChevronDownOutline className='absolute top-4 right-[5px]' />
                        <ul className={`${pagesMenuMb ? "block" : "hidden"} py-[5px] ps-[20px]`}>
                            <li className='text-white py-[10px]'>About Us</li>
                            <li className='text-white py-[10px]'>Cart</li>
                            <Link href={'/checkout'}><li className='text-white py-[10px]'>Checkout </li></Link>
                            <li className='text-white py-[10px]'>Frequently Questions</li>
                        </ul>
                    </li>
                    <Link href={'/register'}><li onClick={() => setOpenMobileMenu(false)} className={`bg-amber-400 my-[15px] text-white rounded-[10px] ps-[10px] relative border-b-[1px] text-[14px] border-gray-200 py-[10px]`}>Login / Register</li></Link>
                </ul>
            </div >


            {/* for  add to cart functionality */}
            <div className={`${addToCart ? "right-[0px]" : "right-[-1000px]"} overflow-y-scroll duration-500 lg:w-[25%] w-[100%] h-[100vh] fixed top-0 bg-white right-0 z-50`}>
                <span onClick={() => setAddToCart(false)} className='absolute top-[10px] hover:text-amber-500 text-gray-500 right-[20px] text-[35px] cursor-pointer'>&times;</span>
                <h4 className='my-[20px] pb-[10px] border-b-[1px] border-gray-200 text-gray-500 text-[20px] ps-[20px]'>Cart</h4>

                {cartData.length >= 1 ?
                    cartData.map((cartItems, index) => {
                        return (
                            <AddToCart key={index} staticPath={staticPath} cartItems={cartItems} addToCart={addToCart} setAddToCart={setAddToCart} />
                        )
                    })
                    :
                    <div className={`${addToCart ? "right-[0px]" : "right-[-1000px]"} hover:text-amber-500 duration-500 lg:w-[25%] w-[100%] h-[100vh] fixed top-0 bg-white right-0 z-20`}>
                        <span onClick={() => setAddToCart(false)} className='absolute top-[30px] hover:text-amber-500 text-gray-500 right-[20px] text-[35px] cursor-pointer'>&times;</span>
                        <h4 className='my-[40px] pb-[10px] border-b-[1px] border-gray-200 text-gray-500 text-[20px] ps-[20px]'>Cart</h4>
                        <Image alt='' className='w-[300px] mx-auto' src="https://wscubetech.co/Assignments/furniture/public/frontend/img/icon/my-Order.jpg" />
                        <p className='text-center text-[14px] text-gray-500 my-[20px] py-[20px] border-y-[1px] border-gray-300'>Your Shopping Cart is Empty!</p>
                    </div>
                }

                <div>
                    <div className='flex justify-between px-[25px] items-center'>
                        <h4>Subtotal</h4>
                        <p className='text-[20px] text-amber-700 font-semibold'>Rs. {subTotal} /-</p>
                    </div>
                    <div className='w-[90%] mx-[auto] my-[20px] bg-amber-300 rounded-xl px-[15px] py-[25px]'>

                        <Link href={'/view-cart'}><button onClick={() => setAddToCart(false)} className='block text-center w-[100%]  bg-amber-200 hover:bg-white text-[14px] duration-700 cursor-pointer rounded-[5px] mb-[15px] py-[8px] '>VIEW CART</button></Link>
                        <Link href={'/checkout'}><button onClick={() => setAddToCart(false)} className='block text-center w-[100%] bg-amber-50 text-[14px] duration-700 cursor-pointer rounded-[5px] mb-[0px] py-[8px] '>CHECKOUT</button></Link>
                    </div>
                </div>
            </div>

            {/*  header for pc*/}
            <header className='lg:pt-[10px] lg:py-[0px] py-[10px] lg:px-[20px] px-[0px]'>
                <div className='max-w-[1320px] mx-auto flex justify-between text-[12px] text-[#212121]'>
                    <p className='hidden lg:block'>Contact us 24/7 : +91-9781234560 / furniture@gmail.com</p>
                    <div className='hidden text-[13.5px] lg:block hover:bg-amber-700 bg-white text-amber-700 border-[2px] font-semibold border-amber-700 hover:text-white px-[15px] py-[5px] rounded-[5px]'>
                        {userData ?
                            <button className='cursor-pointer' onClick={logout}>Logout</button>
                            :
                            <Link href={'/register'} className='cursor-pointer'>Login / Register</Link>
                        }
                    </div>
                </div>
                <div className='lg:border-y-[1px] border-gray-200 border-y-[0px] w-[100%] lg:my-[10px] my-[0px]'>
                    <div className='max-w-[1320px] px-[10px] lg:px-[0px] text-[#212121] mx-auto flex justify-between py-[15px]'>
                        <div className='lg:w-[165px] w-[180px]'>
                            <Image className='w-[100%]  h-[50px] object-contain' src='https://monsta-backend-is2b.onrender.com/uploads/company-profile/1751345395940Monsta-logo-white-stroke.png' alt="" />
                        </div>
                        <div className='flex gap-[20px]'>
                            <form action="">
                                <div className='hidden lg:block'>
                                    <div className='border-[1px] flex items-center  border-gray-300 px-[10px]'>
                                        <input className='py-[12px] w-[200px] text-[12px]' type="text" placeholder='Search product...' />
                                        <button className='ps-[5px]'><IoSearchSharp className='text-[#212121]' /></button>
                                    </div>
                                </div>
                            </form>
                            <button className='py-[2px] px-[12px] hover:bg-red-500 hover:text-white hover:rounded-[50%] hover:border-none cursor-pointer rounded-[3px] border-[1px] border-gray-300'><Link href={'/wishlist'}><FaHeart className='text-[20px] cursor-pointer' /></Link></button>
                            <div onMouseEnter={() => setAddToCartColor(true)} onMouseLeave={() => setAddToCartColor(false)} onClick={() => setAddToCart(true)} className='cursor-pointer flex gap-[10px]  rounded-[3px] hover:bg-amber-400 hover:rounded-[20px] hover:border-none px-[10px] relative items-center border-[1px] border-gray-300'>
                                <p><FaShoppingCart className="text-gray-800" /></p><p className='hidden lg:block'>|</p>
                                <div className='hidden lg:block'>
                                    <p className='flex items-center font-semibold text-gray-800 text-[14.5px] gap-[10px] '>Rs. 0.00 <FaAngleDown className="text-gray-800" /></p>
                                </div>
                                <span className='text-[12px] animate-bounce text-center  bg-amber-500 text-white w-6 h-6 pt-[3px] absolute top-[10px] left-[-15px] rounded-[50%]'>{cartData.length}</span>
                            </div>
                            <button onClick={() => setOpenMobileMenu(true)} className='rounded-[3px] lg:hidden block py-[2px] px-[8px] border-[1px] border-gray-300'><HiBars3BottomRight className='text-[20px] ' /></button>
                        </div>
                    </div>
                </div>


                {categories.length >= 1 ?
                    <div className='w-[100%] lg:border-b-[1px] border-b-[0px] border-gray-200'>
                        <div className='lg:block hidden'>
                            <ul className={`${addToCart ? "pointer-events-none" : "pointer-events-auto"} z-[100] flex py-[5px] bg-white lg:ps-[0px] ps-[15px] lg:mx-auto lg:w-[700px] duration-[0.5s] lg:h-auto lg:gap-[40px] lg:justify-center justify-start`}>
                                <Link href={'/'}><li className='hover:text-amber-500 relative h-12 lg:my-0 my-6 lg:border-0 border-b pb-2 lg:pb-0 border-gray-300 cursor-pointer text-sm font-semibold uppercase text-amber-500 flex items-center gap-1 group'>Home</li></Link>
                                {
                                    categories.map((items, index) => {
                                        return (
                                            <li key={index} className='hover:text-amber-500 relative h-12 lg:my-0 my-6 lg:border-0 border-b pb-2 lg:pb-0 border-gray-300 cursor-pointer text-sm font-semibold uppercase text-gray-600 flex items-center gap-1 group '>{items?.categoryName} <FaAngleDown className={`group-hover:text-amber-500 lg:static absolute right-5`} />
                                                <div className={`invisible group-hover:visible opacity-0 group-hover:opacity-[1] duration-300 overflow-y-hidden origin-top bg-white shadow-md z-20 shadow-amber-600 lg:absolute top-[100%] lg:left-[-20px] left-0 flex min-w-[500px] max-w-[900px]`}>

                                                    {items.subCategoryData?.map((subCat, index) => {
                                                        return (
                                                            <ul key={index} className='p-[20px] hover:block w-auto'>
                                                                <li className='text-gray-800 uppercase hover:text-amber-500 my-[5px] font-semibold'>{subCat.subCategoryName}</li>
                                                                {subCat.subCategoryData?.map((subSubCat, index) => {
                                                                    return (
                                                                        <Link href={'/product-listing'}><li key={index} className='text-gray-500 capitalize py-[5px] font-normal hover:text-amber-500'>{subSubCat.subSubCategoryName}</li></Link>
                                                                    )
                                                                })}
                                                            </ul>
                                                        )
                                                    })}
                                                </div>
                                            </li>
                                        )
                                    })}

                                <li className='hover:text-amber-500 relative h-12 lg:my-0 my-6 lg:border-0 border-b pb-2 lg:pb-0 border-gray-300 cursor-pointer text-sm font-semibold uppercase text-gray-600 flex items-center gap-1 group '>Pages <FaAngleDown className={`group-hover:text-amber-500 group lg:static absolute right-5`} />
                                    <div className='invisible group-hover:visible opacity-0 group-hover:opacity-[1] duration-300 overflow-y-hidden origin-top bg-white shadow-md z-20 shadow-amber-600 lg:absolute top-[100%] lg:left-[-20px] left-0 flex min-w-[250px] max-w-[900px]'>
                                        <ul className='p-[20px] hover:block w-auto'>
                                            <li className='text-gray-700 mb-2 capitalize font-normal hover:text-amber-500 my-[5px]'>About Us</li>
                                            <li className='text-gray-700 mb-2 capitalize font-normal hover:text-amber-500 my-[5px]'>cart</li>
                                            <li className='text-gray-700 mb-2 capitalize font-normal hover:text-amber-500 my-[5px]'>checkout</li>
                                            <li className='text-gray-700 mb-2 capitalize font-normal hover:text-amber-500 my-[5px]'>Frequently questions</li>
                                        </ul>
                                    </div>
                                </li>
                                <li className='hover:text-amber-500 relative h-12 lg:my-0 my-6 lg:border-0 border-b pb-2 lg:pb-0 border-gray-300 cursor-pointer text-sm font-semibold uppercase text-gray-600 flex items-center gap-1 group '>Contact us</li>


                                {/* <Link href={'/'}><li className='text-amber-500 relative h-12 lg:my-0 my-6 lg:border-0 border-b pb-2 lg:pb-0 border-gray-300 cursor-pointer text-sm font-semibold flex items-center gap-1'>HOME</li></Link>
                            <li className='hover:text-amber-500 relative h-12 lg:my-0 my-6 lg:border-0 border-b pb-2 lg:pb-0 border-gray-300 cursor-pointer text-sm font-semibold text-gray-600 flex items-center gap-1 group'>LIVING <FaAngleDown className={`group-hover:text-amber-500 lg:static absolute right-5`} />
                                <div className={`invisible group-hover:visible overflow-y-hidden origin-top bg-white shadow-md z-20 shadow-amber-600 lg:absolute top-[100%] lg:left-[-20px] left-0 flex w-[700px]`}>
                                    <ul className='p-[20px] hidden peer-hover:block hover:block w-[33%]'>
                                        <li className='text-gray-800 hover:text-amber-500 my-[10px] font-semibold'>TABLES</li>
                                        <li className='text-gray-500 py-[8px] hover:text-amber-500'>Side And End Tables</li>
                                        <li className='text-gray-500 py-[8px] hover:text-amber-500'>Nest Of Tables</li>
                                        <li className='text-gray-500 py-[8px] hover:text-amber-500'>Console Tables</li>
                                        <li className='text-gray-500 py-[8px] hover:text-amber-500'>Coffee Tables Sets</li>
                                        <li className='text-gray-500 py-[8px] hover:text-amber-500'>Coffee Tables</li>
                                    </ul>
                                    <ul className='p-[20px] w-[33%]'>
                                        <li className='text-gray-800 hover:text-amber-500 my-[10px] font-semibold'>LIVING STORAGE</li>
                                        <li className='text-gray-500 py-[8px] hover:text-amber-500'>Prayer Units</li>
                                        <li className='text-gray-500 py-[8px] hover:text-amber-500'>Display Units</li>
                                        <li className='text-gray-500 py-[8px] hover:text-amber-500'>Shoe Racks</li>
                                        <li className='text-gray-500 py-[8px] hover:text-amber-500'>Chest Of Drawers</li>
                                        <li className='text-gray-500 py-[8px] hover:text-amber-500'>Cabinets And Sideboard</li>
                                        <li className='text-gray-500 py-[8px] hover:text-amber-500'>Bookshelves</li>
                                        <li className='text-gray-500 py-[8px] hover:text-amber-500'>Tv Units</li>
                                    </ul>
                                    <ul className='p-[20px] w-[33%]'>
                                        <li className='text-gray-800 hover:text-amber-500 my-[10px] font-semibold'>MIRRORS</li>
                                        <li className='text-gray-500 py-[8px] hover:text-amber-500'>Wooden Mirrors</li>
                                    </ul>
                                </div>
                            </li>
                            <li className='group hover:text-amber-400 relative h-12 lg:my-0 my-6 lg:border-0 border-b pb-2 lg:pb-0 border-gray-300 cursor-pointer text-sm font-semibold text-gray-600 flex items-center gap-1'>
                                SOFA <FaAngleDown className='lg:static absolute right-5' />
                                <div className='invisible group-hover:visible overflow-y-hidden origin-top shadow-md shadow-amber-600 absolute lg:left-[-20px] top-[101%] left-0 flex w-[700px] z-20 bg-white'>
                                    <ul className='p-[20px] w-[33%] '>
                                        <li className='text-gray-800 hover:text-amber-500 my-[10px] font-semibold'>SOFA CUMS BED</li>
                                        <li className='text-gray-500 py-[8px] hover:text-amber-500'>Wooden Sofa Cum Bed</li>
                                    </ul>
                                    <ul className='p-[20px] w-[33%]'>
                                        <li className='text-gray-800 hover:text-amber-500 my-[10px] font-semibold'>SOFA SETS</li>
                                        <li className='text-gray-500 py-[8px] hover:text-amber-500'>L Shape Sofa</li>
                                        <li className='text-gray-500 py-[8px] hover:text-amber-500'>1 Seater Sofa</li>
                                        <li className='text-gray-500 py-[8px] hover:text-amber-500'>2 Seater Sofa</li>
                                        <li className='text-gray-500 py-[8px] hover:text-amber-500'>3 Seater Sofa</li>
                                        <li className='text-gray-500 py-[8px] hover:text-amber-500'>Wooden Sofa Sets</li>
                                    </ul>
                                    <ul className='p-[20px] w-[33%]'>
                                        <li className='text-gray-800 hover:text-amber-500 my-[10px] font-semibold'>SWING JHULA</li>
                                        <li className='text-gray-500 py-[8px] hover:text-amber-500'>Wooden jhula</li>
                                    </ul>
                                </div>
                            </li>

                            <li className='group hover:text-amber-400 relative h-12 lg:my-0 my-6 lg:border-0 border-b pb-2 lg:pb-0 border-gray-300 cursor-pointer text-sm font-semibold text-gray-600 flex items-center gap-1'>
                                PAGES <FaAngleDown className='lg:static absolute right-5' />
                                <div className='invisible group-hover:visible lg:block hidden origin-top absolute lg:left-[-20px] left-0 shadow-md shadow-amber-600 z-20 bg-white top-[100%] h-auto w-[200px]'>
                                    <ul className='p-[20px]'>
                                        <li className='text-gray-500 py-[8px] hover:text-amber-500'>About</li>
                                        <li className='text-gray-500 py-[8px] hover:text-amber-500'>Cart</li>
                                        <Link href={'/checkout'}><li className='text-gray-500 py-[8px] hover:text-amber-500'>Checkout</li></Link>
                                        <li className='text-gray-500 py-[8px] hover:text-amber-500'>Frequently Questions</li>
                                    </ul>
                                </div>
                            </li>

                            <Link href={'/contact-us'}><li className='hover:text-amber-400 relative h-12 lg:my-0 my-6 lg:border-0 border-b pb-2 lg:pb-0 border-gray-300 cursor-pointer text-sm font-semibold text-gray-600 flex items-center gap-1'>CONTACT US</li></Link> */}
                            </ul>
                        </div>
                    </div>
                    :
                    <div className='w-[100%] h-[30px] bg-white'></div>
                }
            </header>
        </>
    )
}
