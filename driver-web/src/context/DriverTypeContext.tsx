import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

export type DriverType = 'company' | 'individual';

interface DriverTypeContextValue {
  driverType: DriverType | null;
  setDriverType: (type: DriverType) => void;
  clearDriverType: () => void;
}

const DriverTypeContext = createContext<DriverTypeContextValue | undefined>(undefined);

const STORAGE_KEY = 'driverType';

export const DriverTypeProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const location = useLocation();

  const readStored = (): DriverType | null => {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      if (v === 'company' || v === 'individual') return v;
    } catch {}
    return null;
  };

  const [driverType, _setDriverType] = useState<DriverType | null>(() => readStored());

  const persist = (type: DriverType | null) => {
    try {
      if (type) localStorage.setItem(STORAGE_KEY, type);
      else localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  const setDriverType = (type: DriverType) => {
    _setDriverType(type);
    persist(type);
  };

  const clearDriverType = () => {
    _setDriverType(null);
    persist(null);
  };

  // Sync from URL param `type`
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const t = params.get('type');
    if (t === 'company' || t === 'individual') {
      if (t !== driverType) {
        _setDriverType(t);
        persist(t);
      }
    }
  }, [location.search]);

  const value = useMemo<DriverTypeContextValue>(() => ({ driverType, setDriverType, clearDriverType }), [driverType]);

  return <DriverTypeContext.Provider value={value}>{children}</DriverTypeContext.Provider>;
};

export const useDriverType = (): DriverTypeContextValue => {
  const ctx = useContext(DriverTypeContext);
  if (!ctx) throw new Error('useDriverType must be used within DriverTypeProvider');
  return ctx;
};
