import React, { useState } from 'react';
import { 
  BookOpen, 
  Plane, 
  Train, 
  Bus, 
  Car, 
  Calendar, 
  Check, 
  Sparkles, 
  Compass, 
  PhoneCall, 
  ShieldCheck, 
  Sun, 
  CloudSun, 
  CloudRain, 
  Snowflake,
  ArrowLeft
} from 'lucide-react';

interface TravelGuidePageProps {
  onStartPlanning: () => void;
  onExploreDestinations: () => void;
}

export const TravelGuidePage: React.FC<TravelGuidePageProps> = ({
  onStartPlanning,
  onExploreDestinations,
}) => {
  const [selectedSeason, setSelectedSeason] = useState<'spring' | 'summer' | 'fall' | 'winter'>('spring');

  const transports = [
    {
      name: 'هواپیما',
      icon: <Plane className="w-5 h-5 text-sky-700" />,
      speed: 'خیلی سریع (۱ تا ۲ ساعت بین مراکز استان‌ها)',
      cost: 'بالا (لوکس و سریع)',
      comfort: 'عالی',
      flexibility: 'متوسط (وابسته به برنامه پروازی)',
      bestFor: 'مسافت‌های بیش از ۸۰۰ کیلومتر و سفرهای کاری و آخر هفته‌ای',
      pros: ['صرفه‌جویی چشمگیر در زمان', 'کاهش خستگی در سفرهای دوردست', 'سرویس‌دهی فرودگاهی'],
      tip: 'برای شهرهای جنوبی مانند قشم، کیش و چابهار بلیت خود را چند هفته زودتر رزرو کنید.',
    },
    {
      name: 'قطار',
      icon: <Train className="w-5 h-5 text-emerald-700" />,
      speed: 'متوسط (۶ تا ۱۲ ساعت بسته به مسیر)',
      cost: 'اقتصادی و بسیار مناسب',
      comfort: 'بسیار راحت (امکان خوابیدن در کوپه‌ها)',
      flexibility: 'متوسط (ایستگاه‌های مشخص)',
      bestFor: 'سفرهای خانوادگی، مسیرهای کویری، مشهد، تبریز و لرستان',
      pros: ['امنیت بسیار بالا در تمام فصول', 'تماشای مناظر بکر طبیعی از پنجره', 'حس نوستالژیک و جمع‌های خانوادگی'],
      tip: 'قطارهای ۵ ستاره فدک و زندگی تجربه‌ای بسیار لوکس با پذیرایی هتل‌مانند ارائه می‌دهند.',
    },
    {
      name: 'اتوبوس VIP',
      icon: <Bus className="w-5 h-5 text-amber-700" />,
      speed: 'آهسته تا متوسط',
      cost: 'ارزان‌ترین گزینه حمل‌ونقل',
      comfort: 'خوب در مدل‌های صندلی تخت‌خواب‌شو VIP',
      flexibility: 'بسیار بالا (حرکت مداوم در تمام ساعات)',
      bestFor: 'دانشجویان، سفرهای شبانه و شهرهای فاقد راه‌آهن یا فرودگاه',
      pros: ['فراوانی بلیت در تمام روزهای سال', 'صرفه‌جویی در هزینه اقامت شبانه', 'دسترسی به تمام نقاط دوردست'],
      tip: 'برای سفرهای بیش از ۵ ساعت حتماً اتوبوس‌های ۲۵ صندلی تخت‌شو را انتخاب نمایید.',
    },
    {
      name: 'خودرو شخصی',
      icon: <Car className="w-5 h-5 text-stone-700" />,
      speed: 'بسته به رانندگی و توقف‌ها',
      cost: 'مقرون‌به‌صرفه در سفرهای گروهی',
      comfort: 'وابسته به مدل خودرو و راننده',
      flexibility: 'حداکثر آزادی عمل (توقف در هر نقطه دلخواه)',
      bestFor: 'ایرانگردی عمیق، کشف روستاها، جنگل‌های شمال و کویرنوردی',
      pros: ['امکان بردن بار و وسایل کمپینگ', 'توقف در غذاخوری‌های بین‌راهی ناب', 'تغییر مسیر آزادانه'],
      tip: 'پیش از ورود به جاده‌های کوهستانی یا کویری، سلامت ترمزها، تایر و باک بنزین را کنترل کنید.',
    },
  ];

  const seasonsData = {
    spring: {
      title: 'فصل بهار (فروردین تا خرداد)',
      icon: <CloudSun className="w-5 h-5 text-emerald-600" />,
      desc: 'بهترین فصل برای سفر به دامنه‌های سرسبز زاگرس، باغ‌های تاریخی شیراز و آیین کهن گلاب‌گیری کاشان.',
      topCities: ['شیراز (بهشت بهارنارنج)', 'اصفهان (هوای مطبوع بهاری)', 'کاشان (گلاب‌گیری قمصر)', 'سنندج و خرم‌آباد (خروش آبشارها)'],
      tips: 'تعطیلات نوروز معمولاً شلوغ است؛ اردیبهشت ماه طلایی‌ترین زمان سال برای آرامش در سفر است.',
    },
    summer: {
      title: 'فصل تابستان (تیر تا شهریور)',
      icon: <Sun className="w-5 h-5 text-amber-500" />,
      desc: 'فرار از گرمای فلات مرکزی به سمت دامنه‌های خنک سبلان، سهند و استان‌های شمال‌غربی کشور.',
      topCities: ['اردبیل و سرعین (آبگرم‌های شفا)', 'تبریز و کندوان (خنکای مطبوع)', 'ارومیه (دریاچه و دره‌ها)', 'ماسوله و رشت (مه و باران)'],
      tips: 'شب‌های آذربایجان و اردبیل حتی در مردادماه خنک است، بنابراین لباس گرم همراه داشته باشید.',
    },
    fall: {
      title: 'فصل پاییز (مهر تا آبان)',
      icon: <CloudRain className="w-5 h-5 text-orange-600" />,
      desc: 'فصل آرامش، برگ‌ریزان هزاررنگ جنگل‌های هیرکانی، آب‌وهوای ملایم کویر و فصل چیدن زعفران.',
      topCities: ['یزد (آرامش کوچه‌های خشتی)', 'گرگان (پاییز رویایی النگدره)', 'بیرجند (فصل برداشت طلای سرخ)', 'کرمان (کلوت‌های لوت)'],
      tips: 'پاییز خلوت‌ترین و عکاسانه‌ترین فصل سفر به بیشتر شهرهای تاریخی و جنگلی ایران است.',
    },
    winter: {
      title: 'فصل زمستان (آذر تا اسفند)',
      icon: <Snowflake className="w-5 h-5 text-cyan-600" />,
      desc: 'فصل طلایی سواحل گرم خلیج فارس و دریای عمان؛ هوای بهاری جنوب در اوج سرمای سایر مناطق.',
      topCities: ['قشم و هنگام (دلفین‌ها و دره‌ها)', 'کیش (تفریحات آبی و آفتاب)', 'چابهار (هوای همیشه‌بهار اقیانوسی)', 'بوشهر، دزفول و شوش'],
      tips: 'زمستان بهترین زمان برای خوردن قلیه‌ماهی داغ، میگو، و لذت از آفتاب ملایم سواحل جنوب است.',
    },
  };

  return (
    <div className="py-8 sm:py-12 bg-[#FAF7F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#0F4C3A] text-amber-300 shadow-xs">
            <BookOpen className="w-3.5 h-3.5" />
            <span>دانشنامه و تجربیات سفر در ایران</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-[#0F4C3A] tracking-tight">
            راهنمای جامع سفر به ایران
          </h1>

          <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
            از مقایسه وسایل نقلیه و بهترین فصول سفر تا شماره‌های ضروری و نکات حرفه‌ای ایرانگردی.
          </p>
        </div>

        {/* Section 1: مقایسه وسایل نقلیه */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-black text-[#0F4C3A]">
                مقایسه و انتخاب بهترین وسیله نقلیه
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                بررسی زمان، هزینه و راحتی ۴ گزینه اصلی جابه‌جایی در ایران
              </p>
            </div>
            <button
              onClick={onStartPlanning}
              className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-white bg-[#0F4C3A] hover:bg-[#09382B] px-3.5 py-2 rounded-xl transition-colors cursor-pointer shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>طراحی بر اساس وسیله نقلیه من</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {transports.map((t, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-[#E3DAC4] shadow-md hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                    <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] border border-[#D5CAAF] flex items-center justify-center">
                      {t.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-slate-900">{t.name}</h3>
                      <span className="text-[11px] font-bold text-emerald-800">{t.cost}</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="font-extrabold text-slate-700 block">سرعت و زمان:</span>
                      <span className="text-slate-600">{t.speed}</span>
                    </div>
                    <div>
                      <span className="font-extrabold text-slate-700 block">میزان راحتی:</span>
                      <span className="text-slate-600">{t.comfort}</span>
                    </div>
                    <div>
                      <span className="font-extrabold text-slate-700 block">بهترین برای:</span>
                      <span className="text-slate-600 leading-normal">{t.bestFor}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-[11px] font-bold text-slate-800 block mb-1">مزایای کلیدی:</span>
                    <ul className="space-y-1 text-[11px] text-slate-600">
                      {t.pros.map((p, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-amber-100 bg-amber-50/70 p-2.5 rounded-xl text-[11px] text-amber-900 leading-normal">
                  <span className="font-bold">نکته TripMind: </span>
                  {t.tip}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: چهارفصل ایران و بهترین مقاصد */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E1D7C1] shadow-lg space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <h2 className="text-xl sm:text-2xl font-black text-[#0F4C3A]">
              تقویم فصلی سفر در ایران (کجا، کی بریم؟)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              ایران کشوری چهارفصل است؛ در هر ماه از سال می‌توانید آب‌وهوای بهشتی را در نقطه‌ای از آن بیابید.
            </p>
          </div>

          {/* Season Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-w-xl mx-auto">
            {[
              { id: 'spring', label: 'بهار' },
              { id: 'summer', label: 'تابستان' },
              { id: 'fall', label: 'پاییز' },
              { id: 'winter', label: 'زمستان' },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedSeason(s.id as any)}
                className={`py-2.5 px-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                  selectedSeason === s.id
                    ? 'bg-[#0F4C3A] text-white shadow-xs'
                    : 'bg-[#FAF7F2] text-slate-700 hover:bg-stone-200 border border-[#D5CAAF]'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Active Season Detail Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#FAF7F2] border border-[#E5DCBE] space-y-4 animate-in fade-in">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-white shadow-xs border border-slate-200">
                {seasonsData[selectedSeason].icon}
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  {seasonsData[selectedSeason].title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {seasonsData[selectedSeason].desc}
                </p>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-xs font-black text-[#0F4C3A] block mb-2">
                شهرهای پیشنهادی درجه یک برای این فصل:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                {seasonsData[selectedSeason].topCities.map((c, i) => (
                  <div key={i} className="bg-white p-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 shadow-xs">
                    {c}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 bg-white rounded-xl border border-amber-200 text-xs text-amber-900 leading-relaxed">
              <span className="font-bold">توصیه طلایی مسافران: </span>
              {seasonsData[selectedSeason].tips}
            </div>
          </div>
        </div>

        {/* Section 3: شماره‌های اضطراری و نکات ضروری جاده‌ای */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Emergency Numbers */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E1D7C1] shadow-sm space-y-4">
            <h3 className="text-base font-black text-[#0F4C3A] flex items-center gap-2">
              <PhoneCall className="w-5 h-5 text-rose-600" />
              <span>شماره‌های ضروری سفر در سراسر ایران</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              این شماره‌ها در هر نقطه‌ای از کشور به صورت شبانه‌روزی و بدون نیاز به پیش‌شماره پاسخگو هستند:
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-between">
                <span className="font-bold text-slate-800">اورژانس پزشکی:</span>
                <span className="font-mono text-base font-black text-rose-700">۱۱۵</span>
              </div>
              <div className="p-3 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-between">
                <span className="font-bold text-slate-800">پلیس امداد جاده:</span>
                <span className="font-mono text-base font-black text-blue-700">۱۱۰</span>
              </div>
              <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between">
                <span className="font-bold text-slate-800">امداد نجات هلال احمر:</span>
                <span className="font-mono text-base font-black text-amber-800">۱۱۲</span>
              </div>
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                <span className="font-bold text-slate-800">اطلاعات راه‌ها:</span>
                <span className="font-mono text-base font-black text-emerald-800">۱۴۱</span>
              </div>
            </div>
          </div>

          {/* Golden Rules */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E1D7C1] shadow-sm space-y-4">
            <h3 className="text-base font-black text-[#0F4C3A] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>اصول گردشگری مسئولانه و بوم‌گردی</span>
            </h3>
            <ul className="space-y-2 text-xs text-slate-700 leading-relaxed">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>احترام به فرهنگ، پوشش و باورهای بومی مردمان غیور و خونگرم هر استان</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>خرید صنایع‌دستی مستقیم از زنان و استادکاران محلی برای تقویت اقتصاد بومی</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>حفظ محیط زیست و شعار «هیچ ردی جز رد پا به جای نگذاریم» در طبیعت بکر</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>چشیدن غذاهای محلی به جای فست‌فود در رستوران‌های سنتی هر شهر</span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
};
