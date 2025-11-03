import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const categories = [
  {
    id: 1,
    name: "HEADPHONES",
    image: "/cart/headphone.webp",
    link: "/category/headphones",
  },
  {
    id: 2,
    name: "SPEAKERS",
    image: "/cart/speaker.webp",
    link: "/category/speakers",
  },
  {
    id: 3,
    name: "EARPHONES",
    image: "/cart/earphone.webp",
    link: "/category/earphones",
  },
];

export default function ProductCard() {
  return (
    <section className="bg-white py-12 md:py-20 lg:py-[120px] mt-10">
      <div className="max-w-[1440px] mx-auto px-[165px] max-[1189px]:px-10 max-[768px]:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-2.5 lg:gap-[30px] gap-[68px]">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.link}
              className="group relative bg-[#F1F1F1] rounded-lg hover:shadow-lg transition-all duration-300"
            >
              <div className="flex flex-col items-center h-[204px] pb-[22px] px-6">
                <div className="relative w-full h-40 -mt-9 flex items-center justify-center">
                  {/* Adjusted height, added flex for centering */}
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-contain drop-shadow-2xl" // Use object-contain to scale down the image
                  />
                </div>

                {/* Category Name */}
                <h3 className="lg:text-[18px] text-[15px] font-bold lg:tracking-[1.29px] tracking-[1.07px] uppercase mb-4 ">
                  {category.name}
                </h3>

                {/* Shop Link */}
                <div className="flex items-center gap-3 text-[13px] font-bold tracking-[1px] uppercase text-black/50 group-hover:text-primary transition-colors">
                  <span>SHOP</span>
                  <ChevronRight
                    className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform"
                    strokeWidth={3}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
