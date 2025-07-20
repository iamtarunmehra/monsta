import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { updateCartQuantity } from '../slice/cartSlice';

export default function ShoppingCart({ items, staticPath, index }) {

    return (
        <tr key={index} className='text-center'>
            <td className='py-3 border-[1px] border-gray-200'>
                <button className='text-red-500 hover:text-white px-[10px] rounded cursor-pointer py-[5px] hover:bg-red-500'>Remove Item</button>
            </td>
            <td className='py-3 border-[1px] border-gray-200'>
                <div className='w-[120px] h-[80px] mx-auto'>
                    <img
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
                    <span className='select-none border-[1px] border-gray-300 cursor-pointer duration-500 hover:bg-red-500 hover:text-white text-[17px] py-[5px] px-[15px]'>-</span>
                    <span className='select-none border-[1px] border-gray-300 py-[5px] text-[17px] px-[15px]'>{items.quantity}</span>
                    <span className='select-none border-[1px] border-gray-300 cursor-pointer duration-500 hover:bg-amber-400 hover:text-white text-[17px] py-[5px] px-[15px]'>+</span>
                </div>
            </td>

            <td className='py-3 border-[1px] border-gray-200 font-semibold'>Rs. {items.quantity * items.product.ProductActualPrice}</td>
        </tr>
    )
}
