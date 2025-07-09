import axios from "axios"
import { useSelector } from "react-redux"
import { apiBaseUrl } from "../confilg"

export default function AddToCart({ cartItems, staticPath }) {


    let { product, productColorName, quantity } = cartItems
    let { productImage, ProductActualPrice, productName } = product
    return (
        <>
            {
                <div className='m-[20px] flex items-center gap-[15px] relative border-b-[1px] border-gray-300 pb-[15px]'>
                    <img className='w-[110px] h-[70px] object-center' src={staticPath + productImage} alt="" />
                    <div className=''>
                        <h3 className=''>{productName}</h3>
                        <div className='flex gap-[15px] items-center'>
                            <p className='text-[14px] rounded-[3px]'>Qty : {quantity}</p>
                            <p className='text-[14px] rounded-[3px]'>Color : {productColorName.colorName}</p>
                        </div>
                        <span className='text-red-500 text-[15px] font-semibold'>Rs. {ProductActualPrice}</span>
                        <span className='absolute right-[5px] top-[-5px] text-[25px] text-gray-500 hover:text-amber-700 cursor-pointer'>&times;</span>
                    </div>
                </div>
            }
        </>
    )
}
