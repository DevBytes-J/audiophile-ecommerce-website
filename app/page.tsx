import HeroSection from "@/Components/layout/hero-section";
import ProductCard from "@/Components/product/product-card";
import ProductDetail from "@/Components/product/product-detail";
import Footer from "@/Components/layout/footer";
import Image from "next/image";
import Link from "next/link";

interface ButtonProps {
  href: string;
  style?: string;
}

const Button = ({
  href,
  style = "text-black hover:bg-black hover:text-white",
}: ButtonProps) => (
  <Link
    href={href}
    className={`inline-block text-[13px] font-bold tracking-[1px] py-4 px-8 uppercase transition-all duration-300 ${style}`}
  >
    SEE PRODUCT
  </Link>
);

export default function Home() {
  const zx9Speaker = {
    name: "ZX9 SPEAKER",
    description:
      "Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.",
    image: "/cart/speaker2.png",
    link: "/product/zx9-speaker",
  };

  const zx7Speaker = {
    name: "ZX7 SPEAKER",
    image: "/cart/speakeront.jpg",
    link: "/product/zx7-speaker",
  };

  const yx1Earphones = {
    name: "YX1 EARPHONES",
    image: "/cart/earphonesont.jpg",
    link: "/product/yx1-earphones",
  };

  return (
    <>
      <HeroSection />
      <ProductCard />

      <section className="py-12 sm:py-24 lg:py-[168px]">
        <div className="max-w-[1440px] mx-auto px-[165px] max-[1189px]:px-10 max-[768px]:px-6 flex flex-col gap-6 md:gap-8 lg:gap-12">
          {/* ZX9 SPEAKER */}
          <div className="relative rounded-lg overflow-hidden bg-primary">
            {/* Background circle pattern */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
              <div className="absolute top-[-50px] md:top-[-100px] left-1/2 transform -translate-x-1/2 w-[558px] md:w-[944px] h-[558px] md:h-[944px] border border-white/20 rounded-full"></div>
              <div className="absolute top-0 md:top-[-180px] left-1/2 transform -translate-x-1/2 w-[472px] md:w-[700px] h-[472px] md:h-[700px] border border-white/20 rounded-full"></div>
              <div className="absolute top-[50px] md:top-[-260px] left-1/2 transform -translate-x-1/2 w-[386px] md:w-[500px] h-[386px] md:h-[500px] border border-white/20 rounded-full"></div>
            </div>

            {/* ZX9 Speaker Layout */}
            <div className="relative z-10 flex flex-col items-center text-center px-6 py-[55px] min-[1189px]:flex-row min-[1189px]:items-center min-[1189px]:justify-center min-[1189px]:text-left min-[1189px]:px-[117px] min-[1189px]:gap-[137px]">
              {/* Image */}
              <div className="relative w-[172px] h-[207px] mb-8 min-[1189px]:w-[400px] min-[1189px]:h-[400px] min-[1189px]:mb-0  min-[1189px]:-bottom-16">
                <Image
                  src={zx9Speaker.image}
                  alt={zx9Speaker.name}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Text Content */}
              <div className="max-w-[349px]">
                <h2 className="text-white text-[36px] min-[1189px]:text-[56px] font-bold tracking-[1.3px] min-[1189px]:tracking-[2px] leading-[40px] min-[1189px]:leading-[58px] uppercase mb-6">
                  {zx9Speaker.name}
                </h2>
                <p className="text-white/75 text-[15px] leading-[25px] mb-6 min-[1189px]:mb-10">
                  {zx9Speaker.description}
                </p>
                <Button
                  href={zx9Speaker.link}
                  style="bg-black text-white hover:bg-[#4C4C4C]"
                />
              </div>
            </div>
          </div>

          {/* ZX7 SPEAKER */}
          <div className="relative rounded-lg overflow-hidden h-80">
            <Image
              src={zx7Speaker.image}
              alt={zx7Speaker.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-start pl-6 md:pl-[62px] lg:pl-[95px]">
              <h2 className="text-black text-[28px] font-bold tracking-[2px] uppercase mb-8">
                {zx7Speaker.name}
              </h2>
              <Button
                href={zx7Speaker.link}
                style="border hover:bg-black cursor:pointer hover:text-white"
              />
            </div>
          </div>

          {/* YX1 EARPHONES */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-[11px] lg:gap-[30px]">
            {/* Image Column */}
            <div className="relative h-[200px] md:h-80 rounded-lg overflow-hidden">
              <Image
                src={yx1Earphones.image}
                alt={yx1Earphones.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Text Column */}
            <div className="bg-light-gray rounded-lg flex flex-col justify-center items-start pl-6 md:pl-[41px] lg:pl-[95px] h-[200px] md:h-80">
              <h2 className="text-black text-[28px] font-bold tracking-[2px] uppercase mb-8">
                {yx1Earphones.name}
              </h2>
              <Button
                href={yx1Earphones.link}
                style="border hover:bg-black cursor:pointer hover:text-white"
              />
            </div>
          </div>
        </div>
      </section>

      <ProductDetail />
      <Footer />
    </>
  );
}
