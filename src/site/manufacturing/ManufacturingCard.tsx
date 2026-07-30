import { manufacturer } from "./manufactureBody/manufacturerData";


const ManufacturingCard = () => {
    return (
        <div className='text-black py-5'>
           

            <section className='flex flex-col justify-center items-center gap-2 mt-5 pt-3 pb-10'>
                <h1 className='text-[#898989] font-semibold text-center text-[17.5px]'>"আইওনিক ইআরপি" বিজনেস ম্যানেজমেন্ট সফটওয়্যার ম্যানুফ্যাকচারিং এক্সিলেন্স ইন্ডাস্ট্রিজ</h1>
                <div className='w-10 h-[3px] bg-[#b3b2b2]'></div>
                <p className='text-center text-[#898989] font-semibold  text-[14.5px]'>"আইওনিক ইআরপি" বিজনেস ম্যানেজমেন্ট সফটওয়্যার আধুনিক ক্লাউড ম্যানুফ্যাকচারিং ইআরপি সফ্টওয়্যার যা উৎপাদন চক্রকে সহজ করে,  উপাদানের ব্যবহার ট্র্যাক করতে সহায়তা করে, <br/>ক্ষমতা পরিকল্পনা প্রদর্শন করে, সাবকন্ট্রাক্টিং পরিচালনা করে এবং আরও অনেক কিছু!</p>
            </section>

            <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-8'>
            {
                manufacturer.map((manufacturer, index) => <div key={index} className='pb-10 bg-white pt-3  px-5  flex flex-col gap-4  items-center md:relative group transition duration-300 hover:shadow-xl rounded-md border text-center'>
                    <div className='flex justify-center items-center pt-5 grayscale'>

                    <img src={manufacturer.imgSrc} alt={manufacturer.title} />
                    </div>
                    <h1 className='text-[17.5px] font-bold py-2'>{manufacturer.title}</h1>
                    <p className='text-[14.5px] text-[#777777] '>{manufacturer.description}</p>
                </div>

                )
            }
        </div>
            
        </div>
    );
};

export default ManufacturingCard;