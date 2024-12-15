import { Mock } from 'vitest';
import { fireEvent, render, screen, act } from '@testing-library/react';
import { HomePage } from '.';
import { useBusStore } from '@app/stores';
import { apiClient } from '@app/api';
import { setupStore } from '@app/helpers';

vi.mock('@app/api/client');

const data = [
  { line: 110, stop: 'Cmentarz Grębałów', order: 9, time: '12:38' },
  { line: 110, stop: 'Cmentarz Grębałów', order: 9, time: '13:21' },
  { line: 106, stop: 'Skotniki', order: 12, time: '18:28' },
  { line: 106, stop: 'Skotniki', order: 12, time: '15:41' },
  { line: 110, stop: 'Darwina', order: 7, time: '10:36' },
  { line: 109, stop: 'Cracovia Stadion', order: 1, time: '10:44' },
  { line: 109, stop: 'Cracovia Stadion', order: 1, time: '7:54' },
  { line: 109, stop: 'Malczewskiego', order: 6, time: '12:55' },
];
const linesList = Array.from(new Set(data.map(({ line }) => line))).sort(
  (a, b) => a - b
);

describe('Home page', () => {
  beforeEach(() => {
    (apiClient.get as Mock).mockResolvedValue({ data });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });
  describe('when component mounts', () => {
    it('should render the page in initial state', async () => {
      await setupStore();
      render(<HomePage />);
      const busLines = screen.getAllByRole('button');

      expect(screen.getByText('Select Bus Line')).toBeInTheDocument();
      expect(busLines).toHaveLength(linesList.length);
      busLines.forEach((line, index) => {
        expect(line).toHaveTextContent(linesList[index].toString());
      });
      expect(
        screen.getByLabelText('stops-list-placeholder')
      ).toBeInTheDocument();
      expect(
        screen.getByLabelText('times-list-placeholder')
      ).toBeInTheDocument();
    });
  });

  describe('when user interacts', () => {
    it('should select a bus line and display a stops list', async () => {
      await setupStore();
      render(<HomePage />);
      const busLines = screen.getAllByRole('button');
      const selectedLine = busLines[0];

      expect(screen.queryByLabelText('stops-list')).not.toBeInTheDocument();
      expect(
        screen.getByLabelText('stops-list-placeholder')
      ).toBeInTheDocument();
      expect(
        screen.queryByText(`Bus Line: ${selectedLine.textContent}`)
      ).not.toBeInTheDocument();

      fireEvent.click(selectedLine);

      expect(screen.getByLabelText('stops-list')).toBeInTheDocument();
      expect(
        screen.queryByLabelText('stops-list-placeholder')
      ).not.toBeInTheDocument();
      expect(
        screen.getByText(`Bus Line: ${selectedLine.textContent}`)
      ).toBeInTheDocument();
    });

    it('should select a bus stop and display a times list', async () => {
      await setupStore();
      render(<HomePage />);
      act(() => {
        useBusStore.setState({ activeLine: data[0].line });
      });
      const stop = screen.getByRole('listitem', { name: data[0].stop });

      expect(screen.queryByLabelText('times-list')).not.toBeInTheDocument();
      expect(
        screen.getByLabelText('times-list-placeholder')
      ).toBeInTheDocument();

      fireEvent.click(stop);

      expect(screen.getByLabelText('times-list')).toBeInTheDocument();
      expect(
        screen.queryByLabelText('times-list-placeholder')
      ).not.toBeInTheDocument();
    });
  });
});
