import Image from "next/image";

export default function ProductDetail() {
  return (
    <section className="bg-white py-12 md:py-24 lg:py-[168px]">
      <div className="max-w-[1440px] mx-auto px-[165px] max-[1189px]:px-10 max-[768px]:px-6">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-8 md:gap-12 lg:gap-[125px]">
          {/* Image Section */}
          <div className="w-full lg:w-1/2">
            <div className="relative w-full h-[300px] md:h-[400px] lg:h-[588px] rounded-lg overflow-hidden">
              <Image
                src="/cart/audiophile-avatar.jpg"
                alt="Person listening to music with headphones"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 540px"
              />
            </div>
          </div>

          {/* Text Content Section */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-bold tracking-[1px] md:tracking-[1.3px] leading-[38px] md:leading-11 uppercase mb-6 md:mb-8">
              Bringing you the <span className="text-primary">best</span> audio
              gear
            </h2>

            <p className="text-black/50 text-[15px] leading-[25px] max-w-[573px] mx-auto lg:mx-0">
              Located at the heart of New York City, Audiophile is the premier
              store for high end headphones, earphones, speakers, and audio
              accessories. We have a large showroom and luxury demonstration
              rooms available for you to browse and experience a wide range of
              our products. Stop by our store to meet some of the fantastic
              people who make Audiophile the best place to buy your portable
              audio equipment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
