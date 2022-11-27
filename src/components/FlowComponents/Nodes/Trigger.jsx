import { makeStyles } from "@mui/styles";
// import CastConnectedIcon from "@mui/icons-material/CastConnected";
import { Handle } from "react-flow-renderer";
import { Box } from "@mui/material";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { useState } from "react";

import { aws } from "../../../assets";
import { Button } from "@mui/material";
const NodeA = ({ data }) => {
  const [state, setState] = useState(false);
  const classes = useStyles();
  return (
    <div className={classes.customNodeWrapper}>
      <Handle
        type="target"
        position="left"
        className={classes.leftHandleStyle}
        connectable="true"
      />

      <Box
        display="flex"
        position={"absolute"}
        top={5}
        right={3}
        justifyContent={"space-around"}
      >
        <Button
          style={{ margin: "-1px -19px", padding: "0 0", zIndex: "10" }}
          size="small"
        >
          <CancelRoundedIcon style={{ color: "#807EC9", fill: "#ccc" }} />
        </Button>
      </Box>
      <Box
        display="flex"
        position={"absolute"}
        top={92}
        left={0}
        justifyContent={"space-around"}
      >
        <Button
          onClick={() => setState(!state)}
          style={{ margin: "-1px -16px", padding: "0 0" }}
          size="small"
        >
          <CheckCircleRoundedIcon style={{ fill: state ? "red" : "#cccc" }} />
        </Button>
      </Box>
      {/* <Box display="flex" justifyContent={"space-around"}>
        <CastConnectedIcon />
        <Box ml={`10px`}>{data.label}</Box>
      </Box> */}
      <Box borderRadius={"15px"}>
        <Box
          display="flex"
          justifyContent={"center"}
          alignItems="center"
          minHeight={"40px"}
          style={{ background: "#807EC9" }}
        >
          <p style={{ color: "white", textAlign: "center" }}>{data.label}</p>
        </Box>
        <Box style={{ background: "rgba(223, 224, 255, 1)" }}>
          <Box
            display="flex"
            justifyContent={"center"}
            alignItems="center"
            minHeight={"40px"}
          >
            <AccountTreeIcon
              style={{
                fill: "#807EC9",
              }}
            />
            <p
              style={{
                color: "black",
                textAlign: "center",
                marginLeft: "30px",
                fontWeight: "600",
              }}
            >
              CVE - Detected
            </p>
          </Box>
        </Box>
        <Box style={{ background: "white" }}>
          <Box
            display="flex"
            justifyContent={"center"}
            alignItems="center"
            minHeight={"40px"}
          >
            <img height={30} width={30} src={aws} alt="aws icon" />
            <p
              style={{
                color: "black",
                textAlign: "center",
                marginLeft: "30px",
                fontSize: "12px",
                fontWeight: "600",
              }}
            >
              US-EAST-02
            </p>
          </Box>
        </Box>
      </Box>
      <Handle
        type="source"
        position="right"
        id="a"
        className={classes.rightHandleStyle}
      />
    </div>
  );
};

export default NodeA;

const useStyles = makeStyles((theme) => ({
  customNodeWrapper: {
    background: "rgba(223, 224, 255, 1)",
    boxShadow: "0px 7px 7px 0px #00000040",
    borderRadius: "5px",
    minHeight: "100px",
    minWidth: "350px",
    position: "relative",
  },
  leftHandleStyle: {
    background: "#807EC9",
    border: "1px solid #807EC9",
    padding: "10px",
    left: -12,
    zIndex: "-1",
  },

  rightHandleStyle: {
    top: 60,
    right: -12,
    border: "1px solid #807EC9",
    background: "#807EC9",
    padding: "10px",
    zIndex: "-1",
  },
}));
