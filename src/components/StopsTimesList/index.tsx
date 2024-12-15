import { useBusStore } from '@app/stores';
import { PanelWithList } from '@app/components';

export const StopsTimesList = () => {
  const { activeLine, activeStop, getTimeList } = useBusStore();
  const itemToSelect = activeLine ? 'stop' : 'line';
  const timeList = getTimeList(activeStop);

  if (!activeStop)
    return (
      <div aria-label="times-list-placeholder" className="placeholder-box">
        Please select the bus {itemToSelect} first
      </div>
    );

  return (
    <PanelWithList
      title={`Bus Stop: ${activeStop}`}
      header={<span>Time</span>}
      label="times-list"
      list={timeList}
    />
  );
};
