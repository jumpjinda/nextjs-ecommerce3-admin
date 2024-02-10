"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AddOrDeleteProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    function getData() {
      fetch(
        "https://dummyjson.com/products?limit=100&&select=title,description,price,rating,brand,category,thumbnai,images"
      )
        .then((res) => res.json())
        .then((data) => {
          setProducts(data.products);
        });
    }
    getData();
  }, []);

  function add100Products() {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to ADD EXAMPLE PRODUCTS?`,
      icon: "info",
      confirmButtonText: "Yes, ADD IT All!",
      confirmButtonColor: "#21C55D",
      showCancelButton: true,
      cancelButtonText: "No",
      heightAuto: false,
    }).then(async (result: any) => {
      if (result.isConfirmed) {
        if (products.length > 0) {
          products.map(async (product) => {
            await fetch("/api/products", {
              method: "POST",
              // Convert JavaScript Object Literals to JSON objects
              // Because database work only JSON objects
              body: JSON.stringify(product),
            });
          });
        }
      }
    });
  }

  function deleteProducts() {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete all product?`,
      icon: "error",
      confirmButtonText: "Yes, Delete All!",
      confirmButtonColor: "#d55",
      showCancelButton: true,
      cancelButtonText: "No",
      heightAuto: false,
    }).then(async (result: any) => {
      if (result.isConfirmed) {
        await fetch(`/api/products`, {
          method: "DELETE",
        });
      }
    });
  }

  return (
    <div className="flex gap-[5px] items-center">
      <p className="text-red-500">!! For 1st create products only</p>
      <button
        onClick={add100Products}
        className="bg-[#FF9900] rounded-md cursor-pointer p-2 px-3"
      >
        Add 100 products
      </button>
      <button
        onClick={deleteProducts}
        className="bg-red-500 rounded-md cursor-pointer p-2 px-3"
      >
        delete all products
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

export default AddOrDeleteProducts;
