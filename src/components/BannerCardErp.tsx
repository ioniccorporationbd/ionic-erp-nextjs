
import Link from "next/link";
import { erpProductData } from "./erpProductData";
import ProductCardErp from "./ProductCardErp";
const wood = "/assets/erp/wood.png";
const BannerCardErp = () => {
  const product1 = erpProductData?.filter(item => item.lineNo == 1)
  const product2 = erpProductData?.filter(item => item.lineNo == 2)
  const product3 = erpProductData?.filter(item => item.lineNo == 3)
  const product4 = erpProductData?.filter(item => item.lineNo == 4)
  const product5 = erpProductData?.filter(item => item.lineNo == 5)


  return (
    <div className="relative ">
      <ProductCardErp item={product1} />
      {/* Custom handling for product2 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 items-center">
        {product2?.map((product, index) => {
          const isLastItem = index === product2.length - 1;
          return (
            <div
              key={index}
              className={`flex flex-col justify-center items-center border-r border-b   py-5 px-3 lg:hover:scale-105 text-center bg-white  cards z-10
                                        ${isLastItem ? 'block md:hidden lg:flex' : 'lg:hover:scale-105'}`}
            >
              <img className="w-14 pb-5 grayscale" src={product.imgSrc}  alt="" />
              <h4 className="font-bold xl:text-[15px] lg:text-[10px]">{product.title}</h4>
              <p className="text-[#718095] cardType text-center xl:text-[13px] lg:text-[9px]  text-[13px]">টোটাল সলুয়েশন</p>
              <Link href={product.link}>
                        <div className="font-semibold hover:bg-black hover:text-white p-1 px-3 rounded-[4px] xl:text-[14px] lg:text-[11px] text-[14px]  pt-2" >বিস্তারিত</div>
                        </Link>
            </div>
          );
        })}
      </div>
      <ProductCardErp item={product3} />

      <ProductCardErp item={product4} />
      <div className="text-center border-r border-b   py-5 px-3 lg:hover:scale-105 bg-white w-[187px] md:w-[255px] h-[192px] md:h-[192px] absolute bottom-[192px] md:bottom-0 right-0 erpwoodCard lg:hidden">
        <div className="flex justify-center items-center">

        <img className="w-14 pb-5 grayscale" src={wood}  alt="" />
        </div>
        <h4 className="font-bold cardHeading text-[15px]">আসবাবপত্র শিল্প</h4>
        <p className="text-[#718095] cardType text-center   text-[13px]">টোটাল সলুয়েশন</p>
        <Link href='/manufacturing-industry-ionic-erp-software'>
        <div className="font-semibold hover:bg-[#0C2A63] hover:text-white p-1 px-3 rounded-[4px] text-[14px]  pt-2" >বিস্তারিত</div>
        </Link>
      </div>
      <div className="lg:block hidden">

          <ProductCardErp  item={product5}/>
          </div>

    </div>
  );
};

export default BannerCardErp;
