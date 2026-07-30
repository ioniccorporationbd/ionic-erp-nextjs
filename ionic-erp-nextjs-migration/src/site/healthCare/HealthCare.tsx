import BannerHealthCare from "./BannerHealthCare";
import Benifits from "./Benifits";
import HealthCard from "./HealthCard";
import ManufactureTab from "../manufacturing/tabs/ManufactureTab";


const HealthCare = () => {
    return (
        <div className="2xl:mx-[215px] lg:mx-[160px] mainHome mainerp">
            <BannerHealthCare/>
            <HealthCard/>
            <Benifits/>
            {/* <HealthCharecter/> */}
            <ManufactureTab heading={'``আইওনিক ইআরপি`` হেলথকেয়ার স্বাস্থ্যসেবা টোটাল সলুয়েশন ইআরপি সফ্টওয়ার এর অন্যান্য মডিউল'} subHeading={'প্রতিটি হেলথকেয়ার স্বাস্থ্যসেবা ব্যবসা মূল লক্ষ্য হল খরচ কমানো এবং আপনার ব্যবসার প্রক্রিয়াগুলিকে স্বয়ংক্রিয় করার সাহায্যে উত্পাদনশীলতা এবং দক্ষতা বৃদ্ধি করা। কিন্তু প্রথমে, আপনাকে বুঝতে হবে যে হেলথকেয়ার স্বাস্থ্যসেবা ব্যবসা জন্য ইআরপি নির্দিষ্ট বিভিন্ন দিক প্রয়োজন।'}/>
            
        </div>
    );
};

export default HealthCare;