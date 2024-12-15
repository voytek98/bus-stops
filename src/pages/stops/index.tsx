import { useState } from 'react';
import { useBusStore } from '@app/stores';
import { PanelWithList } from '@app/components';
import { useDebounce } from '@app/hooks';
import arrowBottom from '@app/assets/icons/arrow-bottom-rec.svg';

const StopsPage = () => {
  const { stopList } = useBusStore();
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
  const rotateDeg = sortDirection === 'asc' ? '180deg' : '0deg';
  const sortedList = stopList.sort((a, b) =>
    sortDirection === 'asc'
      ? a.stop.localeCompare(b.stop)
      : b.stop.localeCompare(a.stop)
  );
  const filteredList = sortedList.filter((stop) =>
    stop.stop.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );
  const handleClick = () => {
    setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <div className="row g-0 bg-white rounded-2">
      <div className="col-3 p-2">
        <div className="input-group input-group-sm">
          <input
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="col-12">
        <PanelWithList
          header={
            <>
              <span className="fs-6">Bus Stops</span>
              <button
                aria-label="sort"
                className="p-0 border-0 bg-transparent d-flex"
                onClick={handleClick}
              >
                <img style={{ rotate: rotateDeg }} src={arrowBottom} />
              </button>
            </>
          }
          label='stops-list'
          list={filteredList.map((stop) => stop.stop)}
        />
      </div>
    </div>
  );
};

export { StopsPage };
