"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Head from "next/head";
import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { apiBaseUrl } from "./confilg";

import FeatureItmes from "./HomePagecomponents/FeatureItmes";
import NewArrivals from "./HomePagecomponents/NewArrivals";
import OnSale from "./HomePagecomponents/OnSale";
import BestSelling from "./HomePagecomponents/BestSelling";
import Testimonials from "./HomePagecomponents/Testimonials";
import BannerSlider from "./HomePagecomponents/Slider";
import ProductDetails from "./HomePagecomponents/ProductDetails";

export default function Home() {
  let [bsStaticPath, setBsStaticPath] = useState("");
  let [bestSelling, setBestSelling] = useState([]);
  let [activeTab, setActiveTab] = useState("feature");

  let [featureItems, setFeatureItems] = useState([]);
  let [newArrivals, setNewArrivals] = useState([]);
  let [onsale, setOnsale] = useState([]);
  let [staticPath, setStaticPath] = useState("");

  let [showProductDetail, setShowProductDetail] = useState(false)
  let [singleProduct, setSingleProduct] = useState([])

 


  let getBestSellingProduct = () => {
    axios.get(`${apiBaseUrl}/home-page/best-selling`)
      .then((res) => res.data)
      .then((finalRes) => {
        setBsStaticPath(finalRes.staticPath);
        setBestSelling(finalRes.bestSellingRes);
      });
  };
  useEffect(() => {
    getBestSellingProduct();
  }, []);

  let getFeautureItems = () => {
    axios
      .get(`${apiBaseUrl}/home-page/feature-items`)
      .then((res) => res.data)
      .then((finalRes) => {
        setFeatureItems(finalRes.featureRes);
        setStaticPath(finalRes.staticPath);
        setStaticPath(finalRes.staticPath);
      });
  };
  useEffect(() => {
    getFeautureItems();
  }, []);

  let getNewArrivals = () => {
    axios
      .get(`${apiBaseUrl}/home-page/new-arrivals`)
      .then((res) => res.data)
      .then((finalRes) => {
        setNewArrivals(finalRes.newArrivalsRes);
        setStaticPath(finalRes.staticPath);
      });
  };
  useEffect(() => {
    getNewArrivals();
  }, []);

  let getOnsale = () => {
    axios
      .get(`${apiBaseUrl}/home-page/onsale`)
      .then((res) => res.data)
      .then((finalRes) => {
        setOnsale(finalRes.onsaleRes);
        setStaticPath(finalRes.staticPath);
      });
  };
  useEffect(() => {
    getOnsale();
  }, []);



  return (
    <>
      <section className="w-full overflow-hidden">

        {/* for overlay when product detail page open */}
        {showProductDetail &&
          <div className={`w-[100%] h-[100vh] bg-[rgba(0,0,0,0.5)] fixed top-0 left-0`}></div>
        }

        {/* Hero Image */}
        <BannerSlider />

        {/* Carousel */}
        <div className="max-w-[1320px] grid lg:grid-cols-3 grid-cols-1 gap-[50px] justify-between mx-auto lg:my-[100px] my-[20px]">
          <div className="bg-[url('https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/home-page/124ad5ba-005d-4b47-a707-a9a87033833a-1670180400.webp')] w-[100%] hover:scale-[1.1]  duration-500  bg-contain cursor-pointer h-[350px] bg-no-repeat">
            <div className="m-[20px]">
              <h4 className="text-gray-800 ">Design Creative</h4>
              <p className="text-gray-800 text-[25px] font-semibold font-sans">Chair Collection</p>
            </div>
          </div>

          <div className="bg-[url('https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/home-page/0d588bec-d9a0-4645-8e7a-b49ef67b34be-1670180400.webp')] bg-contain cursor-pointer bg-no-repeat">
            <p>hello</p>
          </div>

          <div className="bg-[url('https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/home-page/124ad5ba-005d-4b47-a707-a9a87033833a-1670180400.webp')] bg-contain cursor-pointer bg-no-repeat">
            <p>hello</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-[1320px] mx-auto my-[50px]">
          <div className="flex justify-center gap-4 mb-10">
            <button
              onClick={() => setActiveTab("feature")}
              className={`lg:px-[30px] lg:py-[10px] px-[20px] py-[13px] cursor-pointer border-[3px] ${activeTab === "feature"
                ? "border-amber-500"
                : "border-amber-100"
                }`}
            >
              Featured
            </button>
            <button
              onClick={() => setActiveTab("newArr")}
              className={`lg:px-[30px] lg:py-[10px] px-[20px] py-[13px] cursor-pointer border-[3px] ${activeTab === "newArr" ? "border-amber-500" : "border-amber-100"
                }`}
            >
              New Arrivals
            </button>
            <button
              onClick={() => setActiveTab("onsale")}
              className={`lg:px-[30px] lg:py-[10px] px-[20px] py-[13px] cursor-pointer border-[3px] ${activeTab === "onsale" ? "border-amber-500" : "border-amber-100"
                }`}
            >
              Onsale
            </button>
          </div>

          {/* Items  */}
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1  gap-[30px] justify-center lg:justify-center lg:p-0 p-[20px]">
            {featureItems.length >= 1 &&
              featureItems.map((items, index) => {
                return (
                  activeTab === "feature" && (
                    <FeatureItmes
                      key={index}
                      staticPath={staticPath}
                      items={items}
                      index={index}
                    />
                  )
                );
              })}

            {newArrivals.length >= 1 &&
              newArrivals.map((items, index) => {
                return (
                  activeTab === "newArr" && (
                    <NewArrivals
                      key={index}
                      staticPath={staticPath}
                      items={items}
                      index={index}
                    />
                  )
                );
              })}

            {onsale.length >= 1 &&
              onsale.map((items, index) => {
                return (
                  activeTab === "onsale" && (
                    <OnSale
                      key={index}
                      staticPath={staticPath}
                      items={items}
                      index={index}
                    />
                  )
                );
              })}
          </div>
        </div>

        <div className='w-[100%] h-[50vh] my-[40px] bg-[url("https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/home-page/e9234fa4-3ff6-4a6e-a00e-0c9ff26e7b20-1670180400.jpg")] '>
          <div className="max-w-[1200px] mx-auto py-[60px]">
            <div className="hover:m-[-5px] duration-[0.2s]">
              <h2 className="text-[45px] font-semibold text-gray-800">
                New Trending Collection
              </h2>
              <p className="text-gray-800 my-[15px]">
                We Believe That Good Design is Always in Season
              </p>
              <button className="px-[50px] py-[10px] mt-[20px] border-amber-600 text-amber-600 hover:text-white cursor-pointer rounded-[5px] hover:bg-amber-600 border-2">
                Shopping Now
              </button>
            </div>
          </div>
        </div>

        {/* Best Selling Products */}
        {bestSelling.length >= 1 && (
          <div className="bg-white">
            <div className="max-w-[1320px] mx-auto p-6 rounded-[25px]">
              <h2 className="font-bold mb-[30px] text-[30px]">
                Best Selling Products
              </h2>
              <div className="flex gap-[20px] overflow-x-auto whitespace-nowrap no-scrollbar">
                {bestSelling.map((item) => (
                  <div key={item._id} className="min-w-[260px] inline-block">
                    <BestSelling setShowProductDetail={setShowProductDetail} bsStaticPath={bsStaticPath} items={item} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}



        {/* <ProductDetails singleProduct={singleProduct} setShowProductDetail={setShowProductDetail} showProductDetail={showProductDetail} /> */}



        <Testimonials />

        <div className="w-[100%] my-[80px]">
          <h2 className="text-center mb-[10px] text-[30px] font-semibold text-gray-800">
            Our Newsletter
          </h2>
          <p className="text-center my-[10px] text-gray-800">
            Get E-mail updates about our latest shop and special offers.
          </p>
          <div className="w-[600px] mx-auto my-[20px] flex gap-[15px]">
            <input
              className="border-[1px] w-[80%] py-[13px] text-[14px] px-[15px]"
              placeholder="Email Address..."
            />
            <button className="bg-amber-700 hover:bg-amber-800 text-white py-[8px] px-[25px] rounded-[3px] cursor-pointer">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
