"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import OrderConfirmationModal from "@/Components/order/order-confirmation-modal";

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("orderId");

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch order from Convex
  const order = useQuery(
    api.orders.getOrderById,
    orderId ? { orderId } : "skip"
  );

  useEffect(() => {
    if (!orderId) {
      // No order ID, redirect to home
      router.push("/");
      return;
    }

    if (order) {
      // Order loaded, show modal (schedule state update to avoid cascading renders)
      const timer = setTimeout(() => {
        setIsModalOpen(true);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [orderId, order, router]);

  const handleClose = () => {
    setIsModalOpen(false);
    router.push("/");
  };

  // Loading state
  if (!order) {
    return (
      <div className="min-h-screen bg-light-gray flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-[15px] text-black/50">Loading your order...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F1F1F1]">
      <OrderConfirmationModal
        isOpen={isModalOpen}
        onClose={handleClose}
        orderId={order.orderId}
        items={order.items}
        grandTotal={order.totals.grandTotal}
      />
    </div>
  );
}
