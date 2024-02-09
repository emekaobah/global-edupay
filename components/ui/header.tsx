"use client";
import React, { useState } from "react";
import Link from "next/link";
import { HiBars3 } from "react-icons/hi2";
import { cn } from "@/lib/utils";
interface Props {}

const Header = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState);
  };
  return (
    <div className=" flex flex-col min-h-28 bg-[#000B45] w-full  py-8 fixed top-0 z-10">
      <div className="container flex flex-row justify-between my-auto mx-auto px-4 text-white">
        <div className="flex flex-col  justify-between  md:flex md:flex-row md:items-center md:w-full">
          <p className="font-[600] text-2xl ">Global EduPay</p>
          <div className="">
            <ul className="hidden gap-20 text-lg md:flex md:flex-row ">
              <li className="opacity-70 hover:opacity-100">
                <Link href="">About</Link>
              </li>
              <li className="opacity-70 hover:opacity-100">
                <Link href="">Services</Link>
              </li>
              <li className="opacity-70 hover:opacity-100">
                <Link href="">Contact</Link>
              </li>
            </ul>
          </div>
          <div className="my-4 md:hidden">
            {isOpen ? (
              <ul className="flex flex-col  text-lg  gap-2 opacity-60 md:flex-row  md:gap-20">
                <li>
                  <Link href="  text-white">About</Link>
                </li>
                <li>
                  <Link href="">Services</Link>
                </li>
                <li>
                  <Link href="">Contact</Link>
                </li>
              </ul>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="flex md:hidden">
          <div onClick={toggleMenu} className=" text-4xl hover:cursor-pointer">
            <HiBars3 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
