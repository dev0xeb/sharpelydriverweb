import { useState, useCallback, useEffect } from 'react';
import { SIDEBAR_ITEMS } from '../utils/constants';
import { useNavigate } from 'react-router-dom';

interface NavigationItem {
  icon: string; // Imported image source
  label: string;
  active: boolean;
  href?: string;
  onClick?: () => void;
}

interface UseNavigationOptions {
  initialItems?: NavigationItem[];
  activeIndex?: number;
}

export const useNavigation = (options: UseNavigationOptions = {}) => {
  const { initialItems = SIDEBAR_ITEMS, activeIndex = 0 } = options;
  const navigate = useNavigate();
  
  const [navigationItems, setNavigationItems] = useState(() => 
    initialItems.map((item, index) => ({
      ...item,
      active: index === activeIndex
    }))
  );

  const setActiveItem = useCallback((index: number) => {
    setNavigationItems(prev => 
      prev.map((item, i) => ({
        ...item,
        active: i === index
      }))
    );
  }, []);

  const addNavigationHandler = useCallback((index: number, handler: () => void) => {
    setNavigationItems(prev => 
      prev.map((item, i) => 
        i === index ? { ...item, onClick: handler } : item
      )
    );
  }, []);

  // Attach navigation handlers for all items with href
  useEffect(() => {
    initialItems.forEach((item, index) => {
      if (item.href) {
        addNavigationHandler(index, () => navigate(item.href!));
      }
    });
  }, [addNavigationHandler, navigate, initialItems]);

  return {
    navigationItems,
    setActiveItem,
    addNavigationHandler,
  };
};
