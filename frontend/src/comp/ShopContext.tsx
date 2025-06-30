import React, { createContext, ReactNode, useEffect, useState } from "react";

// Define the shape of the context value (optional for better typing later)
export const ShopContext = createContext(null);

// Define the props for the provider component
interface ShopContextProviderProps {
  children: ReactNode;
}

const ShopContextProvider: React.FC<ShopContextProviderProps> = ({
  children,
}) => {
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [PanierItems, setPanierItems] = useState([]);
  const [AllProducts, setAllproducts] = useState([]);
  const [imgpsition, setimgposition] = useState(0);
  const [imgColor, setImgColor] = useState("");
  const [imgName, setImgName] = useState("");
  const [someCondition, setsomeCondition] = useState(false);

  // ✅ Fix: Fetch only once on initial mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://shoes-store-api.vercel.app/allproducts");
        const data = await response.json();
        setAllproducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []); // ✅ empty dependency array = run once

  // Add to favorites
  const addToFavorites = (product) => {
    setFavoriteItems((prevItems) => [...prevItems, product]);
  };

  // Remove from favorites
  const removeFromFavorites = (productId: number) => {
    setFavoriteItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  // Add to cart
  const addToPanier = (product: any) => {
    setPanierItems((prevItems) => [...prevItems, product]);
  };

  // Remove from cart
  const removeFromPanier = (product: any) => {
    setPanierItems((prevItems) =>
      prevItems.filter(
        (item) =>
          item.name !== product.name ||
          item.selectedSize !== product.selectedSize ||
          item.selectedColor !== product.selectedColor
      )
    );
  };

  // All shared values
  const contextValue = {
    AllProducts,
    favoriteItems,
    addToFavorites,
    removeFromFavorites,
    PanierItems,
    addToPanier,
    removeFromPanier,
    imgpsition,
    imgColor,
    setImgColor,
    setimgposition,
    setImgName,
    imgName,
    someCondition,
    setsomeCondition,
  };

  return (
    <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
