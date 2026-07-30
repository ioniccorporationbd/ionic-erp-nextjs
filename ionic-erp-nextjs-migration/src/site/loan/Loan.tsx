"use client";

import { FaLaptop, FaWhatsapp } from 'react-icons/fa';
import { FaCircleMinus, FaCirclePlus } from 'react-icons/fa6';
import { useState } from 'react';
import LoanCard from './LoanCard';
import BannerLoan from './BannerLoan';
import SectionTitle from '../shared/SxctionTitle';



const Loan = () => {
    const [isVisible1, setIsVisible1] = useState(true);
    const [isVisible2, setIsVisible2] = useState(true);
    const [isVisible3, setIsVisible3] = useState(true);
    const [isVisible4, setIsVisible4] = useState(true);
    const [isVisible5, setIsVisible5] = useState(true);

 
    return (
        <div className=' bg-[#F3F3F3] 2xl:mx-[215px] lg:mx-[160px] mainHome '>

           <BannerLoan/>
            <div className=' pt-'>
          

            </div>

            <section className='grid lg:grid-cols-2 gap-10 px-2 py-5 text-[#777777] text-xl'>
                <div>
                    
                    <SectionTitle heading={'ঋণ ব্যবস্থাপনা স্বয়ংক্রিয় ব্যবসায়িক প্রক্রিয়া, সময় বাঁচান এবং কর্মক্ষমতা উন্নত করুন'}/>
                    <p  className='text-[14.5px]'>এই “আইওনিক ইআরপি” বিজনেস ম্যানেজমেন্ট সফটওয়্যার ঋণের ধরন, ঋণ নিরাপত্তা ব্যবস্থাপনা, ঋণের আবেদন, বিতরণ এবং পরিশোধ ব্যবস্থাপনা, ঋণের সুদ এবং জরিমানা গণনা, সাধারণ লেজার পোস্টিং, চালান ছাড় ব্যবস্থাপনা বৈশিষ্ট্যগুলি কভার করে।</p>
                    <p className='py-5 text-[14.5px]'> “আইওনিক ইআরপি” বিজনেস ম্যানেজমেন্ট সফটওয়্যার-এ লোন ম্যানেজমেন্ট মডিউল আপনাকে সরাসরি লোন অ্যাপ্লিকেশান থেকে লোন ক্লোজার পর্যন্ত আপনার লোন পরিচালনা করতে সাহায্য করে। আপনি বিতরণ, পরিশোধ, নিরাপত্তা প্রতিশ্রুতি এবং আনপ্লেজিং, ঋণের সুদ সংগ্রহ এবং আরও অনেক কিছু ট্র্যাক করতে পারেন।</p>
                    <p className='text-[14.5px]'>ঐতিহ্যগতভাবে, একটি ঋণ পেতে গ্রাহকদের প্রচুর কাগজপত্র করতে হবে এবং একাধিকবার ঋণদাতাদের অফিসে যেতে হবে। ডিজিটাল ঋণ এটি পরিবর্তন করছে। এখন ঋণদাতারা ঋণগ্রহীতাদের অভিজ্ঞতা উন্নত করতে পুরো প্রক্রিয়াটিকে ডিজিটালাইজ করছে।</p>
                    <p className='py-5 text-[14.5px]'>“আইওনিক ইআরপি” বিজনেস ম্যানেজমেন্ট সফটওয়্যার-এর লোন ম্যানেজমেন্ট মডিউলটি লোন অ্যাপ্লিকেশান, সিকিউরিটি ম্যানেজমেন্ট, অনুমোদন, বিতরণ, সুদ এবং জরিমানা গণনা, পরিশোধ ইত্যাদির বৈশিষ্ট্যগুলি অফার করে।</p>
                   

                    <div className='flex flex-col xl:flex-row justify-center items-center gap-5'>
                        <button className='flex justify-center items-center gap-5 bg-black text-white p-1 rounded px-5 xl:text-[16px] 2xl:text-lg'> <FaWhatsapp />হোয়াটস অ্যাপ চ্যাট</button>
                        <button className='flex justify-center items-center gap-5 bg-[#FF0000] text-white p-1 rounded px-5 xl:text-[16px] 2xl:text-lg'><FaLaptop />ডেমোর জন্য অনুরোধ করুন</button>
                    </div>
                </div>






                    {/* ----------toggle effect--------- */}

        <div>
            {/* First Section */}
            <div>
                <div className="flex items-center pt-10 lg:pt-5">
                    <button
                        onClick={() => setIsVisible1(!isVisible1)}
                        aria-expanded={isVisible1}
                        aria-controls="loan-panel-1"
                        className="mr-2 flex justify-center items-center gap-2 text-black text-[14.5px]"
                    >
                        {isVisible1 ? <FaCircleMinus /> : <FaCirclePlus />}
                        <h1 className="text-xl font-bold ">ঋণদাতা এবং ঋণগ্রহীতা</h1>
                    </button>
                </div>
                {/* Paragraph with transition */}
                <div id="loan-panel-1"
                    className={`mt-2 text-gray-700 overflow-hidden transition-all duration-500 ${
                        isVisible1 ? 'max-h-screen' : 'max-h-0'
                    }`}
                >
                    <p className="py-2 text-[14.5px]">
                    ঋণদাতা হলো সেই টাকা যিনি ঋণ হিসেবে পরিশোধ করছেন। উদাহরণস্বরূপ, একটি ব্যাঙ্ক যেটি একজন বাড়ির ক্রেতাকে ঋণ দিচ্ছে। ঋণগ্রহীতা সেই ব্যক্তি যিনি অর্থ গ্রহণ করছেন। উদাহরণস্বরূপ, একজন ব্যক্তি একটি বাড়ি কিনছেন বা ব্যবসা সম্প্রসারণের জন্য অর্থ ধার করছেন।
                    </p>
                </div>
            </div>

            {/* Second Section */}
            <div>
                <div className="flex items-center">
                    <button
                        onClick={() => setIsVisible2(!isVisible2)}
                        aria-expanded={isVisible2}
                        aria-controls="loan-panel-2"
                        className="mr-2 flex justify-center items-center gap-2 text-black text-[14.5px]"
                    >
                        {isVisible2 ? <FaCircleMinus /> : <FaCirclePlus />}
                        <h1 className="text-xl font-bold">সুরক্ষিত এবং অসুরক্ষিত ঋণ</h1>
                    </button>
                </div>
                {/* Paragraph with transition */}
                <div id="loan-panel-2"
                    className={`mt-2 text-gray-700 overflow-hidden transition-all duration-500 ${
                        isVisible2 ? 'max-h-screen' : 'max-h-0'
                    }`}
                >
                    <p className="py-2 text-[14.5px]">
                    ঋণগ্রহীতার মালিকানাধীন সম্পদের বিপরীতে প্রদত্ত ঋণ একটি সুরক্ষিত ঋণ। উদাহরণস্বরূপ, সোনার মতো মূল্যবান ধাতু বা বাড়ির মতো একটি স্থাবর সম্পদের বিপরীতে দেওয়া ঋণ একটি সুরক্ষিত ঋণ। এই ধরনের সম্পদকে জামানত বলা হয়। ঋণগ্রহীতা ঋণ পরিশোধে ব্যর্থ হলে, ঋণদাতা সম্পদটি তরল করে দেবে এবং ঋণের পরিমাণ পুনরুদ্ধার করবে। যদি ঋণগ্রহীতার কোনো সম্পদের প্রতিশ্রুতি না রেখে ঋণ মঞ্জুর করা হয় যা একটি অনিরাপদ ঋণ হিসাবে পরিচিত। অনিরাপদ ঋণ নিরাপদ ঋণের তুলনায় সহজাতভাবে ঝুঁকিপূর্ণ।
                    </p>
                </div>
            </div>

            {/* Third Section */}
            <div>
                <div className="flex items-center">
                    <button
                        onClick={() => setIsVisible3(!isVisible3)}
                        aria-expanded={isVisible3}
                        aria-controls="loan-panel-3"
                        className="mr-2 flex justify-center items-center gap-2 text-black text-[14.5px]"
                    >
                        {isVisible3 ? <FaCircleMinus /> : <FaCirclePlus />}
                        <h1 className="text-xl font-bold">প্রতিশ্রুতি এবং অনিচ্ছাকৃত</h1>
                    </button>
                </div>
                {/* Paragraph with transition */}
                <div id="loan-panel-3"
                    className={`mt-2 text-gray-700 overflow-hidden transition-all duration-500 ${
                        isVisible3 ? 'max-h-screen' : 'max-h-0'
                    }`}
                >
                    <p className="py-2 text-[14.5px]">
                    যখন জামানতের বিপরীতে একটি ঋণ সুরক্ষিত করা হয়, তখন জামানত বন্ধক রাখা হয়। যখন প্রতিশ্রুতি দেওয়া হয়, সম্পদটি ঋণগ্রহীতার মালিকানাধীন হতে থাকে, কিন্তু ঋণদাতা ঋণ পরিশোধ করতে ব্যর্থ হলে সম্পদটি লিকুইডেট করার এবং ঋণের পরিমাণ পুনরুদ্ধারের আইনি অধিকার থাকবে।
                    </p>
                </div>
            </div>

               {/* 4th Section */}
            <div>
                <div className="flex items-center">
                    <button
                        onClick={() => setIsVisible4(!isVisible4)}
                        aria-expanded={isVisible4}
                        aria-controls="loan-panel-4"
                        className="mr-2 flex justify-center items-center gap-2 text-black text-[14.5px]"
                    >
                        {isVisible4 ? <FaCircleMinus /> : <FaCirclePlus />}
                        <h1 className="text-xl font-bold">চুল কাটার শতাংশ এবং ঋণ থেকে মূল্যের অনুপাত</h1>
                    </button>
                </div>
                {/* Paragraph with transition */}
                <div id="loan-panel-4"
                    className={`mt-2 text-gray-700 overflow-hidden transition-all duration-500 ${
                        isVisible4 ? 'max-h-screen' : 'max-h-0'
                    }`}
                >
                    <p className="py-2 text-[14.5px]">
                    লোন-টু-ভ্যালু রেশিও প্রতিশ্রুতিবদ্ধ জামানতের মূল্যের সাথে ঋণের পরিমাণের অনুপাত প্রকাশ করে। একটি ঋণ নিরাপত্তা ঘাটতি ট্রিগার করা হবে যদি এটি কোনো ঋণের জন্য নির্দিষ্ট মূল্যের নিচে পড়ে।
                    </p>
                    <p className='py-2 text-[14.5px]'>
                    চুল কাটার শতাংশ হল লোন সিকিউরিটির বাজার মূল্য এবং সেই লোনের জামানত হিসাবে ব্যবহার করার সময় সেই লোন সিকিউরিটির জন্য নির্ধারিত মূল্যের মধ্যে শতাংশের পার্থক্য।
                    </p>
                </div>
            </div>

             {/* 5th Section */}
            <div>
                <div className="flex items-center">
                    <button
                        onClick={() => setIsVisible5(!isVisible5)}
                        aria-expanded={isVisible5}
                        aria-controls="loan-panel-5"
                        className="mr-2 flex justify-center items-center gap-2 text-black text-[14.5px]"
                    >
                        {isVisible5 ? <FaCircleMinus /> : <FaCirclePlus />}
                        <h1 className="text-xl font-bold">মেয়াদী ঋণ এবং চাহিদা ঋণ</h1>
                    </button>
                </div>
                {/* Paragraph with transition */}
                <div id="loan-panel-5"
                    className={`mt-2 text-gray-700 overflow-hidden transition-all duration-500 ${
                        isVisible5 ? 'max-h-screen' : 'max-h-0'
                    }`}
                >
                    <p className="py-2 text-[14.5px]">
                    একটি মেয়াদী ঋণের সাথে একটি নির্দিষ্ট পরিশোধের সময়সূচী সংযুক্ত থাকে। যেহেতু একটি চাহিদা ঋণের এই ধরনের কোনো পরিশোধের সময়সূচী নেই এবং ঋণদাতা তার প্রয়োজন অনুযায়ী পরিশোধের জন্য জিজ্ঞাসা করতে পারেন।
                    </p>
                </div>
            </div>
        </div>
            </section>


          <LoanCard/>


        </div>
    );
};

export default Loan;