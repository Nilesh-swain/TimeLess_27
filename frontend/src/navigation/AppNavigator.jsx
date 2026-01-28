import { Routes, Route } from "react-router-dom";

import NotFound from "../global/pages/NotFound";
import MapPage from "../features/map/pages/MapPage";
import LandingPage from "../features/landing/pages/LandingPage";
import DashboardPage from "../features/dashboard/pages/DashboardPage";
import OverviewPage from "../features/overview/pages/OverviewPage";
import DashboardLayout from "../layout/DashboardLayout";
import EchoBotPage from "../features/chat/pages/EchoBotPage";
import SegregatorPage from "../features/segregator/pages/SegregatorPage";
import SignupPage from "../features/auth/pages/SignupPage";
import SigninPage from "../features/auth/pages/SigninPage";
import LeadershipPage from "../features/leadership/LeadershipPage";

// 🔥 1. IMPORT YOUR NEW ANALYTICS PAGE
import AnalyticsPage from "../features/Analytics/AnalyticsPage.jsx"; 

const AppNavigator = () => {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/signin" element={<SigninPage />} />

      {/* Standalone Pages */}
      <Route path="/map" element={<MapPage />} />
      <Route path="/leadership" element={<LeadershipPage />} />

      {/* Dashboard Layout */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<OverviewPage />} />
        
        {/* 🔥 2. CONNECTED ANALYTICS ROUTE */}
        <Route path="analytics" element={<AnalyticsPage />} /> 

        <Route path="map" element={<MapPage />} />
        <Route path="chatbot" element={<EchoBotPage />} />
        <Route path="segregator" element={<SegregatorPage />} />
        <Route path="leadership" element={<LeadershipPage />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppNavigator;