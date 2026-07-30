"use client";

import { usePathname } from "next/navigation";

interface FixedProps {
  readonly backgroundColor: string;
  readonly fixedImg: string;
}

const Fixed = ({ backgroundColor, fixedImg }: FixedProps) => {
  const pathname = usePathname();
  const usesErpMargins = [
    "/",
    "/manufacturing-industry-ionic-erp-software",
    "/healthcare",
  ].includes(pathname);

  return (
    <div
      className={`mainHome right-0 top-0 z-20 -mt-[18px] flex justify-center gap-3 lg:fixed lg:mx-[160px] lg:mt-[84px] lg:justify-end 2xl:mx-[215px] 2xl:mt-[92px] ${
        usesErpMargins ? "mainerp" : ""
      }`}
    >
      <p
        className={`${backgroundColor} hidden p-1 px-3 text-center text-[16px] font-semibold text-white md:block`}
      >
        কাষ্টমার কেয়ার : 01511142320
      </p>
      <div
        className={`${backgroundColor} relative p-1 px-3 text-center text-[16px] font-semibold text-white`}
      >
        বিক্রয় প্রতিনিধি : 01958442200

        <aside className="absolute top-32 hidden lg:right-[-145px] lg:block xl:right-[-155px] 2xl:right-[-190px]">
          <div className="lg:w-[138px] xl:w-[150px] 2xl:w-auto">
            <img src={fixedImg} alt="" />
          </div>
          <div className="-mt-[4px] rounded-2xl bg-gradient-to-b from-[#777797] to-black lg:w-[138px] xl:w-[150px]">
            <h2 className="rounded-t-xl bg-[#FF0000] p-[10px] text-center font-bold text-white lg:text-[14px] xl:text-[16px]">
              রিসোর্স প্ল্যানিং করতে
            </h2>
            <p className="px-1 pt-5 text-center text-sm lg:pb-2 lg:text-[11px] xl:pb-4 xl:text-sm">
              যখন আপনার ব্যবসার জন্য এন্টারপ্রাইজ রিসোর্স প্ল্যানিং সফ্টওয়্যার
              বাস্তবায়নের কথা চিন্তায় আসে?
            </p>
            <p className="px-1 text-center text-xs leading-6 text-[#c8ff32] xl:pb-2 xl:text-[16px]">
              আপনার ব্যবসা এন্টারপ্রাইজ রিসোর্স প্ল্যানিং প্রস্তুত করতে।
            </p>
            <p className="pt-2 font-bold 2xl:text-lg">আমাকে কল করুন</p>
            <p className="number pb-2 font-extrabold text-[#c8ff32] lg:text-[19px]">
              01958442200
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Fixed;
