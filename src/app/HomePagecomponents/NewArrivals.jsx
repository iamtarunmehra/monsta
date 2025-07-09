import axios from 'axios';
import React, { useState } from 'react'
import { FaRegHeart } from "react-icons/fa";
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { apiBaseUrl } from '../confilg';

export default function NewArrivals({ items, staticPath, index }) {

    const token = useSelector((store) => store.loginStore.token);
    let [color, setColor] = useState("");

    let {
        _id,
        parentCategory,
        productName,
        productColorName,
        ProductActualPrice,
        ProductSalePrice,
        productImage,

    } = items;

    const addtocart = () => {
        if (token) {
            // Add to cart logic here
            let obj = {
                color,
                product: {
                    id: _id,
                    productName,
                    ProductActualPrice,
                    ProductSalePrice,
                    productImage,
                },
            };
            axios
                .post(`${apiBaseUrl}/cart/add-to-cart`, obj, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => res.data)
                .then((finalRes) => {
                    if (finalRes.status) {
                        Swal.fire({
                            title: "Product Added",
                            icon: "success"
                        })
                    }
                    else {
                        Swal.fire({
                            title: "Please select a color !",
                            icon: "warning"
                        })
                    }
                });
        } else {
            Swal.fire({
                title: "Please login first to add items",
                icon: "warning",
                confirmButtonColor: "#d33",
            });
        }
    };


    return (
        <>
            <div className='w-[100%] bg-white h-[auto] hover:shadow-2xl shadow-lg duration-100 hover:mt-[-5px]'>
                <img className='w-[100%] object-fill h-[200px]' src={staticPath + productImage} />
                <div className='text-center p-[15px]'>
                    <p className='py-[5px] text-gray-500 text-[14px]'>{parentCategory.categoryName}</p>
                    <h3 className='border-b-[1px] border-gray-200 hover:rounded-[50px] rounded-[10px] pb-[10px]'>Caroline Study Tables</h3>
                    <div className='flex gap-[15px] justify-center items-center'>
                        <p className='line-through my-[10px] text-gray-700 text-[12px]'>Rs. {ProductSalePrice}/-</p>
                        <p className='font-semibold my-[10px] text-amber-600'>Rs. {ProductActualPrice}/-</p>
                    </div>
                    <div className="mb-4">
                        <span className="text-sm text-gray-600">Color: </span>
                        {productColorName.length >= 1 &&
                            productColorName.map((items, index) => {
                                return (
                                    <button key={index}
                                        onClick={() => setColor(items._id)}
                                        className={`${color == items._id
                                            ? "bg-green-500 text-white"
                                            : "bg-white text-black"
                                            } mr-[10px] cursor-pointer text-sm border border-gray-300 rounded-md px-3 py-1 hover:bg-green-500 hover:text-white`}
                                    >
                                        {items.colorName}
                                    </button>
                                );
                            })}
                    </div>
                    <div className='flex items-center gap-[5px] justify-center my-[20px]'>
                        <button className='bg-gray-200 hover:rounded-[50px] rounded-[10px] px-[10px] cursor-pointer py-[10px] hover:bg-red-500 hover:text-white'><FaRegHeart /></button>
                        <button onClick={addtocart} className='bg-gray-200 hover:rounded-[50px] rounded-[10px] px-[10px] cursor-pointer py-[7.5px] hover:bg-amber-400 hover:text-white text-[14px]'>Add to Cart</button>
                    </div>
                </div>
            </div>


        </>
    )
}
