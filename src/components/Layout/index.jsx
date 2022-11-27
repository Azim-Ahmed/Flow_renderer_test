import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import DataObjectIcon from "@mui/icons-material/DataObject";
import { saveCanvas, toJSON } from "../../helpers";
import { Tooltip } from "@mui/material";
import { NavLink } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

const Layout = ({
  flowImageDownloadRef,
  children,
  downloadJSON,
  jsonInput,
  setJsonInput,
  convert,
  title,
  noNeed,
}) => {
  const navigate = useNavigate();
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {noNeed ? title : "Flow-renderer-test"}
          </Typography>
          {noNeed ? (
            ""
          ) : (
            <Box display="flex" gap={2} alignItems="center">
              <Box mr="8px">
                <Tooltip
                  title={`Download as an Image/png`}
                  placement="bottom"
                  arrow
                >
                  <Button
                    variant="outlined"
                    onClick={() =>
                      downloadJSON.length === 0
                        ? alert("you have no nodes to download")
                        : saveCanvas(flowImageDownloadRef)
                    }
                    color="inherit"
                  >
                    <FileDownloadIcon />
                  </Button>
                </Tooltip>
              </Box>
              <Box mr="8px">
                <Tooltip title={`draw on the node`} placement="bottom" arrow>
                  <Button
                    variant="outlined"
                    onClick={() => navigate("/diagram")}
                    // onClick={() =>
                    //   downloadJSON.length === 0
                    //     ? alert("you have no nodes to download")
                    //     : saveCanvas(flowImageDownloadRef)
                    // }
                    color="inherit"
                  >
                    <EditIcon />
                  </Button>
                </Tooltip>
              </Box>
              <Box mr="8px">
                <Tooltip title={`Go to mapbox`} placement="bottom" arrow>
                  <NavLink
                    style={{
                      padding: "6px",
                      border: "2px solid white",
                      borderRadius: "4px",
                    }}
                    to="/NewMap"
                  >
                    MapBox
                  </NavLink>
                </Tooltip>
              </Box>
              <Box mr="8px">
                <Tooltip title={`Download as json`} placement="bottom" arrow>
                  <Button
                    variant="outlined"
                    onClick={() =>
                      downloadJSON.length === 0
                        ? alert("you have no nodes to download JSON")
                        : toJSON(downloadJSON)
                    }
                    color="inherit"
                  >
                    <DataObjectIcon />
                  </Button>
                </Tooltip>
              </Box>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Box>{children}</Box>
    </Box>
  );
};
export default Layout;
