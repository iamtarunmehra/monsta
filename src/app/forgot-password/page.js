"use client";
import axios from "axios";
import { apiBaseUrl } from "../confilg";
import { redirect } from "next/navigation";
import Swal from "sweetalert2";
import { useState } from "react";

export default function ForgotPassword() {
    const [activePage, setActivePage] = useState("checkEmail");
    const [email, setEmail] = useState("");

    return (
        <>
            {activePage === "checkEmail" && (
                <CheckEmail setActivePage={setActivePage} setEmail={setEmail} />)}
            {activePage === "checkOtp" && (
                <CheckOtp email={email} setActivePage={setActivePage} />
            )}
            {activePage === "resetPassword" && <ResetPassword email={email} />}
        </>
    );
}

export function CheckEmail({ setActivePage, setEmail }) {
    const checkEmail = (event) => {
        event.preventDefault();
        const email = event.target.email.value;

        axios.post(`${apiBaseUrl}/user/check-email`, { email })
            .then((res) => {
                if (res.data.status === 1) {
                    setEmail(email);
                    setActivePage("checkOtp");
                } else {
                    Swal.fire({
                        title: "Email doesn't exist!",
                        icon: "error",
                    });
                }
            });
    };

    return (
        <div className="py-[50px] flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Forgot Password</h2>
                <form onSubmit={checkEmail} className="space-y-5">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="you@example.com"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow focus:outline-none"
                    >
                        Send OTP
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-500">
                    Remember your password?{" "}
                    <a href="/login" className="text-blue-600 hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
}

export function CheckOtp({ email, setActivePage }) {
    const checkOtp = (event) => {
        event.preventDefault();
        const otpValue = event.target.otpValue.value;

        axios.post(`${apiBaseUrl}/user/new-otp-check`, { email, otpValue })
            .then((res) => {
                if (res.data.status === 1) {
                    setActivePage("resetPassword");
                    Swal.fire({
                        title: res.data.msg,
                        icon: "success",
                    });
                } else {
                    Swal.fire({
                        title: res.data.msg,
                        icon: "error",
                    });
                }
            });
    };

    return (
        <div className="py-[50px] flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">OTP Verification</h2>
                <form onSubmit={checkOtp} className="space-y-5">
                    <div>
                        <label htmlFor="otpValue" className="block text-sm font-medium text-gray-700">
                            Enter OTP
                        </label>
                        <input
                            type="text"
                            id="otpValue"
                            name="otpValue"
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter OTP"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow focus:outline-none"
                    >
                        Verify
                    </button>
                </form>
            </div>
        </div>
    );
}

export function ResetPassword({ setActivePage }) {

    let resetPassword = (event) => {
        event.preventDefault()
        let newPassword = event.target.newPassword.value
        let obj = {
            newPassword
        }
        axios.put(`${apiBaseUrl}/user/reset-password`, obj)
            .then((res) => res.data)
            .then((finalRes) => {
                if (finalRes.status === 1) {
                    Swal.fire({
                        title: "Password Changed Successfully",
                        icon: "success"
                    })
                    redirect('/')
                }
                else {
                    Swal.fire({
                        title: finalRes.msg,
                        icon: "warning"
                    })
                }
            })
    }
    return (
        <div className="py-[50px] flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Reset Password</h2>
                <form onSubmit={resetPassword} className="space-y-5">
                    <div>
                        <label htmlFor="email" className="block text-[16px] font-medium text-gray-700">
                            Create New Password
                        </label>
                        <input
                            type="text"
                            id="newPassword"
                            name="newPassword"
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-[15px]"
                            placeholder="Enter new password"

                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow focus:outline-none"
                    >
                        Create Password
                    </button>
                </form>
            </div>
        </div>
    )
}

