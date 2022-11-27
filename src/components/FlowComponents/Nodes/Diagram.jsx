import CanvasDraw from "react-canvas-draw";

// import ColorPicker, { useColor } from "react-color-palette";
import { useState } from "react";
import TransitionsModal from "../../ReUsable/Modal";
import { Button } from "@mui/material";
import { Box } from "@mui/material";
import Layout from "../../Layout";
function DiagramNode() {
  const [canvas, setBrush] = useState("#FCA5A5");
  const [brush, setThick] = useState(10);
  const [modify, setModify] = useState("");
  const [showimage, setShowImage] = useState({
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
      <Layout>
        <CanvasDraw
          hideInterface
          // hideGrid
          enablePanAndZoom={true}
          onChange={(e) => console.log(e)}
          ref={(canvasDraw) => setModify(canvasDraw)}
          brushColor={canvas}
          clampLinesToDocument
          zoomExtents={{ min: 0.33, max: 4 }}
          brushRadius={brush}
          lazyRadius={1}
          // imgSrc="https://upload.wikimedia.org/wikipedia/commons/a/a1/Nepalese_Mhapuja_Mandala.jpg"
          canvasHeight={850}
          canvasWidth={1900}
        />

        <Button
          variant="contained"
          onClick={() => {
            modify.undo();
          }}
        >
          UNDO
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            setShowImage((prev) => ({
              ...prev,
              open: true,
              getData: modify.getDataURL(),
            }))
          }
        >
          Show
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            modify.clear();
          }}
        >
          CLEAR
        </Button>
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
        <div
          className="thickness"
          style={{ ...style, marginLeft: "40px" }}
        ></div>
        <input
          min="2"
          max="50"
          type="range"
          onChange={(event) => {
            console.log(event.target.value);
            setThick(event.target.value);
          }}
        />

        {showimage.open && (
          <TransitionsModal
            open={showimage.open}
            handleClose={() =>
              setShowImage((prev) => ({ ...prev, open: false, getData: "" }))
            }
          >
            <img src={showimage.getData} alt="" />
            <Box
              display="flex"
              alignItems={"flex-end"}
              justifyContent="flex-end"
            >
              <Button
                variant="contained"
                onClick={() =>
                  setShowImage((prev) => ({
                    ...prev,
                    open: false,
                    getData: "",
                  }))
                }
              >
                Close
              </Button>
            </Box>
          </TransitionsModal>
        )}
      </Layout>
    </div>
  );
}
export default DiagramNode;
