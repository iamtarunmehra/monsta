'use client'
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { FaAngleRight } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { apiBaseUrl, RAZORPAY_KEY_ID } from '../confilg';
import Swal from 'sweetalert2';
import { useRazorpay } from "react-razorpay";
import { showCart } from '../slice/cartSlice';
import { redirect } from 'next/navigation';


export default function Page() {
    const { Razorpay } = useRazorpay()
    let [showShipping, setShowShipping] = useState(false)
    let cartItems = useSelector((store) => store.cartStore.cartAllData)
    cartItems = Array.isArray(cartItems) ? cartItems : []; // ensure it's an array
    let token = useSelector((store) => store.loginStore.token)
    let totalAmount = useSelector((store) => store.cartStore.totalAmount)
    let totalQty = cartItems.reduce((total, item) => total + (item.quantity), 0)
    let dispatch = useDispatch()
    let [orderStatus, setOrderStatus] = useState(false)

    let [formData, setFormData] = useState({
        bName: '',
        bMobileNumer: '',
        bEmail: '',
        bPhone: '',
        bAddress: '',
        bCountry: '',
        bState: '',
        sName: '',
        sMobileNumer: '',
        sEmail: '',
        sPhone: '',
        sAddress: '',
        sCountry: '',
        sState: '',
        sCity: '',
        orderNote: '',
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        let obj = { ...formData }
        obj[name] = value
        setFormData(obj)
    }

    let orderSave = (event) => {
        event.preventDefault();

        let myCart = cartItems.map((item) => {
            let obj = { ...item.product }
            obj['quantity'] = item.quantity
            obj['color'] = item.productColorName
            return obj
        })

        let paymentMethod = event.target.paymentMethod.value
        let finalObj = {
            billingAddress: formData,
            orderItems: myCart,
            paymentMethod,
            totalAmount,
            orderQuantity: totalQty,
        }
        console.log(finalObj)

        if (myCart.length >= 1) {
            axios.post(`${apiBaseUrl}/cart/order-save`, finalObj, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => res.data)
                .then((finalRes) => {
                    if (finalRes.status == 1) {
                        setOrderStatus(true)
                        Swal.fire({
                            title: "Order Placed",
                        })
                        dispatch(showCart([]));
                    }
                    else {
                        const options = {
                            key: RAZORPAY_KEY_ID,
                            amount: finalRes.amount, // Amount in paise
                            currency: "INR",
                            name: "WSCube Tech",
                            description: "Test Transaction",
                            order_id: finalRes.id, // Generate order_id on server
                            handler: (response) => {
                                console.log(response);
                                Swal.fire({
                                    title: "Payment Successful",
                                    icon: "success"
                                })
                            },
                            prefill: {
                                name: "John Doe",
                                email: "john.doe@example.com",
                                contact: "9999999999",
                            },
                            theme: {
                                color: "#F37254",
                            },
                        };
                        const razorpayInstance = new Razorpay(options);
                        razorpayInstance.open();
                    }
                })
        }
    }

    useEffect(() => {
        if (orderStatus) {
            redirect('/')
        }
    }, [orderStatus])

    return (
        <div className='w-[100%]'>
            <h1 className='text-center text-3xl font-semibold text-gray-800 py-[20px] flex items-center gap-[10px] justify-center'>Checkout</h1>
            <div className='text-center flex justify-center mb-[15px]'>
                <Link className='hover:text-amber-500 flex gap-[10px] items-center' href={'/'}>Home <FaAngleRight /> &nbsp;</Link>
                <span className='text-amber-500'>Checkout</span>
            </div>
            <form onSubmit={orderSave} className='m-[80px] gap-15 grid grid-cols-[55%_auto]'>

                <div>
                    <h2 className='bg-amber-500 font-bold py-[10px] px-[10px] text-white w-[100%]'>BILLING DETAILS</h2>
                    <div className='my-[20px]'>
                        <div className='grid grid-cols-2 gap-5 my-[10px]'>
                            <div>
                                <p className='text-gray-700'>Name*</p>
                                <input onChange={handleInputChange} name='bName' type='text' required className='px-[10px] mb-[5px] w-[100%] py-[7px] rounded-[5px] border-gray-400 border-[1px]' />
                            </div>
                            <div>
                                <p className='text-gray-700'>Mobile Number*</p>
                                <input onChange={handleInputChange} name='bMobileNumer' type='text' required className='px-[10px] mb-[5px] w-[100%] py-[7px] rounded-[5px] border-gray-400 border-[1px]' />
                            </div>
                        </div>
                        <div className='grid grid-cols-2 gap-5'>
                            <div>
                                <p className='text-gray-700'>Billing Email*</p>
                                <input onChange={handleInputChange} name='bEmail' type='text' required className='px-[10px] mb-[5px] w-[100%] py-[7px] rounded-[5px] border-gray-400 border-[1px]' />
                            </div>
                            <div>
                                <p className='text-gray-700'>Billing Phone*</p>
                                <input onChange={handleInputChange} name='bPhone' type='text' required className='px-[10px] mb-[5px] w-[100%] py-[7px] rounded-[5px] border-gray-400 border-[1px]' />
                            </div>
                        </div>
                        <div className='my-[10px]'>
                            <p className='text-gray-700'>Billing Address*</p>
                            <input onChange={handleInputChange} name='bAddress' type='text' required className='px-[10px] mb-[5px] w-[100%] py-[7px] rounded-[5px] border-gray-400 border-[1px]' />
                        </div>
                        <div className='my-[15px]'>
                            <p className='text-gray-700'>Country*</p>
                            <select name='bCountry' onChange={handleInputChange} className='px-[10px] py-[10px] border-gray-400 border-[1px] w-[100%] rounded-[5px]'>
                                <option className='text-gray-600'>Select Country</option>
                                <option value={'india'}>India</option>
                                <option>Australia</option>
                                <option>America</option>
                                <option>South africa</option>
                            </select>
                        </div>
                        <div className='grid grid-cols-2 gap-5'>
                            <div>
                                <p className='text-gray-700'>State*</p>
                                <input onChange={handleInputChange} name='bState' type='text' required className='px-[10px] mb-[5px] w-[100%] py-[7px] rounded-[5px] border-gray-400 border-[1px]' />
                            </div>
                            <div>
                                <p className='text-gray-700'>City*</p>
                                <input onChange={handleInputChange} name='bCity' type='text' required className='px-[10px] mb-[5px] w-[100%] py-[7px] rounded-[5px] border-gray-400 border-[1px]' />
                            </div>
                        </div>
                    </div>

                    <div className='w-[100%] mt-[30px]'>
                        <div className='flex gap-[10px] items-center'>
                            <input checked={showShipping} className='w-4 h-4' type='checkbox' />
                            <h2 onClick={() => setShowShipping(!showShipping)} className='bg-amber-500 cursor-pointer font-bold py-[10px] px-[10px] text-white w-[100%] mb-[5px]'>Ship To A Different Address ?</h2>
                        </div>

                        <div className={`${showShipping ? "translate-y-0 opacity-100 max-h-[1000px]" : "translate-y-10 opacity-0 max-h-0 overflow-hidden"} transition-all duration-500  `}>
                            <div className='grid grid-cols-2 gap-5 my-[10px]'>
                                <div>
                                    <p className='text-gray-700'>Shipping Name*</p>
                                    <input onChange={handleInputChange} name='sName' type='text' required className='px-[10px] mb-[5px] w-[100%] py-[7px] rounded-[5px] border-gray-400 border-[1px]' />
                                </div>
                                <div>
                                    <p className='text-gray-700'>Shipping Email*</p>
                                    <input onChange={handleInputChange} name='sEmail' type='text' required className='px-[10px] mb-[5px] w-[100%] py-[7px] rounded-[5px] border-gray-400 border-[1px]' />
                                </div>
                            </div>
                            <div className='my-[10px]'>
                                <p className='text-gray-700'>Shipping Mobile Number*</p>
                                <input onChange={handleInputChange} name='sMobileNumer' type='text' required className='px-[10px] mb-[5px] w-[100%] py-[7px] rounded-[5px] border-gray-400 border-[1px]' />
                            </div>
                            <div className='my-[10px]'>
                                <p className='text-gray-700'>Shipping Phone*</p>
                                <input onChange={handleInputChange} name='sPhone' type='text' required className='px-[10px] mb-[5px] w-[100%] py-[7px] rounded-[5px] border-gray-400 border-[1px]' />
                            </div>
                            <div className='my-[10px]'>
                                <p className='text-gray-700'>Shipping Address*</p>
                                <input onChange={handleInputChange} name='sAddress' type='text' required className='px-[10px] mb-[5px] w-[100%] py-[7px] rounded-[5px] border-gray-400 border-[1px]' />
                            </div>
                            <div className='my-[15px]'>
                                <p className='text-gray-700'>Country*</p>
                                <select name='sCountry' onChange={handleInputChange} className='px-[10px] py-[10px] border-gray-400 border-[1px] w-[100%] rounded-[5px]'>
                                    <option className='text-gray-600'>Select Country</option>
                                    <option value={'india'}>India</option>
                                    <option value={'australia'}>Australia</option>
                                    <option value={'america'}>America</option>
                                    <option value={'southAfrica'}>South africa</option>
                                </select>
                            </div>
                            <div className='grid grid-cols-2 gap-5'>
                                <div>
                                    <p className='text-gray-700'>State*</p>
                                    <input onChange={handleInputChange} name='sState' type='text' required className='px-[10px] mb-[5px] w-[100%] py-[7px] rounded-[5px] border-gray-400 border-[1px]' />
                                </div>
                                <div>
                                    <p className='text-gray-700'>City*</p>
                                    <input onChange={handleInputChange} name='sCity' type='text' required className='px-[10px] mb-[5px] w-[100%] py-[7px] rounded-[5px] border-gray-400 border-[1px]' />
                                </div>
                            </div>
                        </div>
                        <div className='my-[15px]'>
                            <p>Order Notes</p>
                            <textarea name='orderNote' className='w-[100%] h-[70px] border-[1px] border-gray-300 rounded-[5px]' />
                        </div>
                        <div className='my-[20px]'>
                            <h3 className='text-[22px] font-bold uppercase my-[10px]'>Payment Method</h3>
                            <div className='flex my-[5px] gap-2 items-center'>
                                <input name='paymentMethod' className='w-6 h-4 cursor-pointer' value={1} type='radio' />
                                <p>Cash On Delivery</p>
                            </div>
                            <div className='flex my-[5px] gap-2 items-center'>
                                <input name='paymentMethod' className='w-6 h-4 cursor-pointer' value={2} type='radio' />
                                <p>Online Payment</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className=''>
                    <h2 className='bg-amber-500 font-bold py-[10px] px-[10px] text-white w-[100%]'>YOUR ORDERS</h2>
                    <table className='w-[100%] mt-[5px] '>
                        <thead className=''>
                            <tr className=''>
                                <th colSpan={2} className='bg-amber-200 border-[1px] border-amber-400  py-[15px]'>Product</th>
                                <th colSpan={2} className='bg-amber-200 border-[1px] border-amber-400  py-[15px]'>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.length >= 1 ?
                                cartItems.map((items, index) => {
                                    return (
                                        <tr key={index}>
                                            <td colSpan={2} className='text-center text-[15px] text-gray-700 border-[1px] border-gray-300 py-[10px]'>{items.product.productName} * {items.quantity}</td>
                                            <td colSpan={2} className='text-center text-[15px] text-gray-700 border-[1px] border-gray-300 py-[10px]'>Rs. {items.quantity * items.product.ProductActualPrice}</td>
                                        </tr>
                                    )
                                })
                                :
                                <tr>
                                    <td colSpan={6} className='text-center border-[1px] border-gray-300 py-[10px]'>Loading....</td>
                                </tr>
                            }

                            <tr className=''>
                                <td colSpan={2} className='bg-amber-600 text-white font-semibold text-[17px] border-[1px] text-center border-amber-400  py-[15px]'>TOTAL</td>
                                <td colSpan={2} className='bg-amber-600 text-white font-semibold text-[17px] border-[1px] text-center border-amber-400  py-[15px]'>Rs. {totalAmount} /-</td>
                            </tr>

                        </tbody>
                    </table>
                    <Link href={'/'}><p className='m-[5px] hover:text-amber-700 hover:underline mt-[25px] cursor-pointer'>Add More Products +</p></Link>
                    <button type='submit' className='px-[25px] hover:bg-amber-600 cursor-pointer py-[8px] mt-[10px] rounded-xl bg-amber-500 text-white'>
                        Place Order
                    </button>
                </div>
            </form>
        </div>
    )
}
