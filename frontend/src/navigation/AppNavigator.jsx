import { Routes, Route, Navigate } from 'react-router-dom';

import NotFound from '../global/pages/NotFound';
import MapPage from '../features/map/pages/MapPage';

const AppNavigator = () => {
  return (
    <Routes>
      <Route path="/map" element={<MapPage />} />
     
      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppNavigator;
