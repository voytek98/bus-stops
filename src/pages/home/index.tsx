import { LinesList, StopsList, StopsTimesList } from '@app/components';

const HomePage = () => {
  return (
    <>
      <div className="row g-0 p-4 mb-3 rounded-2 bg-white">
        <div className="col-12">
          <h5 className="mb-0">Select Bus Line</h5>
        </div>
        <div className="col-12 py-4 mt-2">
          <LinesList />
        </div>
      </div>
      <div className="row mb-3 flex-grow-1">
        <div className="col-md-6">
          <StopsList />
        </div>
        <div className="col-md-6">
          <StopsTimesList />
        </div>
      </div>
    </>
  );
};

export { HomePage };
