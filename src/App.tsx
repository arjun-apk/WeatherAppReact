import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/Store";
import { ThemeProvider } from "@mui/material";
import theme from "./theme/theme";
import WeatherLocationPage from "./pages/WeatherLocation/WeatherLocation";
import { useEffect } from "react";
import Connector from "./signalrConnection";

const App = () => {
  useEffect(() => {
    const connector = Connector.getInstance();
    connector.startConnection();

    return () => {
      connector.stopConnection();
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<WeatherLocationPage />} />
          </Routes>
        </Router>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
