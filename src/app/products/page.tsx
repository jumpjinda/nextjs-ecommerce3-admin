"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import AddOrDeleteProducts from "@/components/AddOrDeleteProducts";
import Pagination from "@/components/Pagination";
import { paginate } from "@/utils/paginate";

const ProductsPage = () => {
  const [products, setProducts] = useState<string[]>([]);
  const router = useRouter();
  // For pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize: number = 20;

  const getData = async () => {
    const data = await fetch("/api/products", {
      method: "GET",
    });
    setProducts(await data.json());
  };

  useEffect(() => {
    getData();
  }, []);

  interface IProduct {
    title: string;
    _id: string;
  }

  function deleteProduct(product: IProduct) {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete "${product.title}" product?`,
      icon: "error",
      confirmButtonText: "Yes, Delete!",
      confirmButtonColor: "#d55",
      showCancelButton: true,
      cancelButtonText: "No",
      heightAuto: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const id = product._id;
        await fetch(`/api/products/${id}`, {
          method: "DELETE",
        });
        getData();
      }
    });
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginateProducts = paginate(products, currentPage, pageSize);

  return (
    <div className="">
      <div className="flex mt-2 justify-between items-center">
        <h1 className="">Products</h1>
        <Link
          href={"/products/new-product"}
          className="bg-blue-500 rounded-md cursor-pointer p-2 px-3"
        >
          Add New Product
        </Link>
      </div>
      <table className="w-full mt-2">
        <thead className="text-center">
          <tr>
            <th>TITLE</th>
            <th>BRAND</th>
            <th>CATEGORY</th>
            <th>PRICE (USD)</th>
          </tr>
        </thead>
        <tbody>
          {paginateProducts.map((product: any) => (
            <tr key={product._id}>
              <td className="relative">
                <Link
                  href={`/products/${product._id}`}
                  className="pr-20"
                >
                  {product.title}
                </Link>
                <button
                  className="absolute right-0 bg-red-500 px-3 rounded-md"
                  onClick={() => deleteProduct(product)}
                >
                  Delete
                </button>
              </td>
              <td className="text-center">{product.brand}</td>
              <td className="text-center">{product.category}</td>
              <td className="text-end">{product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-5 flex justify-between">
        <Pagination
          items={products.length}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={handlePageChange}
        />
        <AddOrDeleteProducts />
      </div>
    </div>
  );
};

export default ProductsPage;
