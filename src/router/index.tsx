import { Route, Routes, BrowserRouter } from 'react-router';
import { HomePage, StopsPage } from '@app/pages';
import { MainLayout } from '@app/layouts';
import { ROUTES } from './routes';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path={ROUTES.HOME} element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path={ROUTES.STOPS} element={<StopsPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default Router;
