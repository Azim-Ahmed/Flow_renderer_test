import CanvasDraw from "react-canvas-draw";

// import ColorPicker, { useColor } from "react-color-palette";
import { useState } from "react";
function DiagramNode() {
  const [canvas, setBrush] = useState("#FCA5A5");
  const [brush, setThick] = useState(50);
  const [modify, setModify] = useState("");
  const [image, showImage] = useState({
    open: false,
    getData: "",
  });
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
        enablePanAndZoom={true}
        onChange={(e) => console.log(e)}
        ref={(canvasDraw) => setModify(canvasDraw)}
        brushColor={canvas}
        zoomExtents={{ min: 0.33, max: 4 }}
        brushRadius={brush}
        lazyRadius={1}
        imgSrc="https://upload.wikimedia.org/wikipedia/commons/a/a1/Nepalese_Mhapuja_Mandala.jpg"
        canvasHeight={850}
        canvasWidth={1900}
      />

      <button
        onClick={() => {
          modify.undo();
        }}
      >
        UNDO
      </button>
      <button
        onClick={() =>
          showImage((prev) => ({
            ...prev,
            open: true,
            getData: modify.getDataURL(),
          }))
        }
      >
        Show
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
          setBrush(event.target.value);
        }}
      />

      <br />
      <label>Brush Thickness</label>
      <div className="thickness" style={{ ...style, marginLeft: "40px" }}></div>
      <input
        min="2"
        max="50"
        type="range"
        onChange={(event) => {
          console.log(event.target.value);
          setThick(event.target.value);
        }}
      />
      {image.open && <img src={image.getData} alt="" />}
    </div>
  );
}
export default DiagramNode;