import { Suspense } from "react";
import ConfirmationModalWrapper from "@/Components/order/ConfirmationModalWrapper";

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-light-gray flex items-center justify-center">
      <div className="text-center p-20">
        <p className="text-[15px] text-black/50">
          Awaiting confirmation details...
        </p>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ConfirmationModalWrapper />
    </Suspense>
  );
}
