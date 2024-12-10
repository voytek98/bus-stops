export type Stop = {
  line: number;
  stop: string;
  order: number;
  time: string;
};
export type StopDetails = {
  stop: string;
  order: number;
  times: string[];
};

export type BusData = Map<number, Map<string, StopDetails>>;
