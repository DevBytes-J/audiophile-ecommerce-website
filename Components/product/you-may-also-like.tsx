import Image from "next/image";
import Link from "next/link";

interface RelatedProduct {
  slug: string;
  name: string;
  image: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
}

interface YouMayAlsoLikeProps {
  products: RelatedProduct[];
}

export default function YouMayAlsoLike({ products }: YouMayAlsoLikeProps) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="bg-white pb-12 md:pb-24 lg:pb-40">
      <div className="max-w-[1440px] mx-auto px-[165px] max-[1189px]:px-10 max-[768px]:px-6">
        <h2 className="text-[24px] md:text-[32px] font-bold tracking-[0.86px] md:tracking-[1.15px] uppercase text-center mb-10 md:mb-14 lg:mb-16">
          You may also like
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-[11px] lg:gap-[30px]">
          {products.map((product) => (
            <div key={product.slug} className="flex flex-col items-center">
              {/* Product Image */}
              <div className="relative w-full h-[120px] md:h-[318px] rounded-lg overflow-hidden bg-[#F1F1F1] mb-8 md:mb-10">
                {/* Mobile Image */}
                <Image
                  src={product.image.mobile}
                  alt={product.name}
                  fill
                  className="object-contain p-6 md:hidden"
                  sizes="(max-width: 768px) 100vw"
                />
                {/* Tablet Image */}
                <Image
                  src={product.image.tablet}
                  alt={product.name}
                  fill
                  className="object-contain p-12 hidden md:block lg:hidden"
                  sizes="(max-width: 1024px) 33vw"
                />
                {/* Desktop Image */}
                <Image
                  src={product.image.desktop}
                  alt={product.name}
                  fill
                  className="object-contain p-12 hidden lg:block"
                  sizes="(min-width: 1024px) 350px"
                />
              </div>

              {/* Product Name */}
              <h3 className="text-[24px] font-bold tracking-[1.7px] uppercase mb-8 text-center">
                {product.name}
              </h3>

              {/* See Product Button */}
              <Link
                href={`/product/${product.slug}`}
                className="bg-primary hover:bg-accent text-white text-[13px] font-bold tracking-[1px] py-4 px-8 uppercase transition-colors"
              >
                SEE PRODUCT
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
