// export default async function handler(req, res) {
//   const { method } = req;
//   console.log(method);
// }

import { NextResponse } from "next/server";

export const GET = async () => {
  const method = "GET";
  return new NextResponse(method);
};
