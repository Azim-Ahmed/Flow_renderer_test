import { useEffect } from "react";
import React from "react";
import ReactMapboxGl, {
  GeoJSONLayer,
  Layer,
  Feature,
  Popup,
  Marker,
} from "react-mapbox-gl";
import * as turf from "@turf/turf";
import geojsonStyles from "./geojsonStyles";
import "mapbox-gl/dist/mapbox-gl.css";
import { Box, Grid } from "@mui/material";
// import Button from '@mui/material/Button';
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Cloud from "@mui/icons-material/Cloud";
import Layout from "../components/Layout";
import styled from "@emotion/styled";
import axios from "../App/api";
import { useState } from "react";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiZmFrZXVzZXJnaXRodWIiLCJhIjoiY2pwOGlneGI4MDNnaDN1c2J0eW5zb2ZiNyJ9.mALv0tCpbYUPtzT7YysA2g",
});

const WithGeoJSON = () => {
  const [initCountry, setInitCountry] = useState("");
  const [countryData, setcountryData] = useState({});
  const [userLocation, setUserLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const radius = 0.1;
  const options = {
    steps: 50,
    units: "kilometers",
    properties: {
      text: "GeoLocation",
    },
  };
  const Mark = styled.div`
    background-color: #e74c3c;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    border: 4px solid #eaa29b;
  `;
  useEffect(() => {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        (cords) => {
          console.log(cords);
          setUserLocation({
            latitude: cords.coords.latitude,
            longitude: cords.coords.longitude,
          });
        },
        (err) => {
          console.log("err", err);
        }
      );
    }
  }, [initCountry]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(
    () => async () => {
      try {
        if (initCountry) {
          const res = await axios.get(`/${initCountry}`);
          setUserLocation({
            latitude: res.data[0].latlng[0],
            longitude: res.data[0].latlng[1],
          });
          setInitCountry("");
        }
      } catch (error) {
        console.log({ error });
      }
    },
    [initCountry, userLocation]
  );
  // console.log({ countryData })
  const layoutLayer = { "icon-image": "londonCycle" };
  const locationData = {
    name: "azim",
    coordinates: [userLocation.latitude, userLocation.longitude],
  };

  // Create an image for the Layer
  const image = new Image();
  image.src = "data:image/svg+xml;charset=utf-8;base64," + btoa("svg");
  const images = ["londonCycle", image];

  const firstCircle = turf.circle(
    [userLocation.longitude, userLocation.latitude],
    radius,
    options
  );
  const renderCountries = () => {
    return (
      <Box mt="20px" textAlign="center">
        <Paper sx={{ width: 320, maxWidth: "100%" }}>
          <MenuList>
            <MenuItem
              onClick={() => {
                setInitCountry("Berlin");
              }}
              disableRipple
            >
              Berlin
            </MenuItem>
            <MenuItem
              onClick={() => {
                setInitCountry("Paris");
              }}
              disableRipple
            >
              Paris
            </MenuItem>
            <MenuItem
              onClick={() => {
                setInitCountry("Brussels");
              }}
              disableRipple
            >
              Brussels
            </MenuItem>
            <Divider />
            <MenuItem>
              <ListItemIcon>
                <Cloud fontSize="small" />
              </ListItemIcon>
              <ListItemText>Web Clipboard</ListItemText>
            </MenuItem>
          </MenuList>
        </Paper>
      </Box>
    );
  };
  if (!countryData) return null;
  return (
    <Layout title="Map-box" noNeed>
      <Grid container fluid="true">
        <Grid item sm={2} md={2}>
          {renderCountries()}
        </Grid>
        <Grid item sm={8} md={8}>
          <Map
            style="mapbox://styles/mapbox/streets-v9" // eslint-disable-line
            containerStyle={{
              height: `calc(100vh - 75px)`,
              width: `calc(100vw - 280px)`,
            }}
            zoom={[14]}
            center={[userLocation.longitude, userLocation.latitude]}
          >
            <Popup
              coordinates={[userLocation.longitude, userLocation.latitude]}
              offset={{
                "bottom-left": [12, -38],
                bottom: [0, -38],
                "bottom-right": [-12, -38],
              }}
            >
              <h1> This is Awesome</h1>
            </Popup>
            <GeoJSONLayer {...geojsonStyles} data={firstCircle} />
            {/* <Layer type="symbol" id="marker" layout={layoutLayer}>
                            <Feature
                                coordinates={[userLocation.longitude, userLocation.latitude]}
                            />
                        </Layer> */}
            <Marker
              coordinates={[userLocation.longitude, userLocation.latitude]}
            >
              <Mark />
            </Marker>
          </Map>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default WithGeoJSON;
