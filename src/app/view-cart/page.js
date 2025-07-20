'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { FaAngleRight } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import ShoppingCart from '../otherComponents/ShoppingCart';
import { showCart, updateCartQuantity } from '../slice/cartSlice';
import Swal from 'sweetalert2';
import axios from 'axios';
import { apiBaseUrl } from '../confilg';
import Image from 'next/image';

export default function Page() {

    const [updatedQuantities, setUpdatedQuantities] = useState({});
    let token = useSelector((store) => store.loginStore.token)

    let dispatch = useDispatch()
    const cartData = useSelector((store) => store.cartStore.cartAllData);
    const staticPath = useSelector((store) => store.cartStore.imageBasePath);

    let handleQty = (id, type) => {
        setUpdatedQuantities(prev => {
            const currentQuantity = prev[id] ?? (cartData.find(item => item._id === id)?.quantity || 1)
            let newQty = type === 'increase' ? currentQuantity + 1 : currentQuantity - 1;
            if (newQty < 1) newQty = 1; // minimum quantity 1
            return {
                ...prev,
                [id]: newQty
            };
        });
    }


    let finalUpdateQty = async () => {
        try {
            // Prepare data in a format your API expects
            // For example, an array of { id, quantity } objects
            const updates = Object.entries(updatedQuantities).map(([id, quantity]) => ({
                id,
                quantity,
            }));

            // Call your API (adjust endpoint as per your backend)
            const res = await axios.put(`${apiBaseUrl}/cart/update-cart`, { updates }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (res.data.status == 1) {
                Swal.fire({
                    title: "cart updated",
                    icon: "success"
                });
                // Optionally, dispatch redux action to update cart state
                // Or refetch cart data from server

            }
        } catch (error) {
            Swal.fire('Error', 'Failed to update cart.', 'error');
            console.error(error);
        }
    }


    return (
        <div className='max-w-[1320px] mx-auto px-4'>
            <h1 className='text-center text-3xl font-semibold text-gray-800 py-6 flex items-center gap-2 justify-center'>
                Shopping Cart
            </h1>

            <div className='text-center flex justify-center mb-4'>
                <Link href='/' className='hover:text-amber-500 flex gap-2 items-center'>
                    Home <FaAngleRight />
                </Link>
                <span className='text-amber-500 ml-2'>Shopping Cart</span>
            </div>

            <table className='w-full my-8'>
                <thead>
                    <tr className='bg-amber-300 text-gray-800'>
                        <th className='py-3 border-2 border-amber-400 '>Delete</th>
                        <th className='py-3 border-2 border-amber-400 '>Image</th>
                        <th className='py-3 border-2 border-amber-400 '>Product</th>
                        <th className='py-3 border-2 border-amber-400 '>Price</th>
                        <th className='py-3 border-2 border-amber-400 '>Quantity</th>
                        <th className='py-3 border-2 border-amber-400 '>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {cartData.length >= 1 ? (
                        cartData.map((items, index) => {
                            return (
                                <tr key={index} className='text-center'>
                                    <td className='py-3 border-[1px] border-gray-200'>
                                        <button className='text-red-500 hover:text-white px-[10px] rounded cursor-pointer py-[5px] hover:bg-red-500'>Remove Item</button>
                                    </td>
                                    <td className='py-3 border-[1px] border-gray-200'>
                                        <div className='w-[120px] h-[80px] mx-auto'>
                                            <Image
                                                src={staticPath + items.product.productImage}
                                                alt={items.product.productName}
                                                className='w-full h-full object-cover rounded'
                                            />
                                        </div>
                                    </td>
                                    <td className='py-3 border-[1px] border-gray-200'>{items.product.productName}</td>
                                    <td className='py-3 border-[1px] border-gray-200'>Rs. {items.product.ProductActualPrice}</td>
                                    <td className='py-3 border-[1px] border-gray-200'>
                                        <div className=''>
                                            <span onClick={() => handleQty(items._id, 'decrease')} className='select-none border-[1px] border-gray-300 cursor-pointer duration-500 hover:bg-red-500 hover:text-white text-[17px] py-[5px] px-[15px]'>-</span>
                                            <span className='select-none border-[1px] border-gray-300 py-[5px] text-[17px] px-[15px]'>{updatedQuantities[items._id] ?? items.quantity}</span>
                                            <span onClick={() => handleQty(items._id, 'increase')} className='select-none border-[1px] border-gray-300 cursor-pointer duration-500 hover:bg-amber-400 hover:text-white text-[17px] py-[5px] px-[15px]'>+</span>
                                        </div>
                                    </td>

                                    <td className='py-3 border-[1px] border-gray-200 font-semibold'>Rs. {(updatedQuantities[items._id] ?? items.quantity) * items.product.ProductActualPrice}
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan={6} className='text-center py-6 text-gray-500'>
                                Your cart is empty.
                            </td>
                        </tr>
                    )}
                    <tr>
                        <td colSpan={6} className='text-right py-5 border-[1px] px-3 border-gray-200 '>
                            <button onClick={finalUpdateQty} className='bg-amber-600 hover:bg-amber-800 duration-700 text-white px-4 rounded uppercase text-[14px] font-semibold cursor-pointer py-[7px]'>Update Cart</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
