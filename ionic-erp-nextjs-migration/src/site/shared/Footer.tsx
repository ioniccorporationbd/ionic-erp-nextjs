"use client";
import { GiGraduateCap } from "react-icons/gi";
const logo = "/assets/erp/footerlogo.png";
const home = "/assets/erp/home.png";
const msg = "/assets/erp/message.png";
const msgbubble = "/assets/erp/messageBubble.png";
const smile = "/assets/erp/smile.png";
const speechBubble = "/assets/erp/speech-bubble.png";


const Footer = () => {
    return (
      <div className="bg-[#F9F9F9] ">
          <div className="  md:pt-1 pt-5 2xl:mx-[215px] lg:mx-[160px] mainHome mainerp ">
           

           <section className='flex flex-col justify-center items-center gap-2   pt-5 pb-10'>
               <h1 className=' text-[#898989] font-semibold  text-center'>আইওনিক কর্পোরেশন সাথে অংশীদার হওয়ার ৬ টি কারণ</h1>
               <div className='w-10 h-[3px] bg-[#b3b2b2]'></div>
           </section>
          
           <section className="   grid grid-cols-1 md:grid-cols-3 justify-center items-center  lg:gap-10  md:gap-7 gap-10  footerWidth  ">
               <div className="border bg-[#F7F7F7]  md:h-[350px]   footerCard   flex flex-col justify-center items-center p-2 mx-[2px]">
                   <p className=" ">
                   <img className="w-12 md:-mt-5 mt-4" src={speechBubble} alt="" />
                   </p>
                   <h1 className="py-3 font-bold text-xl">দ্রুত প্রতিক্রিয়া</h1>
                   <p className="text-center text-[#898989] text-[16px]">বিক্রয়ের পরে, আপনি যদি কোনও সমস্যার সম্মুখীন হন তবে আমরা দ্রুত পরিচালনা করতে পারি এবং রিমোটের মাধ্যমে সমস্যার প্রশ্নগুলি সমাধান করতে সহায়তা দিতে পারি। আমাদের মাল্টিচ্যানেল সাপোর্ট সিস্টেমের সাহায্যে আমরা দীর্ঘক্ষণ অপেক্ষা না করে এবং আপনার অবস্থানে ভ্রমণ না করে অবিলম্বে যেকোনো সমস্যা সমাধান করতে পারি।</p>
               </div>
               <div className="border bg-[#F7F7F7]  md:h-[350px]  footerCard   flex flex-col justify-center items-center p-2 pb-20 py-5 mx-1">
                   <p className=" ">
                       <GiGraduateCap className="text-[#2196F3] text-6xl" />
                   </p>
                   <h1 className="py-3 font-bold text-xl">অভিজ্ঞ পেশাদার</h1>
                   <p className="text-center text-[#898989] text-[16px] flex-grow">আমরা বিগত 14+ বছর ধরে 100+ অভিজ্ঞ ইআরপি ব্রেইনের সাথে ইআরপি সলিউশন পরিবেশন করে আসছি এবং প্রযুক্তি, শিল্প এবং অ্যাপ্লিকেশন প্রকারের বিস্তৃত বর্ণালী সহ বিশ্ব বাজারের প্রয়োজনীয়তা পূরণ করছি।</p>
               </div>
               <div className="border bg-[#F7F7F7]  md:h-[350px]  footerCard   flex flex-col justify-center items-center p-2 pb-16 mx-[2px]">
                   <p className="text-5xl text-black ">
                   <img className="w-14 pt-5" src={msgbubble} alt="" />
                   </p>
                   <h1 className="py-3 font-bold text-xl">কোন গীক কথা না</h1>
                   <p className="text-center text-[#898989] text-[16px]">আপনি আপনার প্রশ্নগুলি সরল সহজ যোগাযোগে উত্তর পাওয়ার যোগ্য। আমাদের পরামর্শদাতা এবং বিকাশকারীরা কী ঘটছে তা স্পষ্টভাবে ব্যাখ্যা করবে যাতে আপনি সমস্ত জিনিস খুব সহজেই বুঝতে পারেন এবং মূল্যবান অন্তর্দৃষ্টিগুলি জানেন৷</p>
               </div>
               <div className="border bg-[#F7F7F7]  md:h-[350px]  footerCard   flex flex-col justify-center items-center p-2 pb-24 mx-[2px]">
                   <p className="text-5xl text-black ">
                   <img className="w-14 pt-5" src={msg} alt="" />
                   </p>
                   <h1 className="py-3 font-bold text-xl">ব্যবসা কাণ্ডজ্ঞান</h1>
                   <p className="text-center text-[#898989] text-[16px]">আমরা আপনার প্রতিষ্ঠানের জন্য ব্যবসায়িক সুবিধার পুঙ্খানুপুঙ্খ বোঝার থেকে "IONIC ERP" সিস্টেম ডিজাইন, মূল্যায়ন এবং ন্যায়সঙ্গত করি। এটি আপনার দৈনন্দিন ক্রিয়াকলাপকে সহজ করতে সহায়তা করে।</p>
               </div>
               <div className="border bg-[#F7F7F7]  md:h-[350px]  footerCard   flex flex-col justify-center items-center p-2 pb-20 py-8 mx-[2px] ">
                   <p className="">
                   <img className="w-14 pt-1" src={home} alt="" />
                   </p>
                   <h1 className="py-3 font-bold text-xl">ওয়ান স্টপ শপ</h1>
                   <p className="text-center text-[#898989] text-[16px] flex-grow">আমরা ইআরপি সফ্টওয়্যারের সমস্ত দিক পরিচালনা করি যা আপনার ব্যবসায়িক কর্মক্ষমতা যেমন ইআরপি ডেভেলপমেন্ট, ইআরপি কাস্টমাইজেশন, ইআরপি প্রশিক্ষণ এবং অন্য যেকোন সম্পর্কিত ইআরপি চাহিদা বাড়াতে সহায়ক হতে পারে।</p>
               </div>
               <div className="border bg-[#F7F7F7]  md:h-[350px]  footerCard   flex flex-col justify-center items-center p-2 pb-14 mx-[2px]">
                   <p className="">
                   <img className="w-14 pt-5" src={smile} alt="" /></p>
                   <h1 className="py-3 font-bold text-xl">100% সন্তুষ্টি গ্যারান্টি</h1>
                   <p className="text-center text-[#898989] text-[16px]">আমরা চাই আপনি আমাদের "ERP" সিস্টেম সলিউশনের সাথে সম্পূর্ণ সন্তুষ্ট হন। আমরা আপনার সমস্ত "ERP" সম্পর্কিত উদ্বেগগুলি পরিচালনা করব, যাতে আপনি শান্তভাবে আপনার ব্যবসা পরিচালনা করতে পারেন। কোন ঝামেলা নেই, কোন সমস্যা নেই।</p>
               </div>
           </section>


           <section className="text-[#7d7d7d] footerText mx-auto lg:px-0 px-2">
               <div className="flex flex-col justify-center items-center pt-">
                   <h1 className="text-xl font-bold text-black pt-10 pb-5">আমাদের সাথে আইটির যাত্রা শুরু করুন</h1>
                   <div className="text-center my-2">
                       <button className="" onClick={() => window.dispatchEvent(new Event("open-contact-dialog"))}>  <p className="bg-[#FF0000] text-white rounded-full p-2 text-[16px]  font-bold  px-5 mb-5 ">
                           অনুরোধ করুন
                       </p>
                       </button>
                   </div>
                   <p className="text-center pb-5">যখন আপনার ব্যবসার জন্য এন্টারপ্রাইজ রিসোর্স প্ল্যানিং সফ্টওয়্যার বাস্তবায়নের কথা আসে। আপনার একজন বিশেষজ্ঞ প্রয়োজন। আসুন আমরা আপনাকে দেখাই যে <br /> কোনটি সম্পূর্ণ, বহুমুখী এবং শক্তিশালী ইআরপি সলিউশনটি সফল প্রতিষ্ঠানের মত দেখায়।</p>
                   <br />
                   <p className="text-center pb-10">শুধুমাত্র একটির পরিবর্তে বিভিন্ন সফ্টওয়্যারে সময় এবং অর্থ অপচয় করা বন্ধ করুন। আমাদের কোম্পানি অন্বেষণ করুন- IONIC Corporation.</p>

                   <div className="flex lg:flex-row flex-col gap-10 pb-5 py-">
                       <div >
                           <h1 className="text-center text-xl font-bold">আপনি কি আপনার ব্যবসা পরিচালনার জন্য প্রস্তুত?</h1>
                           <p className="text-center text-lg">আপনার মোবাইল ফোন নম্বরটি রেখে দিন, আমরা আপনাকে কল করব।</p>
                       </div>
                       <div className="text-center my-2  ">
                       <button className="" onClick={() => window.dispatchEvent(new Event("open-contact-dialog"))}>  <p className="bg-[#FF0000] text-white rounded-full p-2 text-[16px]  font-bold  px-5 mb-5 ">
                           অনুরোধ করুন
                       </p>
                       </button>
                   </div>
                       <div className="text-center text-lg">
                           <p className="text-center">অনুগ্রহ করে আমাকে কল করুন</p>
                           <p className="text-black font-bold text-2xl">01958 44 22 00</p>
                       </div>
                   </div>


                   <div className="px-2 ">
                       <div className="flex flex-col justify-center items-center py-5 text-sm text-center">
                           <h1 className="text-center text-lg font-bold pb-3">আইওনিক কর্পোরেশন এর পণ্য/সেবা সমূহ</h1>
                           <p className="text-center pb-3">বাংলাদেশের এক নম্বর ক্যাটাগরির স্কুল, হাসপাতাল, ফার্মা, রেস্তোরাঁ, সেলুন, ট্রাভেল এজেন্সি, মেরামতের দোকান, দর্জির দোকান, ভাড়া ব্যবসা, ইআরপি, একাউন্ট <br /> ব্যবস্থাপনা সহ এবং যে কোন ব্যবসা ব্যবস্থাপনার সফটওয়্যার কোম্পানি আইওনিক কর্পোরেশন।</p>
                           <p className="text-center ">
                           IONIC ERP তৈরিতে বিশ্বের সেরা ফ্রি এবং ওপেনসোর্স সফটওয়্যার "পাইথন প্রোগ্রামিং ভাষা" ব্যবহার করা হয়েছে। Frappe Framework হল বিশ্বের সেরা ফ্রি এবং ওপেনসোর্স ইআরপি সফটওয়্যার Framework. আইওনিক ইআরপি তৈরিতে ব্যবহার করা হয়েছে "Frappe Framework"। বাংলাদেশের জন্য স্থানীয়করণ এবং ক্লাউড হোস্ট সেবা, ট্রেনিং সেবা এবং সহায়ক হিসাবে কাজ করে- আইওনিক কর্পোরেশন।
                           </p>


                           <img className="w-60 py-8" src={logo} alt="" />

                           <p>House # 18, Road # 01, Proschim Rayarbag, Jattrabari, Dhaka-1362.</p>
                           <p>Email : ioniccorporation@gmail.com, Website: www.ioniccorporation.com</p>
                           <p>Office No: 8801911142320</p>

                           <p className="text-center">Sales Line -8801958442200 (WhatsApp) <br />
                           Customer Care -8801511142320 (WhatsApp) (24/7 Live Support)</p>


                           <p className="pt-10 text-[12px]">The "Frappe" Code is Licensed As GNU General Public License (v3) And The Documentation is Licensed As Creative Commons (CC-BY-SA-3.0) And The Copyright is Owned By IONIC Corporation. <a href="https://basis.org.bd/company-profile/23-01-033">(Member of BASIS-GE-23-01-033)</a>.</p>
                       </div>
                   </div>
               </div>
           </section>
           
       </div>
      </div>
    );
};

export default Footer;