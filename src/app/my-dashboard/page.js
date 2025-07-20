"use client";
import React, { useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { logoutUser } from "../slice/loginSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Page() {
    let [activeTab, setActiveTab] = useState("dashboard");

    let router = useRouter();

    let user = useSelector((store) => store.loginStore.user);
    let dispatch = useDispatch();

    let logout = () => {
        Swal.fire({
            title: "Are you sure want to Logout?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#401A1A",
            cancelButtonColor: "#AB8989",
            confirmButtonText: "Yes",
        }).then((res) => {
            if (res.isConfirmed) {
                dispatch(logoutUser());
                Swal.fire({
                    title: "Successfully Logout",
                    icon: "success",
                });
                router.push("/");
            }
        });
    };

    return (
        <>
            <div className="h-auto">
                <h1 className="text-[35px] text-center mt-5 text-gray-700 font-bold">My Dashboard</h1>
                <div className="flex justify-center items-center">
                    <span>Home</span>
                    <FaAngleRight />
                    <span className="text-amber-500">My Dashboard</span>
                </div>
                <div className="grid grid-cols-[24%_auto] max-w-[1320px] m-[20px_auto]">
                    <div className="max-w-[300px]">
                        <ul>
                            <li
                                onClick={() => setActiveTab("dashboard")}
                                className={`py-[10px] my-[10px] px-[25px] duration-500 w-[280px] hover:w-[290px] text-amber-700 border-2 border-amber-700  hover:text-white rounded-l-[25px] text-[14px] rounded-r-[5px] hover:rounded-l-[5px] hover:rounded-r-[20px] cursor-pointer hover:bg-amber-700 ${activeTab === "dashboard"
                                    ? "bg-amber-700 text-white"
                                    : "bg-white "
                                    }`}
                            >
                                My Dashboard
                            </li>
                            <li
                                onClick={() => setActiveTab("orders")}
                                className={`py-[10px] my-[10px] px-[25px] duration-500 w-[280px] hover:w-[290px] text-amber-700 border-2 border-amber-700  hover:text-white rounded-l-[25px] text-[14px] rounded-r-[5px] hover:rounded-l-[5px] hover:rounded-r-[20px] cursor-pointer hover:bg-amber-700 ${activeTab === "orders" ? "bg-amber-700 text-white" : "bg-white "
                                    }`}
                            >
                                Orders
                            </li>
                            <li
                                onClick={() => setActiveTab("addresses")}
                                className={`py-[10px] my-[10px] px-[25px] duration-500 w-[280px] hover:w-[290px] text-amber-700 border-2 border-amber-700  hover:text-white rounded-l-[25px] text-[14px] rounded-r-[5px] hover:rounded-l-[5px] hover:rounded-r-[20px] cursor-pointer hover:bg-amber-700 ${activeTab === "addresses"
                                    ? "bg-amber-700 text-white"
                                    : "bg-white "
                                    }`}
                            >
                                Addresses
                            </li>
                            <li
                                onClick={() => setActiveTab("myprofile")}
                                className={`py-[10px] my-[10px] px-[25px] duration-500 w-[280px] hover:w-[290px] text-amber-700 border-2 border-amber-700  hover:text-white rounded-l-[25px] text-[14px] rounded-r-[5px] hover:rounded-l-[5px] hover:rounded-r-[20px] cursor-pointer hover:bg-amber-700 ${activeTab === "myprofile"
                                    ? "bg-amber-700 text-white"
                                    : "bg-white "
                                    }`}
                            >
                                My Profile
                            </li>
                            <li
                                onClick={() => setActiveTab("changepassword")}
                                className={`py-[10px] my-[10px] px-[25px] duration-500 w-[280px] hover:w-[290px] text-amber-700 border-2 border-amber-700  hover:text-white rounded-l-[25px] text-[14px] rounded-r-[5px] hover:rounded-l-[5px] hover:rounded-r-[20px] cursor-pointer hover:bg-amber-700 ${activeTab === "changepassword"
                                    ? "bg-amber-700 text-white"
                                    : "bg-white "
                                    }`}
                            >
                                Change Passowrd
                            </li>
                            <li
                                onClick={logout}
                                className={`py-[10px] my-[10px] px-[25px] duration-500 w-[280px] hover:w-[290px] text-amber-700 border-2 border-amber-700  hover:text-white rounded-l-[25px] text-[14px] rounded-r-[5px] hover:rounded-l-[5px] hover:rounded-r-[20px] cursor-pointer hover:bg-amber-700 ${activeTab === "logout" ? "bg-amber-700 text-white" : "bg-white "
                                    }`}
                            >
                                Logout
                            </li>
                        </ul>
                    </div>
                    {activeTab === "dashboard" && <Dashboard />}
                    {activeTab === "orders" && <Orders />}
                    {activeTab === "addresses" && <Address />}
                    {activeTab === "myprofile" && <MyProfile />}
                    {activeTab === "changepassword" && <ChangePassword />}
                </div>
            </div>
        </>
    );
}

function Dashboard() {
    return (
        <div>
            <h2 className="mt-2 text-[25px]">My Dashboard</h2>
            <p className="mt-2">
                From your account dashboard. you can easily check & view your recent
                orders, manage your shipping and billing addresses and Edit your
                password and account details.
            </p>
        </div>
    );
}

function Orders() {
    return (
        <div>
            <h2 className="mt-0 text-[25px]">Orders</h2>
            <table className="w-[100%] my-[15px]">
                <thead>
                    <tr className="bg-amber-600">
                        <th className="border-[1px] border-amber-200 py-[8px] text-white">
                            Order
                        </th>
                        <th className="border-[1px] border-amber-200 py-[8px] text-white">
                            Date
                        </th>
                        <th className="border-[1px] border-amber-200 py-[8px] text-white">
                            Status
                        </th>
                        <th className="border-[1px] border-amber-200 py-[8px] text-white">
                            Total
                        </th>
                        <th className="border-[1px] border-amber-200 py-[8px] text-white">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border-[1px] border-amber-200 py-[8px] text-center text-[14px]">
                            1
                        </td>
                        <td className="border-[1px] border-amber-200 py-[8px] text-center text-[14px]">
                            May 10, 2018
                        </td>
                        <td className="border-[1px] border-amber-200 py-[8px] text-center text-[14px]">
                            Completed
                        </td>
                        <td className="border-[1px] border-amber-200 py-[8px] text-center text-[14px]">
                            Rs. 5,000 For 1 Item
                        </td>
                        <td className="border-[1px] border-amber-200 py-[8px] text-center text-[14px]">
                            View
                        </td>
                    </tr>
                    <tr>
                        <td className="border-[1px] border-amber-200 py-[8px] text-center text-[14px]">
                            2
                        </td>
                        <td className="border-[1px] border-amber-200 py-[8px] text-center text-[14px]">
                            May 15, 2018
                        </td>
                        <td className="border-[1px] border-amber-200 py-[8px] text-center text-[14px]">
                            Processing
                        </td>
                        <td className="border-[1px] border-amber-200 py-[8px] text-center text-[14px]">
                            Rs. 10,000 For 1 Item
                        </td>
                        <td className="border-[1px] border-amber-200 py-[8px] text-center text-[14px]">
                            View
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

function Address() {
    return (
        <div>
            <p>
                The following addresses will be used on the checkout page by default.
            </p>
            <div className="grid grid-cols-2 gap-[20px]">

                <div className="my-[15px]">
                    <h2 className="text-[20px] mb-[5px] text-amber-700">Billing address</h2>
                    <form className="p-[20px] border-[1px] border-gray-300 rounded-[5px]">
                        <div className="my-[10px]">
                            <p className="text-[15px]">Billing Name*</p>
                            <input className="w-[100%] border-[1px] rounded-[5px] mt-[5px] border-gray-300 px-[10px] py-[8px]" />
                        </div>
                        <div className="my-[10px]">
                            <p className="text-[15px]">Billing Email*</p>
                            <input className="w-[100%] border-[1px] rounded-[5px] mt-[5px] border-gray-300 px-[10px] py-[8px]" />
                        </div>
                        <div className="my-[10px]">
                            <p className="text-[15px]">Billing Mobile Number*</p>
                            <input className="w-[100%] border-[1px] rounded-[5px] mt-[5px] border-gray-300 px-[10px] py-[8px]" />
                        </div>
                        <div className="my-[10px]">
                            <p className="text-[15px]">Billing Address*</p>
                            <input className="w-[100%] border-[1px] rounded-[5px] mt-[5px] border-gray-300 px-[10px] py-[8px]" />
                        </div>
                        <div className="my-[10px]">
                            <p className="text-[15px]">Country*</p>
                            <select className="w-[100%] border-[1px] rounded-[5px] mt-[5px] border-gray-300 px-[10px] py-[12px] text-[15px] text-gray-600">
                                <option>Select Country</option>
                                <option>India</option>
                            </select>
                        </div>
                        <div className="my-[10px]">
                            <p className="text-[15px]">State*</p>
                            <input className="w-[100%] border-[1px] rounded-[5px] mt-[5px] border-gray-300 px-[10px] py-[8px]" />
                        </div>
                        <div className="my-[10px]">
                            <p className="text-[15px]">City*</p>
                            <input className="w-[100%] border-[1px] rounded-[5px] mt-[5px] border-gray-300 px-[10px] py-[8px]" />
                        </div>
                    </form>
                </div>

                <div className="my-[15px]">
                    <h2 className="text-[20px] mb-[5px] text-amber-700">Shipping address</h2>
                    <form className="p-[20px] border-[1px] border-gray-300 rounded-[5px]">
                        <div className="my-[10px]">
                            <p className="text-[15px]">Shipping Name*</p>
                            <input className="w-[100%] border-[1px] rounded-[5px] mt-[5px] border-gray-300 px-[10px] py-[8px]" />
                        </div>
                        <div className="my-[10px]">
                            <p className="text-[15px]">Shipping Email*</p>
                            <input className="w-[100%] border-[1px] rounded-[5px] mt-[5px] border-gray-300 px-[10px] py-[8px]" />
                        </div>
                        <div className="my-[10px]">
                            <p className="text-[15px]">Shipping Mobile Number*</p>
                            <input className="w-[100%] border-[1px] rounded-[5px] mt-[5px] border-gray-300 px-[10px] py-[8px]" />
                        </div>
                        <div className="my-[10px]">
                            <p className="text-[15px]">Shipping Address*</p>
                            <input className="w-[100%] border-[1px] rounded-[5px] mt-[5px] border-gray-300 px-[10px] py-[8px]" />
                        </div>
                        <div className="my-[10px]">
                            <p className="text-[15px]">Country*</p>
                            <select className="w-[100%] border-[1px] rounded-[5px] mt-[5px] border-gray-300 px-[10px] py-[12px] text-[15px] text-gray-600">
                                <option>Select Country</option>
                                <option>India</option>
                            </select>
                        </div>
                        <div className="my-[10px]">
                            <p className="text-[15px]">State*</p>
                            <input className="w-[100%] border-[1px] rounded-[5px] mt-[5px] border-gray-300 px-[10px] py-[8px]" />
                        </div>
                        <div className="my-[10px]">
                            <p className="text-[15px]">City*</p>
                            <input className="w-[100%] border-[1px] rounded-[5px] mt-[5px] border-gray-300 px-[10px] py-[8px]" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}


function MyProfile() {
    return (
        <div>
            <h2 className="text-[25px]">My Profile</h2>
            <form className="w-[90%] mt-[20px] p-[25px] border-[1px] border-gray-300 rounded-[5px]">
                <input className="" type='radio' /> <span className='text-[15px] text-gray-800'> Mr.</span>
                <input className=" ml-[10px]" type='radio' /> <span className="text-[15px] text-gray-800"> Mrs.</span>
                <div className="my-[10px]">
                    <p className="text-[15px]">Name*</p>
                    <input className="w-[100%] border-[1px] rounded-[5px] mt-[5px] border-gray-300 px-[10px] py-[8px]" />
                </div>
                <div className="my-[10px]">
                    <p className="text-[15px]">Email*</p>
                    <input className="w-[100%] border-[1px] rounded-[5px] mt-[5px] border-gray-300 px-[10px] py-[8px]" />
                </div>
                <div className="my-[10px]">
                    <p className="text-[15px]">Mobile Number*</p>
                    <input className="w-[100%] border-[1px] rounded-[5px] mt-[5px] border-gray-300 px-[10px] py-[8px]" />
                </div>
                <div className="my-[10px]">
                    <p className="text-[15px]">Address*</p>
                    <input className="w-[100%] border-[1px] rounded-[5px] mt-[5px] border-gray-300 px-[10px] py-[8px]" />
                </div>
            </form>
        </div>
    )
}

function ChangePassword() {
    let token = useSelector((store) => store.loginStore.token)

    let changePassword = (event) => {
        event.preventDefault()
        let confirmPassword = event.target.confirmPassword.value
        let newPassword = event.target.newPassword.value
        let oldPassword = event.target.oldPassword.value
        let obj = {
            oldPassword,
            newPassword
        }
        if (newPassword === confirmPassword) {
            axios.put(`${apiBaseUrl}/user/change-password`, obj, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
                .then((res) => {
                    if (res.data.status) {
                        Swal.fire({
                            title: "Password has been changed",
                            icon: "success"
                        })
                        event.target.reset();
                    }
                    else {
                        Swal.fire({
                            title: "Old password is Incorrect",
                            icon: "error"
                        })
                    }
                })
        }
        else {
            Swal.fire({
                title: "New and Confirm password doesn't Matched !",
                icon: "error"
            })
        }

    }
    return (
        <div className="w-[60%] mt-[10px] bg-white p-6 shadow-lg rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Change Password</h2>
            <form onSubmit={changePassword}>
                <div className="mb-4">
                    <label className="block text-sm text-gray-700 mb-1">Old Password</label>
                    <input
                        type="password"
                        name="oldPassword"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
                        placeholder="Enter old password"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm text-gray-700 mb-1">New Password</label>
                    <input
                        type="password"
                        name="newPassword"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
                        placeholder="Enter new password"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm text-gray-700 mb-1">Confirm New Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
                        placeholder="Re-enter new password"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-amber-700 text-white py-2 rounded hover:bg-amber-800 cursor-pointer transition"
                >
                    Change Password
                </button>
                <Link href={'/'}><p className='mt-[15px] text-gray-700 hover:text-amber-700 cursor-pointer text-center'>
                    Back to dashbaord ?
                </p></Link>
            </form>
        </div>

    )
}