const manufacturingImg = "/assets/erp/module-manufacturing.svg";
const TabMaufacturing = () => {
    return (
        <div>
            <section className='flex flex-col md:flex-row justify-between pb-5'>
                <div>
                    <h1 className="text-2xl font-bold">ম্যানুফ্যাকচারিং</h1>
                    <p className="text-[14.5px] font-medium text-[#777777]">
                    এখানেই আসল কাজ হয়ে যায়।</p>
                </div>
                <div className='flex justify-center items-center'><img className='w-[300px]' src={manufacturingImg} alt="" /></div>
            </section>


            <section>
                <p className='text-[14.5px] font-medium text-[#777777] pb-5'>ইআরপি-এর ম্যানুফ্যাকচারিং অংশটি বিভিন্ন শিল্পের পটভূমিতে ব্যবসায়িক পরিবেশন করার জন্য ডিজাইন করা হয়েছে। সফ্টওয়্যারটির বহুমুখিতা SME-কে তাদের উৎপাদন কার্যক্রম ন্যূনতম ডেটা এন্ট্রির মাধ্যমে পরিচালনা করতে দেয়। এই সিস্টেমটি উৎপাদনের ক্রিয়াকলাপের সময়ের উপর ভিত্তি করে ব্যবহৃত কাঁচামাল এবং পরিচালন ব্যয়ের উপর ভিত্তি করে তৈরি পণ্যের খরচ পরিচালনা করতে সক্ষম।</p>
                <ul className='list-disc pl-5 text-[#777777] text-[14.5px] pb-5'>
                    <li>ওয়ার্কস্টেশন পরিচালনা করুন এবং বেঞ্চমার্ক টাইমিংয়ের সাথে সঞ্চালিত ক্রিয়াকলাপগুলিকে মানসম্মত করুন।
                    </li>
                    <li>ম্যানুফ্যাকচারিং সূত্রে ভিন্নতা সহ একক আইটেমের জন্য মাল্টিপল বিল অফ ম্যাটেরিয়ালস (BOM) এর অনুমতি দেয়।
                    </li>
                    <li>BOM-এর মাধ্যমে শুধুমাত্র ইনভেন্টরি নয়, অপারেশনাল খরচ এবং ওয়ার্কস্টেশনের প্রাপ্যতাও পরিচালনা করুন।</li>
                    <li>সাব-অ্যাসেম্বলি সহ উত্পাদন কার্যক্রমের সময়সূচী করার জন্য উত্পাদন পরিকল্পনা সরঞ্জাম।</li>
                    <li>উন্নতির সম্ভাব্য ক্ষেত্রগুলি পাওয়ার জন্য বেঞ্চমার্কের বিপরীতে প্রতিটি ব্যাচের জন্য উত্পাদন বিশ্লেষণ।</li>
                    
                </ul>
            </section>
        </div>
    );
};

export default TabMaufacturing;