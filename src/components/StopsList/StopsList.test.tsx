import { render, screen, fireEvent, act } from '@testing-library/react';
import { Mock } from 'vitest';
import { StopsList } from './';
import { useBusStore } from '@app/stores';
import { apiClient } from '@app/api';
import { setupStore } from '@app/helpers';

vi.mock('@app/api/client');

const data = [
  { line: 110, stop: 'Cmentarz Grębałów', order: 9, time: '12:38' },
  { line: 110, stop: 'Wadów', order: 15, time: '21:24' },
  { line: 110, stop: 'Wadów Działki', order: 18, time: '9:27' },
  { line: 110, stop: 'Darwina', order: 7, time: '10:36' },
  { line: 110, stop: 'Barwna', order: 22, time: '14:58' },
];
const stopsSorted = data
  .sort((a, b) => a.order - b.order)
  .map(({ stop }) => stop);

describe('StopsList', () => {
  beforeEach(() => {
    (apiClient.get as Mock).mockResolvedValue({ data });
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render the placeholder when no active line is selected', () => {
    render(<StopsList />);
    expect(
      screen.getByText('Please select the bus line first')
    ).toBeInTheDocument();
  });

  it('should render the bus stops list', async () => {
    await setupStore();
    act(() => {
      useBusStore.setState({ activeLine: data[0].line });
    });
    render(<StopsList />);

    expect(screen.getByText(`Bus Line: ${data[0].line}`)).toBeInTheDocument();
    data.forEach(({ stop }) => {
      expect(screen.getByText(stop)).toBeInTheDocument();
    });
  });

  it('should set active stop when a stop is clicked', async () => {
    const result = await setupStore();
    act(() => {
      useBusStore.setState({ activeLine: data[0].line });
    });
    render(<StopsList />);

    const stopButton = screen.getByRole('listitem', { name: data[0].stop });

    expect(result.current.activeStop).toBe('');
    expect(stopButton).not.toHaveClass('active');

    fireEvent.click(stopButton);

    expect(result.current.activeStop).toBe(data[0].stop);
    expect(stopButton).toHaveClass('active');
  });

  it('should sort the list when a sort button is clicked', async () => {
    await setupStore();
    act(() => {
      useBusStore.setState({ activeLine: data[0].line });
    });
    render(<StopsList />);

    const sortButton = screen.getByRole('button', { name: 'sort' });
    const list = screen.getAllByRole('listitem');
    const listSorted = list.map((item) => item.textContent);

    expect(listSorted).toEqual(stopsSorted);

    fireEvent.click(sortButton);
    expect(listSorted).toEqual(stopsSorted);
  });
});
