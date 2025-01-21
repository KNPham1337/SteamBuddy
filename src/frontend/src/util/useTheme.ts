import { useContext, createContext } from "react";
import { ThemeProviderState } from "../types/theme";

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

export const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export const useTheme = (ThemeProviderContext: React.Context<ThemeProviderState>) => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};