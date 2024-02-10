"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AddOrDeleteCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    function getData() {
      fetch("https://dummyjson.com/products/categories")
        .then((res) => res.json())
        .then((data) => {
          setCategories(data);
        });
    }
    getData();
  }, []);

  function addExampleCategories() {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to ADD EXAMPLE CATEGORIES?`,
      icon: "info",
      confirmButtonText: "Yes, ADD IT All!",
      confirmButtonColor: "#21C55D",
      showCancelButton: true,
      cancelButtonText: "No",
      heightAuto: false,
    }).then(async (result: any) => {
      if (result.isConfirmed) {
        categories.map(async (category) => {
          await fetch("/api/categories", {
            method: "POST",
            body: JSON.stringify({ name: category }),
          });
          // console.log(`${category} added`);
        });
      }
    });
  }

  function deleteCategories() {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete all categories?`,
      icon: "error",
      confirmButtonText: "Yes, Delete All!",
      confirmButtonColor: "#d55",
      showCancelButton: true,
      cancelButtonText: "No",
      heightAuto: false,
    }).then(async (result: any) => {
      if (result.isConfirmed) {
        await fetch(`/api/categories`, {
          method: "DELETE",
        });
      }
    });
  }

  return (
    <div className="flex gap-[5px] items-center">
      <p className="text-red-500">!! For 1st create categories only</p>
      <button
        onClick={addExampleCategories}
        className="bg-[#FF9900] rounded-md cursor-pointer p-2 px-3"
      >
        Add Example Categories
      </button>
      <button
        onClick={deleteCategories}
        className="bg-red-500 rounded-md cursor-pointer p-2 px-3"
      >
        Delete All Categories
      </button>
      {/* <input
        type="text"
        placeholder="productId"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
        className="text-black"
      /> */}
    </div>
  );
};

export default AddOrDeleteCategories;
