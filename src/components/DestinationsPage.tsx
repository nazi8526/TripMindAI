import React, { useState, useMemo } from 'react';
import { CityData } from '../data/citiesData';
import { 
  Search, 
  MapPin, 
  Filter, 
  Compass, 
  Star, 
  Heart, 
  SlidersHorizontal,
  RotateCcw
} from 'lucide-react';

interface DestinationsPageProps {
  cities: CityData[];
  onSelectCity: (city: CityData) => void;
  onOpenReviews: (city: CityData) => void;
}

export const DestinationsPage: React.FC<DestinationsPageProps> = ({
  cities,
  onSelectCity,
  onOpenReviews,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('همه');
  const [selectedRegion, setSelectedRegion] = useState<string>('همه');
  const [selectedProvince, setSelectedProvince] = useState<string>('همه');
  const [sortBy, setSortBy] = useState<'rating' | 'name' | 'reviews'>('rating');
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  // Unique provinces list
  const provinces = useMemo(() => {
    const list = Array.from(new Set(cities.map(c => c.province)));
    return ['همه', ...list.sort()];
  }, [cities]);

  const categories = ['همه', 'تاریخی', 'طبیعت‌گردی', 'ساحلی', 'کویری', 'فرهنگی', 'زیارتی'];
  const regions = ['همه', 'مرکز', 'شمال', 'جنوب', 'غرب', 'شرق', 'شمال‌غرب', 'جنوب‌شرق'];

  const toggleFav = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Filtered and sorted cities
  const filteredCities = useMemo(() => {
    return cities.filter(city => {
      const matchSearch = 
        city.name.includes(searchTerm.trim()) ||
        city.province.includes(searchTerm.trim()) ||
        city.tags.some(t => t.includes(searchTerm.trim())) ||
        city.shortIntro.includes(searchTerm.trim());

      const matchCategory = selectedCategory === 'همه' || city.category === selectedCategory;
      const matchRegion = selectedRegion === 'همه' || city.region === selectedRegion;
      const matchProvince = selectedProvince === 'همه' || city.province === selectedProvince;

      return matchSearch && matchCategory && matchRegion && matchProvince;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'reviews') return b.reviewsCount - a.reviewsCount;
      return a.name.localeCompare(b.name, 'fa');
    });
  }, [cities, searchTerm, selectedCategory, selectedRegion, selectedProvince, sortBy]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('همه');
    setSelectedRegion('همه');
    setSelectedProvince('همه');
    setSortBy('rating');
  };

  return (
    <div className="py-8 sm:py-12 bg-[#FAF7F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-[#0F4C3A] border border-emerald-200">
            <Compass className="w-3.5 h-3.5" />
            <span>راهنمای ۳۲ شهر توریستی شاخص ایران</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-[#0F4C3A] tracking-tight">
            مقاصد گردشگری ایران
          </h1>

          <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
            از کرانه‌های خزر تا امواج خلیج فارس و از بافت خشتی کویر تا قله‌های البرز و زاگرس؛ شهر مقصد خود را جستجو و کاوش کنید.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-lg border border-[#E1D7C1] mb-10 space-y-5">
          
          {/* Top row: Search input & sort */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Search Input */}
            <div className="md:col-span-8 relative">
              <input
                type="text"
                placeholder="جست‌وجوی شهر، استان، یا جاذبه (مثلاً: اصفهان، نخلستان، دریاچه، بازار...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#D5CAAF] rounded-2xl pr-11 pl-4 py-3 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F4C3A]"
              />
              <Search className="w-5 h-5 text-slate-400 absolute right-3.5 top-3.5" />
            </div>

            {/* Sort Dropdown */}
            <div className="md:col-span-4 flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 whitespace-nowrap">مرتب‌سازی:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full bg-[#FAF7F2] border border-[#D5CAAF] rounded-2xl px-3 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0F4C3A] cursor-pointer"
              >
                <option value="rating">بالاترین امتیاز گردشگران</option>
                <option value="reviews">بیشترین نظرات ثبت‌شده</option>
                <option value="name">ترتیب الفبای فارسی</option>
              </select>
            </div>

          </div>

          {/* Category Pills (Interactive Filter Controls as allowed by skill) */}
          <div className="space-y-2">
            <span className="text-xs font-extrabold text-slate-700 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-[#0F4C3A]" />
              <span>دسته‌بندی نوع جاذبه:</span>
            </span>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-[#0F4C3A] text-white shadow-xs' 
                        : 'bg-[#FAF7F2] text-slate-600 hover:bg-stone-200/60 border border-[#E2D8C3]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Secondary Filter: Province & Region */}
          <div className="pt-3 border-t border-[#EFE8D8] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 items-center">
            
            {/* Province Select */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-600 whitespace-nowrap">استان:</span>
              <select
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#D5CAAF] rounded-xl px-2.5 py-2 text-xs font-medium text-slate-800 focus:outline-none cursor-pointer"
              >
                {provinces.map((prov) => (
                  <option key={prov} value={prov}>{prov === 'همه' ? 'همه استان‌ها' : prov}</option>
                ))}
              </select>
            </div>

            {/* Region Select */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-600 whitespace-nowrap">پهنه جغرافیایی:</span>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#D5CAAF] rounded-xl px-2.5 py-2 text-xs font-medium text-slate-800 focus:outline-none cursor-pointer"
              >
                {regions.map((reg) => (
                  <option key={reg} value={reg}>{reg === 'همه' ? 'تمام نقاط ایران' : reg}</option>
                ))}
              </select>
            </div>

            {/* Reset Button & Count */}
            <div className="flex items-center justify-between sm:justify-end gap-3 sm:col-span-2 md:col-span-1">
              <span className="text-xs font-bold text-[#0F4C3A]">
                {filteredCities.length} مقصد یافت شد
              </span>
              {(searchTerm || selectedCategory !== 'همه' || selectedProvince !== 'همه' || selectedRegion !== 'همه') && (
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-1 text-xs text-rose-700 hover:text-rose-900 font-bold cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>پاک‌کردن فیلترها</span>
                </button>
              )}
            </div>

          </div>

        </div>

        {/* Cities Grid (32 Cities) */}
        {filteredCities.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#E2D8C3] max-w-lg mx-auto">
            <MapPin className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800 mb-1">
              هیچ مقصدی با این مشخصات یافت نشد!
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              لطفاً عبارت جستجو یا فیلترهای انتخابی را تغییر دهید.
            </p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 text-xs font-bold bg-[#0F4C3A] text-white rounded-xl cursor-pointer"
            >
              نمایش همه ۳۲ شهر
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCities.map((city) => {
              const isFav = !!favorites[city.id];
              return (
                <div
                  key={city.id}
                  onClick={() => onSelectCity(city)}
                  className="bg-white rounded-3xl p-4 border border-[#E3DAC4] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer hover:-translate-y-1.5"
                >
                  {/* City Image */}
                  <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-slate-900">
                    <img
                      src={city.coverImage}
                      alt={city.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Province tag */}
                    <div className="absolute bottom-2.5 right-2.5 bg-black/50 backdrop-blur-md text-amber-200 text-[11px] font-bold px-2 py-0.5 rounded-lg border border-white/10">
                      استان {city.province}
                    </div>

                    {/* Rating badge */}
                    <div className="absolute bottom-2.5 left-2.5 bg-[#0F4C3A]/80 backdrop-blur-md text-white text-[11px] font-bold px-2 py-0.5 rounded-lg flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{city.rating}</span>
                    </div>

                    {/* Fav button */}
                    <button
                      onClick={(e) => toggleFav(city.id, e)}
                      className="absolute top-2.5 left-2.5 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition-colors cursor-pointer"
                      aria-label="نشان کردن"
                    >
                      <Heart 
                        className={`w-4 h-4 transition-colors ${
                          isFav ? 'fill-rose-500 text-rose-500' : 'text-white'
                        }`} 
                      />
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="pt-3.5 pb-2 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-xl font-black text-[#0F4C3A]">
                          {city.name}
                        </h3>
                        <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                          {city.category}
                        </span>
                      </div>

                      {/* Clean metadata without pill boxes */}
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
                        {city.shortIntro}
                      </p>

                      {/* Tag list */}
                      <div className="flex flex-wrap gap-1 text-[11px] text-slate-500">
                        {city.tags.slice(0, 3).map((t, idx) => (
                          <span key={t}>
                            {t} {idx < 2 && '•'}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="pt-4 border-t border-slate-100 mt-3 grid grid-cols-2 gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectCity(city);
                        }}
                        className="w-full py-2 px-3 bg-[#0F4C3A] hover:bg-[#09382B] text-white text-xs font-bold rounded-xl transition-colors shadow-xs cursor-pointer text-center"
                      >
                        مشاهده جزئیات
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenReviews(city);
                        }}
                        className="w-full py-2 px-2 bg-stone-100 hover:bg-stone-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer text-center"
                      >
                        تجربه سفر ({city.reviews.length})
                      </button>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};
