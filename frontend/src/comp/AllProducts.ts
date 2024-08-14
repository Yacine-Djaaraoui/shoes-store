import React from "react";
import newBalance from "../../public/images/custom-nike-dunk-high-by-you-shoes.png";
import { useState } from "react";
import { Button } from "../components/ui/button";

interface Images {
  image: string;
  color: string;
}
interface Product {
  id: number;
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
  showingToTheTop: boolean;
}

const AllProducts: Product[] = [
  {
    id: 1,
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
    showingToTheTop: true,
  },
  {
    id: 2,
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
    showingToTheTop: true,
  },
  {
    id: 3,
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
    showingToTheTop: true,
  },
  {
    id: 4,
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
    showingToTheTop: true,
  },
];

export default AllProducts;
