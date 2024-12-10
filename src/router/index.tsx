import { Route, Routes, BrowserRouter } from 'react-router';
import { HomePage, StopsPage } from '@app/pages';
import { MainLayout } from "@app/layouts";

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/stops" element={<StopsPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default Router;
