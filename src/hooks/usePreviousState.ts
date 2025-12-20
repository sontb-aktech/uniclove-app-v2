import {useEffect, useRef} from 'react';

const usePreviousState = (value: any) => {
  const ref = useRef<any>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export default usePreviousState;
