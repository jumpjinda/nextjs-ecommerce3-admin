"use client";

import { adminEmails } from "@/app/api/auth/[...nextauth]/route";
import { useSession, signIn, signOut } from "next-auth/react";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const SessionAuth = ({ children }: Props) => {
  const { data: session } = useSession();
  if (!adminEmails.includes(session?.user?.email)) {
    return (
      <div className="w-full bg-slate-500 flex flex-col gap-2 items-center justify-center rounded-r-lg">
        <button
          onClick={() => signIn("google")}
          className="bg-[#FF9900] px-5 py-3 rounded-md text-white"
        >
          Login with Google
        </button>
        <button
          className="bg-red-500 px-5 py-3 rounded-md text-white"
          onClick={() => signOut()}
        >
          sign out
        </button>
      </div>
    );
  }
  return <>{children}</>;
};

export default SessionAuth;
