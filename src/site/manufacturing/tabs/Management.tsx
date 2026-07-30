const managementImg = "/assets/erp/asset.svg";
const Management = () => {
    return (
        <div>
        <section className='flex flex-col md:flex-row justify-between pb-5'>
            <div >
                <h1 className="text-2xl font-bold">  সম্পদ ব্যবস্থাপনা</h1>
                <p className="text-[14.5px] font-medium text-[#777777]">
               
                আপনার মালিকানা জানুন এবং কেন আপনি এটির মালিক তা জানুন। – পিটার লিঞ্চ</p>
            </div>
            <div className='flex justify-center items-center'> <img className='w-[300px]' src={managementImg} alt="" /></div>
        </section>


        <section>
            <p className='text-[14.5px] font-medium text-[#777777] pb-5'>IONIC ERP একটি কেন্দ্রীভূত ব্যবস্থার মাধ্যমে আইটি অবকাঠামো এবং সরঞ্জাম সহ সংগ্রহ থেকে নিষ্পত্তি পর্যন্ত সম্পদ ব্যবস্থাপনাকে সহজ করে। একাধিক ক্ষমতা একক অ্যাপ্লিকেশনে একত্রিত করার সাথে, সম্পদ পরিচালনা করা সহজ ছিল না।</p>

            <p className='text-[15.5px] font-bold text-[#777777]'>বৈশিষ্ট্য</p>


            <ul className='list-disc pl-5 text-[#777777] text-[14.5px] pb-5'>
                 <li>IONIC ERP সম্পদ ব্যবস্থাপনার জন্য একটি কেন্দ্রীভূত সিস্টেম অফার করে।
                </li>
                <li>প্ল্যাটফর্মটি সংগ্রহ থেকে নিষ্পত্তি পর্যন্ত সম্পদ পরিচালনার সুবিধা দেয়।
                </li>
                <li>আইটি অবকাঠামো এবং সরঞ্জামগুলি সিস্টেমের মাধ্যমে পরিচালনা করা যেতে পারে।</li>
                <li>সম্পদ ব্যবস্থাপনাকে আরও দক্ষ করার জন্য একাধিক ক্ষমতা একটি একক অ্যাপ্লিকেশনে একত্রিত করা হয়েছে।</li>
                <li>সম্পদ মাস্টার তৈরি এবং পরিচালনা করা যেতে পারে।</li>
                <li>অবচয় এবং রক্ষণাবেক্ষণ ট্র্যাক করা যেতে পারে।</li>
                <li>সিদ্ধান্ত গ্রহণে সহায়তা করার জন্য রিয়েল-টাইম রিপোর্টিং এবং বিশ্লেষণ উপলব্ধ।</li>
            </ul>
        </section>
    </div>
    );
};

export default Management;