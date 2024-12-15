import { useBusStore } from '@app/stores';
import { act, renderHook } from '@testing-library/react';

export const setupStore = async () => {
  const { result } = renderHook(() => useBusStore());
  await act(async () => {
    await result.current.fetchData();
  });
  return result;
};
