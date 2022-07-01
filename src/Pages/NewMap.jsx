import { useEffect } from "react";
import React from "react";
import ReactMapboxGl, { Popup, Marker } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Box, Grid, TextField, Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import Layout from "../components/Layout";
import styled from "@emotion/styled";
import axios from "../App/api";
import { useState } from "react";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiZmFrZXVzZXJnaXRodWIiLCJhIjoiY2pwOGlneGI4MDNnaDN1c2J0eW5zb2ZiNyJ9.mALv0tCpbYUPtzT7YysA2g",
});

const NewMap = () => {
  const [initCountry, setInitCountry] = useState("");
  const [openPopUpForColor, setOpenPopUpForColor] = useState(false);
  const [color, setColor] = useState("#e74c3c");
  const [userLocation, setUserLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const Mark = styled.div`
    background-color: ${color};
    border-radius: 2px;
    width: 32px;
    height: 32px;
    border: 4px solid #eaa29b;
  `;
  useEffect(() => {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        (cords) => {
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
            <Divider />
            <MenuItem
              onClick={() => {
                setInitCountry("Paris");
              }}
              disableRipple
            >
              Paris
            </MenuItem>
            <Divider />
            <MenuItem
              onClick={() => {
                setInitCountry("Brussels");
              }}
              disableRipple
            >
              Brussels
            </MenuItem>
          </MenuList>
        </Paper>
      </Box>
    );
  };
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
            onClick={() => setOpenPopUpForColor(false)}
            zoom={[8]}
            center={[userLocation.longitude, userLocation.latitude]}
          >
            {openPopUpForColor && (
              <Popup
                coordinates={[userLocation.longitude, userLocation.latitude]}
                style={{ minHeight: "30px", minWidth: "200px" }}
                offset={{
                  "bottom-left": [12, -38],
                  bottom: [0, -38],
                  "bottom-right": [-12, -38],
                }}
              >
                <Box>
                  <Typography align="center">Change your Color</Typography>
                  <Box my="20px">
                    <TextField
                      value={color}
                      fullWidth
                      type="color"
                      onChange={(e) => setColor(e.target.value)}
                    />
                  </Box>
                </Box>
              </Popup>
            )}
            <Marker
              coordinates={[userLocation.longitude, userLocation.latitude]}
            >
              <Mark onClick={() => setOpenPopUpForColor(!openPopUpForColor)} />
            </Marker>
          </Map>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default NewMap;
