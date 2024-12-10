import { Stop, StopDetails } from '@app/types';

export const processBusData = (data: Stop[]): Map<number, Map<string, StopDetails>> => {
  const lineMap = new Map<number, Map<string, StopDetails>>();

  for (const { line, stop, order, time } of data) {
    if (!lineMap.has(line)) {
      lineMap.set(line, new Map());
    }

    const stopMap = lineMap.get(line)!;
    if (!stopMap.has(stop)) {
      stopMap.set(stop, { stop, order, times: [] });
    }

    const stopDetails = stopMap.get(stop)!;
    if (!stopDetails.times.includes(time)) {
      stopDetails.times.push(time);
    }
  }

  for (const [line, stopMap] of lineMap) {
    const sortedStopMap = new Map(
      Array.from(stopMap.entries())
        .sort(([, a], [, b]) => a.order - b.order)
        .map(([stopName, stopDetails]) => {
          stopDetails.times = Array.from(new Set(stopDetails.times)).sort((a, b) => {
            const [aHours, aMinutes] = a.split(':').map(Number);
            const [bHours, bMinutes] = b.split(':').map(Number);
            return aHours * 60 + aMinutes - (bHours * 60 + bMinutes);
          });

          return [stopName, stopDetails] as [string, StopDetails];
        })
    );

    lineMap.set(line, sortedStopMap);
  }
  return lineMap;
};

export const getStopList = (data: Stop[]): Stop[] => {
  const stopMap = new Map<string, Stop>();
  data.forEach((entry) => {
    if (!stopMap.has(entry.stop)) {
      stopMap.set(entry.stop, entry);
    }
  });
  return Array.from(stopMap.values());
};
