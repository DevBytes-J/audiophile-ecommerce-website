"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check } from 'lucide-react'; // Keeping this for reference, but using a div for the custom icon

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
      // Force no fractional digits to match the screenshot style
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (!isOpen) return null;

  const displayItems = items.slice(0, 1); // Show first item
  const remainingCount = items.length - 1;

  // Set the correct colors based on the screenshot
  const PRIMARY_ORANGE = "#D87D4A";
  const LIGHT_GRAY = "#F1F1F1";

  return (
    <>
      {/* Backdrop: Fades out the background */}
      <div className="fixed inset-0 bg-black/50 z-50 transition-opacity" />

      {/* Modal Container: Centers the modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-lg max-w-[540px] w-full max-h-[90vh] overflow-y-auto">
          <div className="p-8 md:p-12">
            {/* Success Icon: Custom checkmark for exact visual match */}
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
              style={{ backgroundColor: PRIMARY_ORANGE }}
            >
              {/* This simple div/svg structure matches the screenshot's icon */}
              <div className="text-white text-3xl font-extrabold ">
                <Check size={32} strokeWidth={3} />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-[24px] md:text-[32px] font-bold tracking-[0.86px] md:tracking-[1.15px] uppercase mb-4 md:mb-6">
              THANK YOU <br />
              FOR YOUR ORDER
            </h1>

            <p className="text-[15px] text-black/50 leading-[25px] mb-6 md:mb-8">
              You will receive an email confirmation shortly.
            </p>

            {/* Order Summary Container */}
            <div className="rounded-lg overflow-hidden mb-6 md:mb-12 flex flex-col md:flex-row">
              {/* Left Side: Items (Wider section on desktop) */}
              <div
                className="p-6 flex-1"
                style={{ backgroundColor: LIGHT_GRAY }}
              >
                {/* First Item */}
                {displayItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="relative w-[50px] h-[50px] rounded-lg overflow-hidden shrink-0">
                      {/* Assuming item.image is a full path or can be resolved */}
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="object-contain p-1"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[15px] font-bold truncate">
                        {item.name.split(" ")[0]}{" "}
                        {/* Show only the first word, e.g., 'XX99' */}
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

              {/* Right Side: Grand Total (Black background) */}
              <div className="bg-black p-6 flex-1 flex flex-col justify-center">
                <p className="text-[15px] text-white/50 uppercase mb-1">
                  GRAND TOTAL
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
              className="block w-full text-white text-[13px] font-bold tracking-[1px] py-4 uppercase transition-colors text-center"
              style={{ backgroundColor: PRIMARY_ORANGE }}
            >
              BACK TO HOME
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
