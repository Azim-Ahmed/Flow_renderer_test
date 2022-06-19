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
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {noNeed ? title : "Flow-renderer-test"}
          </Typography>
          {noNeed ? (
            ""
          ) : (
            <Box>
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
      {children}
    </Box>
  );
};
export default Layout;
