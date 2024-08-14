import React from "react";
import landImg from "../../public/images/StockCake-Urban_Shopping_Trip_1720198730-removebg-preview 1.png";
import Logo from "../../public/images/logocolor2.png";
import Offre from "../../public/images/white.png";
import { Button } from "../components/ui/button";
import Logowat from "../../public/images/Group 193.png";
const Landing = () => {
  return (
    <>
      <>
        <div className="landing relative bg-button-color-100 pb-6 h-custom-height before:bg-hero-pattern before:absolute before:z-10 before:opacity-15 before:w-full before:h-full  w-full flex justfity-center items-center">
          <div className="container absolute z-30 w-full h-full -top-1/2 right-1/2 translate-x-1/2 translate-y-1/2 flex justify-between  flex-wrap items-center ">
            <div className="sm:text-xl flex flex-col max-lg:ml-auto max-lg:mr-auto items-center justify-center max-sm:self-end w-fit">
              {/* <h2 className="text-primary-color-100 font-bold mb-3 text-right">
                مع
              </h2> */}
              <img
                src={Logo}
                className="  cursor-pointer object-contain h-[150px]  lg:h-[230px]"
                alt="#"
              />
              <h2 className="text-beje font-bold  text-md">
                !تشري الجودة ونتا مرتاح
              </h2>
            </div>
            <div className="max-lg:container w-[400px] xl:w-[500px] mt-8">
              <div className=" special-box h-[300px] bg-primary-color-100 rounded-3xl p-3   ">
                <h3 className="rounded-3xl p-2 w-full text-beje text-center font-semibold  bg-white ">
                  {" "}
                  !عرض الأسبوع
                </h3>
                <img src={Offre} className=" mx-auto mt-5 h-[200px]" alt="#" />
              </div>
              <div className="buttons flex justify-around mt-2 w-full ">
                <Button className="hover:bg-primary-color-100i text-primary-color-100 border border-primary-color-100 rounded-3xl bg-transparent px-6 hover:bg-button-color-100 hover:text-white ">
                  {" "}
                  عرض المزيد{" "}
                </Button>
                <Button className="hover:bg-primary-color-100 text-white border border-primary-color-100 rounded-3xl bg-button-color px-6 ">
                  {" "}
                  عرض التفاصيل{" "}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default Landing;
