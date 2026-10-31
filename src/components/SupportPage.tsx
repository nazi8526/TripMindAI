import React, { useState } from 'react';
import { 
  Headphones, 
  Send, 
  Mail, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  HelpCircle, 
  ChevronDown,
  Info,
  ShieldCheck
} from 'lucide-react';

export const SupportPage: React.FC = () => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [department, setDepartment] = useState('عمومی');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'برنامه سفر هوشمند TripMind AI چگونه کار می‌کند؟',
      a: 'برنامه‌ریز ما بر اساس ترکیب مبدأ، بودجه، مدت سفر و علایق شما، مناسب‌ترین جاذبه‌ها و مسیرهای شهری را اولویت‌بندی کرده و برای هر روز سفر، زمان‌بندی دقیق صبح، عصر و شب به همراه پیشنهاد غذای محلی تدوین می‌کند.',
    },
    {
      q: 'آیا برای خواندن نظرات گردشگران نیاز به ثبت‌نام و ساخت حساب کاربری است؟',
      a: 'خیر، تمام اطلاعات ۳۲ شهر توریستی ایران و نظرات نمونه به صورت رایگان، عمومی و بدون نیاز به ثبت‌نام در دسترس همه کاربران قرار دارد.',
    },
    {
      q: 'آیا امکان خرید مستقیم بلیت هواپیما یا رزرو قطعی هتل وجود دارد؟',
      a: 'خیر، سامانه TripMind AI سامانه برنامه‌ریزی هوشمند، راهنمای مسیر و اطلاعات گردشگری است و فروش مستقیم بلیت را انجام نمی‌دهد؛ اما بهترین گزینه‌ها را جهت رزرو به شما معرفی می‌نماید.',
    },
    {
      q: 'چگونه می‌توانم جاذبه یا شهری جدید به این سامانه پیشنهاد دهم؟',
      a: 'می‌توانید از طریق فرم ارتباط با پشتیبانی همین صفحه یا صفحه «ارسال نظر درباره سایت»، نام شهر و جاذبه‌های آن را ارسال کنید تا در بروزرسانی‌های آتی اضافه شوند.',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) newErrors.name = 'لطفاً نام و نام خانوادگی خود را بنویسید.';
    if (!contact.trim()) newErrors.contact = 'لطفاً یک راه ارتباطی (ایمیل یا تلفن) وارد کنید.';
    if (!subject.trim()) newErrors.subject = 'لطفاً موضوع پیام را مشخص کنید.';
    if (!message.trim() || message.trim().length < 10) newErrors.message = 'لطفاً متن پیام را با حداقل ۱۰ کاراکتر درج کنید.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmitted(true);
    setName('');
    setContact('');
    setSubject('');
    setMessage('');
  };

  return (
    <div className="py-8 sm:py-12 bg-[#FAF7F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-[#0F4C3A] border border-emerald-200">
            <Headphones className="w-3.5 h-3.5" />
            <span>مرکز پشتیبانی و ارتباط با مخاطبان</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-[#0F4C3A] tracking-tight">
            ارتباط با پشتیبانی
          </h1>

          <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
            تیم پشتیبانی TripMind AI آماده پاسخگویی به پرسش‌ها، راهنمایی‌های گردشگری و دریافت پیشنهادات همکاری شماست.
          </p>
        </div>

        {/* Demo status alert */}
        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 leading-relaxed flex items-start gap-2.5 max-w-4xl mx-auto">
          <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-black block mb-0.5">وضعیت ارتباط و ارسال پیام:</span>
            <span>
              پیام‌های ارسالی شما در محیط نمایشی مرورگر پردازش و اعتبارسنجی می‌شوند و با راه‌اندازی سرور اختصاصی و پایگاه داده در فاز بعدی به سامانه تیکتینگ متصل خواهند شد.
            </span>
          </div>
        </div>

        {/* 2-Column Split: Form + Info & FAQ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form Column (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-[#E1D7C1]">
            <h2 className="text-xl font-black text-[#0F4C3A] mb-2">
              فرم ارسال پیام به پشتیبانی
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              تمام فیلدهای ستاره‌دار الزامی هستند و همکاران ما در اولین فرصت بررسی خواهند کرد.
            </p>

            {submitted ? (
              <div className="text-center py-10 space-y-4 animate-in fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-slate-900">
                  پیام شما با موفقیت ثبت شد!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  از تماس شما سپاسگزاریم. کد پیگیری پیام به صورت آزمایشی صادر گردید و در سریع‌ترین زمان پیگیری می‌شود.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 px-6 py-2.5 bg-[#0F4C3A] text-white text-xs font-bold rounded-xl hover:bg-[#09382B] transition-colors cursor-pointer"
                >
                  ارسال پیام جدید
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold text-slate-700 block">
                      نام و نام خانوادگی <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="مثال: علیرضا حسینی"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`w-full bg-[#FAF7F2] border rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0F4C3A] ${
                        errors.name ? 'border-rose-400 bg-rose-50/30' : 'border-[#D5CAAF]'
                      }`}
                    />
                    {errors.name && (
                      <span className="text-[11px] font-bold text-rose-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.name}
                      </span>
                    )}
                  </div>

                  {/* Contact */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold text-slate-700 block">
                      ایمیل یا شماره تماس <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="مثال: 09123456789 یا info@domain.com"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      className={`w-full bg-[#FAF7F2] border rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0F4C3A] ${
                        errors.contact ? 'border-rose-400 bg-rose-50/30' : 'border-[#D5CAAF]'
                      }`}
                    />
                    {errors.contact && (
                      <span className="text-[11px] font-bold text-rose-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.contact}
                      </span>
                    )}
                  </div>
                </div>

                {/* Department & Subject */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold text-slate-700 block">
                      واحد مربوطه
                    </label>
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full bg-[#FAF7F2] border border-[#D5CAAF] rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0F4C3A] cursor-pointer"
                    >
                      <option value="عمومی">پشتیبانی عمومی و کاربری</option>
                      <option value="محتوا">محتوای گردشگری و اصلاح اطلاعات شهرها</option>
                      <option value="فنی">پشتیبانی فنی سایت و رفع باگ</option>
                      <option value="همکاری">همکاری تجاری، هتل‌ها و آژانس‌ها</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold text-slate-700 block">
                      موضوع پیام <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="مثال: سوال درباره برنامه سفر به شیراز"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className={`w-full bg-[#FAF7F2] border rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0F4C3A] ${
                        errors.subject ? 'border-rose-400 bg-rose-50/30' : 'border-[#D5CAAF]'
                      }`}
                    />
                    {errors.subject && (
                      <span className="text-[11px] font-bold text-rose-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.subject}
                      </span>
                    )}
                  </div>
                </div>

                {/* Message Text */}
                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-slate-700 block">
                    متن پیام <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={5}
                    placeholder="شرح پیام یا درخواست خود را به طور کامل بنویسید..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={`w-full bg-[#FAF7F2] border rounded-2xl p-3.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0F4C3A] leading-relaxed ${
                      errors.message ? 'border-rose-400 bg-rose-50/30' : 'border-[#D5CAAF]'
                    }`}
                  />
                  {errors.message && (
                    <span className="text-[11px] font-bold text-rose-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.message}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 py-3 px-8 bg-[#0F4C3A] hover:bg-[#09382B] text-white font-black text-sm rounded-xl shadow-md transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4 text-amber-300" />
                  <span>ارسال پیام به پشتیبانی</span>
                </button>

              </form>
            )}
          </div>

          {/* Info & FAQ Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Contact Channels Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E1D7C1] shadow-sm space-y-4">
              <h3 className="text-base font-black text-[#0F4C3A]">
                راه‌های ارتباط مستقیم
              </h3>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DFCD]">
                  <Mail className="w-5 h-5 text-[#0F4C3A] shrink-0 mt-0.5" />
                  <div className="space-y-3 w-full">
                    <div>
                      <span className="font-extrabold text-slate-800 block mb-1">ایمیل سازنده:</span>
                      <a 
                        href="mailto:Nazanin.work2@gmail.com" 
                        className="text-[#0F4C3A] hover:text-[#09382B] font-mono text-sm font-bold underline transition-colors"
                        dir="ltr"
                      >
                        Nazanin.work2@gmail.com
                      </a>
                    </div>

                    {/* Note requested by user */}
                    <div className="p-3 bg-amber-50/90 rounded-xl border border-amber-200 text-xs text-amber-950 leading-relaxed flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-extrabold block mb-0.5 text-slate-900">یادداشت مهم:</span>
                        <span>این سایت صرفاً برای برنامه‌ریزی و دیدن نظرات و مکان‌ها است و امنیت آن صرفاً با AI است.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick FAQs */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E1D7C1] shadow-sm space-y-4">
              <h3 className="text-base font-black text-[#0F4C3A] flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-600" />
                <span>پرسش‌های متداول گردشگران</span>
              </h3>

              <div className="space-y-2">
                {faqs.map((faq, i) => {
                  const isOpen = openFaq === i;
                  return (
                    <div
                      key={i}
                      className="border border-[#EAE3D4] rounded-2xl overflow-hidden"
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : i)}
                        className="w-full text-right p-3.5 bg-[#FAF7F2] hover:bg-stone-100 flex items-center justify-between text-xs font-bold text-slate-800 transition-colors cursor-pointer"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isOpen && (
                        <div className="p-3.5 bg-white text-xs text-slate-600 leading-relaxed border-t border-[#EAE3D4]">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
