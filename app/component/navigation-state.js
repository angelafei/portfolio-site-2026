'use client';

import { createContext, useContext, useState } from 'react';

const NavigationContext = createContext(null);

// Share only the mobile menu state; static sections remain server-rendered children.
export function NavigationProvider({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return <NavigationContext.Provider value={{ menuOpen, setMenuOpen }}>{children}</NavigationContext.Provider>;
}

export function useNavigation() {
  const navigation = useContext(NavigationContext);
  if (!navigation) throw new Error('NavigationProvider is required');
  return navigation;
}
