"use client"
import { apiBaseUrl } from '@/app/confilg'
import axios from 'axios'
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'

export default function Page() {
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
        <div className="max-w-[500px] my-[50px] mx-auto mt-10 bg-white p-6 shadow-lg rounded-lg border border-gray-200">
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
                    className="w-full bg-[#FF5733] text-white py-2 rounded hover:bg-red-500 transition"
                >
                    Change Password
                </button>
                <Link href={'/'}><p className='mt-[15px] text-gray-700 hover:text-blue-500 cursor-pointer text-center'>
                    Back to dashbaord ?
                </p></Link>
            </form>
        </div>

    )
}
