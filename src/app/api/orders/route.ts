import { Order } from "@/models/Order";
import mongooseConnect from "@/utils/mongooseConnect";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await mongooseConnect();
    const orders = await Order.find().sort({ createdAt: -1 });

    return NextResponse.json(orders);
    // return NextResponse("gg");
  } catch (error) {
    return new NextResponse(error.message);
  }
};
