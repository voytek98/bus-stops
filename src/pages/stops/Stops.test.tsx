import { render, screen, fireEvent, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, Mock } from 'vitest';
import { StopsPage } from './';
import { apiClient } from '@app/api';
import { setupStore } from '@app/helpers';

vi.mock('@app/api/client');

const data = [
  { line: 102, stop: 'Łobzów SKA', order: 4, time: '21:31' },
  { line: 102, stop: 'Chełm', order: 19, time: '14:52' },
  { line: 103, stop: 'Na Załęczu', order: 11, time: '15:22' },
  { line: 102, stop: 'Zakamycze', order: 23, time: '14:12' },
  { line: 110, stop: 'Cmentarz Grębałów', order: 9, time: '12:38' },
  { line: 106, stop: 'Skotniki', order: 12, time: '15:41' },
  { line: 110, stop: 'Darwina', order: 7, time: '10:36' },
  { line: 109, stop: 'Cracovia Stadion', order: 1, time: '7:54' },
  { line: 109, stop: 'Malczewskiego', order: 6, time: '12:55' },
  { line: 102, stop: 'Mazowiecka', order: 5, time: '11:47' },
  { line: 105, stop: 'Majora', order: 4, time: '14:17' },
];
const sortedStops = data
  .map(({ stop }) => stop)
  .sort((a, b) => a.localeCompare(b));
const filteredStops = sortedStops.filter((stop) =>
  stop.toLowerCase().includes('ma'.toLowerCase())
);

const getStopsList = () =>
  screen.getAllByRole('listitem').map((stop) => stop.textContent);

describe('StopsPage', () => {
  beforeEach(() => {
    (apiClient.get as Mock).mockResolvedValue({ data });
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  describe('when component mounts', () => {
    it('renders the page in initial state with loaded list', async () => {
      await setupStore();
      render(<StopsPage />);
      const stops = getStopsList();

      expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
      expect(screen.getByText('Bus Stops')).toBeInTheDocument();
      expect(screen.getByLabelText('sort')).toBeInTheDocument();
      expect(stops).toEqual(sortedStops);
    });
  });

  describe('when using search functionality', () => {
    it('filters the list based on search input', async () => {
      await setupStore();
      render(<StopsPage />);
      const searchInput = screen.getByPlaceholderText('Search...');

      act(() => {
        fireEvent.change(searchInput, { target: { value: 'ma' } });
        vi.advanceTimersByTime(300);
      });

      const stops = getStopsList();
      expect(stops).toEqual(filteredStops);
    });

    it('checks if list have all items when input is cleared', async () => {
      await setupStore();
      render(<StopsPage />);
      const searchInput = screen.getByPlaceholderText('Search...');

      act(() => {
        fireEvent.change(searchInput, { target: { value: 'ma' } });
        vi.advanceTimersByTime(300);
      });

      let stops = getStopsList();
      expect(stops).toEqual(filteredStops);

      act(() => {
        fireEvent.change(searchInput, { target: { value: '' } });
        vi.advanceTimersByTime(300);
      });

      stops = getStopsList();
      expect(stops).toEqual(sortedStops);
    });
  });

  describe('when using sort functionality', () => {
    it('toggles sort direction when clicking sort button', async () => {
      await setupStore();
      render(<StopsPage />);
      const sortButton = screen.getByLabelText('sort');

      let stops = getStopsList();
      expect(stops).toEqual(sortedStops);

      fireEvent.click(sortButton);

      stops = getStopsList();
      expect(stops).toEqual(sortedStops.reverse());
    });
  });
});
