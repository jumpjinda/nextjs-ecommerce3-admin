"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

const Home = () => {
  const { data: session } = useSession();
  return (
    <>
      <div className="">Welcome, {session?.user?.email}</div>
      <div className="flex justify-evenly w-full">
        <Link href={"/upload-button"}>Upload Button</Link>
        <Link href={"/upload-dnd"}>Upload DnD</Link>
      </div>
    </>
  );
};

export default Home;
