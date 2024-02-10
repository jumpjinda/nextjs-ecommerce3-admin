"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import "@uploadthing/react/styles.css";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const ProductForm = ({
  _id,
  title: prevTitle,
  description: prevDescription,
  price: prevPrice,
  rating: prevRating,
  brand: prevBrand,
  category: prevCategory,
  images: prevImages,
}: {
  _id: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  brand: string;
  category: string;
  images: string[];
  categories: string[];
}) => {
  const [title, setTitle] = useState(prevTitle || "");
  const [description, setDescription] = useState(prevDescription || "");
  const [price, setPrice] = useState(prevPrice || "");
  const [rating, setRating] = useState(prevRating || "");
  const [brand, setBrand] = useState(prevBrand || "");
  const [category, setCategory] = useState(prevCategory || "");
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState(prevImages || []);
  const router = useRouter();

  async function getCategories() {
    const res = await fetch("http://localhost:3000/api/categories", {
      cache: "no-store",
    });
    const data = await res.json();
    let categories: any = [];
    for (let i = 0; i < data.length; i++) {
      categories.push(data[i].name);
    }
    setCategories(categories);
  }

  useEffect(() => {
    getCategories();
  }, []);

  async function saveProduct(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = {
      title,
      description,
      price,
      rating,
      brand,
      category,
      images,
    };
    // console.log(data);
    if (_id) {
      const res = await axios.put("/api/products", { ...data, _id });

      console.log(res.data);
    } else {
      const res = await axios.post("/api/products", { ...data });

      console.log(res.data);
    }

    router.push("/products");
  }

  async function uploadImages(e: React.FormEvent<HTMLFormElement>) {
    // console.log(e);
    const files = e.target.files;
    // console.log(files.length);

    if (files?.length > 0) {
      // create Array FormData and assign to data
      const data = new FormData();
      // append file in files array to data
      for (const file of files) {
        data.append("file", file);
      }
      // send post method and data to upload api
      const res = await axios.post("/api/upload", data);
      // console.log(res);
      // console.log(await res.data);
      setImages((oldImages) => {
        return [...oldImages, res.data];
      });
    }
  }

  function updateImagesOrder(images: React.SetStateAction<string[]>) {
    // console.log(arguments);
    setImages(images);
  }

  function removeImage(indexToRemove: number) {
    setImages((prev) => {
      return [...prev].filter((image, imageIndex) => {
        return imageIndex !== indexToRemove;
      });
    });
  }

  function deleteProduct(id: string) {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete "${title}" product?`,
      icon: "error",
      confirmButtonText: "Yes, Delete!",
      confirmButtonColor: "#d55",
      showCancelButton: true,
      cancelButtonText: "No",
      heightAuto: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const id = _id;
        await fetch(`/api/products/${id}`, {
          method: "DELETE",
        });
        router.push("/products");
      }
    });
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="mt-1 mb-3">{prevTitle}</h1>
        {_id && (
          <button
            className=" bg-red-500 px-3 py-2 rounded-md"
            onClick={() => deleteProduct(_id)}
          >
            Delete Product
          </button>
        )}
      </div>
      <hr />
      <hr />
      <form
        className="flex flex-col gap-2 text-xl mt-7"
        onSubmit={saveProduct}
      >
        <div className="flex items-start gap-2">
          <label>Product Name:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-gray-500 pl-2 rounded-md border-[2px] border-[#222F3E]"
            required
          />
        </div>

        <div className="flex items-start gap-2">
          <label>Description:</label>
          <textarea
            data-type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-gray-500 pl-2 rounded-md border-[2px] border-[#222F3E]"
            cols={40}
            rows={3}
            required
          />
        </div>

        <div className="flex items-start gap-2">
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="bg-gray-500 pl-2 rounded-md border-[2px] border-[#222F3E]"
            required
          />
        </div>

        <div className="flex items-start gap-2">
          <label>Rating:</label>
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="bg-gray-500 pl-2 rounded-md border-[2px] border-[#222F3E]"
            required
            max={5}
          />
        </div>

        <div className="flex items-start gap-2">
          <label>Brand:</label>
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="bg-gray-500 pl-2 rounded-md border-[2px] border-[#222F3E]"
            required
          />
        </div>

        {/* <div className="flex items-start gap-2">
          <label>Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-gray-500 pl-2 rounded-md border-[2px] border-[#222F3E]"
            required
          />
        </div> */}

        <div className="flex items-start gap-2">
          <label>Category:</label>
          <select
            className="bg-gray-500 pl-2 rounded-md border-[2px] border-[#222F3E] p-1"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">{category}</option>
            {categories.length > 0 &&
              categories.map((c) => (
                <option
                  key={c}
                  value={c}
                >
                  {c}
                </option>
              ))}
          </select>
        </div>

        <label>Images (max 5 images)</label>
        <div className="flex h-[200px]">
          <ReactSortable
            list={images}
            setList={updateImagesOrder}
            className="flex gap-2"
          >
            {!!images.length &&
              images.map((link, index) => (
                <div
                  key={index}
                  className="relative mt-2 w-[185px]"
                >
                  <img
                    src={link}
                    alt={title}
                    width={185}
                    height={200}
                    className="max-h-[200px] object-contain"
                  />
                  <button
                    type="button"
                    className="absolute -top-2 -right-2"
                    onClick={() => removeImage(index)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="red"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              ))}
          </ReactSortable>

          {images.length < 5 && (
            <div className="w-[185px] flex items-center justify-center ml-2">
              <label className="w-24 h-24 border flex flex-col items-center justify-center text-sm gap-1 text-gray-500 rounded-md cursor-pointer shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>
                Upload
                <input
                  type="file"
                  onChange={uploadImages}
                  className="hidden"
                />
              </label>
            </div>
          )}
        </div>

        <div className="place-self-center flex gap-3 mt-5">
          <button
            type="submit"
            className="bg-[#FF9900] px-5 py-2 rounded-md"
          >
            Save
          </button>
          <Link href={"/products"}>
            <button
              type="button"
              className="bg-red-500 px-5 py-2 rounded-md"
            >
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </>
  );
};

export default ProductForm;
