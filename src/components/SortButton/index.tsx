import { SortDirection } from '@app/types';
import arrowBottom from '@app/assets/icons/arrow-bottom-rec.svg';

interface SortButtonProps {
  handleClick: (direction: SortDirection) => void;
  title: string;
  sortDirection: SortDirection;
}

export const SortButton = ({
  title,
  sortDirection,
  handleClick,
}: SortButtonProps) => {
  const rotateDeg = sortDirection === SortDirection.ASC ? '180deg' : '0deg';

  const handleSortClick = () => {
    const newDirection =
      sortDirection === SortDirection.ASC
        ? SortDirection.DESC
        : SortDirection.ASC;
    handleClick(newDirection);
  };

  return (
    <div className="d-flex align-items-center gap-1">
      <span className="fs-6">{title}</span>
      <button
        aria-label="sort"
        className="p-0 border-0 bg-transparent d-flex"
        onClick={handleSortClick}
      >
        <img style={{ rotate: rotateDeg }} src={arrowBottom} />
      </button>
    </div>
  );
};
