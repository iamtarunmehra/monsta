"use client"
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { FaAngleRight } from "react-icons/fa6";
import { RiAccountCircleLine } from "react-icons/ri";
import axios from 'axios';
import Swal from 'sweetalert2';
import { apiBaseUrl } from '../confilg';
import { useDispatch } from 'react-redux';
import { loginData } from '../slice/loginSlice';
import { redirect } from 'next/navigation';
import { FaGoogle } from 'react-icons/fa';
//for add firebase in project
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from '../firebaseConfig/firebaseConfig';


export default function Page() {

  let dispatch = useDispatch()
  let [error, setError] = useState('')
  let [showPassword, setShowPassword] = useState(false)
  let [otpStatus, setOtpStatus] = useState(false)


  let [isRegister, setIsRegister] = useState(false)

  let [isLogin, setIsLogin] = useState(false)

  let createUser = (event) => {

    event.preventDefault()
    let formData = new FormData(event.target)

    if (otpStatus) {
      // checkotp
      axios.post(`${apiBaseUrl}/user/check-otp`, formData)
        .then((res) => {
          if (res.data.status == 1) {
            setIsRegister(true)
            Swal.fire({
              title: "OTP VERIFIED",
              text: "Otp Successfully Verified",
              icon: "success"
            })
          }
          else {
            Swal.fire({
              title: "OTP INVALID !",
              text: "Please Enter The Correct OTP",
              icon: "error"
            })
          }
        })
    }
    else {
      axios.post(`${apiBaseUrl}/user/create`, formData)
        .then((res) => res.data)
        .then((finalRes) => {

          if (finalRes.status === 1) {
            setOtpStatus(true)
            Swal.fire({
              title: "Otp Sent",
              text: "please check your mail to verify otp",
              icon: "success"
            })
          }
          else {
            Swal.fire({
              title: "Error",
              text: "User Email Id Already Exist !",
              icon: "error"
            })
          }
        })
    }
  }


  let login = (event) => {
    event.preventDefault()
    let password = event.target.password.value
    let userName = event.target.userName.value
    let obj = {
      userName,
      password
    }
    axios.post(`${apiBaseUrl}/user/login`, obj)
      .then((res) => {
        if (res.data.status === 1) {
          setIsLogin(true)
          console.log(res.data)
          let finalObj = {
            user: res.data.userDataRes,
            token: res.data.token
          }
          dispatch(loginData(finalObj))
          console.log(finalObj)
          Swal.fire({
            title: "Login Successfully",
            icon: "success"
          })
        }
        else {
          setError(res.data.msg)
          setTimeout(() => {
            setError('')
          }, 2000)
        }
        // console.log(res.data)
      })
  }

  let googleLogin = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        let userObj = {
          userEmail: user.email,
          userPhone: user.phoneNumber,
          verifyStatus: true
        }
        // console.log(userObj)
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        axios.post(`${apiBaseUrl}/user/create-with-google`, userObj)
          .then((res) => res.data)
          .then((finalRes) => {
            if (finalRes.status == 1) {
              Swal.fire({
                title: "Successfully Login",
                icon: 'success'
              })
              setIsLogin(true)
              let finalObj = {
                user: finalRes.userRes,
                token: finalRes.token
              }
              console.log(finalObj)
              dispatch(loginData(finalObj))
            }
            else {
              Swal.fire({
                title: 'Something went wrong try again later',
                icon: "error"
              })
            }
          })
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });

  }

  useEffect(() => {
    if (isRegister) {
      redirect('/thank-you')
    }
  }, [isRegister])

  useEffect(() => {
    if (isLogin) {
      redirect('/my-dashboard')
    }
  }, [isLogin])

  return (
    <div className='bg-white lg:py-[40px] lg:my-[50px] py-[10px]'>
      <h1 className='text-center text-3xl font-semibold text-gray-800 py-[20px] flex items-center gap-[10px] justify-center'>Tarun Mehra <RiAccountCircleLine /></h1>
      <div className='text-center flex justify-center mb-[15px]'>
        <Link className='hover:text-amber-500 flex gap-[10px] items-center' href={'/'}>Home <FaAngleRight /> &nbsp;</Link>
        <span className='text-amber-500'>My Account</span>
      </div>
      <div className='max-w-[1320px] flex-wrap items-center justify-center bg-white rounded-[20%] px-[10px] flex mx-auto gap-[10px] lg:border-y-[20px] border-amber-300 lg:py-[80px] py-[20px]'>
        <div style={{ background: 'linear-gradient(331deg,rgba(153, 255, 255, 1) 0%, rgba(253, 187, 45, 1) 100%)' }} className='lg:w-[45%] h-[auto] w-[100%] border-[0.1px] border-amber-400 shadow-lg shadow-[#FF5733] lg:rounded-tl-[20%] lg:rounded-br-[20%] rounded-tl-[10%] rounded-br-[10%] lg:p-[40px] p-[10px]'>
          <h2 className='text-gray-900 text-2xl font-semibold ps-[10px] mb-[30px]'>Login</h2>
          <form onSubmit={login} className=''>
            <div className='my-[20px]'>
              <p className='my-[8px]'>Username *</p>
              <input required className='border-[1px] rounded-[5px] border-gray-700 text-[14px] px-[10px] py-[10px] w-[100%]' type='text' name='userName' placeholder='Enter name' />
            </div>
            <div className='my-[20px]'>
              <p className='my-[8px]'>Password *</p>
              <input required className='border-[1px] rounded-[5px] border-gray-700 text-[14px] px-[10px] py-[10px] w-[100%]' type={showPassword ? 'text' : 'password'} name='password' placeholder='Enter password' />
            </div>

            <div className='flex items-center gap-[10px]'>
              <input onClick={() => setShowPassword(!showPassword)} className='w-[14px] h-[14px]' type='checkbox' />
              <p className='text-gray-700 text-[14px]'>Show Password</p>
            </div>



            {error && <p className="text-red-600 text-[14px] mt-2">{error}</p>}
            <div className='flex items-center justify-between mt-[10px]'>
              <Link href={'/forgot-password'}><p className='text-[14px] text-gray-700 hover:text-blue-700 cursor-pointer'>Forget Password ?</p></Link>
              <button type='submit' className='hover:bg-amber-700 duration-500 text-white px-[20px] py-[8px] cursor-pointer border-[1px] bg-amber-600 text-[14px] border-none rounded-[30px]'>LOGIN</button>
            </div>

          </form>

          <button onClick={googleLogin} className='w-[100%] flex items-center justify-center gap-1 mt-[30px] px-[15px] py-[8px] rounded-[10px] bg-white hover:bg-yellow-600 hover:text-white duration-500  cursor-pointer'><FaGoogle /> Sign in with Google</button>
        </div>
        <button className='px-[25px] py-[15px] flex items-center justify-center text-[14px] w-[30px] h-[auto] rounded-[50%] bg-white'>OR</button>
        <div style={{ background: 'linear-gradient(331deg,rgba(153, 255, 255, 1) 0%, rgba(253, 187, 45, 1) 100%)' }} className='lg:w-[45%] h-[auto] w-[100%] border-[0.1px] border-amber-400 shadow-lg shadow-[#FF5733] lg:rounded-tl-[20%] lg:rounded-br-[20%] rounded-tl-[10%] rounded-br-[10%] lg:p-[40px] p-[10px]'>
          <h2 className='text-gray-800 text-2xl font-semibold ps-[10px] mb-[30px]'>Register</h2>
          <form onSubmit={createUser} className=''>
            <div className='my-[20px]'>
              <p className='my-[8px]'>Create User *</p>
              <input required className='border-[1px] rounded-[5px] border-gray-700 text-[14px] px-[10px] py-[10px] w-[100%]' type='text' name='userName' placeholder='Enter email' />
            </div>
            <div className='my-[20px]'>
              <p className='my-[8px]'>Email *</p>
              <input required className='border-[1px] rounded-[5px] border-gray-700 text-[14px] px-[10px] py-[10px] w-[100%]' type='email' name='email' placeholder='Enter email' />
            </div>
            <div className='my-[20px]'>
              <p className='my-[8px]'>Phone *</p>
              <input required className='border-[1px] rounded-[5px] border-gray-700 text-[14px] px-[10px] py-[10px] w-[100%]' type='number' name='phone' placeholder='Enter Phone no.' />
            </div>
            <div className='my-[20px]'>
              <p className='my-[8px]'>Password *</p>
              <input required className='border-[1px] rounded-[5px] border-gray-700 text-[14px] px-[10px] py-[10px] w-[100%]' type='password' name='password' placeholder='Enter password' />
            </div>
            {otpStatus
              &&
              <div>
                <p className='my-[8px]'>OTP *</p>
                <input name='otpValue' required className='border-[1px] rounded-[5px] border-gray-700 text-[14px] px-[10px] py-[10px] w-[100%]' type='text' placeholder='Enter OTP' />
              </div>}

            <div className='flex items-center justify-end mt-[20px]'>

              <button type='submit' className='hover:bg-amber-700 duration-500 text-white px-[20px] py-[8px] cursor-pointer border-[1px] bg-amber-600 text-[14px] border-none rounded-[30px]'>{otpStatus ? "REGISTER" : "GET OTP"}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
