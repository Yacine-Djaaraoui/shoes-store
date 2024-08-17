import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "./ShopContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const PanierProducts = () => {
  const { PanierItems } = useContext(ShopContext);
  const { removeFromPanier } = useContext(ShopContext);
  const { setsomeCondition } = useContext(ShopContext);
  // const img = (item) => {
  //   return item.filter((image) => image.includes("red"));
  // };
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = PanierItems.reduce(
        (acc, item) => acc + Number(item.price) * Number(item.selectedAmont),
        0
      );
      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, [PanierItems]);
  return (
    <>
      {PanierItems.length > 0 ? (
        <div className=" flex items-center justify-between min-h-screen flex-col min-w-[00px] ">
          <div className="  pb-6  ">
            <div className="flex items-center  justify-center pt-4  text-lg flex-row-reverse">
              <h2 className="font-bold text-black text-right text-2xl  ml-2">
                السلة{" "}
              </h2>
              <svg
                className={` h-6 rounded-full p-[0px] text-black  `}
                viewBox="-0.5 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ cursor: "pointer" }}
              >
                <path
                  d="M18.5996 21.57C19.7042 21.57 20.5996 20.6746 20.5996 19.57C20.5996 18.4654 19.7042 17.57 18.5996 17.57C17.495 17.57 16.5996 18.4654 16.5996 19.57C16.5996 20.6746 17.495 21.57 18.5996 21.57Z"
                  stroke="#000000"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.59961 21.57C9.70418 21.57 10.5996 20.6746 10.5996 19.57C10.5996 18.4654 9.70418 17.57 8.59961 17.57C7.49504 17.57 6.59961 18.4654 6.59961 19.57C6.59961 20.6746 7.49504 21.57 8.59961 21.57Z"
                  stroke="#000000"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 3.55997C2 3.55997 6.64 3.49997 6 7.55997L5.31006 11.62C5.20774 12.1068 5.21778 12.6105 5.33954 13.0929C5.46129 13.5752 5.69152 14.0234 6.01263 14.4034C6.33375 14.7833 6.73733 15.0849 7.19263 15.2854C7.64793 15.4858 8.14294 15.5797 8.64001 15.56H16.64C17.7479 15.5271 18.8119 15.1196 19.6583 14.404C20.5046 13.6884 21.0834 12.7069 21.3 11.62L21.9901 7.50998C22.0993 7.0177 22.0939 6.50689 21.9744 6.017C21.8548 5.52712 21.6242 5.07126 21.3005 4.68467C20.9767 4.29807 20.5684 3.99107 20.1071 3.78739C19.6458 3.58371 19.1438 3.48881 18.64 3.50998H9.94"
                  stroke="#000000"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            {/* <div className="w-full h-[1.5px] bg-black "></div> */}
            <ul className="w-[330px] mt-4 flex  xl:justify-center items-center  flex-col justify-around px-0">
              {PanierItems.map((item) => (
                <li
                  key={item.id}
                  className="bg-[#efefef] p-1 mb-2 rounded-xl flex flex-row-reverse items-center justify-between w-full"
                >
                  {/* {img(item.images)} */}
                  <div className="flex flex-row-reverse  items-center">
                    <img
                      src={item.selectedImg}
                      alt=""
                      className="h-[120px] w-[120px] ml-2  object-cover"
                    />
                    <div className="text-[#444] text-sm">
                      <p> {item.name} </p>
                      <p>
                        {" "}
                        {Number(item.price) * Number(item.selectedAmont)} DA
                      </p>
                      <p> couleur : {item.selectedColor} </p>
                      <p> pointure : {item.selectedSize} </p>
                    </div>
                  </div>
                  <div className="flex items-center flex-row-reverse gap-3">
                    <p className="bg-grey px-1.5 py-0 ">
                      {" "}
                      {item.selectedAmont}{" "}
                    </p>
                    <FontAwesomeIcon
                      icon={faXmark}
                      className="text-[#444] ml-3 cursor-pointer"
                      onClick={() => removeFromPanier(item)}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className=" flex flex-col justify-center items-center mb-10">
            <div className="">
              <div className="flex items-center flex-row-reverse">
                <h2 className="font-bold text-md w-[110px] text-[#444]  py-2 border text-center   border-primary-color-100 border-b-0 rounded-tr-xl">
                  ثمن الطلبية
                </h2>
                <h2 className="font-semibold rounded-tl-xl text-md bg-[#efefef] w-[200px] py-2 text-center  ">
                  {" "}
                  {totalPrice} DA{" "}
                </h2>
              </div>
              <div className="flex items-center flex-row-reverse">
                <h2 className="font-bold text-md w-[110px] text-[#444]  py-[18px] border text-center   border-primary-color-100 ">
                  ثمن التوصيل
                </h2>
                <h2 className="font-semibold text-md bg-[#efefef] w-[200px] py-2 text-center  ">
                  <div className="flex justify-between px-1 ">
                    <p className="mr-1"> 400 DA </p>
                    <p> لمكتب شركة التوصيل</p>
                  </div>
                  <div className="flex justify-between px-1 ">
                    <p className="mr-1"> 600 DA </p>
                    <p> لباب المنزل</p>
                  </div>
                </h2>
              </div>
              <Link to={"/cart"}>
                <button
                  onClick={() => {
                    setsomeCondition(true);
                    setTimeout(() => {
                      setsomeCondition(false);
                    }, 200);
                  }}
                  className=" text-white border border-primary-color-100 rounded-xl bg-primary-color-100 px-5 w-full py-2  mt-3 hover:bg-button-color-100"
                >
                  طلب
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center  flex-col items-center py-6 container">
          <svg
            className={` h-32 rounded-full p-[0px] text-black `}
            viewBox="-0.5 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ cursor: "pointer" }}
          >
            <path
              d="M18.5996 21.57C19.7042 21.57 20.5996 20.6746 20.5996 19.57C20.5996 18.4654 19.7042 17.57 18.5996 17.57C17.495 17.57 16.5996 18.4654 16.5996 19.57C16.5996 20.6746 17.495 21.57 18.5996 21.57Z"
              stroke="#666"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8.59961 21.57C9.70418 21.57 10.5996 20.6746 10.5996 19.57C10.5996 18.4654 9.70418 17.57 8.59961 17.57C7.49504 17.57 6.59961 18.4654 6.59961 19.57C6.59961 20.6746 7.49504 21.57 8.59961 21.57Z"
              stroke="#666"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 3.55997C2 3.55997 6.64 3.49997 6 7.55997L5.31006 11.62C5.20774 12.1068 5.21778 12.6105 5.33954 13.0929C5.46129 13.5752 5.69152 14.0234 6.01263 14.4034C6.33375 14.7833 6.73733 15.0849 7.19263 15.2854C7.64793 15.4858 8.14294 15.5797 8.64001 15.56H16.64C17.7479 15.5271 18.8119 15.1196 19.6583 14.404C20.5046 13.6884 21.0834 12.7069 21.3 11.62L21.9901 7.50998C22.0993 7.0177 22.0939 6.50689 21.9744 6.017C21.8548 5.52712 21.6242 5.07126 21.3005 4.68467C20.9767 4.29807 20.5684 3.99107 20.1071 3.78739C19.6458 3.58371 19.1438 3.48881 18.64 3.50998H9.94"
              stroke="#666"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h2 className="text-[#666] font-bold text-lg ">
            سلة التسوق الخاصة بك فارغة
          </h2>
        </div>
      )}
    </>
  );
};

export default PanierProducts;
