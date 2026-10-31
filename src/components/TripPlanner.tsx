import React, { useState } from 'react';
import { CityData, CITIES_DATA } from '../data/citiesData';
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  Coins, 
  Heart, 
  Car, 
  Plane, 
  Train, 
  Bus, 
  Check, 
  Clock, 
  ArrowLeft, 
  Download, 
  Printer, 
  RefreshCw, 
  Utensils, 
  Bed, 
  Compass, 
  Info,
  CheckCircle2
} from 'lucide-react';

interface TripPlannerProps {
  initialOrigin?: string;
  initialDuration?: string;
  initialBudget?: string;
  initialInterest?: string;
  targetCity?: CityData | null;
  onSelectCityDetail: (city: CityData) => void;
}

export const TripPlanner: React.FC<TripPlannerProps> = ({
  initialOrigin = 'تهران',
  initialDuration = '۴ روز',
  initialBudget = 'متوسط (۵ تا ۱۰ میلیون)',
  initialInterest = 'مکان‌های تاریخی',
  targetCity = null,
  onSelectCityDetail,
}) => {
  // Input states
  const [origin, setOrigin] = useState(initialOrigin);
  const [selectedDestinationCity, setSelectedDestinationCity] = useState<string>(
    targetCity ? targetCity.id : 'isfahan'
  );
  const [durationDays, setDurationDays] = useState<number>(4);
  const [budgetTier, setBudgetTier] = useState<'budget' | 'medium' | 'luxury'>('medium');
  const [travelStyle, setTravelStyle] = useState<string>('فرهنگی و تاریخی');
  const [vehicle, setVehicle] = useState<'flight' | 'train' | 'bus' | 'car'>('train');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'مکان‌های تاریخی',
    'غذاهای محلی',
  ]);

  // Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [planGenerated, setPlanGenerated] = useState(true);

  const interestOptions = [
    'طبیعت‌گردی',
    'مکان‌های تاریخی',
    'غذاهای محلی',
    'دریا و ساحل',
    'تفریحات هیجانی',
    'خرید و بازارگردی',
    'کافه‌گردی',
    'آرامش و استراحت',
  ];

  const travelStyles = [
    'فرهنگی و تاریخی',
    'خانوادگی و آرام',
    'ماجراجویانه و طبیعت‌گردی',
    'عکاسی و زیبایی‌شناسی',
    'ریلکسیشن و بوم‌گردی',
  ];

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      if (selectedInterests.length > 1) {
        setSelectedInterests(selectedInterests.filter(i => i !== interest));
      }
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const currentCity = CITIES_DATA.find(c => c.id === selectedDestinationCity) || CITIES_DATA[0];

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setPlanGenerated(true);
      // scroll to results
      const resultsEl = document.getElementById('planner-results');
      if (resultsEl) {
        resultsEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 700);
  };

  // Generate day-by-day plan based on selected city & duration
  const generateDailyItinerary = () => {
    const days = [];
    const activitiesPool = [...currentCity.activities, ...currentCity.historicalAttractions, ...currentCity.naturalAttractions];
    const foodsPool = [...currentCity.localFoods];

    for (let day = 1; day <= durationDays; day++) {
      let morning = '';
      let afternoon = '';
      let evening = '';

      if (day === 1) {
        morning = `رسیدن به ${currentCity.name} با ${
          vehicle === 'flight' ? 'پرواز' : vehicle === 'train' ? 'قطار' : vehicle === 'bus' ? 'اتوبوس' : 'خودرو شخصی'
        }، پذیرش در ${currentCity.accommodations[0].name} و استراحت کوتاه`;
        afternoon = `گشت اولیه در بافت مرکزی، صرف ناهار محلی (${foodsPool[0] || 'غذای بومی'}) و قدم‌زدن در بازار سنتی`;
        evening = `تماشای غروب آفتاب در ${currentCity.historicalAttractions[0] || 'میادین تاریخی'} و شام در رستوران سنتی`;
      } else if (day === 2) {
        morning = `بازدید ویژه از ${currentCity.historicalAttractions[1] || 'بناهای ثبت یونسکو'} با نور دلپذیر صبحگاهی برای عکاسی`;
        afternoon = `چشیدن ${foodsPool[1] || 'طعم‌های اصیل'}، بازدید از موزه و کارگاه‌های صنایع‌دستی (${currentCity.souvenirs[0] || 'صنایع دستی'})`;
        evening = `کافه‌گردی سنتی، صرف دسر و شیرینی محلی و گفت‌وگو با مردم خونگرم`;
      } else if (day === 3) {
        morning = `سفر نیم‌روزه به طبیعت پیرامون: ${currentCity.naturalAttractions[0] || 'ییلاقات کوهستانی و چشمه‌سارها'}`;
        afternoon = `صرف ناهار صحرایی یا رستوران‌های بوم‌گردی، پیاده‌روی در طبیعت بکر و عکاسی`;
        evening = `بازگشت به شهر، خرید سوغات اصیل (${currentCity.souvenirs.slice(0, 2).join(' و ')}) و عصرنشینی آرام`;
      } else if (day === 4) {
        morning = `بازدید از ${currentCity.historicalAttractions[2] || 'کوچه‌باغ‌های تاریخی'} و لذت از هوای پاک بامداد`;
        afternoon = `صرف آخرین ناهار خاطره‌انگیز با ${foodsPool[2] || 'کباب یا غذای بومی'} و تحویل اتاق اقامتگاه`;
        evening = `حرکت به سمت مبدأ (${origin}) با آرامش و بار بسته‌ای از خاطرات شیرین`;
      } else {
        morning = `گشت آزاد و اختصاصی در جاذبه‌های مکمل: ${activitiesPool[day % activitiesPool.length]}`;
        afternoon = `دیدار از روستاهای سنتی و باغ‌های اطراف شهر ${currentCity.name}`;
        evening = `برنامه‌ریزی شب‌نشینی صمیمانه با همراهان سفر در کافه‌بام‌های شهر`;
      }

      days.push({
        dayNumber: day,
        title: day === 1 ? 'روز اول: ورود، استقرار و لمس نخستین نبض شهر' : day === durationDays ? `روز آخر: خداحافظی و یادگاری‌های ${currentCity.name}` : `روز ${day}: ماجراجویی عمیق در جاذبه‌های منتخب`,
        morning,
        afternoon,
        evening,
        recommendedFood: foodsPool[(day - 1) % foodsPool.length] || foodsPool[0],
      });
    }

    return days;
  };

  const itinerary = generateDailyItinerary();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-8 sm:py-12 bg-[#FAF7F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#0F4C3A] text-amber-300 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>سامانه هوشمند برنامه‌ریزی اختصاصی سفر</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-[#0F4C3A] tracking-tight">
            برنامه‌ریز هوشمند سفر شما
          </h1>

          <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
            مشخصات سفرت رو تنظیم کن تا بر اساس بودجه، علایق و وسیله نقلیه موردنظرت، بهترین مسیر، جاذبه‌ها، هتل و برنامه روزبه‌روز رو تحویل بگیری.
          </p>
        </div>

        {/* Wizard Form Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-[#E1D7C1]">
          <form onSubmit={handleGenerate} className="space-y-8">
            
            {/* 1. Origin & Destination */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-[#EAE3D4]">
              
              {/* Origin */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs sm:text-sm font-extrabold text-slate-800">
                  <MapPin className="w-4 h-4 text-[#0F4C3A]" />
                  <span>شهر مبدأ حرکت:</span>
                </label>
                <select
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#D5CAAF] rounded-2xl px-4 py-3 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0F4C3A] cursor-pointer"
                >
                  <option value="تهران">تهران (پایتخت)</option>
                  <option value="مشهد">مشهد مقدس</option>
                  <option value="اصفهان">اصفهان</option>
                  <option value="شیراز">شیراز</option>
                  <option value="تبریز">تبریز</option>
                  <option value="رشت">رشت</option>
                  <option value="اهواز">اهواز</option>
                  <option value="یزد">یزد</option>
                  <option value="کرمان">کرمان</option>
                  <option value="سایر شهرها">سایر شهرهای کشور</option>
                </select>
              </div>

              {/* Destination */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs sm:text-sm font-extrabold text-slate-800">
                  <Compass className="w-4 h-4 text-[#0F4C3A]" />
                  <span>مقصد اصلی سفر (از میان ۳۲ شهر منتخب):</span>
                </label>
                <select
                  value={selectedDestinationCity}
                  onChange={(e) => setSelectedDestinationCity(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#D5CAAF] rounded-2xl px-4 py-3 text-xs sm:text-sm font-bold text-[#0F4C3A] focus:outline-none focus:ring-2 focus:ring-[#0F4C3A] cursor-pointer"
                >
                  {CITIES_DATA.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.province}) - {c.category}
                    </option>
                  ))}
                </select>
              </div>

            </div>

            {/* 2. Duration & Budget & Style */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pb-6 border-b border-[#EAE3D4]">
              
              {/* Duration */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs sm:text-sm font-extrabold text-slate-800">
                  <Calendar className="w-4 h-4 text-[#0F4C3A]" />
                  <span>مدت سفر:</span>
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {[2, 3, 4, 7].map((days) => (
                    <button
                      key={days}
                      type="button"
                      onClick={() => setDurationDays(days)}
                      className={`py-2 px-1 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                        durationDays === days
                          ? 'bg-[#0F4C3A] text-white shadow-xs'
                          : 'bg-[#FAF7F2] text-slate-700 hover:bg-stone-200 border border-[#D5CAAF]'
                      }`}
                    >
                      {days} روز
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs sm:text-sm font-extrabold text-slate-800">
                  <Coins className="w-4 h-4 text-[#0F4C3A]" />
                  <span>سطح بودجه:</span>
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'budget', label: 'اقتصادی' },
                    { id: 'medium', label: 'متوسط' },
                    { id: 'luxury', label: 'لوکس' },
                  ].map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setBudgetTier(b.id as any)}
                      className={`py-2 px-1 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                        budgetTier === b.id
                          ? 'bg-[#0F4C3A] text-white shadow-xs'
                          : 'bg-[#FAF7F2] text-slate-700 hover:bg-stone-200 border border-[#D5CAAF]'
                      }`}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Style */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs sm:text-sm font-extrabold text-slate-800">
                  <Sparkles className="w-4 h-4 text-[#0F4C3A]" />
                  <span>سبک سفر:</span>
                </label>
                <select
                  value={travelStyle}
                  onChange={(e) => setTravelStyle(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#D5CAAF] rounded-2xl px-3 py-2.5 text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
                >
                  {travelStyles.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

            </div>

            {/* 3. Transport Preference */}
            <div className="space-y-3 pb-6 border-b border-[#EAE3D4]">
              <label className="flex items-center gap-2 text-xs sm:text-sm font-extrabold text-slate-800">
                <Car className="w-4 h-4 text-[#0F4C3A]" />
                <span>وسیله نقلیه موردعلاقه:</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'flight', label: 'هواپیما', icon: <Plane className="w-4 h-4" /> },
                  { id: 'train', label: 'قطار', icon: <Train className="w-4 h-4" /> },
                  { id: 'bus', label: 'اتوبوس', icon: <Bus className="w-4 h-4" /> },
                  { id: 'car', label: 'خودرو شخصی', icon: <Car className="w-4 h-4" /> },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setVehicle(item.id as any)}
                    className={`flex items-center justify-center gap-2 py-3 px-3 text-xs font-bold rounded-2xl border transition-all cursor-pointer ${
                      vehicle === item.id
                        ? 'bg-emerald-900 text-white border-emerald-900 shadow-xs'
                        : 'bg-[#FAF7F2] text-slate-700 hover:bg-white border-[#D5CAAF]'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Interests (Multi-select) */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-xs sm:text-sm font-extrabold text-slate-800">
                <Heart className="w-4 h-4 text-rose-600" />
                <span>علاقه‌مندی‌های گردشگری (انتخاب چندگانه):</span>
              </label>
              <div className="flex flex-wrap gap-2.5">
                {interestOptions.map((opt) => {
                  const isChecked = selectedInterests.includes(opt);
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => toggleInterest(opt)}
                      className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-[#0F4C3A] text-white border-[#0F4C3A] shadow-xs'
                          : 'bg-[#FAF7F2] text-slate-700 hover:bg-stone-200 border-[#D5CAAF]'
                      }`}
                    >
                      {isChecked && <Check className="w-3.5 h-3.5 text-amber-300" />}
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 flex items-center justify-center">
              <button
                type="submit"
                disabled={isGenerating}
                className="w-full sm:w-auto min-w-[280px] flex items-center justify-center gap-2.5 py-4 px-8 bg-[#0F4C3A] hover:bg-[#09382B] text-white font-black text-base rounded-2xl shadow-xl transition-transform hover:scale-[1.02] cursor-pointer disabled:opacity-75"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin text-amber-300" />
                    <span>در حال تدوین هوشمند مسیر و جاذبه‌ها...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-amber-300" />
                    <span>تولید برنامه اختصاصی سفر</span>
                  </>
                )}
              </button>
            </div>

          </form>
        </div>

        {/* Results Section */}
        {planGenerated && (
          <div id="planner-results" className="space-y-8 animate-in fade-in duration-300">
            
            {/* Top Overview Banner */}
            <div className="bg-gradient-to-r from-[#0F4C3A] via-[#135D46] to-[#0A382A] rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
              <div className="relative z-10 space-y-4">
                
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-amber-300 bg-white/10 px-3 py-1 rounded-full border border-white/20">
                      برنامه سفر اختصاصی TripMind
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-black">
                      سفر {durationDays} روزه از {origin} به مقصد {currentCity.name}
                    </h2>
                  </div>

                  {/* Print / Save button */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrint}
                      className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-xl transition-colors cursor-pointer"
                    >
                      <Printer className="w-4 h-4 text-amber-300" />
                      <span>چاپ برنامه</span>
                    </button>
                  </div>
                </div>

                {/* Key Metrics Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/15">
                  <div>
                    <span className="text-xs text-amber-200/80 block">وسیله نقلیه پیشنهادی:</span>
                    <span className="text-sm sm:text-base font-black">
                      {vehicle === 'flight' ? 'پرواز هوایی' : vehicle === 'train' ? 'قطار مسافری' : vehicle === 'bus' ? 'اتوبوس VIP' : 'خودرو شخصی'}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-amber-200/80 block">سطح بودجه:</span>
                    <span className="text-sm sm:text-base font-black">
                      {budgetTier === 'budget' ? 'اقتصادی و بک‌پکری' : budgetTier === 'medium' ? 'متوسط و خانوادگی' : 'لوکس ۵ ستاره'}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-amber-200/80 block">سبک سفر:</span>
                    <span className="text-sm sm:text-base font-black">
                      {travelStyle}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-amber-200/80 block">بهترین زمان سفر:</span>
                    <span className="text-sm sm:text-base font-black">
                      {currentCity.bestSeason.split(' ')[0]}
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Quick Recommendation Highlights Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Card 1: اقامتگاه منتخب */}
              <div className="bg-white rounded-3xl p-6 border border-[#E3DAC4] shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-[#0F4C3A]">
                  <Bed className="w-5 h-5 text-amber-600" />
                  <h3 className="font-extrabold text-base">اقامتگاه پیشنهادی متناسب با بودجه</h3>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-black text-slate-800 text-sm">
                    {budgetTier === 'luxury' 
                      ? currentCity.accommodations[0].name 
                      : currentCity.accommodations[1]?.name || currentCity.accommodations[0].name}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {budgetTier === 'luxury' 
                      ? currentCity.accommodations[0].note 
                      : currentCity.accommodations[1]?.note || currentCity.accommodations[0].note}
                  </p>
                </div>
              </div>

              {/* Card 2: غذاهای محلی */}
              <div className="bg-white rounded-3xl p-6 border border-[#E3DAC4] shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-[#0F4C3A]">
                  <Utensils className="w-5 h-5 text-rose-600" />
                  <h3 className="font-extrabold text-base">غذاهای اصیل توصیه شده</h3>
                </div>
                <ul className="space-y-1 text-xs text-slate-700">
                  {currentCity.localFoods.slice(0, 3).map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card 3: سوغات و صنایع‌دستی */}
              <div className="bg-white rounded-3xl p-6 border border-[#E3DAC4] shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-[#0F4C3A]">
                  <Compass className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-extrabold text-base">سوغات و دست‌سازهای شاخص</h3>
                </div>
                <ul className="space-y-1 text-xs text-slate-700">
                  {currentCity.souvenirs.slice(0, 3).map((s, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Detailed Day-by-Day Itinerary */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E3DAC4] shadow-md space-y-8">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-[#0F4C3A]" />
                  <h3 className="text-xl sm:text-2xl font-black text-[#0F4C3A]">
                    برنامه تفصیلی روزبه‌روز ({durationDays} روز)
                  </h3>
                </div>
                <span className="text-xs font-bold text-slate-500">
                  تنظیم‌شده بر پایه علاقه‌مندی: {selectedInterests.join('، ')}
                </span>
              </div>

              <div className="space-y-6">
                {itinerary.map((item) => (
                  <div
                    key={item.dayNumber}
                    className="p-5 sm:p-6 rounded-2xl bg-[#FAF7F2] border border-[#E8DFCD] space-y-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="w-8 h-8 rounded-xl bg-[#0F4C3A] text-amber-300 font-black text-sm flex items-center justify-center">
                          {item.dayNumber}
                        </span>
                        <h4 className="text-sm sm:text-base font-black text-slate-900">
                          {item.title}
                        </h4>
                      </div>
                      <span className="text-[11px] font-bold text-rose-800 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200">
                        پیشنهاد ناهار: {item.recommendedFood}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs sm:text-sm">
                      <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
                        <span className="text-xs font-bold text-amber-700 block">صبح (۹:۰۰ تا ۱۳:۰۰):</span>
                        <p className="text-slate-700 leading-relaxed">{item.morning}</p>
                      </div>
                      <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
                        <span className="text-xs font-bold text-[#0F4C3A] block">عصر (۱۴:۰۰ تا ۱۸:۰۰):</span>
                        <p className="text-slate-700 leading-relaxed">{item.afternoon}</p>
                      </div>
                      <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
                        <span className="text-xs font-bold text-indigo-700 block">شامگاه و شب (۱۹:۰۰ به بعد):</span>
                        <p className="text-slate-700 leading-relaxed">{item.evening}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100">
                <button
                  onClick={() => onSelectCityDetail(currentCity)}
                  className="text-xs sm:text-sm font-bold text-[#0F4C3A] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>مشاهده راهنمای کامل و تاریخچه شهر {currentCity.name}</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={handlePrint}
                  className="px-5 py-2.5 bg-[#0F4C3A] hover:bg-[#09382B] text-white text-xs font-black rounded-xl transition-colors cursor-pointer"
                >
                  دریافت نسخه چاپی برنامه سفر
                </button>
              </div>
            </div>

            {/* Official Transparent Disclaimer as required by prompt #8 */}
            <div className="p-4 bg-stone-100 rounded-2xl border border-stone-200 text-xs text-slate-600 leading-relaxed space-y-1">
              <div className="font-bold flex items-center gap-1 text-slate-800">
                <Info className="w-4 h-4 text-[#0F4C3A]" />
                <span>نکته مهم درباره برنامه سفر هوشمند:</span>
              </div>
              <p>
                این پیشنهادها در نسخه فعلی به صورت نمونه الگوریتمی هوشمند تدوین شده‌اند و از API زنده دریافت نشده‌اند. سامانه TripMind AI فاقد هرگونه فروش بلیت یا بررسی لحظه‌ای پرواز و قطار است و برای فاز بعدی به صورت مستقیم با سرویس‌های هوش مصنوعی یکپارچه خواهد شد.
              </p>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
