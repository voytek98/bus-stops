import { useBusStore } from '@app/stores';

export const LinesList = () => {
  const { busData, activeLine } = useBusStore();
  const busLines = Array.from(busData.keys()).sort((a, b) => a - b);

  const getClassName = (isActive: boolean) =>
    `btn btn-primary btn-line btn-sm fw-bold py-2 px-3 ${isActive ? 'active' : ''}`;

  const handleBusLineClick = (line: number) => {
    useBusStore.setState({ activeLine: line, activeStop: '' });
  };

  return (
    <ul className="d-flex flex-wrap gap-2 mb-0 list-unstyled">
      {busLines.map((item) => (
        <li key={item}>
          <button
            onClick={() => handleBusLineClick(item)}
            className={getClassName(activeLine === item)}
          >
            {item}
          </button>
        </li>
      ))}
    </ul>
  );
};
