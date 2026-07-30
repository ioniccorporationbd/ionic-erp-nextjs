
const python = "/assets/erp/Python-Logo-2048x1152.png";
const frappe = "/assets/erp/frappe-framwork.png";
const javascript = "/assets/erp/JavaScript-JS.png";
const react = "/assets/erp/React.png";
const redux = "/assets/erp/REDUX.png";
const firebase = "/assets/erp/Firebase.png";
const plesk = "/assets/erp/plesk.png";
const ubuntu = "/assets/erp/ubonto-logo.jpg";
const ionos = "/assets/erp/ionos-logo.jpg";
const debian = "/assets/erp/debian.png";
const nginx = "/assets/erp/nginx.png";
const apache = "/assets/erp/apache.png";
const figma = "/assets/erp/figma.jpg";
const wordpress = "/assets/erp/wordpress-logo.jpg";
const flutter = "/assets/erp/flutter.png";
const andriod = "/assets/erp/Android-logo.jpg";
const swift = "/assets/erp/swift-1.png";
const native = "/assets/erp/react-native.jfif";
interface TechnologiesProps {
    readonly heading?: React.ReactNode;
    readonly subheading?: React.ReactNode;
}

const Technologies = (props: TechnologiesProps) => {
    void props;
    return (
        <div className='pb-5 -mt-12 technology '>
              <section className='flex flex-col justify-center items-center gap-2 mt-16 '>
                <h1 className=' text-[#898989] font-semibold  text-center'>আমাদের সফটওয়্যার এর ব্যবহৃত টেকনোলজি সমূহ</h1>
                <div className='w-10 h-[3px] bg-[#b3b2b2]'></div>
            </section>

           
            <section className="lg:grid-cols-6 grid grid-cols-3 items-center  justify-center gap-5 pt-3 mt-5 bg-white  rounded-lg ">
                <div className="flex flex-col justify-center items-center    p-4 hover:scale-105">
                    <img className="w-24 pb-5" src={python} alt="" />
                </div>
                <div className="flex flex-col justify-center items-center    p-4 hover:scale-105">
                    <img className="w-24 pb-5" src={frappe} alt="" />
                </div>
                <div className="flex flex-col justify-center items-center    p-4 hover:scale-105">
                    <img className="w-24 pb-5" src={javascript} alt="" />
                </div>
                <div className="flex flex-col justify-center items-center    p-4 hover:scale-105">
                    <img className="w-24 pb-5" src={react} alt="" />
                </div>
                <div className="flex flex-col justify-center items-center    p-4 hover:scale-105">
                    <img className="w-24 pb-5" src={redux} alt="" />
                </div>
                <div className="flex flex-col justify-center items-center    p-4 hover:scale-105">
                    <img className="w-24 pb-5" src={firebase} alt="" />
                </div>
                <div className="flex flex-col justify-center items-center    p-4 hover:scale-105">
                    <img className="w-24 pb-5" src={plesk} alt="" />
                </div>
                <div className="flex flex-col justify-center items-center    p-4 hover:scale-105">
                    <img className="w-24 pb-5" src={ubuntu} alt="" />
                </div>
                <div className="flex flex-col justify-center items-center    p-4 hover:scale-105">
                    <img className="w-24 pb-5" src={ionos} alt="" />
                </div>
                <div className="flex flex-col justify-center items-center    p-4 hover:scale-105">
                    <img className="w-24 pb-5" src={debian} alt="" />
                </div>
                <div className="flex flex-col justify-center items-center    p-4 hover:scale-105">
                    <img className="w-24 pb-5" src={nginx} alt="" />
                </div>
                <div className="flex flex-col justify-center items-center    p-4 hover:scale-105">
                    <img className="w-24 pb-5" src={apache} alt="" />
                </div>
                <div className="flex flex-col justify-center items-center    p-4 hover:scale-105">
                    <img className="w-24 pb-5" src={figma} alt="" />
                </div>
                <div className="flex flex-col justify-center items-center    p-4 hover:scale-105">
                    <img className="w-24 pb-5" src={wordpress} alt="" />
                </div>
                <div className="flex flex-col justify-center items-center    p-4 hover:scale-105">
                    <img className="w-24 pb-5" src={flutter} alt="" />
                </div>
                <div className="flex flex-col justify-center items-center    p-4 hover:scale-105">
                    <img className="w-24 pb-5" src={andriod} alt="" />
                </div>
                <div className="flex flex-col justify-center items-center    p-4 hover:scale-105">
                    <img className="w-24 pb-5" src={swift} alt="" />
                </div>
                <div className="flex flex-col justify-center items-center    p-4 hover:scale-105">
                    <img className="w-24 pb-5" src={native} alt="" />
                </div>
               
              
          
              
          

            </section>
            
        </div>
    );
};

export default Technologies;
