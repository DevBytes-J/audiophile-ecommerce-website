// FILE: Components/cart/cart-modal.tsx
"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/use-cart";

export default function CartModal() {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  } = useCart();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={closeCart} />

      <div className="fixed top-[110px] right-6 w-full sm:w-[377px] bg-white rounded-lg shadow-2xl z-50 p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[18px] font-bold tracking-[1.3px] uppercase">
            Cart ({getTotalItems()})
          </h2>
          <button
            onClick={() => clearCart()}
            className="text-black/50 text-[15px] underline hover:text-[#D87D4A]"
          >
            Remove all
          </button>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-black/50 mb-6">Your cart is empty</p>
            <button
              onClick={closeCart}
              className="bg-[#D87D4A] hover:bg-[#FBAF85] text-white text-[13px] font-bold tracking-[1px] py-4 px-8 uppercase"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-6 mb-8">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-[#F1F1F1] flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-2"
                      sizes="64px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[15px] font-bold truncate">
                      {item.name}
                    </h3>
                    <p className="text-[14px] text-black/50 font-bold">
                      {formatPrice(item.price)}
                    </p>
                  </div>
                  <div className="flex items-center bg-[#F1F1F1] h-8 flex-shrink-0">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 h-full hover:text-[#D87D4A] text-black/25 font-bold text-[13px]"
                    >
                      −
                    </button>
                    <span className="px-3 text-[13px] font-bold min-w-[30px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 h-full hover:text-[#D87D4A] text-black/25 font-bold text-[13px]"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between mb-6">
              <span className="text-[15px] text-black/50 uppercase">Total</span>
              <span className="text-[18px] font-bold">
                {formatPrice(getTotalPrice())}
              </span>
            </div>

            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full bg-[#D87D4A] hover:bg-[#FBAF85] text-white text-[13px] font-bold tracking-[1px] py-4 text-center uppercase"
            >
              Checkout
            </Link>
          </>
        )}
      </div>
    </>
  );
}
