const hrImg = "/assets/erp/module-hr.svg";
const Hr = () => {
    return (
        <div>
        <section className='flex flex-col md:flex-row justify-between pb-5'>
            <div>
                <h1 className="text-2xl font-bold">  মানব সম্পদ</h1>
                <p className="text-[14.5px] font-medium text-[#777777]">
              
                আপনি একটি ব্যবসা নির্মাণ করবেন না. আপনি মানুষ তৈরি করেন এবং তারপর মানুষ ব্যবসা গড়ে তোলে। – জিগ জিগলার</p>
            </div>
            <div className='flex justify-center items-center'><img className='w-[300px]' src={hrImg} alt="" /></div>
        </section>


        <section>
            <p className='text-[14.5px] font-medium text-[#777777] pb-5'>বেশিরভাগ এসএমই-এর জন্য মানবসম্পদ সবচেয়ে গুরুত্বপূর্ণ কিন্তু উপেক্ষিত অংশ। নন-কোর অ্যাক্টিভিটি এবং লক্ষ্য-ভিত্তিক পদ্ধতিতে সময় নষ্ট করা কর্মীদের উত্পাদনশীলতা বৃদ্ধি করে। উপস্থিতি, বেতন-ভাতা এবং ব্যয়ের দাবির স্বয়ংক্রিয়তা আরও ভাল ট্র্যাকিং এবং রিডানড্যান্সি হ্রাস করার অনুমতি দেয়।</p>

            <p className='text-[15.5px] font-bold text-[#777777]'>বৈশিষ্ট্য</p>


            <ul className='list-disc pl-5 text-[#777777] text-[14.5px] pb-5'>
                 <li>কর্মচারী উপস্থিতি পরিচালনা করুন.






                </li>
                <li>স্বয়ংক্রিয় বেতন প্রক্রিয়াকরণ।
                </li>
                <li>ছুটি/ছুটির ব্যবস্থাপনা।</li>
                <li>ব্যয় দাবি ব্যবস্থাপনা।</li>
                <li>চাকরির সুযোগ এবং আবেদনকারী।</li>
                <li>পেশাদার মূল্যায়ন সিস্টেম।</li>
                <li>প্রশিক্ষণ এবং প্রতিক্রিয়া.</li>
            </ul>
        </section>
    </div>
    );
};

export default Hr;