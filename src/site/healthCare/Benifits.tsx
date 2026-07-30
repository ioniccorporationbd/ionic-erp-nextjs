"use client";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

const Benifits = () => {
    const [tabIndex, setTabIndex] = useState(0); 

    return (
        <div className=" py-10">
           
            <section className='flex flex-col justify-center items-center gap-2 mt-5 pt-3 pb-10'>
                <h1 className='text-[#898989] font-semibold text-center text-[17.5px]'>``আইওনিক ইআরপি`` হেলথকেয়ার স্বাস্থ্যসেবা টোটাল সলুয়েশন ইআরপি সফ্টওয়ার যে সকল সুবিধা নিচে দেয়া হল</h1>
                <div className='w-10 h-[3px] bg-[#b3b2b2]'></div>
               
            </section>


            {/* --------tab part-------------- */}

            <div className='md:pl-5'>
            <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList className="flex justify-center items-center md:gap-10 gap-5 overflow-x-scroll whitespace-nowrap pb-3 text-[#777777]">
                    <Tab className={`group ${tabIndex === 0 ? "text-black" : ""}`}>
                        <div className={`flex justify-center text-[17.5px] ${tabIndex === 0 ? "text-black" : "group-hover:text-black"}`}>
                            <FaCheckCircle />
                        </div>
                        <p className={`text-[17.5px] font-bold pt-1 ${tabIndex === 0 ? "text-black" : "group-hover:text-black"}`}>
                            রোগীর সুবিধা
                        </p>
                        <div className={`h-[2px] bg-black transition-all duration-300 ${tabIndex === 0 ? "w-full" : "w-0 group-hover:w-full"}`}></div>
                    </Tab>
                    <Tab className={`group ${tabIndex === 1 ? "text-black" : ""}`}>
                        <div className={`flex justify-center text-[17.5px] ${tabIndex === 1 ? "text-black" : "group-hover:text-black"}`}>
                            <FaCheckCircle />
                        </div>
                        <p className={`text-[17.5px] font-bold pt-1 ${tabIndex === 1 ? "text-black" : "group-hover:text-black"}`}>
                            ক্লিনিকাল সুবিধা
                        </p>
                        <div className={`h-[2px] bg-black transition-all duration-300 ${tabIndex === 1 ? "w-full" : "w-0 group-hover:w-full"}`}></div>
                    </Tab>
                    <Tab className={`group ${tabIndex === 2 ? "text-black" : ""}`}>
                        <div className={`flex justify-center text-[17.5px] ${tabIndex === 2 ? "text-black" : "group-hover:text-black"}`}>
                            <FaCheckCircle />
                        </div>
                        <p className={`text-[17.5px] font-bold pt-1 ${tabIndex === 2 ? "text-black" : "group-hover:text-black"}`}>
                            সাধারণ সুবিধা
                        </p>
                        <div className={`h-[2px] bg-black transition-all duration-300 ${tabIndex === 2 ? "w-full" : "w-0 group-hover:w-full"}`}></div>
                    </Tab>
                </TabList>
                <TabPanel>
                    <ul className="list-disc text-[#777777] pl-10 lg:pl-2 ">
                        <li>
                            <h1 className="text-[17.5px] font-bold py-5">দক্ষ হাসপাতাল পরিদর্শন</h1>
                            <p className="text-[14.5px]">একটি চিকিৎসা সুবিধায় প্রয়োজনীয় চিকিত্সা চলাকালীন রোগীদের জন্য অপেক্ষার সময় হ্রাস করে।</p>
                        </li>
                        <li>
                            <h1 className="text-[17.5px] font-bold py-5">কাগজবিহীন রেকর্ড</h1>
                            <p className="text-[14.5px]">যেহেতু অতীতের রোগীর রেকর্ড ডিজিটালভাবে উপলব্ধ, রোগীদের হাসপাতালে পরিদর্শনের সময় মেডিকেল রেকর্ডের মুদ্রিত কপি বহন করতে হবে না।</p>
                        </li>
                        <li>
                            <h1 className="text-[17.5px] font-bold py-5">অনুস্মারক, বিজ্ঞপ্তি</h1>
                            <p className="text-[14.5px]">সিস্টেম জেনারেট করা অনুস্মারক এবং বিজ্ঞপ্তিগুলি নিশ্চিত করে যে রোগীরা কোনও নির্ধারিত অ্যাপয়েন্টমেন্ট / পর্যায়ক্রমিক চেক-আপ মিস করবেন না।</p>
                        </li>
                        <li>
                            <h1 className="text-[17.5px] font-bold py-5">রোগীর পোর্টাল</h1>
                            <p className="text-[14.5px]">সমস্ত অ্যাপয়েন্টমেন্ট, ডায়াগনস্টিক রিপোর্ট, বিলিং তথ্য এবং রোগীর ইতিহাস ট্র্যাক করার জন্য একটি একক পোর্টাল।</p>
                        </li>
                        <li>
                            <h1 className="text-[17.5px] font-bold py-5">টেলি কনসালটেশন</h1>
                            <p className="text-[14.5px]">ভৌগোলিকভাবে দূরবর্তী রোগীরা টেলি-কনসাল্টিং কার্যকারিতার সাহায্যে পছন্দসই অনুশীলনকারীদের কাছ থেকে পরামর্শ পেতে পারেন।</p>
                        </li>
                        <li>
                            <h1 className="text-[17.5px] font-bold py-5">রোগীর ব্যস্ততা বৃদ্ধি</h1>
                            <p className="text-[14.5px]">কনফিগারযোগ্য প্রশ্নাবলী, মূল্যায়ন ফর্ম, জরিপ ইত্যাদি চিকিৎসার সময় এবং পরে রোগীর অংশগ্রহণ বৃদ্ধি করে।</p>
                        </li>
                    </ul>
                </TabPanel>
                <TabPanel>
                <ul className="list-disc text-[#777777] px-2 lg:px-0 ">
                        <li>
                            <h1 className="text-[17.5px] font-bold py-5">কাগজবিহীন কর্মপ্রবাহ</h1>
                            <p className="text-[14.5px]">কর্মপ্রবাহের সম্পূর্ণ স্বয়ংক্রিয়তা তাদের কাগজবিহীন করে তোলে যা প্রকৃতপক্ষে ডেটা প্রাপ্যতা উন্নত করে এবং ডেটা হারানোর ঝুঁকি হ্রাস করে।</p>
                        </li>
                        <li>
                            <h1 className="text-[17.5px] font-bold py-5">ডেটার নিরাপদ স্টোরেজ</h1>
                            <p className="text-[14.5px]">সিস্টেম ডেটা গোপনীয়তা বজায় রেখে কোনও ডেটা ফাঁস এড়িয়ে রোগীর ডেটা নিরাপদে সংরক্ষণ করে।</p>
                        </li>
                        <li>
                            <h1 className="text-[17.5px] font-bold py-5">আরও ভালো বিশ্লেষণ</h1>
                            <p className="text-[14.5px]">ড্যাশবোর্ড এবং শক্তিশালী রিপোর্টের সাহায্যে, আপনি শুধুমাত্র ক্লিনিকাল তথ্য বিশ্লেষণ করতে পারবেন না বরং আর্থিক বিবৃতি, প্রাপ্য/প্রদেয়, উপস্থিতি, সম্পদ জীবনচক্র এবং আরও অনেক কিছুর মাধ্যমে গুরুত্বপূর্ণ ব্যবসায়িক কেপিআই বিশ্লেষণ করতে পারবেন।</p>
                        </li>
                        <li>
                            <h1 className="text-[17.5px] font-bold py-5">উন্নত সিদ্ধান্ত গ্রহণ</h1>
                            <p className="text-[14.5px]">রোগীর ইতিহাস, রোগীর অগ্রগতি, রোগীর সংগ্রহস্থল বিজ্ঞাপনের বিভিন্ন বিশ্লেষণ আপনাকে দ্রুত, সঠিক ক্লিনিকাল সিদ্ধান্তের সুবিধার্থে অন্তর্দৃষ্টিপূর্ণ তথ্যে দ্রুত অ্যাক্সেস পেতে সহায়তা করতে পারে।</p>
                        </li>
                        <li>
                            <h1 className="text-[17.5px] font-bold py-5">কার্যকর ডেটা ব্যবস্থাপনা</h1>
                            <p className="text-[14.5px]">ভেবেচিন্তে ডিজাইন করা ইউজার ইন্টারফেস স্বাস্থ্যসেবা কর্মীদের কার্যকরভাবে উন্নত ডেটা সঠিকতা এবং নির্ভরযোগ্যতা নিশ্চিত করে রোগীর ডেটা ক্যাপচার ও সংরক্ষণ করতে দেয়।</p>
                        </li>
                        <li>
                            <h1 className="text-[17.5px] font-bold py-5">উন্নত যোগাযোগ</h1>
                            <p className="text-[14.5px]">ইন্টারবোভেন ওয়ার্কফ্লো ব্যবহারকারীদের বিভিন্ন বিভাগের মধ্যে বিরামহীন সমন্বয় এবং যোগাযোগ করতে দেয়।</p>
                        </li>
                    </ul>
                </TabPanel>
                <TabPanel>
                <ul className="list-disc text-[#777777] px-2 lg:px-0 ">
                        <li>
                            <h1 className="text-[17.5px] font-bold py-5">ব্যবহারকারী বান্ধব ডিজাইন</h1>
                            <p className="text-[14.5px]">একটি অত্যন্ত ব্যবহারকারী বান্ধব সিস্টেম, বর্ধিত ব্যবহারকারীর অভিজ্ঞতার গর্ব করে, অ-প্রযুক্তিগত ব্যবহারকারীদের জন্য মানিয়ে নেওয়া সহজ এবং সহজ।</p>
                        </li>
                        <li>
                            <h1 className="text-[17.5px] font-bold py-5">সত্যের একক উৎস</h1>
                            <p className="text-[14.5px]">একটি একীভূত প্ল্যাটফর্মে একটি সম্পূর্ণ সংস্থা পরিচালনা করা নিশ্চিত করে যে কার্যকর এবং অন্তর্দৃষ্টিপূর্ণ ব্যবসায়িক তথ্য প্রদানের জন্য সত্যের একটি একক উত্স বিদ্যমান।</p>
                        </li>
                        <li>
                            <h1 className="text-[17.5px] font-bold py-5">কাস্টমাইজ করা সহজ</h1>
                            <p className="text-[14.5px]">কম কোডের উপর নির্মিত, ওপেন সোর্স ফ্র্যাপ ফ্রেমওয়ার্ক আপনার প্রয়োজন অনুসারে নতুন ফর্ম তৈরি করা বা বিদ্যমানগুলি কাস্টমাইজ করা খুবই সহজ।</p>
                        </li>
                        <li>
                            <h1 className="text-[17.5px] font-bold py-5">কম খরচ</h1>
                            <p className="text-[14.5px]">এন্টারপ্রাইজ মডিউলের একটি বিস্তৃত পরিসর বাক্সের বাইরে কোন অতিরিক্ত লাইসেন্সিং খরচ ছাড়াই উপলব্ধ।</p>
                        </li>
                        <li>
                            <h1 className="text-[17.5px] font-bold py-5">বর্ধিত উৎপাদনশীলতা</h1>
                            <p className="text-[14.5px]">নিরবচ্ছিন্ন আন্তঃবিভাগ যোগাযোগ, কনফিগারযোগ্য বিজ্ঞপ্তি, ডেটা আমদানি/রপ্তানি, ড্যাশবোর্ড, স্বয়ংক্রিয় ইমেল রিপোর্ট ইত্যাদি দ্বারা সুবিধাপ্রাপ্ত।</p>
                        </li>
                        <li>
                            <h1 className="text-[17.5px] font-bold py-5">উন্নত অপারেশনাল কার্যকারিতা</h1>
                            <p className="text-[14.5px]">আপনার ক্রিয়াকলাপগুলিকে মানানসই করার জন্য আপনার নিজস্ব কাস্টম ওয়ার্কফ্লোগুলি তৈরি করুন বা পূর্ব-কনফিগার করা শিল্পের মানগুলি ব্যবহার করুন৷</p>
                        </li>
                    </ul>
                </TabPanel>
            </Tabs>
            </div>
           
        </div>
    );
};

export default Benifits;
