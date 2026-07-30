// import ManufactureTab from "../manufacturing/tabs/ManufactureTab";
// import ModalBody from "../../../shared/modalBody/ModalBody";
import BannerChemical from "./BannerChemical";
import ChemicalAccounting from "./ChemicalAccounting";
import ManufactureTab from "../manufacturing/tabs/ManufactureTab";
// import bannerImg from '../../../assets/backImgBanner.webp'
// import ChemicalAccounting from "./ChemicalAccounting";


const Chemical = () => {
    return (
        <div className=' bg-[#F3F3F3] 2xl:mx-[215px] lg:mx-[160px] mainHome'>
         
       <BannerChemical/>


         <ChemicalAccounting/>
        


        <ManufactureTab heading={'রাসায়নিক শিল্পের জন্য ``আইওনিক ইআরপি`` টোটাল সলুয়েশন ইআরপি সফ্টওয়ার এর অন্যান্য মডিউল'} subHeading={'প্রতিটি ব্যবসার মূল লক্ষ্য হল খরচ কমানো এবং আপনার ব্যবসার প্রক্রিয়াগুলিকে স্বয়ংক্রিয় করার সাহায্যে উত্পাদনশীলতা এবং দক্ষতা বৃদ্ধি করা। কিন্তু প্রথমে, আপনাকে বুঝতে হবে যে রাসায়নিক শিল্পের জন্য ইআরপি ব্যবসার জন্য নির্দিষ্ট বিভিন্ন দিক প্রয়োজন।'}/>
    
    
    </div>
    );
};

export default Chemical;