"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  items: OrderItem[];
  grandTotal: number;
}

export default function OrderConfirmationModal({
  isOpen,
  onClose,
  orderId,
  items,
  grandTotal,
}: ConfirmationModalProps) {
  // Prevent body scroll when modal is open
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

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (!isOpen) return null;

  const displayItems = items.slice(0, 1); // Show first item
  const remainingCount = items.length - 1;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-50 transition-opacity" />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-lg max-w-[540px] w-full max-h-[90vh] overflow-y-auto">
          <div className="p-8 md:p-12">
            {/* Success Icon */}
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-6">
              <CheckCircle2 className="w-8 h-8 text-white" strokeWidth={2.5} />
            </div>

            {/* Title */}
            <h1 className="text-[24px] md:text-[32px] font-bold tracking-[0.86px] md:tracking-[1.15px] uppercase mb-4 md:mb-6">
              Thank you <br />
              for your order
            </h1>

            <p className="text-[15px] text-black/50 leading-[25px] mb-6 md:mb-8">
              You will receive an email confirmation shortly.
            </p>

            {/* Order Summary */}
            <div className="rounded-lg overflow-hidden mb-6 md:mb-12">
              <div className="bg-light-gray p-6">
                {/* First Item */}
                {displayItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 mb-3">
                    <div className="relative w-[50px] h-[50px] rounded-lg overflow-hidden bg-white shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-2"
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
                    <span className="text-[15px] text-black/50 font-bold">
                      x{item.quantity}
                    </span>
                  </div>
                ))}

                {/* Other Items Count */}
                {remainingCount > 0 && (
                  <>
                    <hr className="border-black/10 my-3" />
                    <p className="text-[12px] text-black/50 font-bold text-center">
                      and {remainingCount} other item
                      {remainingCount > 1 ? "s" : ""}
                    </p>
                  </>
                )}
              </div>

              {/* Grand Total */}
              <div className="bg-black p-6">
                <p className="text-[15px] text-white/50 uppercase mb-2">
                  Grand Total
                </p>
                <p className="text-[18px] text-white font-bold">
                  {formatPrice(grandTotal)}
                </p>
              </div>
            </div>

            {/* Back to Home Button */}
            <Link
              href="/"
              onClick={onClose}
              className="block w-full bg-primary hover:bg-accent text-white text-[13px] font-bold tracking-[1px] py-4 uppercase transition-colors text-center"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
