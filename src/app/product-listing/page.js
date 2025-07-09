import Image from 'next/image';
import React from 'react'
import { FaHeart } from "react-icons/fa";


export default function Page() {
    return (
        <div className='w-[100%] '>
            <h1 className='text-center text-[33px] font-bold my-[40px]'>Product Listing</h1>
            <div className='grid grid-cols-[20%_auto] gap-10 max-w-[1320px] m-[40px_auto] '>
                <div>
                    <div className='h-[500px] overflow-y-scroll'>
                        <h2 className='text-[20px] font-semibold'>Categories</h2>

                        <div className='my-[20px]'>
                            <h3 className='text-[20px] font-semibold text-gray-700'>Tables</h3>
                            <div className='flex items-center gap-2 my-5'>
                                <input type='checkbox' />
                                <p>Side and End Tables</p>
                            </div>
                            <div className='flex items-center gap-2 my-5'>
                                <input type='checkbox' />
                                <p>Nest of Tables</p>
                            </div>
                            <div className='flex items-center gap-2 my-5'>
                                <input type='checkbox' />
                                <p>Console Table sets</p>
                            </div>
                            <div className='flex items-center gap-2 my-5'>
                                <input type='checkbox' />
                                <p>Coffee Table sets</p>
                            </div>
                            <div className='flex items-center gap-2 my-5'>
                                <input type='checkbox' />
                                <p>Coffee Tables</p>
                            </div>

                        </div>

                        <div className='my-[20px]'>
                            <h3 className='text-[20px] font-semibold text-gray-700'>Living storage</h3>
                            <div className='flex items-center gap-2 my-5'>
                                <input type='checkbox' />
                                <p>Prayer Units</p>
                            </div>
                            <div className='flex items-center gap-2 my-5'>
                                <input type='checkbox' />
                                <p>Display Unit</p>
                            </div>
                            <div className='flex items-center gap-2 my-5'>
                                <input type='checkbox' />
                                <p>Shoe racks</p>
                            </div>
                            <div className='flex items-center gap-2 my-5'>
                                <input type='checkbox' />
                                <p>Chest of drawers</p>
                            </div>
                            <div className='flex items-center gap-2 my-5'>
                                <input type='checkbox' />
                                <p>Cabinet and sideboards</p>
                            </div>
                            <div className='flex items-center gap-2 my-5'>
                                <input type='checkbox' />
                                <p>Bookshelves</p>
                            </div>
                            <div className='flex items-center gap-2 my-5'>
                                <input type='checkbox' />
                                <p>Tv Units</p>
                            </div>
                        </div>


                        <div className='my-[20px]'>
                            <h3 className='text-[20px] font-semibold text-gray-700'>Mirrors</h3>
                            <div className='flex items-center gap-2 my-5'>
                                <input type='checkbox' />
                                <p>Wooden Mirrors</p>
                            </div>
                        </div>

                        <div className='my-[20px]'>
                            <h3 className='text-[20px] font-semibold text-gray-700'>Sofa Sets</h3>
                            <div className='flex items-center gap-2 my-5'>
                                <input type='checkbox' />
                                <p>L Shape Sofa</p>
                            </div>
                            <div className='flex items-center gap-2 my-5'>
                                <input type='checkbox' />
                                <p>1 Seater Sofa</p>
                            </div>
                            <div className='flex items-center gap-2 my-5'>
                                <input type='checkbox' />
                                <p>2 Seater Sofa</p>
                            </div>
                            <div className='flex items-center gap-2 my-5'>
                                <input type='checkbox' />
                                <p>3 Seater Sofa</p>
                            </div>
                        </div>

                        <div className='my-[20px]'>
                            <h3 className='text-[20px] font-semibold text-gray-700'>Swing Jhula</h3>
                            <div className='flex items-center gap-2 my-5'>
                                <input type='checkbox' />
                                <p>Wooden Jhula</p>
                            </div>
                        </div>
                    </div>

                    <div className='my-[15px]'>
                        <h2 className='text-[20px] font-semibold'>Material</h2>
                        <div className='flex items-center gap-2 my-5'>
                            <input type='checkbox' />
                            <p>Teak Wood</p>
                        </div>
                        <div className='flex items-center gap-2 my-5'>
                            <input type='checkbox' />
                            <p>Rose Wood</p>
                        </div>
                        <div className='flex items-center gap-2 my-5'>
                            <input type='checkbox' />
                            <p>Satin Wood</p>
                        </div>
                        <div className='flex items-center gap-2 my-5'>
                            <input type='checkbox' />
                            <p>Sal Wood</p>
                        </div>
                        <div className='flex items-center gap-2 my-5'>
                            <input type='checkbox' />
                            <p>Marandi Wood</p>
                        </div>
                        <div className='flex items-center gap-2 my-5'>
                            <input type='checkbox' />
                            <p>Mahogany Wood</p>
                        </div>
                        <div className='flex items-center gap-2 my-5'>
                            <input type='checkbox' />
                            <p>Mulberry Wood</p>
                        </div>
                        <div className='flex items-center gap-2 my-5'>
                            <input type='checkbox' />
                            <p>JackFruit</p>
                        </div>
                    </div>

                    <div className='my-[15px]'>
                        <h2 className='text-[20px] font-semibold'>Color</h2>
                        <div className='flex items-center gap-2 my-5'>
                            <input type='checkbox' />
                            <p>Burnt Amber</p>
                        </div>
                        <div className='flex items-center gap-2 my-5'>
                            <input type='checkbox' />
                            <p>Golden Teak</p>
                        </div>
                        <div className='flex items-center gap-2 my-5'>
                            <input type='checkbox' />
                            <p>Carbon Black</p>
                        </div>
                        <div className='flex items-center gap-2 my-5'>
                            <input type='checkbox' />
                            <p>Faded Oak</p>
                        </div>
                    </div>
                    <div>
                        <h2 className='text-[25px] mb-2 font-semibold'>Filter By Price</h2>
                        <p className='text-[18px]'>Rs. 0 - Rs. 200000</p>
                        <button className='text-white bg-amber-400 px-[25px] mt-2 cursor-pointer hover:bg-amber-700 py-[5px] rounded-[10px]'>Filter</button>
                    </div>
                </div>




                <div className='w-[100%]'>
                    <div className='flex px-3 gap-3 border-[1px] border-gray-200 py-3 items-center justify-end'>
                        <p>Sort By : <button className='border-[1px] border-gray-200 px-3 py-2'>Sort By</button> </p>
                        <p>Showing 1-1 of 1 results</p>

                    </div>

                    <div className='py-[25px]'>
                        <div className="hover:shadow-2xl shadow-lg max-w-[300px] bg-white rounded-[10px] overflow-hidden cursor-pointer duration-300">
                            <div className="overflow-hidden">
                                <Image
                                alt=''
                                    className="w-full h-[200px] object-cover hover:scale-110 duration-300"
                                    src='https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617829052195Caroline%20Study%20Tables__.jpg'
                                />
                            </div>

                            <div className="text-center p-4">
                                <p className="text-sm text-gray-500 mb-1">
                                    Nest of tables
                                </p>

                                <h3 className="text-lg font-medium mb-2 border-b border-gray-200 pb-2">
                                    Caroline
                                </h3>

                                <div className="flex justify-center items-center gap-3 mb-2">
                                    <p className="text-sm line-through text-gray-500">
                                        Rs. 3000
                                    </p>
                                    <p className="text-amber-600 font-semibold">
                                        Rs. 2500
                                    </p>
                                </div>

                                <div className="mb-4">
                                    <span className="text-sm text-gray-600">Color: </span>

                                    <button
                                        className='mr-[10px] cursor-pointer text-sm border border-gray-300 rounded-md px-3 py-1 hover:bg-green-500 hover:text-white'
                                    >
                                        red
                                    </button>

                                </div>

                                <div className="flex justify-center items-center gap-4">
                                    <button className="bg-gray-200 cursor-pointer p-2 rounded-md hover:bg-red-500 hover:text-white duration-300">
                                        <FaHeart />
                                    </button>
                                    <button
                                        className="bg-gray-200 cursor-pointer text-sm px-4 py-2 rounded-md hover:bg-amber-400 hover:text-white duration-300"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>


            </div>
        </div>
    )
}
