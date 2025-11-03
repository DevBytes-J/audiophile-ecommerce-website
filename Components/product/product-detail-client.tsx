"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/use-cart";
import type { Product } from "@/lib/products";

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({
  product,
}: ProductDetailClientProps) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    if (quantity < 1) return;

    addItem(
      {
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        image: product.categoryImage,
      },
      quantity
    );

    setQuantity(1);
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);

  return (
    <>
      {/* Go Back Button */}
      <section className="bg-white pt-4 md:pt-8 lg:pt-20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-[165px]">
          <button
            onClick={() => router.back()}
            className="text-black/50 text-[15px] hover:text-primary transition-colors"
          >
            Go Back
          </button>
        </div>
      </section>

      {/* Product Detail Section */}
      <section className="bg-white py-6 md:py-12 lg:py-14">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-[165px]">
          <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12 lg:gap-[125px]">
            {/* Product Image */}
            <div className="w-full lg:w-1/2">
              <div className="relative w-full h-[327px] md:h-[480px] lg:h-[560px] rounded-lg overflow-hidden bg-white">
                <Image
                  src={product.categoryImage}
                  alt={product.name}
                  fill
                  className="object-contain p-8 md:p-12 lg:p-16"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 540px"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="w-full lg:w-1/2 flex flex-col">
              {product.new && (
                <p className="text-primary text-[14px] tracking-[10px] uppercase mb-4 md:mb-6">
                  New Product
                </p>
              )}

              <h1 className="text-[28px] md:text-[40px] font-bold tracking-[1px] md:tracking-[1.4px] leading-8 md:leading-11 uppercase mb-6 md:mb-8">
                {product.name}
              </h1>

              <p className="text-black/50 text-[15px] leading-[25px] mb-6 md:mb-8">
                {product.description}
              </p>

              <p className="text-[18px] font-bold tracking-[1.3px] mb-8">
                {formatPrice(product.price)}
              </p>

              {/* Quantity and Add to Cart */}
              <div className="flex items-center gap-4">
                {/* Quantity Selector */}
                <div className="flex items-center bg-white h-12">
                  <button
                    onClick={decrementQuantity}
                    className="px-4 h-full hover:text-primary transition-colors text-black/25 font-bold"
                  >
                    −
                  </button>
                  <span className="px-4 text-[13px] font-bold min-w-10 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={incrementQuantity}
                    className="px-4 h-full hover:text-primary transition-colors text-black/25 font-bold"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="bg-primary hover:bg-accent text-white text-[13px] font-bold tracking-[1px] px-8 h-12 uppercase transition-colors"
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-12 md:py-24 lg:py-40">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-[165px]">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-[125px]">
            {/* Features */}
            <div className="lg:w-[60%]">
              <h2 className="text-[24px] md:text-[32px] font-bold tracking-[1.15px] uppercase mb-6 md:mb-8">
                Features
              </h2>
              <div className="text-black/50 text-[15px] leading-[25px] whitespace-pre-line">
                {product.features}
              </div>
            </div>

            {/* In the Box */}
            <div className="lg:w-[40%]">
              <h2 className="text-[24px] md:text-[32px] font-bold tracking-[1.15px] uppercase mb-6 md:mb-8">
                In the Box
              </h2>
              <ul className="space-y-2">
                {product.includes.map((item, index) => (
                  <li key={index} className="flex items-center gap-6">
                    <span className="text-primary text-[15px] font-bold min-w-[15px]">
                      {item.quantity}x
                    </span>
                    <span className="text-black/50 text-[15px] leading-[25px]">
                      {item.item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="bg-white pb-12 md:pb-24 lg:pb-40">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-[165px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 lg:gap-8">
            {/* First Image */}
            <div className="relative h-[174px] md:h-[174px] lg:h-[280px] rounded-lg overflow-hidden">
              <Image
                src={product.gallery.first.desktop}
                alt={`${product.name} gallery 1`}
                fill
                className="object-cover"
              />
            </div>

            {/* Second Image */}
            <div className="relative h-[174px] md:h-[174px] lg:h-[280px] rounded-lg overflow-hidden md:row-span-2">
              <Image
                src={product.gallery.second.desktop}
                alt={`${product.name} gallery 2`}
                fill
                className="object-cover"
              />
            </div>

            {/* Third Image */}
            <div className="relative h-[174px] md:h-[174px] lg:h-[280px] rounded-lg overflow-hidden">
              <Image
                src={product.gallery.third.desktop}
                alt={`${product.name} gallery 3`}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
