"use client";

import Pagination from "@/components/Pagination";
import { paginate } from "@/utils/paginate";
import axios from "axios";
import { useEffect, useState } from "react";

const OrdersPage = () => {
  const [orders, setOrders] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize: number = 4;

  useEffect(() => {
    async function getOrders() {
      const res = await axios.get("/api/orders");
      setOrders(res.data);
    }
    getOrders();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginateOrders = paginate(orders, currentPage, pageSize);

  return (
    <>
      <h1 className="mt-2 mb-2">Orders</h1>
      {orders.length > 0 && (
        <table className="w-full mb-5">
          <thead>
            <tr>
              <th>Date</th>
              <th>Paid</th>
              <th>Recipient</th>
              <th>Products</th>
            </tr>
          </thead>
          <tbody>
            {paginateOrders.map((order) => (
              <tr key={order._id}>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td
                  className={`font-bold text-center ${
                    order.paid ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {order.paid ? "YES" : "NO"}
                </td>
                <td>
                  {order.name} <br />
                  {order.email} <br />
                  {order.city} {order.postalCode} <br />
                  {order.streetAddress} <br />
                  {order.country}
                </td>
                <td>
                  {order.line_items.map((l, i) => (
                    <div key={i}>
                      {l.price_data.product_data.name} x {l.quantity} <br />
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Pagination
        items={orders.length}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default OrdersPage;
