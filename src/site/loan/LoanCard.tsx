import { LuSunDim } from "react-icons/lu";
import { loandata } from "./loanData";
const ionicerpfinal = "/assets/erp/erpnext-integration-final.png";
import SectionTitle from "../shared/SxctionTitle";


const LoanCard = () => {
    return (
        <div className="">
               <section className="text-center py-5">
                <h1 className="text-2xl font-bold "></h1>
           
              
            </section>
            <SectionTitle heading={'ঋণ ব্যবস্থাপনা "আইওনিক ইআরপি" বিজনেস ম্যানেজমেন্ট সফটওয়্যার ইআরপি সিস্টেমের ব্যাপক বৈশিষ্ট্য'}/>

            <section className="grid lg:grid-cols-3 md:grid-cols-2 px-5 lg:px-0 gap-5 lg:gap-10 py-5">
                {
                    loandata.map((item, index) =>{
                        return (
                            <div key={index} className="relative bg-white rounded-xl p-5 pl-10 text-justify">
                                <div className="absolute left-0 transform -translate-x-1/2 top-1/2 -translate-y-1/2 text-5xl"><LuSunDim /></div>
                                <h1 className="text-[17.5px] font-bold text-center py-5">{item.module_name}</h1>
                                <p className="text-[14.5px]">{item.description}</p>
                            </div>
                        )
                    })
                }
            </section>

            <img className="pb-5" src={ionicerpfinal} alt="" />
            
        </div>
    );
};

export default LoanCard;