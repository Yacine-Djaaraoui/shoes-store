import React from "react";
import newBalance from "../../public/images/custom-nike-dunk-high-by-you-shoes.png";
import { useState } from "react";
import { Button } from "../components/ui/button";
interface Images {
  image: string;
  color: string;
}
interface Product {
  name: string;
  price: number;
  oldPrice: number;
  gender: string;
  images: Images[];
  size: number[];
  color: string[];
  specialOffer: string;
  amount: number;
  discription: string;
}

const products: Product[] = [
  {
    name: "NewBalance 530",
    price: 4500,
    oldPrice: 5,
    gender: "homme",
    images: [
      {
        image: newBalance,
        color: "black",
      },
    ],
    size: [38, 39, 40, 41, 42, 43],
    color: ["Noir", "Blanc", "Gris"],
    specialOffer: "اذا طلبت 2 او اكثر السعر يصبح 3000 دج للواحدة ",
    amount: 15,
    discription: "",
  },
  {
    name: "NewBalance 531",
    price: 4500,
    oldPrice: 5,
    gender: "homme",
    images: [
      {
        image: newBalance,
        color: "black",
      },
    ],
    size: [38, 39, 40, 41, 42, 43],
    color: ["Noir", "Blanc", "Gris"],
    specialOffer: "اذا طلبت 2 او اكثر السعر يصبح 3000 دج للواحدة ",
    amount: 15,
    discription: "",
  },
  {
    name: "NewBalance 532",
    price: 4500,
    oldPrice: 5,
    gender: "homme",
    images: [
      {
        image: newBalance,
        color: "black",
      },
    ],
    size: [38, 39, 40, 41, 42, 43],
    color: ["Noir", "Blanc", "Gris"],
    specialOffer: "اذا طلبت 2 او اكثر السعر يصبح 3000 دج للواحدة ",
    amount: 15,
    discription: "",
  },
  {
    name: "NewBalance 533",
    price: 4500,
    oldPrice: 5,
    gender: "homme",
    images: [
      {
        image: newBalance,
        color: "black",
      },
    ],
    size: [38, 39, 40, 41, 42, 43],
    color: ["Noir", "Blanc", "Gris"],
    specialOffer: "اذا طلبت 2 او اكثر السعر يصبح 3000 دج للواحدة ",
    amount: 15,
    discription: "",
  },
];
const Products = () => {
  const [selectedheart, setSelectedheart] = useState<boolean[]>(
    products.map(() => false)
  );
  // Function to handle heart click
  const handleHeartClick = (item, index: number) => {
    const newSelectedheart = [...selectedheart];
    newSelectedheart[index] = !newSelectedheart[index]; // Toggle the selection status
    setSelectedheart(newSelectedheart);
  };
  const [selectedSvgs, setSelectedSvgs] = useState<boolean[]>(
    products.map(() => false)
  );
  const handleSvgClick = (item, index: number) => {
    const newSelectedSvgs = [...selectedSvgs];
    newSelectedSvgs[index] = !newSelectedSvgs[index]; // Toggle the selection status
    setSelectedSvgs(newSelectedSvgs);
  };

  return (
    <>
      <div className="products my-[60px] container text-center">
        <h3 className="font-bold mb-1  text-xl"> أفضل العروض</h3>
        <p> التوصيل متوفر لجميع الولايات الجزائرية</p>
        <ul className="cards mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3  xl:grid-cols-4 gap-y-[90px] gap-x-4 mb-24 lg:mb-28">
          {products.map((item, index) => (
            <li key={index} className="">
              <div className="frame relative h-auto rounded-3xl  before:bg-secondary-color before:rounded-xl before:h-28 before:w-full before:absolute before:-bottom-[75px] before:right-0 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] before:shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]">
                <img
                  src={item.images[0].image}
                  alt=""
                  className="  relative z-0 top-0  right-1/2 translate-x-1/2   object-cover  rounded-3xl border border-grey "
                />
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
                  <svg
                    onClick={() => handleSvgClick(item, index)}
                    className={` h-6 rounded-full p-[0px] text-black  ${
                      selectedSvgs[index] ? "fill-black" : "fill-none"
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
                </div>

                <h5 className="absolute bottom-0.5 z-10 right-1/2  translate-x-1/2 bg-grey font-semibold px-2 text-md rounded-xl  ">
                  {" "}
                  {item.price} DA{" "}
                </h5>
                <h5 className="absolute -bottom-8 z-10 right-1/2  translate-x-1/2 font-bold px-1 text-md w-full rounded-xl  ">
                  {" "}
                  {item.name}{" "}
                </h5>
                <Button className="absolute -bottom-[76px] z-10 right-1/2 bg-white text-primary-color-100 border h-8 sm:h-9 translate-x-1/2 border-primary-color-100 hover:bg-button-color-100 hover:text-white font-bold  text-md w-full rounded-none rounded-b-xl  ">
                  {" "}
                  شراء{" "}
                </Button>
              </div>
            </li>
          ))}
        </ul>
        <Button className="bg-transparent text-primary-color-100 border rounded-2xl px-10 border-primary-color-100 hover:bg-button-color-100 hover:text-white font-bold  ">
          {" "}
          عرض المزيد{" "}
        </Button>
      </div>
    </>
  );
};

export default Products;
