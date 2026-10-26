import React, { createContext, useContext, useState, useEffect } from 'react';

interface MotionContextType {
  motionEnabled: boolean;
  toggleMotion: () => void;
  shouldReduceMotion: boolean;
}

const MotionContext = createContext<MotionContextType>({
  motionEnabled: true,
  toggleMotion: () => {},
  shouldReduceMotion: false,
});

export const MotionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to motion enabled so users can see all rich animations
  const [motionEnabled, setMotionEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('motion_preference');
    if (saved !== null) {
      return saved === 'enabled';
    }
    return true; // default enabled
  });

  useEffect(() => {
    localStorage.setItem('motion_preference', motionEnabled ? 'enabled' : 'disabled');
  }, [motionEnabled]);

  const toggleMotion = () => {
    setMotionEnabled((prev) => !prev);
  };

  return (
    <MotionContext.Provider
      value={{
        motionEnabled,
        toggleMotion,
        shouldReduceMotion: !motionEnabled,
      }}
    >
      {children}
    </MotionContext.Provider>
  );
};

export const useAppMotion = () => useContext(MotionContext);
