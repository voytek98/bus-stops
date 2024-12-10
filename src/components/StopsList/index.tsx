import { useBusStore } from '@app/stores';
import { useState } from 'react';
import arrowBottom from '@app/assets/icons/arrow-bottom-rec.svg';
import { PanelWithList } from '@app/components';

export const StopsList = () => {
  const { getActiveStopList, activeLine, activeStop } = useBusStore();
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const activeStopList = getActiveStopList();

  const isEmpty = !activeLine || activeLine < 1;
  const sortedList = activeStopList.sort((a, b) =>
    sortDirection === 'asc' ? a.order - b.order : b.order - a.order
  );
  const rotateDeg = sortDirection === 'asc' ? '180deg' : '0deg';

  const handleClick = () => {
    setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const handleBusStopClick = (stop: string) => {
    useBusStore.setState({ activeStop: stop });
  };

  if (isEmpty)
    return <div className="placeholder-box">Please select the bus line first</div>;

  return (
    <PanelWithList
      title={`Bus Line: ${activeLine}`}
      header={
        <>
          <span className="fs-6">Bus Stops</span>
          <img
            role="button"
            style={{ rotate: rotateDeg }}
            src={arrowBottom}
            onClick={handleClick}
          />
        </>
      }
      list={sortedList.map((item) => item.stop)}
      activeItem={activeStop}
      handleClick={handleBusStopClick}
    />
  );
};
