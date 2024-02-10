import Product from "@/models/Product";
import mongooseConnect from "@/utils/mongooseConnect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, { params }) => {
  const { id } = params;

  try {
    await mongooseConnect();
    const product = await Product.findById({ _id: id });

    return new NextResponse(JSON.stringify(product), { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error!", { status: 500 });
  }
};

export const DELETE = async (request: NextRequest, { params }) => {
  const { id } = params;

  try {
    await mongooseConnect();
    await Product.findByIdAndDelete({ _id: id });

    return new NextResponse(`Product has been deleted!`, { status: 201 });
  } catch (error) {
    return new NextResponse("Database Error!", { status: 500 });
  }
};
