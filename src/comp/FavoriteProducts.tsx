import React from "react";
interface Product {
    name: string; 
    price: number; 
    oldPrice: number; 
    gender: string; 
    images: string[]; 
    size: string[]; 
    color: string[];
    specialOffer: string; 
    amount: number; 
    discription: number; 
}
const FavoriteProducts = () => {
  const Navlinks = [
      {
          name: "favorite",
          id: "home",
          price : ""
      },
    { name: "Brands", id: "brands" },
    { name: "Vehicles", id: "vehicles" },
    { name: "About", id: "about" },
  ];
  const handleNavClick = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
      <ul className="w-[100%] flex xl:justify-center items-center lg:flex-row flex-col justify-around max-lg:h-[250px] max-lg max-lg:pt-5 max-lg:bg-primary-red-100 px-0">
        {Navlinks.map((item) => (
          <li key={item.name}>
            <button
              onClick={() => handleNavClick(item.id)}
              className="lg:mx-2 px-4 py-4 my-4 text-black font-semibold max-xl:py-1 w-[100%] max-lg:hover:bg-black lg:hover:text-black transition-all ease-in"
            >
              {item.name}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default FavoriteProducts;
