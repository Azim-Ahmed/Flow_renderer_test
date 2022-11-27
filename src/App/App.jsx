import { ReactFlowProvider } from "react-flow-renderer";
import { FlowCanvas } from "../Pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "../Pages/Home";
import theme from "../assets/Theme";
import MapBox from "../Pages/Mapbox";
// import AliveMap from "../Pages/AliveMap";
import NewMap from "../Pages/NewMap";
import { ThemeProvider } from "@mui/material";
import DiagramNode from "../components/FlowComponents/Nodes/Diagram";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <ReactFlowProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<FlowCanvas />} />
            <Route exact path="/flowCanvas" element={<FlowCanvas />} />
            <Route exact path="/diagram" element={<DiagramNode />} />
            <Route exact path="/mapbox" element={<MapBox />} />
            <Route exact path="/NewMap" element={<NewMap />} />
          </Routes>
        </BrowserRouter>
      </ReactFlowProvider>
    </ThemeProvider>
  );
};

export default App;
