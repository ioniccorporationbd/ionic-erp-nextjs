"use client";
// import logo from '../../../../assets/logo.png'
const basis = "/assets/erp/basis.svg";
const logo = "/assets/erp/ionic-corporation-logo.png";
const ionicErpLogo = "/assets/erp/ionic-erp-logo.png";
import { FaAngleDown, FaAngleRight } from 'react-icons/fa';
import Link from "next/link";
import { useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
const fixedImg = "/assets/erp/erpfixed.png";
import Fixed from '../../site/shared/Fixed';
import { routes } from "@/lib/routes";


const NavbarErp = () => {

  const [open1, setOpen1] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false);

  const closeDrawer = () => {
    setDrawerOpen(false);
    const drawer = document.getElementById("my-drawer-3");
    if (drawer instanceof HTMLInputElement) {
      drawer.checked = false;
    }
  };

    return (
        <div className='fixed    max-w-[1920px] mx-auto w-full bg-white z-20 '>

         {/* gray section */}


            <section className="lg:flex justify-center items-center bg-black hidden">
                <p className="text-[12px] text-white py-1">
                বাংলাদেশে প্রথমবার সবচেয়ে সহজ ও নির্ভূল ব্যবসা পরিচালনার জন্য বিলিং ও একাউন্টিং সিস্টেম কে পেপারলেস ও অটোমেশন করতে, ১০০০+ এর অধিক ব্যবসা পরিচালনার মডিউল বিদ্যমান আছে “আইওনিক ইআরপি”-র মধ্যে।
                </p>
            </section>




            {/* main navbarErp */}




            <section className=" bg-white  lg:pb-2 pb-5 lg:mx-[160px] 2xl:mx-[215px]  mainHome mainerp ">
            <div className="drawer navWidth mx-auto ">
  <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col">
    {/* NavbarErp */}
    <div className="navbar px-0 w-full flex justify-evenly md:justify-between items-center max-w-[1920] mx-auto ">
      <div className="flex-none lg:hidden">
        <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost  md:ml-4 -ml-14 mt-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-6 w-6 stroke-current">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </label>
      </div>




      <Link href={routes.home}>
      <div className=" flex-1 ">
        <img className='2xl:w-[140px] lg:w-[90px] xl:w-[120px] w-[140px] -ml-5 pt-4 md:pt-0 md:ml-0' src={ionicErpLogo} alt="" />
      </div>
      </Link>

        <div className='lg:block hidden'>
            <ul className='flex justify-center items-center gap-2'>
              <Link href={routes.home}>
                <li className='2xl:text-[17px] xl:text-[16px] text-[14px] lg:text-[12px] font-bold'>হোম <span className='opacity-30'>|</span> </li>
              </Link>
              <a href='https://ioniccorporation.com/'>
              <li className='2xl:text-[17px] xl:text-[16px] text-[14px] lg:text-[12px] font-bold'>কোম্পানি <span className='opacity-30'>|</span> </li>
              </a>
                <li className='flex justify-center items-center 2xl:text-[17px] xl:text-[16px] text-[14px] lg:text-[12px] font-bold cursor-pointer group relative'>শিল্প খাত সমূহ<span className='flex justify-center items-center gap-1 opacity-30'><FaAngleDown /> |</span>
                        <ul className='group-hover:block hidden absolute xl:top-6 lg:top-5 left-0 bg-white w-56 p-5 font-normal text-base z-50'>
                          <Link href={routes.manufacturing}>
                            <li className='py-1'>ম্যানুফ্যাকচারিং ইন্ডাস্ট্রিজ</li>
                          </Link>
                          <Link href={routes.healthcare}>
                            <li className='py-1'>স্বাস্থ্যসেবা</li>
                          </Link>
                          <Link href={routes.trading}>
                            <li className='py-1'>ট্রেডিং ব্যবসা</li>
                          </Link>
                          <Link href={routes.chemical}>
                            <li className='py-1'>রাসায়নিক শিল্প</li>
                          </Link>
                          
                          <Link href={routes.loan}>
                            <li className='py-1'>ঋণ ব্যবস্থাপনা</li>
                          </Link>
                          <Link href={routes.agriculture}>
                            <li className='py-1'>কৃষি ব্যবস্থাপনা</li>
                          </Link>
                        </ul>
                
                </li>
               
                <Link href={routes.services}>
                <li className='2xl:text-[17px] xl:text-[16px] text-[14px] lg:text-[12px] font-bold'>সেবা সমূহ <span className='opacity-30'>|</span></li>
                </Link>    
                <Link href={routes.tutorial}>
                <li className='2xl:text-[17px] xl:text-[16px] text-[14px] lg:text-[12px] font-bold'>টিউটোরিয়াল <span className='opacity-30'>|</span></li>
                </Link>

                <Link href={routes.contact}>
                <li className='2xl:text-[17px] xl:text-[16px] text-[14px] lg:text-[12px] font-bold'>যোগাযোগ </li>
                </Link>

            
               
            </ul>
        </div>
    
      <div className="hidden md:flex justify-center items-center">
        
          {/* NavbarErp menu content here */}

          <a href='https://ioniccorporation.com/'>
          <img className='2xl:w-[140px] lg:w-[90px] xl:w-[120px] w-36 pb-1' src={logo} alt="" />
          </a>
          <a href="https://basis.org.bd/company-profile/23-01-033">
        
          <img className='2xl:w-[140px] lg:w-[90px] xl:w-[120px] w-32 ml-5 mr-1' src={basis} alt="" />
          </a>
        
      </div>

    
     
    </div>
    {/* Page content here */}
    {/* Content */}
  </div>
 
 
                      {/* -------------------------side bar----------------------- */}
 
 
 
 
 
                      <div className={`drawer-side z-50 ${drawerOpen ? 'open' : ''}`}>
                      <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay "   onClick={() => setDrawerOpen(false)}></label>
    <ul className="menu bg-white min-h-full w-80 p-0 text-black text-lg  ">
      {/* Sidebar content here */}
    
  
      <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay flex justify-end items-center gap-1 text-xl font-semibold p-3"> <RxCross1 /> বন্ধ</label>
  
     
  <hr />


 




  <p className='text-xl font-semibold bg-[#F5F5F5] py-4 text-center border-b-[#FF0020]'>মেনু</p>

      <Link href={routes.home} onClick={closeDrawer}>
      <li className='py-3  font-semibold text-[#FF0020]'><span>হোম </span></li>
      </Link>
      <hr />
      <a href='https://ioniccorporation.com/'>
      <li className='py-3  font-semibold text-[#FF0020]'><span>কোম্পানি </span></li>
      </a>
      <hr />
    
      <li><div className='flex justify-between h-14 font-semibold pr-0 hover:bg-white'> <p className=' w-full'>শিল্প খাত সমূহ
      </p><p onClick={()=>setOpen1(!open1)}>{open1?<FaAngleDown  className='bg-[#FF0000] text-white h-full text-[57px] p-4 font-light border ' />:<FaAngleRight className='text-[56px]  font-light border p-4 '/>}</p>  </div>
      <hr className='p-0' />

      {open1 && <>
        <Link href={routes.manufacturing} onClick={closeDrawer}>
    
        <li className='h-14 flex justify-center font-medium w-full'>ম্যানুফ্যাকচারিং ইন্ডাস্ট্রিজ</li>

        </Link>
        <hr className='p-0'/>
        <Link href={routes.healthcare} onClick={closeDrawer}>
        <li className='h-14 flex justify-center font-medium w-full'>  স্বাস্থ্যসেবা</li>
        </Link>
        <hr className='p-0'/>
      
        <Link href={routes.trading} onClick={closeDrawer}>
        <li className='h-14 flex justify-center font-medium w-full'>ট্রেডিং ব্যবসা</li>
        </Link>
       
        <hr className='p-0'/>
        <Link href={routes.chemical} onClick={closeDrawer}>
        <li className='h-14 flex justify-center font-medium w-full'>রাসায়নিক শিল্প</li>
        </Link>
       
        <hr className='p-0'/>
        <Link href={routes.loan} onClick={closeDrawer}>
        <li className='h-14 flex justify-center font-medium w-full'> ঋণ ব্যবস্থাপনা</li>
        </Link>
      
        <hr className='p-0'/>
        <Link href={routes.agriculture} onClick={closeDrawer}>
        <li className='h-14 flex justify-center font-medium w-full'> কৃষি ব্যবস্থাপনা</li>
        </Link>
        <hr className='p-0'/>
      </>}
      
      </li>
    
   
      
  
      
  


    
      <Link href={routes.tutorial} onClick={closeDrawer}>
      <li><span className='flex justify-between h-14 font-semibold pr-0 hover:bg-white '> টিউটোরিয়াল </span></li>
      </Link>
      <hr />


    
      
      <hr />
    </ul>
  </div>
</div>
            </section>



            {/* black part */}


            <section className="bg-black h-1    shadowCustom  ">   </section>
           <Fixed backgroundColor={'bg-black'} fixedImg={fixedImg}/>
           
        </div>
    );
};

export default NavbarErp;
