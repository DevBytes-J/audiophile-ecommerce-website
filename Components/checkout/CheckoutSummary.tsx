"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/hooks/use-cart";

interface CheckoutSummaryProps {
  formatPrice: (price: number) => string;
}

export default function CheckoutSummary({ formatPrice }: CheckoutSummaryProps) {
  const [mounted, setMounted] = useState(false);
  const { getSubtotal, getShipping, getVAT, getGrandTotal } = useCart();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This effect just sets a flag once — no cascading re-render issues
    requestAnimationFrame(() => setIsClient(true));
  }, []);

  if (!isClient) return null;

  return (
    <div className="space-y-2 mb-8">
      <div className="flex justify-between">
        <span className="text-[15px] text-black/50 uppercase">Total</span>
        <span className="text-[18px] font-bold">
          {mounted ? formatPrice(getSubtotal()) : "$0"}
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-[15px] text-black/50 uppercase">Shipping</span>
        <span className="text-[18px] font-bold">
          {mounted ? formatPrice(getShipping()) : "$0"}
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-[15px] text-black/50 uppercase">
          VAT (Included)
        </span>
        <span className="text-[18px] font-bold">
          {mounted ? formatPrice(getVAT()) : "$0"}
        </span>
      </div>

      <div className="flex justify-between pt-4">
        <span className="text-[15px] text-black/50 uppercase">Grand Total</span>
        <span className="text-[18px] font-bold text-primary">
          {mounted ? formatPrice(getGrandTotal()) : "$0"}
        </span>
      </div>
    </div>
  );
}
