const accountImg = "/assets/erp/module-account.svg";
const Accounting = () => {
    return (
        <div>
            <section className='flex flex-col md:flex-row justify-between pb-5'>
                <div>
                    <h1 className="text-2xl font-bold">অ্যাকাউন্টিং</h1>
                    <p className="text-[14.5px] font-medium text-[#777777]">অ্যাকাউন্টিং ব্যবসার ভাষা – ওয়ারেন বাফেট।</p>
                </div>
                <div className='flex justify-center items-center'> <img className='w-[300px]' src={accountImg} alt="" /></div>
            </section>


            <section>
                <p className='text-[14.5px] font-medium text-[#777777] pb-5'>অ্যাকাউন্ট মডিউল আপনার প্রতিষ্ঠানের মূল অ্যাকাউন্টের প্রয়োজনীয়তার অন্তর্দৃষ্টি প্রদান করে এবং আপনাকে মূল্যবান অন্তর্দৃষ্টি প্রদান করে সাংগঠনিক খরচ পরিচালনা করতে দেয়। এটি আপনাকে বিক্রয় চালান, ক্রয় চালান এবং অর্থপ্রদানের এন্ট্রিগুলির মতো আর্থিক এবং অ্যাকাউন্টিং কার্যক্রম স্বয়ংক্রিয় করতে দেয়। এছাড়াও আপনি নির্বাচিত সময়ে স্বয়ংক্রিয় অবচয় এন্ট্রি দিয়ে আপনার সম্পদ পরিচালনা করতে পারেন।</p>
                <ul className='list-disc pl-5 text-[#777777] text-[14.5px] pb-5'>
                    <li>সম্মিলিত অ্যাকাউন্টিং রিপোর্ট পাওয়ার সম্ভাবনা সহ একাধিক কোম্পানি অ্যাকাউন্টিং।

                    </li>
                    <li>আপনার প্রাপ্তির জন্য স্বয়ংক্রিয় অর্থপ্রদান অনুস্মারক।
                    </li>
                    <li>CRM এর সাথে সহজ ইন্টিগ্রেশন।</li>
                    <li>রপ্তানি/আমদানি এবং হেজিংয়ের জন্য মাল্টি-কারেন্সি অ্যাকাউন্টিং।</li>
                    <li>নির্ধারিত স্বয়ংক্রিয় ECS অ্যাকাউন্টিং এন্ট্রি সহ মেয়াদী ঋণ পরিচালনা করুন।</li>
                    <li>বিক্রয়, ক্রয়, মোট লাভের বিশদ বিশ্লেষণমূলক প্রতিবেদন।
                    </li>
                </ul>
            </section>
        </div>
    );
};

export default Accounting;