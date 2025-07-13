import { Routes, Route } from 'react-router-dom';
import { MainTemplate } from './components/templates/MainTemplate';
import ParkingManagementPage from './pages/ParkingManagementPage';
import { PaymentPage } from './pages/PaymentPage';

const App = () => (
  <MainTemplate>
    <Routes>
      <Route path="/" element={<ParkingManagementPage />} />
      <Route path="/payment" element={<PaymentPage />} />
    </Routes>
  </MainTemplate>
);

export default App;
