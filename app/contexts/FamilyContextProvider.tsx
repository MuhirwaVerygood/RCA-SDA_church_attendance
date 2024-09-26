"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FamilyContextType {
  familyDropDownOpened : boolean | null;
  setFamilyDropDownOpened: (familyDropDownOpened: boolean) => void;
}

const FamilyContext = createContext<FamilyContextType | undefined>(undefined);

export const useFamily = () => {
  const context = useContext(FamilyContext);
  if (!context) {
    throw new Error('useFamily must be used within an FamilyContextProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const FamilyContextProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [familyDropDownOpened, setFamilyDropDownOpened] = useState<boolean | null>(null)
  return (
    <FamilyContext.Provider value={{familyDropDownOpened, setFamilyDropDownOpened }}>
      {children}
    </FamilyContext.Provider>
  );
};
