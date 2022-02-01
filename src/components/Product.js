import React, { useState } from "react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
const MAX_RATING = 5;
const MIN_RATING = 1;
const Product = ({ id, title, price, description, category, image }) => {
  const [rating] = useState(
    // Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
    Math.floor(Math.random() * 5) + 1
  );

  const [hasPrime] = useState(Math.random() < 0.5);
  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10   ">
      <p className="absolute top-2 right-2 text-xl italic text-gray-400">
        {category}
      </p>
      <Image src={image} width={200} height={200} objectFit="contain" />

      <h4 className="my-3">{title}</h4>
      <div className="flex">
        {Array(rating)
          .fill()
          .map((_, i) => (
            <StarIcon className="h-6 text-yellow-500" />
          ))}
      </div>
      <p className="text-xs my-2 line-clamp-2">{description}</p>

      <div className="mb-5">
        <Currency quantity={45685} currency="USD" />
      </div>
      {hasPrime && (
        <div className="flex items-center space-x-3 -mt-5">
          <img className="w-12" src="https://links.papareact.com/fdw" alt="" />
          <p className="text-gray text-gray-500">Free next-day delivery</p>
        </div>
      )}
      <button className="mt-auto button">Add to basket</button>
    </div>
  );
};

export default Product;
