import { ModeToggle } from "./components/mode-toggle";
import { ThemeProvider } from "./components/theme-provider";

import SteamLoginButton from "./components/steamLogin";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <ModeToggle />
        <SteamLoginButton />
      </ThemeProvider>
    </>
  );
}

export default App;
