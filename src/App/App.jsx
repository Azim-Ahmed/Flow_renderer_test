import { ReactFlowProvider } from "react-flow-renderer";
import { ThemeProvider } from "@mui/system";
import { FlowCanvas } from "../Pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import theme from "../assets/Theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <ReactFlowProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/flowCanvas" element={<FlowCanvas />} />
            <Route exact path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </ReactFlowProvider>
    </ThemeProvider>
  );
};

export default App;
