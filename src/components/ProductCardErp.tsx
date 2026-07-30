import Link from "next/link";
import type { ImageCard } from "@/types/content";

interface ProductCardErpProps {
  readonly item: readonly ImageCard[];
}

const ProductCardErp = ({ item }: ProductCardErpProps) => {
  return (
    <div>
      <section className="grid grid-cols-2 items-center md:grid-cols-3 lg:grid-cols-6">
        {item.map((product) => (
          <div
            key={`${product.title}-${product.link ?? ""}`}
            className="cards z-10 flex flex-col items-center justify-center border-b border-r bg-white px-3 py-5 text-center lg:hover:scale-105"
          >
            <img
              className="w-14 pb-5 grayscale"
              src={product.imgSrc}
              alt={product.title}
            />
            <h4 className="font-bold lg:text-[10px] xl:text-[15px]">
              {product.title}
            </h4>
            <p className="cardType text-center text-[13px] text-[#718095] lg:text-[9px] xl:text-[13px]">
              টোটাল সলুয়েশন
            </p>
            <Link href={product.link ?? "/"}>
              <span className="rounded-[4px] p-1 px-3 pt-2 text-[14px] font-semibold hover:bg-black hover:text-white lg:text-[11px] xl:text-[14px]">
                বিস্তারিত
              </span>
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ProductCardErp;
