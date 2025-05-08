// src/context/FrameDataContext.tsx

import { createContext, useContext, useState, type ReactNode } from "react";
import { frame_data } from "../frameData";


type FrameDataType = typeof frame_data;

const FrameDataContext = createContext<{
  frames: FrameDataType;
  setFrames: React.Dispatch<React.SetStateAction<FrameDataType>>;
} | null>(null);

export const FrameDataProvider = ({ children }: { children: ReactNode }) => {
  const [frames, setFrames] = useState<FrameDataType>(frame_data);

  return (
    <FrameDataContext.Provider value={{ frames, setFrames }}>
      {children}
    </FrameDataContext.Provider>
  );
};

export const useFrameData = () => {
  const context = useContext(FrameDataContext);
  if (!context) {
    throw new Error("useFrameData must be used within FrameDataProvider");
  }
  return context;
};
