import React, { useState } from 'react';
import { CityData, Review } from '../data/citiesData';
import { 
  Star, 
  MapPin, 
  Calendar, 
  MessageSquareQuote, 
  Search, 
  ArrowRight,
  Info,
  CheckCircle2,
  Sparkles,
  UserCheck
} from 'lucide-react';

interface TouristReviewsPageProps {
  cities: CityData[];
  selectedCityForReview: CityData | null;
  onClearSelectedCity: () => void;
  onSelectCityForReview: (city: CityData) => void;
  onPlanTripToCity: (city: CityData) => void;
}

export const TouristReviewsPage: React.FC<TouristReviewsPageProps> = ({
  cities,
  selectedCityForReview,
  onClearSelectedCity,
  onSelectCityForReview,
  onPlanTripToCity,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCityModal, setActiveCityModal] = useState<CityData | null>(selectedCityForReview);

  // Sync state if prop changes
  React.useEffect(() => {
    if (selectedCityForReview) {
      setActiveCityModal(selectedCityForReview);
    }
  }, [selectedCityForReview]);

  const filteredCities = cities.filter(c => 
    c.name.includes(searchTerm.trim()) || 
    c.province.includes(searchTerm.trim())
  );

  const handleCityCardClick = (city: CityData) => {
    setActiveCityModal(city);
    onSelectCityForReview(city);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setActiveCityModal(null);
    onClearSelectedCity();
  };

  // If a city is active, show the Dedicated City Experience View
  if (activeCityModal) {
    return (
      <div className="py-8 sm:py-12 bg-[#FAF7F2] min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Back button */}
          <div className="flex items-center justify-between">
            <button
              onClick={handleBackToList}
              className="flex items-center gap-2 text-xs sm:text-sm font-extrabold text-[#0F4C3A] hover:text-[#09382B] bg-white border border-[#D5CAAF] px-4 py-2.5 rounded-2xl shadow-xs transition-colors cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
              <span>بازگشت به فهرست همه ۳۲ شهر</span>
            </button>

            {/* Disclaimer pill */}
            <span className="text-[11px] font-bold text-amber-800 bg-amber-100/70 px-3 py-1 rounded-full border border-amber-300 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-amber-700" />
              <span>نظرات این بخش جنبه نمونه و نمایشی دارند</span>
            </span>
          </div>

          {/* City Header Banner */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-[#E3DAC4]">
            <div className="relative w-full h-64 sm:h-80 bg-slate-900">
              <img
                src={activeCityModal.coverImage}
                alt={activeCityModal.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
              
              <div className="absolute bottom-6 right-6 left-6 text-white text-right">
                <span className="text-xs font-bold text-amber-300 bg-black/40 px-2.5 py-1 rounded-lg backdrop-blur-xs mb-2 inline-block">
                  استان {activeCityModal.province}
                </span>
                <h1 className="text-3xl sm:text-5xl font-black mb-2">
                  تجربه سفر گردشگران به {activeCityModal.name}
                </h1>
                <p className="text-xs sm:text-sm text-slate-200 line-clamp-3 max-w-2xl leading-relaxed">
                  {activeCityModal.shortIntro}
                </p>
              </div>
            </div>

            {/* City Sub-bar */}
            <div className="p-4 sm:p-6 bg-[#FAF7F2] border-t border-[#EAE3D4] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-black text-slate-800">
                  امتیاز {activeCityModal.rating} از ۵
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-xs font-medium text-slate-600">
                  {activeCityModal.reviews.length} روایت و تجربه ثبت‌شده
                </span>
              </div>

              <button
                onClick={() => onPlanTripToCity(activeCityModal)}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#0F4C3A] hover:bg-[#09382B] rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>برنامه‌ریزی هوشمند سفر به {activeCityModal.name}</span>
              </button>
            </div>
          </div>

          {/* Reviews List Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <MessageSquareQuote className="w-6 h-6 text-[#0F4C3A]" />
              <h2 className="text-xl sm:text-2xl font-black text-[#0F4C3A]">
                تجربه گردشگران ({activeCityModal.name})
              </h2>
            </div>

            <div className="space-y-4">
              {activeCityModal.reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-[#E3DAC4] space-y-4 transition-all hover:border-[#0F4C3A]/30"
                >
                  {/* Reviewer Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-emerald-100/80 border border-emerald-300 flex items-center justify-center text-[#0F4C3A] font-black text-sm">
                        {rev.author.slice(0, 1)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm sm:text-base font-extrabold text-slate-900">
                            {rev.author}
                          </h4>
                          <span className="text-[11px] text-slate-500 font-medium">
                            ({rev.travelerFrom})
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500 pt-0.5">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          <span>سفر در {rev.date}</span>
                          <span>•</span>
                          <span>فصل {rev.season}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      {/* 5-star rating */}
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${
                              i < rev.rating 
                                ? 'fill-amber-400 text-amber-400' 
                                : 'text-slate-200'
                            }`} 
                          />
                        ))}
                      </div>

                      {/* Required Badge: «نظر نمونه نمایشی» */}
                      <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-300">
                        {rev.badge}
                      </span>
                    </div>
                  </div>

                  {/* Review Title & Content */}
                  <div className="space-y-2">
                    <h5 className="text-base font-bold text-[#0F4C3A]">
                      «{rev.title}»
                    </h5>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
                      {rev.content}
                    </p>
                  </div>

                  {/* Trust footer note */}
                  <div className="pt-2 flex items-center gap-1.5 text-[11px] text-slate-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>تجربه گردآوری‌شده بر پایه نظرسنجی جاذبه‌های شاخص گردشگری {activeCityModal.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section Notice on Constraints */}
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 leading-relaxed space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <Info className="w-4 h-4 text-amber-700" />
              <span>درباره بخش نظرات گردشگران:</span>
            </div>
            <p>
              این بخش با هدف آشنایی با حال‌وهوای شهرهای ایران از زبان مسافران تدوین شده و محتوای آن به صورت نمونه نمایشی است. جهت ارسال بازخورد درباره عملکرد سایت، لطفاً از صفحه «ارسال نظر درباره سایت» استفاده نمایید.
            </p>
          </div>

        </div>
      </div>
    );
  }

  // Otherwise, render the Overview list of all 32 cities with dedicated review cards
  return (
    <div className="py-8 sm:py-12 bg-[#FAF7F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Titles as requested in requirement #7 */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200">
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>نظرات و روایت‌های سفر ۳۲ مقصد برتر</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-[#0F4C3A] tracking-tight">
            ایران از نگاه گردشگران
          </h1>

          <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
            با شهرهای زیبای ایران آشنا شوید و تجربه سفر گردشگران را بخوانید.
          </p>

          {/* Search box for cities */}
          <div className="max-w-md mx-auto pt-4 relative">
            <input
              type="text"
              placeholder="جست‌وجوی شهر در میان نظرات (مثلاً: شیراز، قشم، اصفهان...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-[#D5CAAF] rounded-2xl pr-10 pl-4 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0F4C3A]"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-6" />
          </div>
        </div>

        {/* 32 City Cards with Sample Reviews Count */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCities.map((city) => (
            <div
              key={city.id}
              onClick={() => handleCityCardClick(city)}
              className="bg-white rounded-3xl p-4 border border-[#E3DAC4] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer hover:-translate-y-1.5"
            >
              {/* Photo */}
              <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-slate-900">
                <img
                  src={city.coverImage}
                  alt={city.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                
                <div className="absolute bottom-2.5 right-2.5 text-white">
                  <span className="text-[11px] font-bold text-amber-300 block">
                    استان {city.province}
                  </span>
                  <h3 className="text-xl font-black">
                    {city.name}
                  </h3>
                </div>

                <div className="absolute top-2.5 left-2.5 bg-black/40 backdrop-blur-md text-amber-200 text-[11px] font-bold px-2 py-0.5 rounded-lg flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{city.rating}</span>
                </div>
              </div>

              {/* 3-line dedicated intro */}
              <div className="pt-3.5 pb-2 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-3">
                    {city.shortIntro}
                  </p>

                  <div className="flex items-center justify-between text-xs text-slate-500 py-1 border-t border-slate-100">
                    <span className="font-bold text-[#0F4C3A]">
                      {city.reviews.length} نظر نمونه نمایشی
                    </span>
                    <span className="text-[11px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md">
                      فصل: {city.bestSeason.split(' ')[0]}
                    </span>
                  </div>
                </div>

                {/* Button: «مشاهده تجربه گردشگران» */}
                <div className="pt-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCityCardClick(city);
                    }}
                    className="w-full py-2.5 px-3 bg-[#0F4C3A] hover:bg-[#09382B] text-white text-xs font-bold rounded-xl transition-colors shadow-xs cursor-pointer text-center"
                  >
                    مشاهده تجربه گردشگران
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>

        {/* Global info footer notice */}
        <div className="mt-12 p-4 bg-white/80 rounded-2xl border border-[#DCD3BE] text-center text-xs text-slate-500 max-w-2xl mx-auto">
          نظرات گردشگران بر پایه اسناد و تجربیات واقعی مسافران تنظیم گردیده و جهت پیش‌نمایش و الهام‌بخشی سفر شما ارائه شده است.
        </div>

      </div>
    </div>
  );
};
