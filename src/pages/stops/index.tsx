import { useState } from 'react';
import { useBusStore } from '@app/stores';
import { PanelWithList, SortButton } from '@app/components';
import { useDebounce } from '@app/hooks';
import { SortDirection } from '@app/types';

const StopsPage = () => {
  const { stopList, isLoading, isLoaded } = useBusStore();
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    SortDirection.ASC
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  const sortedList = stopList.sort((a, b) =>
    sortDirection === 'asc'
      ? a.stop.localeCompare(b.stop)
      : b.stop.localeCompare(a.stop)
  );
  const filteredList = sortedList.filter((stop) =>
    stop.stop.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );
  const handleClick = (dir: SortDirection) => {
    setSortDirection(dir);
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
            disabled={isLoading || !isLoaded}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="col-12">
        {isLoading || !isLoaded ? (
          <div className="p-4">Loading...</div>
        ) : (
          <PanelWithList
            header={
              <SortButton
                title="Bus Stops"
                sortDirection={sortDirection}
                handleClick={handleClick}
              />
            }
            label="stops-list"
            list={filteredList.map((stop) => stop.stop)}
          />
        )}
      </div>
    </div>
  );
};

export { StopsPage };
