import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import Swal from "sweetalert2"; // Make sure this is installed: npm install sweetalert2
import axios from "axios";
import { apiBaseUrl } from "../confilg";

export default function BestSelling({ items, bsStaticPath}) {
    const scrollY = window.scrollY;
    let [color, setColor] = useState("");
    const token = useSelector((store) => store.loginStore.token);
    const {
        _id,
        productName,
        productImage,
        productColorName,
        ProductSalePrice,
        ProductActualPrice,
        parentCategory,
    } = items;

    const addtoCart = (id) => {
        if (token) {
            // Add to cart logic here
            let obj = {
                color,
                product: {
                    id: _id,
                    productName,
                    ProductSalePrice,
                    ProductActualPrice,
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
                        window.location.reload();
                        window.scrollTo(0, scrollY);
                        Swal.fire({
                            title: "Product Added",
                            icon: "success"
                        })
                    }
                    else {
                        Swal.fire({
                            title: "Please select a color",
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
        <div className="hover:shadow-2xl max-w-[300px] bg-white rounded-[10px] overflow-hidden cursor-pointer duration-300">
            <div className="overflow-hidden">
                <img
                    className="w-full h-[200px] object-cover hover:scale-110 duration-300"
                    src={bsStaticPath + productImage}
                    alt={productName}
                />
            </div>

            <div className="text-center p-4">
                <p className="text-sm text-gray-500 mb-1">
                    {parentCategory?.categoryName}
                </p>

                <h3 className="text-lg font-medium mb-2 border-b border-gray-200 pb-2">
                    {productName}
                </h3>

                <div className="flex justify-center items-center gap-3 mb-2">
                    <p className="text-sm line-through text-gray-500">
                        Rs. {ProductActualPrice}
                    </p>
                    <p className="text-amber-600 font-semibold">
                        Rs. {ProductSalePrice}/-
                    </p>
                </div>

                <div className="mb-4">
                    <span className="text-sm text-gray-600">Color: </span>
                    {productColorName.length >= 1 &&
                        productColorName.map((items, index) => {
                            return (
                                <button
                                    key={index}
                                    onClick={(e) => { setColor(items._id); e.stopPropagation() }}
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

                <div className="flex justify-center items-center gap-4">
                    <button onClick={(e) => e.stopPropagation()} className="bg-gray-200 cursor-pointer p-2 rounded-md hover:bg-red-500 hover:text-white duration-300">
                        <FaHeart />
                    </button>
                    <button
                        onClick={(e) => { addtoCart(_id); e.stopPropagation() }}
                        className="bg-gray-200 cursor-pointer text-sm px-4 py-2 rounded-md hover:bg-amber-400 hover:text-white duration-300"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
