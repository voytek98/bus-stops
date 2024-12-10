import { NavLink } from 'react-router';

type NavItemType = {
  to: string;
  label: string;
};

interface NaviagionProps {
  items: NavItemType[];
}
export const Navigation = ({ items }: NaviagionProps) => {
  return (
    <nav className="bus-nav bg-white">
      <ul className="d-flex mb-0 list-unstyled" role="tablist">
        {items.map(({ to, label }) => (
          <li key={to} className="nav-item pt-3">
            <NavLink
              className={({ isActive }) =>
                `nav-link px-3 pb-3 ${isActive ? 'active' : ''}`
              }
              to={to}
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
