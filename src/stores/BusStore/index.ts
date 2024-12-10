import { create } from 'zustand';
import { fetchStops } from '@app/api';
import { BusData, Stop } from '@app/types';

interface BusState {
  stopList: Stop[];
  busData: BusData;
  activeLine: number;
  activeStop: string;
  getActiveStopList: () => { stop: string; order: number; }[];
  getTimeList: (stop: string) => string[];
  // Data fetch
  isLoading: boolean;
  isLoaded: boolean;
  error: string | null;
  fetchData: () => Promise<void>;
}

export const useBusStore = create<BusState>((set, get) => ({
  stopList: [],
  busData: new Map(),
  activeLine: 0,
  activeStop: '',
  getActiveStopList: () => {
    const { busData, activeLine } = get();
    const lineData = busData.get(activeLine);
    if (!lineData) return [];

    return Array.from(lineData.entries()).map(([stop, data]) => ({
      stop,
      order: data.order,
    }));
  },
  getTimeList: (stop: string) => {
    const { busData, activeLine } = get();
    const lineData = busData.get(activeLine);
    return lineData?.get(stop)?.times || [];
  },
  // Data fetch
  isLoading: false,
  isLoaded: false,
  error: null,
  fetchData: async () => {
    set({ isLoading: true, error: null });
    try {
      const { stopList, busData } = await fetchStops();
      set({ stopList, busData, isLoading: false, isLoaded: true });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
}));
