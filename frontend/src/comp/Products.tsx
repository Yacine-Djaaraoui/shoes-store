import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { ShopContext } from "./ShopContext";
import { Link } from "react-router-dom";
import { Skeleton } from "../components/ui/skeleton";

const Products = () => {
  const { AllProducts } = useContext(ShopContext);
  const { addToFavorites } = useContext(ShopContext);
  const { favoriteItems } = useContext(ShopContext);
  const { removeFromFavorites } = useContext(ShopContext);
  const { PanierItems } = useContext(ShopContext);
  const { addToPanier } = useContext(ShopContext);
  const { removeFromPanier } = useContext(ShopContext);
  const [moreProducts, setmoreProducts] = useState(false);

  const filteredProducts = AllProducts.filter(
    (product) => product.showingOnTheTop === "true"
  );

  const nonFavoriteProducts = AllProducts.filter(
    (product) => product.showingOnTheTop === "false"
  );

  const [selectedheart, setSelectedheart] = useState<boolean[]>(
    AllProducts.map(() => false)
  );
  // Function to handle heart click
  const handleHeartClick = (item, index: number) => {
    const newSelectedheart = [...selectedheart];
    newSelectedheart[index] = !newSelectedheart[index]; // Toggle the selection status
    setSelectedheart(newSelectedheart);

    if (newSelectedheart[index]) {
      addToFavorites(item);
    } else {
      removeFromFavorites(item.id);
    }
    // console.log(favoriteItems);
  };
  // const [selectedSvgs, setSelectedSvgs] = useState<boolean[]>(
  //   filteredProducts.map(() => false)
  // );
  // const handleSvgClick = (item, index: number) => {
  //   const newSelectedSvgs = [...selectedSvgs];
  //   newSelectedSvgs[index] = !newSelectedSvgs[index]; // Toggle the selection status
  //   setSelectedSvgs(newSelectedSvgs);
  //   if (newSelectedSvgs[index]) {
  //     addToPanier(item);
  //   } else {
  //     removeFromPanier(item.id);
  //   }
  // };
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (filteredProducts.length > 0) {
      setIsLoading(false);
    }
  }, [filteredProducts]);
  return (
    <>
      <div className="filteredProducts my-[60px] container text-center">
        <h3 className="font-bold mb-1  text-xl"> أفضل العروض</h3>
        <p> التوصيل متوفر لجميع الولايات الجزائرية</p>
        <div className="flex justify-center items-center w-full">
          {filteredProducts.length > 0 ? (
            <ul
              className={`cards  mt-12  ${
                filteredProducts.length > 3
                  ? "grid grid-cols-2  sm:grid-cols-3 lg:grid-cols-3  xl:grid-cols-4 "
                  : filteredProducts.length > 2
                  ? "grid grid-cols-2  sm:grid-cols-3 lg:grid-cols-3  xl:grid-cols-3"
                  : filteredProducts.length === 2
                  ? "grid grid-cols-2  sm:grid-cols-2 lg:grid-cols-2  xl:grid-cols-2"
                  : filteredProducts.length === 1
                  ? "grid grid-cols-1  sm:grid-cols-1 lg:grid-cols-1  xl:grid-cols-1"
                  : ""
              }  mb-24 lg:mb-28  gap-y-[90px] gap-x-6 `}
            >
              {filteredProducts.map((item, index) => (
                <li key={index} className=" max-w-[300px]">
                  <div className="frame relative h-full rounded-3xl   before:bg-secondary-color before:rounded-xl before:h-28 before:w-full before:absolute before:-bottom-[75px] before:right-0 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] before:shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]">
                    <Link to={`/product/${item.name}`}>
                      <img
                        src={item.images[0]}
                        alt="#"
                        className="  relative before:absolute before:bg-white before:top-0 before:h-full before:right-0 before:w-full z-0 top-0 w-full h-full right-1/2 translate-x-1/2   object-cover  rounded-3xl border border-grey "
                      />
                    </Link>

                    <h5 className="absolute top-0 z-10 right-1/2 translate-x-1/2 bg-grey px-2 text-xs rounded-lg pb-0.5  ">
                      {" "}
                      متوفر{" "}
                    </h5>
                    <div className="rounded-l-3xl favorit-and-panier absolute top-0  z-10 flex flex-col justify-center items-center bg-grey rounded-b-3xl p-1 gap-2">
                      <svg
                        onClick={() => handleHeartClick(item, index)}
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`${
                          selectedheart[index]
                            ? "fill-black border-primary-color-100"
                            : "fill-none"
                        } favorite feather feather-heart `}
                        style={{ cursor: "pointer" }}
                      >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                      </svg>
                    </div>

                    <h5 className="absolute bottom-0.5 z-10 right-1/2  translate-x-1/2 bg-grey font-semibold px-2 text-md rounded-xl  ">
                      {" "}
                      {item.price} DA{" "}
                    </h5>
                    <h5 className="absolute -bottom-8 z-10 right-1/2  translate-x-1/2 font-bold px-1 text-md w-full rounded-xl  ">
                      {" "}
                      {item.name}{" "}
                    </h5>
                    <Link to={`/product/${item.name}`}>
                      <Button className="absolute -bottom-[76px] z-10 right-1/2 border h-8 sm:h-9 translate-x-1/2 border-primary-color-100 bg-button-color-100 text-white font-bold  text-md w-full  hover:bg-primary-color-100 rounded-none rounded-b-xl  ">
                        {" "}
                        شراء{" "}
                      </Button>
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-primary-color-100 mt-7"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          )}
        </div>

        {AllProducts.length !== filteredProducts.length && !moreProducts ? (
          <Button
            onClick={() => setmoreProducts(true)}
            className="bg-transparent text-primary-color-100 border rounded-2xl px-10 border-primary-color-100 hover:bg-button-color-100 hover:text-white font-bold  "
          >
            {" "}
            عرض المزيد{" "}
          </Button>
        ) : null}
        {moreProducts ? (
          <ul className="cards mt-12   grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3  xl:grid-cols-4 gap-y-[90px] gap-x-4 mb-24 lg:mb-28">
            {nonFavoriteProducts.map((item, index) => (
              <li key={index} className="">
                <div className="frame relative h-full rounded-3xl  before:bg-secondary-color before:rounded-xl before:h-28 before:w-full before:absolute before:-bottom-[75px] before:right-0 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] before:shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]">
                  <Link to={`/product/${item.name}`}>
                    <img
                      src={item.images[0]}
                      alt="#"
                      className="  relative z-0 top-0 w-full h-full right-1/2 translate-x-1/2   object-cover  rounded-3xl border border-grey "
                    />
                  </Link>

                  <h5 className="absolute top-0 z-10 right-1/2 translate-x-1/2 bg-grey px-2 text-xs rounded-lg pb-0.5  ">
                    {" "}
                    متوفر{" "}
                  </h5>
                  <div className="rounded-l-3xl favorit-and-panier absolute top-0  z-10 flex flex-col justify-center items-center bg-grey rounded-b-3xl p-1 gap-2">
                    <svg
                      onClick={() => handleHeartClick(item, index)}
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`${
                        selectedheart[index]
                          ? "fill-black border-primary-color-100"
                          : "fill-none"
                      } favorite feather feather-heart `}
                      style={{ cursor: "pointer" }}
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                  </div>

                  <h5 className="absolute bottom-0.5 z-10 right-1/2  translate-x-1/2 bg-grey font-semibold px-2 text-md rounded-xl  ">
                    {" "}
                    {item.price} DA{" "}
                  </h5>
                  <h5 className="absolute -bottom-8 z-10 right-1/2  translate-x-1/2 font-bold px-1 text-md w-full rounded-xl  ">
                    {" "}
                    {item.name}{" "}
                  </h5>
                  <Link to={`/product/${item.name}`}>
                    <Button className="absolute -bottom-[76px] z-10 right-1/2 border h-8 sm:h-9 translate-x-1/2 border-primary-color-100 bg-button-color-100 text-white font-bold  text-md w-full  hover:bg-primary-color-100 rounded-none rounded-b-xl  ">
                      {" "}
                      شراء{" "}
                    </Button>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        ) : null}
        <div className="h-[1px]"></div>
      </div>
    </>
  );
};

export default Products;
