// FILE: Components/checkout/CashOnDeliveryMessage.tsx

import Image from "next/image";

const CashOnDeliveryMessage = () => {
  return (
    <div className="flex items-start gap-5 mt-6">
      {/* Icon */}
      <div className="relative w-12 h-12 flex-shrink-0 mt-1">
        <Image
          src="/assets/checkout/icon-cash-on-delivery.svg" // Replace with your actual path
          alt="Cash on Delivery Icon"
          fill
        />
      </div>

      {/* Text */}
      <p className="text-[15px] font-medium text-black/50 leading-[25px]">
        The ‘Cash on Delivery’ option enables you to pay in cash when our
        delivery courier arrives at your residence. Just make sure your address
        is correct so that your order will not be cancelled.
      </p>
    </div>
  );
};

export default CashOnDeliveryMessage;
