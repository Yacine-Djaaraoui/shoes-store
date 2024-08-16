import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faTiktok } from "@fortawesome/free-brands-svg-icons";
// import LogoImg from "../../public/images/Logoo.png";
import { Link } from "react-router-dom";
import LogoWhite from "../../public/images/Untitled-4.png";

// import {  } from "@fortawesome/free-regular-svg-icons";

const Footer = () => {
  const handleNewTabClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    path: string
  ) => {
    e.preventDefault();
    window.open(path, "_blank", "noopener,noreferrer");
  };
  return (
    <div>
      <div className=" w-full h-[250px]  bg-button-color-100 mt-16 md:mt-28 lg:mt-44 text-center rounded-3xl relative before:bg-hero-pattern before:absolute before:z-10 before:opacity-15 before:w-full before:h-full before:right-1/2 before:top-0 before:translate-x-1/2   rounded-b-none py-3  shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] ">
        <div className=" absolute z-50 text-center flex flex-col justify-center items-center top-0 right-0 w-full h-full ">
          <p className="text-white font-extrabold text-xl sm:text-2xl mb-3 mt-6">
            تواصل معنا
          </p>
          <div className="flex container sm:flex-row justify-between items-center ">
            <div className="flex justify-center items-center gap-5 sm:gap-6 order-2 mr-2">
              <Link
                to={
                  "https://web.facebook.com/profile.php?id=100066153776716&locale=fr_FR"
                }
                onClick={(e) =>
                  handleNewTabClick(
                    e,
                    "https://web.facebook.com/profile.php?id=100066153776716&locale=fr_FR"
                  )
                }
              >
                <FontAwesomeIcon
                  className="text-white text-xl sm:text-3xl"
                  icon={faFacebookF}
                />
              </Link>
              <Link
                to={"https://www.instagram.com/ova_.store/"}
                onClick={(e) =>
                  handleNewTabClick(e, "https://www.instagram.com/ova_.store/")
                }
              >
                <FontAwesomeIcon
                  className="text-white text-xl sm:text-3xl"
                  icon={faInstagram}
                />
              </Link>
              <Link
                to={"https://www.tiktok.com/@ova.store?_t=8oBQEY5ixvR&_r=1"}
                onClick={(e) =>
                  handleNewTabClick(
                    e,
                    "https://www.tiktok.com/@ova.store?_t=8oBQEY5ixvR&_r=1"
                  )
                }
              >
                <FontAwesomeIcon
                  className="text-white text-xl sm:text-3xl"
                  icon={faTiktok}
                />
              </Link>
            </div>
            <div className="flex justify-center items-center gap-2 sm:gap-3.5 order-3 text-md sm:text-xl -mr-1 ">
              <FontAwesomeIcon
                icon={faPhone}
                className="text-white text-md sm:text-xl "
              />{" "}
              <p className="text-white">0784463883</p>
            </div>
            <div className="flex justify-center items-center gap-3 order-1  sm:-ml-3">
              <img src={LogoWhite} alt="" className="w-[110px] sm:w-[170px] " />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
