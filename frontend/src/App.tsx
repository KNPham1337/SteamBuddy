import { ModeToggle } from "./components/mode-toggle";
import { ThemeProvider } from "./components/theme-provider";

import SteamLoginButton from "./components/steamLogin";
import Dashboard from "./components/Dashboard";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ModeToggle />
      <Routes>
        <Route path="/" element={<SteamLoginButton />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
