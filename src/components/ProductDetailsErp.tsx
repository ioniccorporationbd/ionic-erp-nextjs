import Link from "next/link";
import { productDetailsDataErp } from './productDetailsDataErp'



interface ProductDetailsErpProps {
  readonly heading: React.ReactNode;
  readonly subheading: React.ReactNode;
  readonly grayscale?: boolean;
  readonly description: React.ReactNode;
}

const ProductDetailsErp = ({heading,subheading, grayscale, description}: ProductDetailsErpProps) => {
  const grayscaleClass = grayscale ? 'grayscale' : '';
  return (
    <div className='py-5 detailsWidth'>
        <section className='flex flex-col justify-center items-center gap-2 mt-5'>
                <h1 className='text-[#898989] font-semibold text-center text-[17.5px]'>{heading}</h1>
                <div className='w-10 h-[3px] bg-[#b3b2b2]'></div>
                <p className='text-center text-[#898989] font-semibold  text-[14.5px]'>{subheading}</p>
            </section>

            <div className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5    pt-10 cardGrid'>
        {productDetailsDataErp.map((product) => (
               <div key={product.title} className='pb-10 bg-white pt-3  px-5  flex flex-col gap-4  items-center md:relative group transition duration-300 hover:shadow-xl rounded-md border'>
               <img className={`p-5 w-28 h-28  ${grayscaleClass}`} src={product.img} alt={product.title} />
               <h2 className='font-bold text-[17.5px] text-center'>{product.title}</h2>
               <p className='text-[14.5px] text-center   text-[#5e5d5d] flex-grow'>{description}</p>
              
          
           
             <Link href={product.link} className='bg-black text-white p-3 rounded text-[14.5px] font-bold  transform lg:opacity-0 lg:group-hover:opacity-100 lg:group-hover:block lg:group-hover:-translate-y-5 transition duration-300 ease-in-out lg:absolute  -bottom-9'>বিস্তারিত</Link>
       
         
           </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetailsErp;
