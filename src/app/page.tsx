'use client';

import React from 'react';
import { useSalon } from '../context/SalonContext';
import { Navbar } from '../components/layout/Navbar';
import { Sidebar } from '../components/layout/Sidebar';
import { BottomNav } from '../components/layout/BottomNav';
import { MobileFAB } from '../components/layout/MobileFAB';

// Main Views
import { SuperAdminFleet } from '../components/superadmin/SuperAdminFleet';
import { StylistDashboard } from '../components/dashboard/StylistDashboard';
import { DailyDashboard } from '../components/dashboard/DailyDashboard';
import { LiveQueue } from '../components/queue/LiveQueue';
import { AddCustomerModal } from '../components/queue/AddCustomerModal';
import { CustomerCRM } from '../components/crm/CustomerCRM';
import { TeamPerformance } from '../components/employees/TeamPerformance';
import { RatingModal } from '../components/feedback/RatingModal';
import { OfferManager } from '../components/offers/OfferManager';
import { WhatsAppCenter } from '../components/communication/WhatsAppCenter';
import { WeddingBookings } from '../components/wedding/WeddingBookings';
import { ProductInventory } from '../components/inventory/ProductInventory';
import { TaskManager } from '../components/tasks/TaskManager';
import { AppointmentCalendar } from '../components/appointments/AppointmentCalendar';
import { DailyClosingReport } from '../components/sales/DailyClosingReport';
import { SalonInsights } from '../components/analytics/SalonInsights';
import { OnboardingWizard } from '../components/onboarding/OnboardingWizard';
import { SettingsPage } from '../components/settings/SettingsPage';
import { SubscriptionPlans } from '../components/settings/SubscriptionPlans';
import { PasskeyAuthModal } from '../components/auth/PasskeyAuthModal';

export default function Home() {
  const { activeTab, role } = useSalon();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'superadmin':
        return <SuperAdminFleet />;
      case 'stylist_dashboard':
        return <StylistDashboard />;
      case 'dashboard':
        return role === 'stylist' ? <StylistDashboard /> : <DailyDashboard />;
      case 'queue':
        return <LiveQueue />;
      case 'crm':
        return <CustomerCRM />;
      case 'employees':
        return <TeamPerformance />;
      case 'offers':
        return <OfferManager />;
      case 'whatsapp':
        return <WhatsAppCenter />;
      case 'wedding':
        return <WeddingBookings />;
      case 'inventory':
        return <ProductInventory />;
      case 'tasks':
        return <TaskManager />;
      case 'appointments':
        return <AppointmentCalendar />;
      case 'closing':
      case 'analytics':
        return <DailyClosingReport />;
      case 'insights':
        return <SalonInsights />;
      case 'onboarding':
        return <OnboardingWizard />;
      case 'subscription':
        return <SubscriptionPlans />;
      case 'settings':
        return <SettingsPage />;
      default:
        return role === 'super_admin' ? <SuperAdminFleet /> :
               role === 'stylist' ? <StylistDashboard /> :
               <DailyDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-[#e6e8ec] flex items-center justify-center p-2 sm:p-4">
      
      {/* Dashboard App Shell Box */}
      <div className="max-w-[1400px] w-full bg-white rounded-[32px] shadow-2xl border border-slate-200/80 flex overflow-hidden min-h-[820px] relative">
        
        {/* Left Barbershop Sidebar */}
        <Sidebar />

        {/* Right Main Content Panel */}
        <div className="flex-1 flex flex-col min-w-0 bg-slate-50/50">
          <Navbar />

          <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
            {renderActiveView()}
          </main>
        </div>
      </div>

      {/* Mobile Bottom Navigation & FAB */}
      <BottomNav />
      <MobileFAB />

      {/* Global Passkey Auth & Modals */}
      <PasskeyAuthModal />
      <AddCustomerModal />
      <RatingModal />
    </div>
  );
}
