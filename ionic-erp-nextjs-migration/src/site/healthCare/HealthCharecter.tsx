import { healthCharacter } from "./healthCharacter";

const HealthCharecter = () => {
    return (
        <div className="">
              
            <section className='flex flex-col justify-center items-center gap-2 mt-5 pt- pb-10'>
                <h1 className='text-[#898989] font-semibold text-center text-[17.5px]'>``আইওনিক ইআরপি`` হেলথকেয়ার স্বাস্থ্যসেবা টোটাল সলুয়েশন ইআরপি সফ্টওয়ার এর বৈশিষ্ট্য</h1>
                <div className='w-10 h-[3px] bg-[#b3b2b2]'></div>
                <p className='text-center text-[#898989] font-semibold  text-[14.5px]'>আমরা চাই আপনি শুরু থেকেই এগিয়ে যান। আপনার স্বাস্থ্যসেবা সুবিধায় প্রথম দিন থেকে কাজগুলি সম্পন্ন করার জন্য আমাদের বিভিন্ন ব্যবহারের জন্য প্রস্তুত মডিউলগুলি ব্যবহার করুন।</p>
            </section>
          


            <section className="grid md:grid-cols-3 gap-10 pt-5">
                {
                    healthCharacter.map((item, index)=> {
                        return <div key={index} className="px-2 text-center bg-white">
                            <div>
                                <img src={item.imgSrc} alt="" />
                            </div>
                            <div className='p-5'>
                            <h1 className="text-[17.5px] font-bold py-3">{item.title}</h1>
                            <p className="text-[14.5px] text-[#777777]">{item.description}</p>
                            </div>
                       

                        </div>
                    })
                }
            </section>
            
        </div>
    );
};

export default HealthCharecter;