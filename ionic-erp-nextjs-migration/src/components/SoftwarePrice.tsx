

interface SoftwarePriceProps {
    readonly heading: React.ReactNode;
    readonly subheading: React.ReactNode;
    readonly cardheading: React.ReactNode;
    readonly textColor: string;
}

const SoftwarePrice = ({heading, subheading, cardheading, textColor}: SoftwarePriceProps) => {
   
    return (
        <div className=' pb-10 dedicated'>
            <section className='flex flex-col justify-center items-center gap-2 mt-5 py-5'>
                <h1 className='text-[#898989] font-semibold text-center text-[17.5px]'>{heading}</h1>
                <div className='w-10 h-[3px] bg-[#b3b2b2]'></div>
                <p className='text-center text-[#898989] font-semibold  text-[14.5px]'>{subheading}</p>
            </section>



            <h1 className="text-[#898989] text-[17.5px] font-semibold text-center w-[80%] mx-auto pt-5 pb-3">{cardheading}</h1>
               <div className='flex justify-center pb-10'>
               <div className='w-10 h-[3px] bg-[#b3b2b2]'></div>
               </div>

            
<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:gap-10 
gap-5 ">
        <div className="card1 text-center bg-white border mb- pb-10 flex flex-col justify-center items-center pt-5 px-10">
            <h2 className={`${textColor}  2xl:text-xl lg:text-[12.9px]  py-1 font-bold pt-5`}>Ultimate</h2>
            
            <section className="flex flex-col gap-2 pb- xl:text-sm lg:text-[11px] text-black flex-grow">
                <p>কল করুন 01958442200</p>
                <p>আনলিমিটেড ব্যবহারকারী</p>
                <p>আনলিমিটেড পণ্য/সেবা</p>
                <p>আনলিমিটেড বিল</p>
                <p>মেয়াদকাল- ১ বছর (নবায়ন)</p>
                <p>কাস্টম লিঙ্ক</p>
                <p>***আইওনিক ইআরপি এর সকল প্যাকেজ বাৎসরিক চার্জ প্রযোজ্য।</p>
            </section>

            {/* <button className="bg-[#FF0020] text-white font-medium p-2 rounded text-xs xl:text-sm">আবেদন করুন</button> */}

        </div>
        <div className="card1 text-center bg-white border mb- pb-10 flex flex-col justify-center items-center pt-5 px-10">
            <h2 className={`${textColor}  2xl:text-xl lg:text-[12.9px]  py-1 font-bold pt-5`}>Ultimate Pro</h2>
            
            <section className="flex flex-col gap-2 pb- xl:text-sm lg:text-[11px] text-black flex-grow">
                <p>কল করুন 01958442200</p>
                <p>আনলিমিটেড ব্যবহারকারী</p>
                <p>আনলিমিটেড পণ্য/সেবা</p>
                <p>আনলিমিটেড বিল</p>
                <p>মেয়াদকাল- ১ বছর (নবায়ন)</p>
                <p>(নবায়ন)</p>
                <p>নিজস্ব কাস্টম লিঙ্ক</p>
            </section>

    

        </div>
     
        <div className="card1 text-center bg-white border mb- pb-10 flex flex-col justify-center items-center pt-5 px-10">
        <h2 className={`${textColor}  2xl:text-xl lg:text-[12.9px]  py-1 font-bold pt-5`}>Ultimate Pro Plus</h2>
           <section className="flex flex-col gap-2 pb- xl:text-sm lg:text-[11px] text-black flex-grow">
                <p>কল করুন 01958442200</p>
                <p>আনলিমিটেড ব্যবহারকারী</p>
                <p>আনলিমিটেড পণ্য/সেবা</p>
                <p>আনলিমিটেড বিল</p>
                <p>আনলিমিটেড বিল</p>
                <p>মেয়াদকাল- লাইফটাইম</p>
                <p>কাষ্টমারের নিজস্ব</p>
                <p> কাস্টম লিঙ্ক</p>
              

             
                
               
            </section>



        </div>

    </section>
            
        </div>
    );
};

export default SoftwarePrice;
