import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { apiBaseUrl } from "../confilg";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

export default function FeatureItmes({ items, staticPath, index }) {

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



    const addtoCart = () => {
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
                            icon: "success",
                            timer: 2000
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
            <div key={index} className="w-[100%] rounded-[10px] bg-white h-[auto] hover:shadow-2xl shadow-lg duration-100 hover:mt-[-5px]">
                <img
                    className="w-[100%] object-cover h-[200px]"
                    src={staticPath + productImage}
                />

                <div className="text-center p-[15px]">
                    <p className="py-[5px] text-gray-500 text-[14px]">
                        {parentCategory?.categoryName}
                    </p>
                    <h3 className="border-b-[1px] border-gray-200 hover:rounded-[50px] rounded-[10px] pb-[10px]">
                        {productName}
                    </h3>
                    <div className="flex gap-[15px] justify-center items-center">
                        <p className="line-through my-[10px] text-gray-700 text-[12px]">
                            Rs. {ProductSalePrice}/-
                        </p>
                        <p className="font-semibold my-[10px] text-amber-600">
                            Rs. {ProductActualPrice}/-
                        </p>
                    </div>
                    <div className="mb-4">
                        <span className="text-sm text-gray-600">Color: </span>
                        {productColorName.length >= 1 &&
                            productColorName.map((colorItems, index) => {
                                return (
                                    <button multiple key={index}
                                        onClick={() => setColor(colorItems._id)}
                                        className={`${color == colorItems._id
                                            ? "bg-green-500 text-white"
                                            : "bg-white text-black"
                                            } mr-[10px] cursor-pointer text-sm border border-gray-300 rounded-md px-3 py-1 hover:bg-green-500 hover:text-white`}
                                    >
                                        {colorItems.colorName}
                                    </button>
                                );
                            })}
                    </div>
                    <div className="flex items-center gap-[5px] justify-center my-[20px]">
                        <button className="bg-gray-200 hover:rounded-[50px] rounded-[10px] px-[10px] cursor-pointer py-[10px] hover:bg-red-500 hover:text-white">
                            <FaRegHeart />
                        </button>
                        <button
                            onClick={addtoCart}
                            className="bg-gray-200 hover:rounded-[50px] rounded-[10px] px-[10px] cursor-pointer py-[7.5px] hover:bg-amber-400 hover:text-white text-[14px]"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
