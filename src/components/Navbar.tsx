"use client";

import React from "react";
import ShopIcon from "./Icons/ShopIcon";
import Link from "next/link";
import { signOut } from "next-auth/react";

const Navbar = () => {
  return (
    <nav className="w-[200px] h-full bg-[#222F3E] text-white p-5 rounded-l-lg relative flex flex-col">
      <div className="flex items-center">
        <ShopIcon className={"w-16 h-16"} />
        <div className="flex flex-col ml-3">
          <p className="italic">Admin Ecommerce</p>
        </div>
      </div>
      <hr />
      <hr />
      <ul>
        <li>
          <Link href={"/"}>Home</Link>
        </li>
        <li>
          <Link href={"/categories"}>Categories</Link>
        </li>
        <li>
          <Link href={"/products"}>Products</Link>
        </li>
        <li>
          <Link href={"/orders"}>Orders</Link>
        </li>
        <li>
          <Link href={"/setting"}>Setting</Link>
        </li>
        <li>
          <button onClick={() => signOut()}>Sign out</button>
        </li>
      </ul>
      <h1 className="text-[#FF9900] absolute bottom-4 self-center">TJ Dev</h1>
    </nav>
  );
};

export default Navbar;
