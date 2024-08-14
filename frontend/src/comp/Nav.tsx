import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { ShopContext } from "./ShopContext";
import { useContext } from "react";
import { Button } from "../components/ui/button";
import LogoImg from "../../public/images/Logoo.png";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet";
import FavoriteProducts from "./FavoriteProducts";
// import LogoImg from "public/images/logo.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import PanierProducts from "./pPanierProducts";
const Nav = () => {
  const { favoriteItems } = useContext(ShopContext);
  const { PanierItems } = useContext(ShopContext);

  const [menu, setMenu] = useState("الرئيسية");

  const handleNavClick = (item) => {
    // const section = document.getElementById(id);
    // if (section) {
    //   section.scrollIntoView({ behavior: "smooth" });
    // }
    setMenu(item.label);
  };
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { someCondition } = useContext(ShopContext);
  const { setsomeCondition } = useContext(ShopContext);

  const Navlinks = [
    { label: "الرئيسية", id: "home" },
    { label: "التصنيفات", id: "brands" },
    { label: "تواصل معنا", id: "vehicles" },
    { label: "تتبع الطرود", id: "about" },
  ];
  useEffect(() => {
    if (someCondition && buttonRef.current) {
      buttonRef.current.click();
    }
  }, [someCondition]);
  return (
    <header className=" shadow fixed top-0 right-0 w-full bg-white z-50 h-fit ">
      <div className="  flex h-[70px] lg:h-[90px] container justify-between items-center">
        <div className="logoImg lg:order-2">
          <Link to={"/"}>
            <img
              src={LogoImg}
              className="cursor-pointer object-contain w-[150px] max-lg:w-[120px] h-fit "
              alt="#"
            />
          </Link>
        </div>

        <div className="  flex justify-center lg:order-1 items-center">
          <Sheet>
            <SheetTrigger>
              <div className="relative mr-12 md:mr-12 ">
                <svg
                  className=" absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 self-center h-8 rounded-full  p-[0px] text-black hover:bg-secondary-color"
                  viewBox="-0.5 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.5996 21.57C19.7042 21.57 20.5996 20.6746 20.5996 19.57C20.5996 18.4654 19.7042 17.57 18.5996 17.57C17.495 17.57 16.5996 18.4654 16.5996 19.57C16.5996 20.6746 17.495 21.57 18.5996 21.57Z"
                    stroke="#000000"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8.59961 21.57C9.70418 21.57 10.5996 20.6746 10.5996 19.57C10.5996 18.4654 9.70418 17.57 8.59961 17.57C7.49504 17.57 6.59961 18.4654 6.59961 19.57C6.59961 20.6746 7.49504 21.57 8.59961 21.57Z"
                    stroke="#000000"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M2 3.55997C2 3.55997 6.64 3.49997 6 7.55997L5.31006 11.62C5.20774 12.1068 5.21778 12.6105 5.33954 13.0929C5.46129 13.5752 5.69152 14.0234 6.01263 14.4034C6.33375 14.7833 6.73733 15.0849 7.19263 15.2854C7.64793 15.4858 8.14294 15.5797 8.64001 15.56H16.64C17.7479 15.5271 18.8119 15.1196 19.6583 14.404C20.5046 13.6884 21.0834 12.7069 21.3 11.62L21.9901 7.50998C22.0993 7.0177 22.0939 6.50689 21.9744 6.017C21.8548 5.52712 21.6242 5.07126 21.3005 4.68467C20.9767 4.29807 20.5684 3.99107 20.1071 3.78739C19.6458 3.58371 19.1438 3.48881 18.64 3.50998H9.94"
                    stroke="#000000"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                {/* <FontAwesomeIcon
                  icon={faCartShopping}
                  className=" absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 self-center h-8 rounded-full  p-[0px] text-black hover:bg-secondary-color"
                /> */}
                {PanierItems.length > 0 ? (
                  <div className=" absolute  right-2 -top-[25px] favorite-number h-4  w-4 rounded-full bg-primary-color-100 text-white text-center text-[10px]">
                    {PanierItems.length}
                  </div>
                ) : null}
              </div>
            </SheetTrigger>
            <SheetContent side={"left"} className="min-w-[350px] p-0">
              <SheetHeader>
                <SheetDescription>
                  <PanierProducts />
                </SheetDescription>
              </SheetHeader>
              <SheetClose>
                <button ref={buttonRef} className=""></button>{" "}
              </SheetClose>
            </SheetContent>
          </Sheet>
          <Sheet>
            <SheetTrigger>
              <div className="relative mr-8 md:mr-12 ">
                <FontAwesomeIcon
                  icon={faHeart}
                  className=" fill-black absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2  self-center h-7  rounded-full  p-[0px] text-black hover:bg-secondary-color"
                />
                {favoriteItems.length > 0 ? (
                  <div className=" absolute  right-2 -top-[24px] favorite-number h-4  w-4 rounded-full bg-primary-color-100 text-white text-center text-[10px]">
                    {favoriteItems.length}
                  </div>
                ) : null}
              </div>
            </SheetTrigger>
            <SheetContent side={"left"} className="min-w-[350px] p-0 ">
              <SheetHeader>
                <SheetDescription>
                  <FavoriteProducts />
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
          <Sheet>
            <SheetTrigger>
              <FontAwesomeIcon
                icon={faBars}
                className="lg:hidden self-center h-6 rounded-full w-6 p-[2px] text-primary-color hover:bg-secondary-color"
              />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetDescription>
                  <ul className="  flex  xl:justify-center items-center lg:flex-row flex-col justify-around max-lg max-lg:pt-5  px-0 lg:order-3">
                    {Navlinks.map((item) => (
                      <li
                        key={item.label}
                        className={` group relative inline-block overflow-hidden rounded  border-r-gray-100 text-sm  text-slate-800  focus:outline-none focus:ring  active:text-white  `}
                      >
                        <button
                          onClick={() => handleNavClick(item)}
                          className={` ${
                            menu === item.label ? "text-lg" : "none"
                          } px-3 py-4 my-4 text-black font-normal  hover:text-lg hover:duration-75 w-[100%]  lg:hover:text-black`}
                        >
                          {item.label}
                        </button>
                        {/* <span className="ease absolute left-0 top-0 h-0 w-0 border-t-2 border-violet-600 transition-all duration-200 group-hover:w-full"></span> */}
                        {/* <span className="ease absolute right-0 top-0 h-0 w-0 border-r-2 border-violet-600 transition-all duration-200 group-hover:h-full"></span> */}
                        <span
                          className={`ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-primary-color-100 transition-all duration-200 group-hover:w-full ${
                            menu === item.label ? "  w-full" : "none"
                          } `}
                        ></span>
                        {/* <span className="ease absolute bottom-0 left-0 h-0 w-0 border-l-2 border-violet-600 transition-all duration-200 group-hover:h-full"></span> */}
                      </li>
                    ))}
                  </ul>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
        <ul className="max-lg:hidden  flex xl:justify-center items-center lg:flex-row flex-col justify-around max-lg max-lg:pt-5  px-0 lg:order-3">
          {Navlinks.map((item) => (
            <li
              key={item.label}
              className="group relative inline-block overflow-hidden rounded  border-r-gray-100    text-sm font-medium text-slate-800  focus:outline-none focus:ring  active:text-white"
            >
              <button
                onClick={() => handleNavClick(item)}
                className={`${
                  menu === item.label ? "text-lg" : "none"
                } px-3 py-4 my-4 text-black font-semibold  hover:text-lg w-[100%]  lg:hover:text-black transition-all ease-in`}
              >
                {item.label}
              </button>
              {/* <span className="ease absolute left-0 top-0 h-0 w-0 border-t-2 border-violet-600 transition-all duration-200 group-hover:w-full"></span> */}
              {/* <span className="ease absolute right-0 top-0 h-0 w-0 border-r-2 border-violet-600 transition-all duration-200 group-hover:h-full"></span> */}
              <span
                className={` ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-primary-color-100 transition-all duration-200 group-hover:w-full ${
                  menu === item.label ? "w-full" : "none"
                }`}
              ></span>
              {/* <span className="ease absolute bottom-0 left-0 h-0 w-0 border-l-2 border-violet-600 transition-all duration-200 group-hover:h-full"></span> */}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Nav;
