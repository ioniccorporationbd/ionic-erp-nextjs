import { charecter } from "./charecter";

const ManufactureCharecter = () => {
    return (
        <div className=" py-5">
             

            <section className='flex flex-col justify-center items-center gap-2 mt-5 pt-3 pb-10'>
                <h1 className='text-[#898989] font-semibold text-center text-[17.5px]'>আপনার উৎপাদনের জন্য "আইওনিক ইআরপি" বিজনেস ম্যানেজমেন্ট সফটওয়্যার এর বৈশিষ্ট্য নিচে দেওয়া হল-</h1>
                <div className='w-10 h-[3px] bg-[#b3b2b2]'></div>
               
            </section>

            <section>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 text-center gap-8">
                    {
                        charecter.map((charecter,index) =>{
                            return <div key={index} className='pb-5 bg-white pt-3  px-5  flex flex-col gap-2  items-center md:relative group transition duration-300 hover:shadow-xl rounded-md border text-center'>
                                <h1 className="font-bold text-[17.5px] pt-5">{charecter.title}</h1>
                                <hr className="border-[1px] mb-3 w-full" />
                                <p className="text-[14.5px] text-[#777777]">{charecter.description}</p>

                            </div>
                        })
                    }
                </div>

            </section>

            
        </div>
    );
};

export default ManufactureCharecter;