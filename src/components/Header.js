import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/client"
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";

const Header = () => {
  const {data:session} = useSession()
  console.log(session);
  return (
    <div>
      <div className="flex items-center bg-amazon_blue p-1 py-2 flex-grow">
        {/* top nav */}
        <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
          <Image
            src="https://links.papareact.com/f90"
            width={150}
            height={40}
            objectFit="contain"
            className="cursor-pointer"
          />
        </div>
        {/* search */}
        <div className="hidden sm:flex h-10 items-center rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500">
          <input
            type="text"
            className="p-2 w-6 h-full flex-grow flex-shrink rounded-l-md focus:outline-none"
          />
          <SearchIcon className="h-12 p-4" />
        </div>
        {/* right */}
        <div className="text-white text-xs flex space-x-6 items-center mx-6 whitespace-nowrap">
          <div className="links">
            <p>Hello! meer habib</p>
            <p className="font-extrabold md:text-sm">Account & Lists</p>
          </div>

          <div className="links">
            <p>Returns</p>
            <p className="font-extrabold md:text-sm">& Orders</p>
          </div>

          <div className="links relative flex items-center">
            <span className="absolute top-0 right-0 md:right-10 w-4 h-4 rounded-full bg-yellow-400 justify-center items-center flex font-bold text-center text-black">
              0
            </span>
            <ShoppingCartIcon className="h-10" />

            <p className="hidden md:inline font-extrabold md:text-sm mt-2">
              Basket
            </p>
          </div>
        </div>
      </div>

      <div className="flex space-x-3 p-2 pl-6 items-center text-white bg-amazon_blue-light text-sm">
        {/* buttom nav */}
        <p className="link flex items-center">
          <MenuIcon className="h-6 mr-1" />
          All
        </p>
        <p className="link">Prime Video</p>
        <p className="link">Amazon Business</p>
        <p className="link">Today's Deal</p>
        <p className="link hidden lg:inline-flex">Electronices</p>
        <p className="link hidden lg:inline-flex">Food & grocery</p>
        <p className="link hidden lg:inline-flex">Prime</p>
        <p className="link hidden lg:inline-flex">Buy again</p>
        <p className="link hidden lg:inline-flex">Shop Toolkit</p>
      </div>
    </div>
  );
};

export default Header;
