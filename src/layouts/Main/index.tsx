import { Outlet } from 'react-router';
import { useBusStore } from '@app/stores';
import { useEffect } from 'react';
import { Navigation } from '@app/components';

const navItems = [
  { to: '/', label: 'Bus Lines' },
  { to: '/stops', label: 'Stops' },
];

export const MainLayout = () => {
  const { fetchData, isLoaded } = useBusStore();

  useEffect(() => {
    if (isLoaded) return;
    fetchData();
  }, [fetchData, isLoaded]);

  return (
    <>
      <header>
        <div className="container">
          <h1 className="fs-4 fw-bold">Timetable</h1>
        </div>
      </header>
      <main>
        <div className="container my-3 d-flex flex-column">
          <div className="row g-0 bg-white rounded-2 px-4 mb-3">
            <div className="col">
              <Navigation items={navItems} />
            </div>
          </div>
          <Outlet />
        </div>
      </main>
    </>
  );
};
