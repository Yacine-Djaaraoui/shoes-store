import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

interface Product {
  id: number;
  name: string;
  images: string[];
  price: number;
}

const Listproduct: React.FC = () => {
  const [allproducts, setAllproducts] = useState<Product[]>([]);
  useAuth();

  const fetchInfo = async () => {
    try {
      const response = await fetch("http://localhost:4000/allproducts");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setAllproducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      // Handle error, e.g., set a state to indicate fetch failure
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const removeProduct = async (id) => {
    await fetch("http://localhost:4000/removeproduct", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    await fetchInfo();
  };
  return (
    <div>
      <ul className="cards mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-y-10 gap-x-4 mb-24 lg:mb-28 ">
        {allproducts.map((item, index) => (
          <li key={index} className="relative">
            <div className="frame relative h-full rounded-3xl before:bg-secondary-color before:rounded-xl before:h-28 before:w-full before:absolute before:-bottom-[75px] before:right-0 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] before:shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]">
              <img
                src={item.images[0]}
                alt=""
                className="w-full h-full relative z-0 top-0 right-1/2 translate-x-1/2 object-cover rounded-3xl border border-grey"
              />
            </div>

            <h5 className="absolute bottom-0.5 z-10 right-1/2 translate-x-1/2 bg-grey font-semibold px-2 text-md rounded-xl">
              {" "}
              {item.price} DA{" "}
            </h5>
            <h5 className="absolute -bottom-8 z-10 right-1/2 translate-x-1/2 font-bold px-1 text-md w-full rounded-xl">
              {" "}
              {item.name}{" "}
            </h5>
            <div>
              <Button
                onClick={() => {
                  removeProduct(item.id);
                }}
                className="absolute -bottom-[76px] z-10 right-1/2 border h-8 sm:h-9 translate-x-1/2 border-primary-color-100 bg-button-color-100 text-white font-bold text-md w-fit hover:bg-primary-color-100 rounded-none rounded-b-xl"
              >
                {" "}
                remove
              </Button>
              <Button
                onClick={() => {
                  removeProduct(item.id);
                }}
                className="absolute -bottom-[76px] z-10 right-1/2 border h-8 sm:h-9 translate-x-1/2 border-primary-color-100 bg-button-color-100 text-white font-bold text-md w-full hover:bg-primary-color-100 rounded-none rounded-b-xl"
              >
                {" "}
                remove
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Listproduct;
