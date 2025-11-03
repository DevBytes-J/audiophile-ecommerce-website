// app/confirmation/page.tsx
import { Suspense } from "react";
// Import the new wrapper component
import ConfirmationModalWrapper from "@/Components/order/ConfirmationModalWrapper";

// A simple component to show while searchParams are loading
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
  // All client hooks are now inside the wrapper.
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ConfirmationModalWrapper />
    </Suspense>
  );
}
