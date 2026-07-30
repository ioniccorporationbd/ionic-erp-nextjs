import { LuSunDim } from "react-icons/lu";
import { agriculturedata } from "./agriculturedata";
const ionicerpfinal = "/assets/erp/erpnext-integration-final.png";
import SectionTitle from "../shared/SxctionTitle";


const AgricultureCard = () => {
    return (
        <div className="">
               <section className="text-center py-">
               
                <SectionTitle heading={'"আইওনিক ইআরপি" বিজনেস ম্যানেজমেন্ট সফটওয়্যার কৃষি ইআরপি সিস্টেমের ব্যাপক বৈশিষ্ট্য'}/>
                
           
              
            </section>

            <section className="grid xl:grid-cols-3 md:grid-cols-2 px-5 gap-10 pb-5">
                {
                    agriculturedata.map((item, index) =>{
                        return (
                            <div key={index} className="relative bg-white rounded-xl p-5 pl-10 text-justify">
                                <div className="absolute left-0 transform -translate-x-1/2 top-1/2 -translate-y-1/2 text-5xl"><LuSunDim /></div>
                                <h1 className="text-[18.5px] text-center font-bold">{item.module_name}</h1>
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

export default AgricultureCard;