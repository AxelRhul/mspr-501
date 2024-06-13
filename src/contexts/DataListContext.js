'use client';

import { createContext, useState } from 'react';

export const DataListContext = createContext();

export const DataListProvider = ({ children }) => {

  const [searchValue, setSearchValue] = useState('');

  return (
    <DataListContext.Provider value={{ setSearchValue, searchValue }}>
      {children}
    </DataListContext.Provider>
  );
};

