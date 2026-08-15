import { createContext, useContext } from 'react';

export const LenisContext = createContext(null);

export function useLenisContext() {
  return useContext(LenisContext);
}
