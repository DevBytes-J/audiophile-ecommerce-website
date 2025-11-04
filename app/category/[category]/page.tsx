import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductsByCategory} from "@/lib/products";
import ProductCard from "@/Components/product/product-card";
import ProductDetail from "@/Components/product/product-detail";
import Footer from "@/Components/layout/footer";
import Navbar from "@/Components/layout/navbar";

// Generate static params for all categories
export function generateStaticParams() {
  return [
    { category: "headphones" },
    { category: "speakers" },
    { category: "earphones" },
  ];
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  // Validate category
  const validCategories = ["headphones", "speakers", "earphones"];
  if (!validCategories.includes(category)) {
    notFound();
  }

  // Get products for this category
  const products = getProductsByCategory(category);

  return (
    <>
      {/* Category Header */}
      <Navbar />
      <section className="bg-[#191919] text-white py-8 md:py-16 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-[165px] max-[1189px]:px-10 max-[768px]:px-6">
          <h1 className="text-[28px] md:text-[40px] font-bold tracking-[1px] md:tracking-[1.4px] uppercase text-center">
            {category}
          </h1>
        </div>
      </section>

      {/* Products List */}
      <section className="py-16 md:py-24 lg:py-40">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-[165px]">
          <div className="flex flex-col gap-[120px] md:gap-[120px] lg:gap-40">
            {products.map((product, index) => {
              const isEven = index % 2 === 0;

              return (
                <article
                  key={product.id}
                  className={`flex flex-col ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  } items-center gap-8 md:gap-12 lg:gap-[125px]`}
                >
                  {/* Product Image */}
                  <div className="w-full lg:w-1/2">
                    <div className="relative w-full h-[352px] md:h-[352px] lg:h-[560px] rounded-lg overflow-hidden bg-[#F1F1F1]">
                      <Image
                        src={product.categoryImage}
                        alt={product.name}
                        fill
                        className="object-contain p-6 md:p-12"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 540px"
                      />
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="w-full lg:w-1/2 text-center lg:text-left flex flex-col justify-center">
                    {product.new && (
                      <p className="text-primary text-[14px] tracking-[10px] uppercase mb-4 md:mb-6">
                        New Product
                      </p>
                    )}

                    <h2 className="text-[28px] md:text-[40px] font-bold tracking-[1px] md:tracking-[1.4px] leading-[38px] md:leading-11 uppercase mb-6 md:mb-8">
                      {product.name}
                    </h2>

                    <p className="text-black/50 text-[15px] leading-[25px] mb-6 md:mb-10 max-w-[572px] mx-auto lg:mx-0">
                      {product.description}
                    </p>

                    <div>
                      <Link
                        href={`/product/${product.slug}`}
                        className="inline-block bg-primary hover:bg-accent text-white text-[13px] font-bold tracking-[1px] py-4 px-8 uppercase transition-colors"
                      >
                        SEE PRODUCT
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <ProductCard />
      <ProductDetail />
      <Footer />
    </>
  );
}
