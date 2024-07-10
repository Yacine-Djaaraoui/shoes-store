import React from 'react'
import landImg from '../../public/images/StockCake-Urban_Shopping_Trip_1720198730-removebg-preview 1.png'
import Logo from '../../public/images/Group 138.png'
import Offre from '../../public/images/i1FqKhds-CW2288-111-1 2.png'
import { Button } from '../components/ui/button'
const Landing = () => {
  return (
    <>
      <div className="landing bg-secondary-color pb-6 h-[550px] sm:h-[650px] lg:h-[400px] w-full rounded-b-3xl flex justfity-center items-center">
        <div className="container flex justify-between flex-wrap items-center ">
          <img className=" h-[170px] sm:h-[270px]" src={landImg} alt="" />
          <div className="sm:text-xl">
            <h2 className="text-primary-color-100 font-bold mb-3 text-right">
              مع
            </h2>
            <img
              src={Logo}
              className=" mb-4 cursor-pointer object-contain h-[35] sm:h-[45px]"
              alt="#"
            />
            <h2 className="text-primary-color-100 font-bold text-right text-md">
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
  );
}

export default Landing