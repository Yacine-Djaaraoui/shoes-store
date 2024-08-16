import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "./ShopContext";
import { useParams, useNavigate } from "react-router-dom";
import { ProductImages } from "./ProductImages";
import FormComponent from "./FormComponent";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet";
import PanierProducts from "./pPanierProducts";
import { Skeleton } from "../components/ui/skeleton";

const Product = () => {
  const { productName } = useParams();
  const {
    AllProducts,
    addToFavorites,
    favoriteItems,
    removeFromFavorites,
    PanierItems,
    addToPanier,
    removeFromPanier,
    setImgColor,
    imgColor,
  } = useContext(ShopContext);

  const navigate = useNavigate();
  const filteredProducts = AllProducts.filter(
    (product) => product.name === productName
  );
  // const defultColor =
  //   filteredProducts[0].colors.length === 1
  //     ? filteredProducts[0].colors[0]
  //     : "";
  const [productOrder, setProductOrder] = useState<ProductDetails>({
    product: productName,
    selectedColor: "",
    selectedSize: "",
    selectedAmount: 1,
  });

  const changeHandler = (e) => {
    setProductOrder((prevOrder) => ({
      ...prevOrder,
      [e.target.name]: e.target.value,
    }));
    console.log(imgColor);

    if (e.target.name === "selectedColor") {
      setImgColor(e.target.value);
    }
    setcolorempty(productOrder.selectedColor === "");
    setsizeempty(productOrder.selectedSize === "");
  };

  const handleIncrement = () => {
    setProductOrder({
      ...productOrder,
      selectedAmount: productOrder.selectedAmount + 1,
    });
  };

  const handleDecrement = () => {
    setProductOrder({
      ...productOrder,
      selectedAmount: productOrder.selectedAmount - 1,
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value <= 10 && value >= 1) {
      setProductOrder({ selectedAmount: value });
    }
  };

  const [selectedheart, setSelectedheart] = useState<boolean[]>(
    filteredProducts.map(() => false)
  );

  const handleHeartClick = (item, index: number) => {
    const newSelectedheart = [...selectedheart];
    newSelectedheart[index] = !newSelectedheart[index];
    setSelectedheart(newSelectedheart);

    if (newSelectedheart[index]) {
      addToFavorites(item);
    } else {
      removeFromFavorites(item.id);
    }
  };

  const [selectedSvgs, setSelectedSvgs] = useState<boolean[]>(
    filteredProducts.map(() => false)
  );
  const [order, setOrder] = useState(false);
  const [colorempty, setcolorempty] = useState(false);
  const [sizeempty, setsizeempty] = useState(false);
  const [onclick, setOnclick] = useState(false);
  const [painerClick, setpainerClick] = useState(true);
  const [moveToform, setmoveToform] = useState(false);

  const handleSvgClick = (item, index: number) => {
    setOrder(
      productOrder.selectedColor !== "" && productOrder.selectedSize !== ""
    );
    const newSelectedSvgs = [...selectedSvgs];
    newSelectedSvgs[index] = true;
    setSelectedSvgs(newSelectedSvgs);
    setTimeout(() => {
      newSelectedSvgs[index] = false;
      setSelectedSvgs(newSelectedSvgs);
    }, 100);

    if (productOrder.selectedColor !== "" && productOrder.selectedSize !== "") {
      const panierItem = {
        id: item.id,
        name: item.name,
        selectedColor: productOrder.selectedColor,
        selectedSize: productOrder.selectedSize,
        price: item.price,
        selectedAmont: productOrder.selectedAmount,
        selectedImg: item.images.filter((image) =>
          image.includes(productOrder.selectedColor)
        ),
      };

      setOnclick(false);
      addToPanier(panierItem);
      console.log(painerClick);

      setTimeout(() => {}, 500);
      setProductOrder((prevOrder) => ({
        ...prevOrder,
        selectedColor: "",
        selectedSize: "",
      }));
      console.log(productOrder.selectedColor);
    } else {
      setpainerClick(false);
      console.log(painerClick);

      setOnclick(true);
      setTimeout(() => {
        setcolorempty(productOrder.selectedColor === "");
        setsizeempty(productOrder.selectedSize === "");
      }, 0);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (painerClick) {
      setpainerClick(true);
    } else {
      setpainerClick(false);
    }
  }, [painerClick]);

  useEffect(() => {
    if (productOrder.selectedColor !== "" && productOrder.selectedSize !== "") {
      setpainerClick(true);
    }
  }, [productOrder.selectedColor, productOrder.selectedSize]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setcolorempty(productOrder.selectedColor === "");
      setsizeempty(productOrder.selectedSize === "");
    }, 10);

    return () => clearTimeout(timer);
  });

  useEffect(() => {
    return () => {
      setImgColor("");
    };
  }, [setImgColor]);

  const checkorder = (item) => {
    setOrder(
      productOrder.selectedColor !== "" && productOrder.selectedSize !== ""
    );

    setOnclick(true);
    setTimeout(() => {
      setcolorempty(productOrder.selectedColor === "");
      setsizeempty(productOrder.selectedSize === "");
    }, 100);
    if (productOrder.selectedColor !== "" && productOrder.selectedSize !== "") {
      const panierItem = {
        id: item.id,
        name: item.name,
        selectedColor: productOrder.selectedColor,
        selectedSize: productOrder.selectedSize,
        price: item.price,
        selectedAmont: productOrder.selectedAmount,
        selectedImg: item.images.filter((image) =>
          image.includes(productOrder.selectedColor)
        ),
      };

      addToPanier(panierItem);
      console.log(painerClick);
      setOnclick(false);
      setmoveToform(true);
      navigate("/cart");

      setTimeout(() => {}, 500);
      setProductOrder((prevOrder) => ({
        ...prevOrder,
        selectedColor: "",
        selectedSize: "",
      }));
    }
  };
  // useEffect(() => {
  //   if (filteredProducts.colors.length === 0) {
  //     setcolorempty(false);
  //   }
  //   if (filteredProducts.sizes.length === 0) {
  //     setsizeempty(false);
  //   }
  // }, [filteredProducts.colors, filteredProducts.sizes]);

  return (
    <div>
      {filteredProducts.length > 0 ? (
        <div>
          {filteredProducts.map((item, index) => (
            <div className=" container flex justify-between w-full flex-col md:flex-row-reverse items-center">
              {" "}
              <div className="bg-beje bg-opacity-35 px-4 lg:px-8 py-4 md:pb-10 md:pt-7 text-center rounded-b-3xl w-full md:w-[45%] mb-2">
                <h2 className="text-black font-semibold mb-3 text-xl ">
                  {item.name}
                </h2>
                <div className="flex flex-row-reverse justify-center items-center gap-3 md:hidden">
                  {/* <h2 className="text-black font-semibold  text-lg  "> : السعر</h2> */}
                  <h2 className="cursor-pointer p-2  rounded  font-extrabold text-xl text-black ">
                    {item.price} DA
                  </h2>
                </div>
                <ProductImages images={item.images} />
                {item.specialOffer !== "" ? (
                  <div className="flex justify-center gap-5 flex-row-reverse items-center  md:hidden mt-4">
                    {" "}
                    <p className=" text-white border border-primary-color-100 rounded-full text-center flex justify-center items-center font-semibold bg-button-color w-[55px] h-[51px]">
                      {" "}
                      عرض{" "}
                    </p>
                    <h2 className="text-black font-semibold  text-lg ">
                      {item.specialOffer}
                    </h2>
                  </div>
                ) : (
                  <div>
                    {" "}
                    <br />
                  </div>
                )}
              </div>
              <div className="flex flex-col items-end  mt-2 w-full md:w-[47%] ">
                {item.specialOffer !== "" ? (
                  <div className="flex justify-center gap-5 flex-row-reverse items-center  max-md:hidden mt-3 mb-3">
                    {" "}
                    <p className=" text-white border border-primary-color-100 rounded-full text-center flex justify-center items-center font-semibold bg-button-color  w-[60px] h-[60px]  ">
                      {" "}
                      عرض{" "}
                    </p>
                    <h2 className="text-black font-semibold  text-lg ">
                      {item.specialOffer}
                    </h2>
                  </div>
                ) : (
                  <div>
                    {" "}
                    <br />
                  </div>
                )}
                <h2 className="text-black font-semibold mb-3 text-xl hidden ">
                  {item.name}
                </h2>
                <div className="flex flex-row-reverse justify-center items-center mb-3 max-md:hidden">
                  <h2 className="cursor-pointer   rounded   text-xl text-black ">
                    : السعر
                  </h2>
                  {/* <h2 className="text-black font-semibold  text-lg  "> : السعر</h2> */}
                  <h2 className="cursor-pointer p-2  rounded  font-extrabold text-xl text-black ">
                    {item.price} DA
                  </h2>
                </div>
                <h2 className="text-black font-semibold  text-lg ">
                  {" "}
                  : الألوان المتوفرة
                </h2>
                <ul className="flex gap-3 mt-1 text-lg mb-3 ">
                  {item.colors.map((color, index) => (
                    // <li className="border border-primary-color-100 px-2" >{color}</li>
                    <label
                      key={index}
                      className={`cursor-pointer p-2 border rounded mt-1 ${
                        productOrder.selectedColor === color &&
                        productOrder.selectedColor !== ""
                          ? "bg-button-color-100 text-white"
                          : "bg-white text-black"
                      }`}
                    >
                      <input
                        type="radio"
                        name="selectedColor"
                        value={color}
                        checked={productOrder.selectedColor === color}
                        onChange={changeHandler}
                        className="hidden"
                        required
                      />
                      {color}
                    </label>
                  ))}
                </ul>
                {onclick && colorempty ? (
                  <p className="text-red-600 "> اختر اللون </p>
                ) : null}
                <h2 className="text-black font-semibold  text-lg ">
                  {" "}
                  : المقاسات المتوفرة
                </h2>

                <ul className="flex gap-3 mt-1 text-lg mb-3 ">
                  {item.sizes.map((size, index) => (
                    // <li className="border border-primary-size-100 px-2" >{size}</li>
                    <label
                      key={index}
                      className={`cursor-pointer p-2 border rounded mt-1 ${
                        productOrder.selectedSize === size
                          ? "bg-button-color-100 text-white"
                          : "bg-white text-black"
                      }`}
                    >
                      <input
                        type="radio"
                        name="selectedSize"
                        value={size}
                        checked={productOrder.selectedSize === size}
                        onChange={changeHandler}
                        className="hidden"
                        required
                      />
                      {size}
                    </label>
                  ))}
                </ul>
                {onclick && sizeempty ? (
                  <p className="text-red-600 "> اختر المقاس </p>
                ) : null}
                <div className="flex gap-3 flex-row-reverse justify-center items-center mt-3">
                  <h2 className="text-black font-semibold  text-lg  ">
                    {" "}
                    : الكمية
                  </h2>

                  <div className="flex items-center ">
                    <button
                      className="px-3 py-1 bg-gray-200 border border-gray-300 rounded-lg font-extrabold text-xl"
                      onClick={handleDecrement}
                      disabled={productOrder.selectedAmount <= 1}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="w-10 h-10 text-center hide-spinner  outline-none font-bold"
                      value={productOrder.selectedAmount}
                      onChange={handleChange}
                      min={1}
                      max={10}
                    />
                    <button
                      className="px-3 py-1 bg-gray-200 border border-gray-300 rounded-lg font-bold text-lg "
                      onClick={handleIncrement}
                      disabled={productOrder.selectedAmount >= 10}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex flex-row-reverse items-center w-full justify-between mt-3">
                  {!painerClick ? (
                    <button
                      onClick={() => handleSvgClick(item, index)}
                      className={` ${
                        selectedSvgs[index] && order
                          ? "bg-button-color-100 text-white"
                          : "bg-transparent  text-black "
                      } panier flex flex-row-reverse items-center gap-1 justify-between  border-[2px] border-grey rounded-xl px-3  py-2`}
                    >
                      <p className="  ">أضف الى السلة</p>

                      <svg
                        className={` h-6 rounded-full p-[0px] text-black  ${
                          selectedSvgs[index] ? "fill-white" : "fill-none"
                        }`}
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
                    </button>
                  ) : (
                    <Sheet>
                      <SheetTrigger>
                        <button
                          onClick={() => handleSvgClick(item, index)}
                          className={` ${
                            selectedSvgs[index] && order
                              ? "bg-button-color-100 text-white"
                              : "bg-transparent  text-black "
                          } panier flex flex-row-reverse items-center gap-1 justify-between  border-[2px] border-grey rounded-xl px-3  py-2`}
                        >
                          <p className="  ">أضف الى السلة</p>

                          <svg
                            className={` h-6 rounded-full p-[0px] text-black  ${
                              selectedSvgs[index] ? "fill-white" : "fill-none"
                            }`}
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
                        </button>
                      </SheetTrigger>
                      <SheetContent side={"left"} className="min-w-[350px] p-0">
                        <SheetHeader>
                          <SheetDescription className="p-0">
                            <PanierProducts />
                          </SheetDescription>
                        </SheetHeader>
                      </SheetContent>
                    </Sheet>
                  )}

                  <button
                    onClick={() => handleHeartClick(item, index)}
                    className={` ${
                      selectedheart[index]
                        ? "bg-button-color-100 text-white"
                        : "bg-grey  text-black "
                    } panier flex flex-row-reverse items-center gap-1 justify-between  border rounded-xl px-3 border-grey  py-2`}
                  >
                    <p className="  ">أضف الى المفضلة</p>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`${
                        selectedheart[index]
                          ? "fill-white border-primary-color-100"
                          : "fill-none"
                      } favorite feather feather-heart `}
                      style={{ cursor: "pointer" }}
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                  </button>
                </div>
                <button
                  onClick={() => checkorder(item)}
                  className=" text-white border border-primary-color-100 rounded-xl bg-primary-color-100 px-5 w-full py-2  mt-3 hover:bg-button-color-100"
                >
                  شراء
                </button>
              </div>
              {/* <FormComponent /> */}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex  justify-center items-center space-y-3 space-x-3">
          <Skeleton className="h-[300px] w-[160px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[160px]" />
            <Skeleton className="h-4 w-[100px]" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
