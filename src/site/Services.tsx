// import consulting from '../../assets/karmochary/consulting.jpg';
const consulting = "/assets/erp/consulting.jpg";
const development = "/assets/erp/development.jpg";
const customization = "/assets/erp/customization.jpg";
const implementation = "/assets/erp/implementation.jpg";
const support = "/assets/erp/support.jpg";
const training = "/assets/erp/training.jpg";
import SectionTitle from './shared/SxctionTitle';



interface ServicesProps {
    readonly title: React.ReactNode;
    readonly subTitle: React.ReactNode;
}

const Services = ({title, subTitle}: ServicesProps) => {
    return (
        <div className='pt-36 2xl:mx-[215px] lg:mx-[160px] mainHome'>
          
                
            <SectionTitle heading={title} subheading={subTitle}/>
       

            <section className='grid md:grid-cols-3 gap-10 py-10'>
                {/* Consulting */}
                <div className='relative group rounded-2xl overflow-hidden'>
                    <div 
                        className='h-[200px] bg-cover bg-center transition-transform duration-300 ease-in-out transform group-hover:scale-105'
                        style={{
                            backgroundImage: `url(${consulting})`,
                        }}
                    ></div>
                    <div className='absolute inset-0 bg-black opacity-30 rounded-2xl transition-opacity duration-300 ease-in-out group-hover:opacity-60'></div>
                    <div className='absolute inset-0 flex items-center justify-center'>
                        <div className='text-white text-3xl uppercase'>পরামর্শ</div>
                    </div>
                </div>

                {/* Development */}
                <div className='relative group rounded-2xl overflow-hidden'>
                    <div 
                        className='h-[200px] bg-cover bg-center transition-transform duration-300 ease-in-out transform group-hover:scale-105'
                        style={{
                            backgroundImage: `url(${development})`,
                        }}
                    ></div>
                    <div className='absolute inset-0 bg-black opacity-30 rounded-2xl transition-opacity duration-300 ease-in-out group-hover:opacity-60'></div>
                    <div className='absolute inset-0 flex items-center justify-center'>
                        <div className='text-white text-3xl uppercase'>ডেভেলপমেন্ট</div>
                    </div>
                </div>

                {/* Customization */}
                <div className='relative group rounded-2xl overflow-hidden'>
                    <div 
                        className='h-[200px] bg-cover bg-center transition-transform duration-300 ease-in-out transform group-hover:scale-105'
                        style={{
                            backgroundImage: `url(${customization})`,
                        }}
                    ></div>
                    <div className='absolute inset-0 bg-black opacity-30 rounded-2xl transition-opacity duration-300 ease-in-out group-hover:opacity-60'></div>
                    <div className='absolute inset-0 flex items-center justify-center'>
                        <div className='text-white text-3xl uppercase'>কাস্টমাইজেশন</div>
                    </div>
                </div>

                {/* Implementation */}
                <div className='relative group rounded-2xl overflow-hidden'>
                    <div 
                        className='h-[200px] bg-cover bg-center transition-transform duration-300 ease-in-out transform group-hover:scale-105'
                        style={{
                            backgroundImage: `url(${implementation})`,
                        }}
                    ></div>
                    <div className='absolute inset-0 bg-black opacity-30 rounded-2xl transition-opacity duration-300 ease-in-out group-hover:opacity-60'></div>
                    <div className='absolute inset-0 flex items-center justify-center'>
                        <div className='text-white text-3xl uppercase'>ইম্পিমেন্টেশন</div>
                    </div>
                </div>

                {/* Support */}
                <div className='relative group rounded-2xl overflow-hidden'>
                    <div 
                        className='h-[200px] bg-cover bg-center transition-transform duration-300 ease-in-out transform group-hover:scale-105'
                        style={{
                            backgroundImage: `url(${support})`,
                        }}
                    ></div>
                    <div className='absolute inset-0 bg-black opacity-30 rounded-2xl transition-opacity duration-300 ease-in-out group-hover:opacity-60'></div>
                    <div className='absolute inset-0 flex items-center justify-center'>
                        <div className='text-white text-3xl uppercase'> সাপোর্ট</div>
                    </div>
                </div>

                {/* Training */}
                <div className='relative group rounded-2xl overflow-hidden'>
                    <div 
                        className='h-[200px] bg-cover bg-center transition-transform duration-300 ease-in-out transform group-hover:scale-105'
                        style={{
                            backgroundImage: `url(${training})`,
                        }}
                    ></div>
                    <div className='absolute inset-0 bg-black opacity-30 rounded-2xl transition-opacity duration-300 ease-in-out group-hover:opacity-60'></div>
                    <div className='absolute inset-0 flex items-center justify-center'>
                        <div className='text-white text-3xl uppercase'>প্রশিক্ষণ</div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Services;
