import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "./ShopContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const FavoriteProducts = () => {
  const { favoriteItems } = useContext(ShopContext);
  const { removeFromFavorites } = useContext(ShopContext);
  // const img = (item) => {
  //   return item.filter((image) => image.includes("red"));
  // };

  return (
    <>
      {favoriteItems.length > 0 ? (
        <div className=" flex items-center justify-between min-h-screen flex-col min-w-[00px] ">
          <div className="  pb-6  ">
            <div className="flex items-center  justify-center pt-4  text-lg flex-row-reverse">
              <h2 className="font-bold text-black text-right text-2xl  ml-2">
                المفضلة{" "}
              </h2>
            </div>
            {/* <div className="w-full h-[1.5px] bg-black "></div> */}
            <ul className="w-[330px] mt-4 flex xl:justify-center items-center lg:flex-row flex-col justify-around px-0">
              {favoriteItems.map((item) => (
                <li
                  key={item.id}
                  className="bg-[#efefef] p-1 mb-2 rounded-xl flex flex-row-reverse items-center justify-between w-full"
                >
                  {/* {img(item.images)} */}
                  <Link to={`/product/${item.name}`}>
                    <div className="flex flex-row-reverse  items-center">
                      <img
                        src={item.images[0]}
                        alt=""
                        className="h-[120px] w-[120px] ml-2  object-cover"
                      />
                      <div className="text-[#444] text-sm">
                        <p> {item.name} </p>
                        <p> {Number(item.price)} DA</p>
                      </div>
                    </div>
                  </Link>
                  <div className="flex items-center flex-row-reverse gap-3">
                    <FontAwesomeIcon
                      icon={faXmark}
                      className="text-[#444] ml-3 cursor-pointer"
                      onClick={() => removeFromFavorites(item.id)}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="flex justify-center h-[400px]  flex-col items-center py-6 container">
          <h2 className="text-[#666] font-bold text-lg  ">لا يوجد مفضلة </h2>
        </div>
      )}
    </>
  );
};

export default FavoriteProducts;
