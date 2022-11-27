import CanvasDraw from "react-canvas-draw";

// import ColorPicker, { useColor } from "react-color-palette";
import { useState } from "react";
function DiagramNode() {
  const [canvas, setBrush] = useState("#FCA5A5");
  const [brush, setThick] = useState(50);
  const [modify, setModify] = useState("");
  // const [color, setColor] = useColor("hex", "#121212");
  // const c = "#FCA5A5";
  const style = {
    width: brush + "px",
    background: canvas,
    marginLeft: "50%",
  };
  console.log(style.width);
  return (
    <div className="container">
      <CanvasDraw
        hideInterface
        // hideGrid
        enablePanAndZoom
        onChange={(e) => console.log(e)}
        ref={(canvasDraw) => setModify(canvasDraw)}
        // brushColor={canvas}
        // brushRadius={brush}
        // canvasHeight="50vh"
        // hideGrid={true}
        canvasWidth={1200}
      />
      <button
        onClick={() => {
          modify.undo();
        }}
      >
        UNDO
      </button>
      {/* <button
        onClick={() => {
          modify.undo();
        }}
      >
        UNDO
      </button>
      <button
        onClick={() => {
          modify.clear();
        }}
      >
        CLEAR
      </button>
      <br />
      <label>Colour picker</label>
      <input
        style={{ background: { canvas } }}
        type="color"
        value={canvas}
        onChange={(event) => {
          console.log(event.target.value);
          setBrush(event.target.value);
        }}
      />

      <br />
      <label>Brush Thickness</label>
      <div className="thickness" style={style}></div>
      <input
        min="2"
        max="50"
        type="range"
        onChange={(event) => {
          console.log(event.target.value);
          setThick(event.target.value);
        }}
      /> */}
    </div>
  );
}
export default DiagramNode;
