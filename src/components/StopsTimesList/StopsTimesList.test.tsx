import { act } from '@testing-library/react';
import { render, screen } from '@testing-library/react';
import { Mock, vi } from 'vitest';
import { StopsTimesList } from './';
import { useBusStore } from '@app/stores';
import { apiClient } from '@app/api';
import { setupStore } from '@app/helpers';

vi.mock('@app/api/client');

const data = [
  { line: 110, stop: 'Teatr Ludowy', order: 4, time: '16:21' },
  { line: 110, stop: 'Teatr Ludowy', order: 4, time: '17:07' },
  { line: 110, stop: 'Teatr Ludowy', order: 4, time: '21:03' },
  { line: 110, stop: 'Teatr Ludowy', order: 4, time: '19:27' },
];
const sortedTimes = ['16:21', '17:07', '19:27', '21:03'];

describe('StopsTimesList', () => {
  beforeEach(() => {
    (apiClient.get as Mock).mockResolvedValue({ data });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('when component mounts', () => {
    it('should render "select stop" placeholder', async () => {
      render(<StopsTimesList />);

      await act(async () =>
        useBusStore.setState({ activeLine: data[0].line, activeStop: '' })
      );

      const placeholder = screen.getByText(/Please select the bus stop first/i);
      expect(placeholder).toBeInTheDocument();
    });

    it('should render "select line" placeholder', async () => {
      render(<StopsTimesList />);

      await act(async () =>
        useBusStore.setState({ activeLine: 0, activeStop: '' })
      );

      const placeholder = screen.getByText(/Please select the bus line first/i);
      expect(placeholder).toBeInTheDocument();
    });

    it('should render sorted stop times', async () => {
      await setupStore();
      render(<StopsTimesList />);
      act(() => {
        useBusStore.setState({
          activeLine: data[0].line,
          activeStop: data[0].stop,
        });
      });
      const times = screen.getAllByRole('listitem');
      const timesTexts = times.map((time) => time.textContent);

      expect(timesTexts).toEqual(sortedTimes);
      times.forEach((time) => {
        expect(time).toBeInTheDocument();
      });
    });
  });
});
