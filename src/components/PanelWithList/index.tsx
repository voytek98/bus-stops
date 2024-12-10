import { ReactNode } from 'react';

interface PanelWithListProps {
  title?: string;
  header: ReactNode;
  list: string[];
  activeItem?: string;
  handleClick?: (item: string) => void;
}
export const PanelWithList = ({
  title,
  header,
  list,
  activeItem,
  handleClick,
}: PanelWithListProps) => {
  const isClickable = typeof handleClick !== 'undefined';

  const getClassName = (isActive: boolean) =>
    `item-listing list-group-item clickable px-4 ${isActive ? 'active' : ''}`;

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLLIElement>,
    item: string
  ) => {
    if (e.key === 'Enter' || e.key === ' ') {
      if (!isClickable) return;
      e.preventDefault();
      handleClick(item);
    }
  };

  return (
    <div className="bg-white rounded-2">
      {title && <h3 className="mb-0 pt-4 px-4 fs-6 fw-bold">{title}</h3>}
      <div className="d-flex gap-1 align-items-center p-4 border-bottom">
        {header}
      </div>
      <ul className="item-list list-group list-group-flush overflow-y-auto">
        {list.map((item) =>
          isClickable ? (
            <li
              key={item}
              role="button"
              tabIndex={0}
              className={getClassName(activeItem === item)}
              aria-label={item}
              onClick={() => handleClick(item)}
              onKeyDown={(e) => handleKeyDown(e, item)}
            >
              {item}
            </li>
          ) : (
            <li key={item} className="item-listing list-group-item px-4">
              {item}
            </li>
          )
        )}
      </ul>
    </div>
  );
};
