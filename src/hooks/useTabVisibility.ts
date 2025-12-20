import { useState } from 'react';

const useTabVisibility = () => {
  const [isTabVisible, setIsTabVisible] = useState<boolean>(true);

  const hideTab = () => {
    setIsTabVisible(false);
  };

  const showTab = () => {
    setIsTabVisible(true);
  };

  return { isTabVisible, hideTab, showTab };
};

export default useTabVisibility;