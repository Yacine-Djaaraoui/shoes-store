import React, { useState, ChangeEvent, useEffect } from "react";
import Sidebar from "./Sidebar";
import useAuth from "../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
interface ProductDetails {
  name: string;
  images: string[]; // Updated to store an array of image URLs
  gender: string;
  price: string;
  oldPrice: string;
  category: string;
  sizes: string[];
  colors: string[];
  discription: string;
  specialOffer: string;
  amount: string;
  showingOnTheTop: string;
}

const Addproduct: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [productDetails, setProductDetails] = useState<ProductDetails>({
    name: "",
    images: [],
    gender: "both",
    price: "",
    oldPrice: "",
    category: "",
    sizes: [],
    colors: [],
    discription: "",
    specialOffer: "",
    amount: "",
    showingOnTheTop: "true",
  });

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [sizeInput, setSizeInput] = useState("");
  const [colorInput, setColorInput] = useState("");

  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImageFiles(files);
      const previews = files.map((file) => URL.createObjectURL(file));
      setImagePreviews(previews);
    }
  };

  const addSize = () => {
    if (sizeInput.trim()) {
      setProductDetails((prevState) => ({
        ...prevState,
        sizes: [...prevState.sizes, sizeInput],
      }));
      setSizeInput("");
    }
  };

  const removeSize = (index: number) => {
    setProductDetails((prevState) => ({
      ...prevState,
      sizes: prevState.sizes.filter((_, i) => i !== index),
    }));
  };

  const addColor = () => {
    if (colorInput.trim()) {
      setProductDetails((prevState) => ({
        ...prevState,
        colors: [...prevState.colors, colorInput],
      }));
      setColorInput("");
    }
  };

  const removeColor = (index: number) => {
    setProductDetails((prevState) => ({
      ...prevState,
      colors: prevState.colors.filter((_, i) => i !== index),
    }));
  };

  const add_product = async () => {
    console.log(productDetails);
    let responseData;
    let product = { ...productDetails };
    let formData = new FormData();

    imageFiles.forEach((file) => {
      formData.append("productImages", file);
    });

    await fetch("https://shoes-store-api.vercel.app/upload", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        responseData = data;
      });

    if (responseData.success) {
      product.images = responseData.image_urls; // Store array of image URLs
      console.log(product);
      await fetch("https://shoes-store-api.vercel.app/addproduct", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((resp) => resp.json())
        .then((data) => {
          data.success ? alert("Product Added") : alert("Failed");
        });
      // Further processing with the updated product
    }
  };

  useAuth();

  return (
    <div className="flex flex-col lg:flex-row flex-wrap m-5 w-full items-center text-center gap-4">
      <div className=" flex flex-col justify-start mb-2 lg:h-32 ">
        <p className="text-gray-600  mb-2 font-semibold ">Product Title</p>
        <input
          className="px-3 text-center border outline-primary-color-100 py-2 "
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Here"
        />
      </div>
      <div className=" flex flex-col justify-start mb-2 lg:h-32 ">
        <p className="text-gray-600  mb-2 font-semibold">Price</p>
        <input
          className="px-3 text-center border outline-primary-color-100 py-2 bg-white "
          value={productDetails.price}
          onChange={changeHandler}
          type="text"
          name="price"
          placeholder="Here"
        />
      </div>
      <div className=" flex flex-col justify-start mb-2 lg:h-32 ">
        <p className="text-gray-600  mb-2 font-semibold">Old Price</p>
        <input
          className="px-3 text-center border outline-primary-color-100 py-2 "
          value={productDetails.oldPrice}
          onChange={changeHandler}
          type="text"
          name="oldPrice"
          placeholder="Here"
        />
      </div>
      <div className=" flex flex-col justify-start mb-2 lg:h-32 ">
        <p className="text-gray-600  mb-2 font-semibold">Gender</p>
        <select
          className="px-3 text-center border outline-primary-color-100 py-2 bg-white "
          value={productDetails.gender}
          onChange={changeHandler}
          name="gender"
        >
          <option
            className="px-3 text-center border outline-primary-color-100 py-2 bg-white "
            value="men"
          >
            Men
          </option>
          <option
            className="px-3 text-center border outline-primary-color-100 py-2 bg-white hover:bg-primary-color-100"
            value="women"
          >
            Women
          </option>
          <option
            className="px-3 text-center border outline-primary-color-100 py-2 bg-white "
            value="both"
          >
            both
          </option>
        </select>
      </div>
      <div className=" flex flex-col justify-start mb-2 lg:h-32 ">
        <p className="text-gray-600  mb-2 font-semibold">Category</p>
        <select
          className="px-3 text-center border outline-primary-color-100 py-2 "
          value={productDetails.category}
          onChange={changeHandler}
          name="category"
        >
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="both">both</option>
        </select>
      </div>
      <div className=" flex flex-col justify-start mb-2 lg:h-32 ">
        <p className="text-gray-600  mb-2 font-semibold">showingOnTheTop</p>
        <select
          className="px-3 text-center border outline-primary-color-100 py-2 "
          value={productDetails.showingOnTheTop}
          onChange={changeHandler}
          name="showingOnTheTop"
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
      <div className=" flex flex-col justify-center items-center  w-full">
        <label htmlFor="file-input" className="flex items-start cursor-pointer">
          <FontAwesomeIcon
            icon={faUpload}
            size="2x"
            className="text-gray-500"
          />
          <span className="ml-2 text-gray-600  mb-2 font-semibold">
            Upload Images
          </span>
        </label>
        <input
          className="hidden"
          type="file"
          name="images"
          id="file-input"
          onChange={fileChangeHandler}
          multiple
        />
      </div>
      <div className="image-previews flex flex-col justify-center items-center lg:flex-row w-full">
        {imagePreviews.map((preview, index) => (
          <img
            key={index}
            src={preview}
            alt={`Preview ${index}`}
            className="w-[150px] "
          />
        ))}
      </div>
      <div className="flex flex-col justify-start h-32">
        <p className="text-gray-600 mb-2 font-semibold">Description</p>
        <textarea
          className="px-3 text-center border outline-primary-color-100 py-2"
          value={productDetails.discription}
          onChange={changeHandler}
          name="discription"
          placeholder="Here"
          rows={4} // Adjust the number of rows as needed
        />
      </div>
      <div className="flex flex-col justify-start h-32">
        <p className="text-gray-600 mb-2 font-semibold">Special Offer</p>
        <textarea
          className="px-3 text-center border outline-primary-color-100 py-2"
          value={productDetails.specialOffer}
          onChange={changeHandler}
          name="specialOffer"
          placeholder="Here"
          rows={4} // Adjust the number of rows as needed
        />
      </div>
      <div className=" flex flex-col justify-start mb-2 lg:h-32 ">
        <p className="text-gray-600 mb-2 font-semibold">Sizes</p>
        <input
          className="px-3 text-center border outline-primary-color-100 py-2 "
          value={sizeInput}
          onChange={(e) => setSizeInput(e.target.value)}
          type="text"
          placeholder="Enter size"
        />
        <button type="button" onClick={addSize}>
          Add Size
        </button>
        <ul>
          {productDetails.sizes.map((size, index) => (
            <li
              key={index}
              className="border border-grey flex w-full pl-2 py-1 justify-between  "
            >
              {size}
              <button
                type="button"
                className="font-bold text-red-600"
                onClick={() => removeSize(index)}
              >
                x
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className=" flex flex-col justify-start mb-2 lg:h-32 ">
        <p className="text-gray-600  mb-2 font-semibold">Colors</p>
        <input
          className="px-3 text-center border outline-primary-color-100 py-2 "
          value={colorInput}
          onChange={(e) => setColorInput(e.target.value)}
          type="text"
          placeholder="Enter color"
        />
        <button type="button" onClick={addColor}>
          Add Color
        </button>
        <ul>
          {productDetails.colors.map((color, index) => (
            <li
              key={index}
              className="border border-grey flex w-full pl-2 py-1 justify-between  "
            >
              {color}
              <button
                type="button"
                className="font-bold text-red-600"
                onClick={() => removeColor(index)}
              >
                x
              </button>
            </li>
          ))}
        </ul>
      </div>{" "}
      <Button
        onClick={add_product}
        className=" h-8 sm:h-9  border-primary-color-100 bg-button-color-100 text-white font-bold  text-md   hover:bg-primary-color-100 w-fit px-6 rounded-xl  "
      >
        {" "}
        Add Product
      </Button>
    </div>
  );
};

export default Addproduct;
