import { useState, useCallback } from 'react';

interface UseOnlineStatusOptions {
  initialStatus?: boolean;
}

export const useOnlineStatus = (options: UseOnlineStatusOptions = {}) => {
  const { initialStatus = false } = options;
  const [isOnline, setIsOnline] = useState(initialStatus);

  const toggleOnlineStatus = useCallback(() => {
    setIsOnline(prev => !prev);
  }, []);

  const setOnlineStatus = useCallback((status: boolean) => {
    setIsOnline(status);
  }, []);

  return {
    isOnline,
    toggleOnlineStatus,
    setOnlineStatus,
  };
};
