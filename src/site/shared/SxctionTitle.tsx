

import type { ReactNode } from "react";

interface SectionTitleProps {
    readonly heading?: ReactNode;
    readonly subheading?: ReactNode;
}

const SectionTitle = ({heading, subheading}: SectionTitleProps) => {
    return (
        <div className="">
              
            <section className='flex flex-col justify-center items-center gap-2 mt-5 pt- pb-5'>
                <h1 className='text-[#898989] font-semibold text-center text-[17.5px]'>{heading}</h1>
                <div className='w-10 h-[3px] bg-[#b3b2b2]'></div>
                <p className='text-center text-[#898989] font-semibold  text-[14.5px]'>{subheading}</p>
            </section>


          
        </div>
    );
};

export default SectionTitle;
