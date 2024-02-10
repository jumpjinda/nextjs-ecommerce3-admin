"use client";

import AddOrDeleteCategories from "@/components/AddOrDeleteCategory";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [addCategory, setAddCategory] = useState(false);
  const [inputCategory, setInputCategory] = useState("");
  const router = useRouter();

  async function getCategories() {
    const data = await fetch("/api/categories", {
      method: "GET",
    });
    setCategories(await data.json());
  }
  useEffect(() => {
    getCategories();
  }, []);

  async function removeCategory(category: any) {
    const id = category._id;
    const name = category.name;
    const res = await fetch(`/api/categories/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      console.log(`${name} category has been deleted!`);
    }
    router.push("/categories");
  }

  async function saveCategory() {
    if (!(categories as (string | undefined)[]).includes(inputCategory)) {
      const categoryName = inputCategory;
      console.log(categoryName);
      const res = await fetch("/api/categories", {
        method: "POST",
        body: JSON.stringify({ name: categoryName }),
      });
    }
    setAddCategory(!addCategory);
    router.push("/categories");
  }

  return (
    <div className="relative h-full">
      <h1 className="mt-2 mb-2">Categories</h1>
      <hr />
      <hr />
      <div className="grid grid-cols-3 gap-y-3 mt-2">
        {categories.length > 0 &&
          categories.map((category: any) => (
            <div
              key={category._id}
              className="relative flex items-center"
            >
              <button
                type="button"
                className="relative left-0 top-[2px]"
                onClick={() => removeCategory(category)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="red"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <p className="text-2xl ml-1">{category.name}</p>
            </div>
          ))}
        <div className={addCategory ? "" : "hidden"}>
          <input
            type="text"
            className="h-full bg-gray-500 pl-2 rounded-md border-[2px] border-[#222F3E]"
            value={inputCategory}
            onChange={(e) => setInputCategory(e.target.value)}
          />
          <button
            className="ml-2 bg-green-500 px-5 py-2 rounded-md"
            onClick={() => saveCategory()}
          >
            Save
          </button>
        </div>
        <button
          className="bg-blue-500 text-md px-5 py-2 w-fit rounded-md"
          onClick={() => setAddCategory(!addCategory)}
        >
          Add Category
        </button>
      </div>
      <div className="absolute right-0 bottom-0">
        <AddOrDeleteCategories />
      </div>
    </div>
  );
};

export default CategoriesPage;
