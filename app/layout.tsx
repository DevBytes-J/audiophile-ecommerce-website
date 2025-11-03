import "./globals.css";
import { Manrope } from "next/font/google";
import CartModal from "@/Components/cart/cart-modal";
import { ConvexClientProvider } from "./convex-provider";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope", 
});

export const metadata = {
  title: "Autophile Ecommerce Website",
  description: "A sample ecommerce website built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>
        <ConvexClientProvider>
          {children}
          <CartModal /> 
        </ConvexClientProvider>
      </body>
    </html>
  );
}
