import { makeStyles } from "@mui/styles";
import CastConnectedIcon from "@mui/icons-material/CastConnected";
import { Handle } from "react-flow-renderer";
import { Box } from "@mui/system";

const NodeA = ({ data }) => {
  const classes = useStyles();
  return (
    <div className={classes.customNodeWrapper}>
      <Handle
        type="target"
        position="left"
        className={classes.leftHandleStyle}
        connectable="true"
      />
      <Box display="flex" justifyContent={"space-around"}>
        <CastConnectedIcon />
        <Box ml={`10px`}>{data.label}</Box>
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
    boxShadow: "0px 4px 4px 0px #00000040",
    color: "black",
    padding: "20px 40px",
    borderRadius: "5px",
    minHeight: "70px",
    position: "relative",
  },
  leftHandleStyle: {
    background: "#555",
    padding: "3px",
  },

  rightHandleStyle: {
    top: 30,
    background: "#555",
    padding: "3px",
  },
}));
