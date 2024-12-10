import { BusData, Stop } from '@app/types';
import { apiClient } from '../client';
import { getStopList, processBusData } from './helpers';

export interface fetchStopsResponse {
  stopList: Stop[];
  busData: BusData;
}

const fetchStops = async (): Promise<fetchStopsResponse> => {
  const response = await apiClient.get<Stop[]>('stops');
  const stops = response.data;

  const stopList = getStopList(stops);
  const busData = processBusData(stops);

  return {
    stopList,
    busData,
  };
};

export { fetchStops };
