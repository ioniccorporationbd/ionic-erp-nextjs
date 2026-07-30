
import BannerManufacturing from "./BannerManufacturing";
import ManufacturingCard from "./ManufacturingCard";
import ManufactureCharecter from "./manufactureCharecter/ManufactureCharecter";
import ManufactureTab from "./tabs/ManufactureTab";





const Manufacturing = () => {
    return (
    <div className=' bg-[#F3F3F3] 2xl:mx-[215px] lg:mx-[160px] mainHome mainerp'>
         <BannerManufacturing/>


        <ManufacturingCard/>
        <ManufactureCharecter/>
        <ManufactureTab heading={'``আইওনিক ইআরপি`` বিজনেস ম্যানেজমেন্ট সফটওয়্যার উৎপাদন শিল্পের জন্য এর অন্যান্য মডিউল '} subHeading={<>প্রতিটি ব্যবসার মূল লক্ষ্য হল খরচ কমানো এবং আপনার ব্যবসার প্রক্রিয়াগুলিকে স্বয়ংক্রিয় করার সাহায্যে উত্পাদনশীলতা এবং  দক্ষতা বৃদ্ধি করা। <br className="hidden md:block"/> কিন্তু  প্রথমে, আপনাকে বুঝতে হবে যে উৎপাদন শিল্পের জন্য ইআরপি ব্যবসার জন্য নির্দিষ্ট বিভিন্ন দিক প্রয়োজন।</>}/>
    
    
    </div>
    );
};

export default Manufacturing;