import LeadForm from "@/components/contact/LeadForm";

const Contact = () => {
  return (
    <div>
      <iframe
        title="আইওনিক কর্পোরেশনের অফিসের অবস্থান"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3653.2614811050375!2d90.45120552592653!3d23.702354640618037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b74993c45fad%3A0x4036eaf54121ad53!2sIONIC%20Corporation!5e0!3m2!1sbn!2sbd!4v1720508977665!5m2!1sbn!2sbd"
        className="h-[600px] w-full pt-44"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />

      <div className="mainHome mx-auto flex flex-col justify-center gap-10 bg-[#F3F3F3] text-black lg:mx-[160px] lg:flex-row 2xl:mx-[215px]">
        <section className="pt-10 lg:w-1/2">
          <h1 className="pb-10 text-center text-3xl font-bold text-black">
            গ্রাহক সেবা কেন্দ্র
          </h1>
          <LeadForm variant="page" />
        </section>

        <section className="lg:w-1/2">
          <div className="pt-0 lg:pt-10">
            <h2 className="pb-5 text-center text-3xl font-bold lg:pb-[45px]">
              আমাদের অফিস
            </h2>
            <div className="border bg-white px-5 py-5 text-[#656464]">
              <h3 className="pb-2 text-lg font-semibold text-black">
                অফিসের ঠিকানা
              </h3>
              <ul>
                <li>ঠিকানা: House # 18, Road # 01, Proschim Rayarbag, Jattrabari, Dhaka-1362.</li>
                <li>বিক্রয় প্রতিনিধি : 01958442200</li>
                <li>হিসাব বিভাগ : 01911142320</li>
                <li>ই-মেইল: ioniccorporation@gmail.com</li>
                <li>ওয়েবসাইট : ioniccorporation.com</li>
              </ul>
            </div>

            <div className="border bg-white px-5 py-5 text-[#656464]">
              <h3 className="pb-2 text-lg font-semibold text-black">
                হেল্পলাইন এবং ব্যবসার সময়
              </h3>
              <ul>
                <li>শনিবার থেকে শুক্রবার পর্যন্ত</li>
                <li>সকাল ৯ থেকে সন্ধ্যা ৭ পর্যন্ত</li>
                <li>কাষ্টমার কেয়ার -8801511142320 (হোয়াটসঅ্যাপ)</li>
                <li>(২৪/৭ লাইভ সাপোর্ট)</li>
              </ul>
            </div>

            <div className="mb-10 border bg-white px-5 py-5 text-[#656464]">
              <h3 className="pb-2 text-lg font-semibold text-black">
                যোগাযোগ করুন
              </h3>
              <p className="md:pr-32">
                সপ্তাহের 7 দিন 24 ঘন্টা আমাদের সাপোর্ট পেতে, 01511142320 এই
                (Imo/WhatsApp) নম্বরে কল করুন। এছাড়াও বিস্তারিত জানার জন্য এই
                01958442200 নম্বর ব্যবহার করুন. - ধন্যবাদ
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;
