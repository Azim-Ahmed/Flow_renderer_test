/* eslint-disable no-restricted-globals */
import CanvasDraw from "react-canvas-draw";
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
  const style = {
    width: brush + "px",
    background: canvas,
    marginLeft: "50%",
  };
  console.log(style.width);
  var width = window.innerWidth > 0 ? window.innerWidth : screen.width;
  return (
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
        canvasWidth={width - 20}
      />

      <Box
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          style={{
            background: "#F8F8F8",
            maxWidth: "500px",
            minWidth: "450px",
            textAlign: "center",
            padding: "10px",
            boxShadow: "7px 7px 7px 2px gray",
          }}
        >
          <Button
            variant="contained"
            color="warning"
            onClick={() => {
              modify.undo();
            }}
          >
            UNDO
          </Button>
          <Button
            variant="contained"
            color="success"
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
        </Box>
      </Box>

      {showimage.open && (
        <TransitionsModal
          open={showimage.open}
          handleClose={() =>
            setShowImage((prev) => ({ ...prev, open: false, getData: "" }))
          }
        >
          <img src={showimage.getData} alt="" />
          <Box display="flex" alignItems={"flex-end"} justifyContent="flex-end">
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
  );
}
export default DiagramNode;
