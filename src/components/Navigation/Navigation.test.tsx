import { fireEvent, render, screen } from '@testing-library/react';
import { Navigation } from './';
import { MemoryRouter } from 'react-router';
import { ROUTES } from '@app/router/routes';

const navItems = [
  { to: ROUTES.HOME, label: 'Home' },
  { to: ROUTES.STOPS, label: 'Stops' },
];

const MockedNavigation = () => (
  <MemoryRouter>
    <Navigation items={navItems} />
  </MemoryRouter>
);

describe('Navigation', () => {
  it('should render all navigation items', () => {
    render(<MockedNavigation />);
    const links = screen.getAllByRole('link');

    links.forEach((link, i) => {
      expect(link).toHaveTextContent(navItems[i].label);
      expect(link).toHaveAttribute('href', navItems[i].to);
    });
  });

  it('should set active link', () => {
    render(<MockedNavigation />);
    const links = screen.getAllByRole('link');

    expect(links[0]).toHaveClass('active');
    expect(links[1]).not.toHaveClass('active');

    fireEvent.click(links[1]);
    expect(links[1]).toHaveClass('active');
    expect(links[0]).not.toHaveClass('active');
  });
});
