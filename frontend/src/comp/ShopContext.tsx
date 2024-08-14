import React, { createContext, ReactNode, useEffect } from "react";
import { useState } from "react";
// Define the shape of the context value

// Create the context with an initial value of null
export const ShopContext = createContext(null);

// Define the props for the provider component
interface ShopContextProviderProps {
  children: ReactNode;
}
interface ShopContextType {
  addToFavorites: (product) => void;
  // : typeof AllProducts;
  removeFromFavorites: (productId: number) => void;
}

// Define the context provider component
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

  useEffect(() => {
    fetch("http://localhost:4000/allproducts")
      .then((response) => response.json())
      .then((data) => setAllproducts(data));
  });
  // Function to add an item to the favorites list
  const addToFavorites = (product) => {
    setFavoriteItems((prevItems) => [...prevItems, product]);
  };
  const removeFromFavorites = (productId: number) => {
    setFavoriteItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };
  const addToPanier = (product: any) => {
    setPanierItems((prevItems) => [...prevItems, product]);
  };
  const removeFromPanier = (product: any) => {
    setPanierItems((prevItems) =>
      prevItems.filter(
        (item) =>
          item.name !== item.name ||
          item.selectedSize !== product.selectedSize ||
          item.selectedColor !== product.selectedColor
      )
    );
  };

  // The value that will be provided to consuming components
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

// Export the provider component as the default export
export default ShopContextProvider;
