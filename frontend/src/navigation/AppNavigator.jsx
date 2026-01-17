import { Routes, Route, Navigate } from "react-router-dom";

import NotFound from "../global/pages/NotFound";
import MapPage from "../features/map/pages/MapPage";
import LandingPage from "../features/landing/pages/LandingPage";
import DashboardPage from "../features/dashboard/pages/DashboardPage";
import OverviewPage from "../features/overview/pages/OverviewPage";
import DashboardLayout from "../layout/DashboardLayout";
import EchoBotPage from "../features/chat/pages/EchoBotPage";
import SegregatorPage from "../features/segregator/pages/SegregatorPage";

const AppNavigator = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/map" element={<MapPage />} />
      {/* <Route path="/dashboard" element={<DashboardPage />} /> */}
      <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<OverviewPage />} /> {/* Default page at /dashboard */}
          <Route path="map" element={<MapPage />} />
          <Route path="chatbot" element={<EchoBotPage />} />
          <Route path="segregator" element={<SegregatorPage />} />
          {/* Add more feature routes here */}
        </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppNavigator;
