import React, { useState } from 'react';
import { 
  Compass, 
  MapPin, 
  BookOpen, 
  MessageSquareText, 
  MessageCircle, 
  Headphones, 
  Sparkles,
  Menu,
  X,
  User
} from 'lucide-react';

export type PageView = 'home' | 'destinations' | 'guide' | 'reviews' | 'site-feedback' | 'support' | 'planner';

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  onOpenPlanner: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, onOpenPlanner }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageView; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'خانه', icon: <Compass className="w-4 h-4" /> },
    { id: 'destinations', label: 'مقاصد ایران', icon: <MapPin className="w-4 h-4" /> },
    { id: 'guide', label: 'راهنمای سفر', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'reviews', label: 'نظرات گردشگران', icon: <MessageSquareText className="w-4 h-4" /> },
    { id: 'site-feedback', label: 'ارسال نظر درباره سایت', icon: <MessageCircle className="w-4 h-4" /> },
    { id: 'support', label: 'ارتباط با پشتیبانی', icon: <Headphones className="w-4 h-4" /> },
  ];

  const handleNavClick = (page: PageView) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E7DFCE] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Logo (Matching reference style) */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-800 via-teal-700 to-amber-600 p-[2px] shadow-sm transition-transform duration-200 group-hover:scale-105">
              <div className="w-full h-full bg-[#0F4C3A] rounded-[14px] flex items-center justify-center overflow-hidden">
                <svg viewBox="0 0 40 40" className="w-7 h-7 text-[#D4AF37]" fill="currentColor">
                  {/* Iran map outline representation / Persian shamseh motif */}
                  <path d="M12 8C15 6 22 5 28 8C33 11 35 17 33 24C31 29 26 33 20 34C14 34 8 30 7 23C6 17 9 10 12 8Z" opacity="0.4" />
                  <path d="M18 10L21 17L28 17L22 21L24 28L18 24L12 28L14 21L8 17L15 17Z" fill="#F4E0A5" />
                  <circle cx="20" cy="19" r="3" fill="#0F4C3A" />
                </svg>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-[#0F4C3A]">
                  TripMind AI
                </span>
                <span className="text-xs font-bold text-amber-700 bg-amber-100/70 px-1.5 py-0.5 rounded-md">
                  in Iran
                </span>
              </div>
              <span className="text-[11px] font-medium text-slate-500">
                سامانه هوشمند برنامه‌ریزی سفر در ایران
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links (Clean unboxed text with active emerald indicator) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-2 transition-colors whitespace-nowrap cursor-pointer ${
                    isActive 
                      ? 'text-[#0F4C3A] font-bold' 
                      : 'text-slate-600 hover:text-[#0F4C3A]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#0F4C3A] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Top Actions: Matching Reference Image (ارسال نظرات, ارتباط با پشتیبانی, user icon) */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={() => handleNavClick('site-feedback')}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white/80 border border-[#D5CAAF] rounded-xl hover:bg-amber-50 hover:border-amber-300 transition-all cursor-pointer whitespace-nowrap"
            >
              <MessageCircle className="w-3.5 h-3.5 text-amber-700" />
              <span>ارسال نظرات</span>
            </button>

            <button
              onClick={() => handleNavClick('support')}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white/80 border border-[#D5CAAF] rounded-xl hover:bg-emerald-50 hover:border-emerald-300 transition-all cursor-pointer whitespace-nowrap"
            >
              <Headphones className="w-3.5 h-3.5 text-emerald-700" />
              <span>ارتباط با پشتیبانی</span>
            </button>

            <button
              onClick={onOpenPlanner}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-[#0F4C3A] hover:bg-[#0a3528] rounded-xl shadow-xs transition-all cursor-pointer whitespace-nowrap"
              title="طراحی اختصاصی سفر با هوش مصنوعی"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>طراحی سفر</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenPlanner}
              className="p-2 text-white bg-[#0F4C3A] rounded-xl cursor-pointer"
              title="طراحی سفر"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-emerald-900 bg-white border border-[#D5CAAF] rounded-xl cursor-pointer"
              aria-label="منوی موبایل"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F2] border-b border-[#E7DFCE] px-4 pt-3 pb-6 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-right transition-colors ${
                    isActive 
                      ? 'bg-emerald-900/10 text-[#0F4C3A]' 
                      : 'text-slate-700 hover:bg-stone-200/50'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-[#E7DFCE] grid grid-cols-2 gap-2">
            <button
              onClick={() => handleNavClick('site-feedback')}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold text-slate-700 bg-white border border-[#D5CAAF] rounded-xl"
            >
              <MessageCircle className="w-3.5 h-3.5 text-amber-700" />
              <span>ارسال نظرات</span>
            </button>
            <button
              onClick={() => handleNavClick('support')}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold text-slate-700 bg-white border border-[#D5CAAF] rounded-xl"
            >
              <Headphones className="w-3.5 h-3.5 text-emerald-700" />
              <span>پشتیبانی</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
