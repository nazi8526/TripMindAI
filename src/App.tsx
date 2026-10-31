/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar, PageView } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturesStrip } from './components/FeaturesStrip';
import { PopularDestinations } from './components/PopularDestinations';
import { TransportAndAiCards } from './components/TransportAndAiCards';
import { DestinationsPage } from './components/DestinationsPage';
import { TouristReviewsPage } from './components/TouristReviewsPage';
import { TripPlanner } from './components/TripPlanner';
import { SiteFeedbackPage } from './components/SiteFeedbackPage';
import { SupportPage } from './components/SupportPage';
import { TravelGuidePage } from './components/TravelGuidePage';
import { CityDetailModal } from './components/CityDetailModal';
import { Footer } from './components/Footer';
import { CITIES_DATA, CityData } from './data/citiesData';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedCityDetail, setSelectedCityDetail] = useState<CityData | null>(null);
  const [selectedCityForReview, setSelectedCityForReview] = useState<CityData | null>(null);
  const [plannerParams, setPlannerParams] = useState<{
    origin?: string;
    duration?: string;
    budget?: string;
    interest?: string;
    targetCity?: CityData | null;
  }>({});

  const handleNavigate = (page: PageView) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartPlanningFromHero = (initialData?: {
    origin?: string;
    duration?: string;
    budget?: string;
    interest?: string;
  }) => {
    if (initialData) {
      setPlannerParams(prev => ({
        ...prev,
        ...initialData
      }));
    }
    setCurrentPage('planner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlanTripToSpecificCity = (city: CityData) => {
    setPlannerParams(prev => ({
      ...prev,
      targetCity: city
    }));
    setSelectedCityDetail(null);
    setCurrentPage('planner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewCityReviews = (city: CityData) => {
    setSelectedCityForReview(city);
    setSelectedCityDetail(null);
    setCurrentPage('reviews');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFooterCityClick = (cityId: string) => {
    const city = CITIES_DATA.find(c => c.id === cityId);
    if (city) {
      setSelectedCityDetail(city);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-slate-800 font-sans">
      
      {/* Sticky Header / Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenPlanner={() => handleNavigate('planner')}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <>
            {/* Hero Section matching reference image */}
            <HeroSection
              onStartPlanning={handleStartPlanningFromHero}
              onExploreDestinations={() => handleNavigate('destinations')}
            />

            {/* 5 Highlights Feature Strip */}
            <FeaturesStrip 
              onFeatureClick={(featureId) => {
                if (featureId === 'transport-compare') {
                  handleNavigate('guide');
                } else {
                  handleNavigate('planner');
                }
              }}
            />

            {/* Popular Destinations Cards (Yazd, Qeshm, Isfahan, Shiraz, Masuleh...) */}
            <PopularDestinations
              cities={CITIES_DATA}
              onSelectCity={(city) => setSelectedCityDetail(city)}
              onViewAllDestinations={() => handleNavigate('destinations')}
            />

            {/* Vehicle Comparison & AI Customizer */}
            <TransportAndAiCards
              onOpenPlannerWithPreference={(pref) => {
                setPlannerParams(prev => ({ ...prev, interest: pref }));
                handleNavigate('planner');
              }}
              onOpenTransportGuide={() => handleNavigate('guide')}
            />
          </>
        )}

        {currentPage === 'destinations' && (
          <DestinationsPage
            cities={CITIES_DATA}
            onSelectCity={(city) => setSelectedCityDetail(city)}
            onOpenReviews={(city) => handleViewCityReviews(city)}
          />
        )}

        {currentPage === 'guide' && (
          <TravelGuidePage
            onStartPlanning={() => handleNavigate('planner')}
            onExploreDestinations={() => handleNavigate('destinations')}
          />
        )}

        {currentPage === 'reviews' && (
          <TouristReviewsPage
            cities={CITIES_DATA}
            selectedCityForReview={selectedCityForReview}
            onClearSelectedCity={() => setSelectedCityForReview(null)}
            onSelectCityForReview={(city) => setSelectedCityForReview(city)}
            onPlanTripToCity={handlePlanTripToSpecificCity}
          />
        )}

        {currentPage === 'planner' && (
          <TripPlanner
            initialOrigin={plannerParams.origin}
            initialDuration={plannerParams.duration}
            initialBudget={plannerParams.budget}
            initialInterest={plannerParams.interest}
            targetCity={plannerParams.targetCity}
            onSelectCityDetail={(city) => setSelectedCityDetail(city)}
          />
        )}

        {currentPage === 'site-feedback' && (
          <SiteFeedbackPage />
        )}

        {currentPage === 'support' && (
          <SupportPage />
        )}
      </main>

      {/* Global City Detail Modal (10 Comprehensive Sections) */}
      <CityDetailModal
        city={selectedCityDetail}
        onClose={() => setSelectedCityDetail(null)}
        onPlanTripToCity={handlePlanTripToSpecificCity}
        onViewCityReviews={handleViewCityReviews}
      />

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onSelectCity={handleFooterCityClick}
      />

    </div>
  );
}
