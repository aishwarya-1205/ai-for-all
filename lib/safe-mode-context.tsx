"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface SafeModeContextType {
  incognitoMode: boolean;
  setIncognitoMode: (value: boolean) => void;
}

const SafeModeContext = createContext<SafeModeContextType | undefined>(undefined);

export const SafeModeProvider = ({ children }: { children: React.ReactNode }) => {
  const [incognitoMode, setIncognitoMode] = useState(false);

  return (
    <SafeModeContext.Provider value={{ incognitoMode, setIncognitoMode }}>
      <div className={incognitoMode ? "dark-safe-mode" : ""}>
        {children}
      </div>
    </SafeModeContext.Provider>
  );
};

export const useSafeMode = () => {
  const context = useContext(SafeModeContext);
  if (context === undefined) {
    throw new Error("useSafeMode must be used within a SafeModeProvider");
  }
  return context;
};
