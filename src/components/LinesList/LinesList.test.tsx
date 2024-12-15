import { render, screen, fireEvent } from '@testing-library/react';
import { Mock } from 'vitest';
import { LinesList } from './';
import { apiClient } from '@app/api';
import { setupStore } from '@app/helpers';

vi.mock('@app/api/client');

const data = [
  { line: 110, stop: 'Cmentarz Grębałów', order: 9, time: '12:38' },
  { line: 111, stop: 'Cło', order: 24, time: '16:05' },
  { line: 112, stop: 'Rondo Grunwaldzkie', order: 2, time: '9:29' },
  { line: 109, stop: 'Cracovia Stadion', order: 1, time: '10:44' },
];
const linesSorted = data.map(({ line }) => line).sort((a, b) => a - b);

describe('LinesList', () => {
  beforeEach(() => {
    (apiClient.get as Mock).mockResolvedValue({ data });
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('when component mounts', () => {
    it('should render bus lines list', async () => {
      await setupStore();
      render(<LinesList />);

      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(data.length);

      buttons.forEach((btn, i) => {
        expect(btn).toHaveTextContent(linesSorted[i].toString());
        expect(btn).not.toHaveClass('active');
      });
    });
  });

  describe('when user interacts', () => {
    it('should make line button active', async () => {
      const result = await setupStore();
      render(<LinesList />);
      const button = screen.getByText(data[0].line);

      expect(button).not.toHaveClass('active');
      expect(result.current.activeLine).toBe(0);

      fireEvent.click(button);

      expect(button).toHaveClass('active');
      expect(result.current.activeLine).toBe(data[0].line);
    });
  });
});
