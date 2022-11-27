import { makeStyles } from "@mui/styles";
import { Box } from "@mui/material";

const Text = ({ data }) => {
  const classes = useStyles();
  return (
    <div className={classes.customNodeWrapper}>
      <Box borderRadius={"15px"}>
        <Box
          display="flex"
          justifyContent={"center"}
          alignItems="center"
          minHeight={"100px"}
          style={{ background: "#D31C76" }}
        >
          <p style={{ color: "white", textAlign: "center" }}>{data.label}</p>
        </Box>
      </Box>
    </div>
  );
};

export default Text;

const useStyles = makeStyles((theme) => ({
  customNodeWrapper: {
    boxShadow: "0px 7px 12px 0px #00000040",
    borderRadius: "5px",
    minHeight: "100px",
    minWidth: "200px",
    position: "relative",
  },
  leftHandleStyle: {
    background: "#D31C76",
    border: "1px solid #D31C76",
    padding: "10px",
    left: -12,
    zIndex: "-1",
  },

  rightHandleStyle: {
    top: 60,
    right: -12,
    border: "1px solid #D31C76",
    background: "#D31C76",
    padding: "10px",
    zIndex: "-1",
  },
}));
