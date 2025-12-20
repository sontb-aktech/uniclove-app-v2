import {useCallback, useEffect, useRef, useState} from 'react';
import {useAppDispatch} from 'stores';
import GPTTextSlice from 'stores/GPTTextSlice';

const DEFAULT_THROTTLE_MS = 3000;

const getRemainingTime = (lastTriggeredTime: number, throttleMs: number) => {
  const elapsedTime = Date.now() - lastTriggeredTime;
  const remainingTime = throttleMs - elapsedTime;

  return remainingTime < 0 ? 0 : remainingTime;
};

const useThrottledValue = (throttleMs: number) => {
  // const dispatch = useAppDispatch();
  // const [value, setValue] = useState('');
  // const lastTriggered = useRef<number>(Date.now());
  // const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  // const cancel = useCallback(() => {
  //   if (timeoutRef.current) {
  //     clearTimeout(timeoutRef.current);
  //     timeoutRef.current = null;
  //   }
  // }, []);
  // useEffect(() => {
  //   let remainingTime = getRemainingTime(lastTriggered.current, throttleMs);
  //   if (remainingTime === 0) {
  //     lastTriggered.current = Date.now();
  //     // setThrottledValue(value);
  //     dispatch(GPTTextSlice.actions.setTextGPT(value));
  //     cancel();
  //   } else if (!timeoutRef.current) {
  //     timeoutRef.current = setTimeout(() => {
  //       remainingTime = getRemainingTime(lastTriggered.current, throttleMs);
  //       if (remainingTime === 0) {
  //         lastTriggered.current = Date.now();
  //         dispatch(GPTTextSlice.actions.setTextGPT(value));
  //         cancel();
  //       }
  //     }, remainingTime);
  //   }
  //   return cancel;
  // }, [cancel, throttleMs, value]);
  // return {setValue};
};

export default useThrottledValue;
