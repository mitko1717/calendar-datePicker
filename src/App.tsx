import Calendar from "./components/Calendar";
import { ThemeProvider } from "styled-components";
import { useDarkMode } from "./components/DarkMode";
import { GlobalStyles } from "./components/GlobalStyle";
import { lightTheme, darkTheme } from "./components/Themes";
import "./index.css";

const App = () => {
  const [theme, themeToggler, mountedComponent] = useDarkMode();
  const themeMode = theme === "light" ? lightTheme : darkTheme;
  if (!mountedComponent) return <div />;

  return (
    <ThemeProvider theme={themeMode}>
      <>
        <GlobalStyles />
        <div className="App">
          <Calendar toggleTheme={themeToggler} />
        </div>
      </>
    </ThemeProvider>
  );
};

export default App;
