import { useState } from 'react';
import { PanelWithList, SortButton } from '@app/components';
import { useBusStore } from '@app/stores';
import { SortDirection } from '@app/types';

export const StopsList = () => {
  const { getActiveStopList, activeLine, activeStop } = useBusStore();
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    SortDirection.ASC
  );
  const activeStopList = getActiveStopList();

  const isEmpty = !activeLine || activeLine < 1;
  const sortedList = activeStopList.sort((a, b) =>
    sortDirection === 'asc' ? a.order - b.order : b.order - a.order
  );

  const handleClick = (dir: SortDirection) => {
    setSortDirection(dir);
  };

  const handleBusStopClick = (stop: string) => {
    useBusStore.setState({ activeStop: stop });
  };

  if (isEmpty)
    return (
      <div aria-label="stops-list-placeholder" className="placeholder-box">
        Please select the bus line first
      </div>
    );

  return (
    <PanelWithList
      label="stops-list"
      title={`Bus Line: ${activeLine}`}
      header={
        <SortButton
          title="Bus Stops"
          sortDirection={sortDirection}
          handleClick={handleClick}
        />
      }
      list={sortedList.map((item) => item.stop)}
      activeItem={activeStop}
      handleClick={handleBusStopClick}
    />
  );
};
