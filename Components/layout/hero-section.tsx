"use client";
import Button from "../ui/button";
import Image from "next/image";
import Navbar from "./navbar";

export default function HeroSection() {

  return (
    <main className="relative bg-[#191919] text-white min-h-screen">
      {/* Background Image  */}
      <Navbar />
      <div className="absolute inset-0 w-full h-full lg:hidden">
        <Image
          src="/headphones.png"
          alt="XX99 Mark II Headphones"
          fill
          priority
          className="object-cover object-center"
          quality={100}
        />
      </div>

      {/* Background Image - Desktop (image-hero.jpg) */}
      <div className="hidden lg:block absolute inset-0 w-full h-full">
        <Image
          src="/image-hero.jpg"
          alt="XX99 Mark II Headphones"
          fill
          priority
          className="object-cover object-center"
          quality={100}
        />
      </div>

      {/* Content Layer */}
      <div className="relative z-10">
        <section className="max-w-[1440px] mx-auto px-[165px] max-[1189px]:px-10 max-[768px]:px-6">
          <div className="flex items-center justify-center lg:justify-start min-h-[calc(100vh-90px)] py-12 md:py-16 lg:py-0">
            {/* Text Content */}
            <div className="flex flex-col gap-4 md:gap-6 w-full max-w-[350px] md:max-w-[400px] text-center lg:text-left">
              <p className="uppercase tracking-[10px] text-white/50 text-[14px]">
                new product
              </p>

              <h1 className="font-bold text-[36px] md:text-[40px] lg:text-[56px] tracking-[1.3px] md:tracking-[1.5px] lg:tracking-[2px] leading-10 md:leading-11 lg:leading-[58px] uppercase">
                XX99 Mark II
                <br />
                Headphones
              </h1>

              <p className="text-white/75 text-[15px] leading-[25px] px-4 md:px-6 lg:px-0">
                Experience natural, lifelike audio and exceptional build quality
                made for the passionate music enthusiast.
              </p>

              <div className="mt-2 md:mt-4">
                <Button href="/product/xx99-mark-two-headphones" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
