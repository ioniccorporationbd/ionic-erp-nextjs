import { healthData } from "./healthCardData";

const HealthCard = () => {
    return (
        <div className=""> 
            


            <section className='flex flex-col justify-center items-center gap-2 mt-5 py-5 pb-10'>
                <h1 className='text-[#898989] font-semibold text-center text-[17.5px]'>কোন কোন সেক্টর এ ব্যবহার করা যাই- ``আইওনিক ইআরপি`` হেলথকেয়ার স্বাস্থ্যসেবা টোটাল সলুয়েশন ইআরপি সফ্টওয়ার</h1>
                <div className='w-10 h-[3px] bg-[#b3b2b2]'></div>
                <p className='text-center text-[#898989] font-semibold  text-[14.5px]'>``আইওনিক ইআরপি`` হেলথকেয়ার স্বাস্থ্যসেবা টোটাল সলুয়েশন ইআরপি সফ্টওয়ার হল একটি হেলথকেয়ার স্বাস্থ্যসেবা সলিউশন যা এক ছাদের নিচে আপনার সমস্ত অপারেশনাল কার্যক্রম পরিচালনা করতে সাহায্য করে।</p>
            </section>



            <section className="grid lg:grid-cols-3 grid-cols-1 md:grid-cols-2 gap-10">

                {
                    healthData.map((item, index) => {
                        return <div key={index} className="bg-white  p-7">
                            <div className="flex justify-center items-center">
                                <img className="w-20 bg-[#F1F1F1] p-3 mb-5 rounded-full" src={item.imgSrc} alt={item.title} />
                            </div>
                            <div className="text-center">
                                <h1 className="text-[17.5px] font-bold pb-2">{item.title}</h1>
                                <p className="text-[14.5px] text-[#777777]">{item.description}</p>
                            </div>

                        </div>
                    })
                }
            </section>


            
        </div>
    );
};

export default HealthCard;