import Product from "@/models/Product";
import mongooseConnect from "@/utils/mongooseConnect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    await mongooseConnect();
    const products = await Product.find();

    return new NextResponse(JSON.stringify(products));
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const PUT = async (request: NextRequest) => {
  await mongooseConnect();
  // console.log(await request.json());
  const { _id, title, description, price, rating, brand, category, images } =
    await request.json();
  await Product.updateOne(
    // Find by _id
    { _id },
    // And update
    {
      title,
      description,
      price,
      rating,
      brand,
      category,
      images,
    }
  );

  return new NextResponse(`Product ${title} has been updated!`);
};

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const newProduct = new Product(body);

  try {
    await mongooseConnect();
    await newProduct.save();
    return new NextResponse(`Product ${newProduct.title} has been created`, {
      status: 201,
    });
  } catch (err: any) {
    return new NextResponse(err);
  }
};

export const DELETE = async (request: NextRequest, { params }: any) => {
  try {
    await mongooseConnect();
    await Product.deleteMany();
    return new NextResponse("All products has been deleted", { status: 201 });
  } catch (err: any) {
    return new NextResponse(err);
  }
};
