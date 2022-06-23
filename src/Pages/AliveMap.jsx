import React, { useRef, useEffect, useState } from "react";
// import CustomTextField from "../../components/customTextField/customTextField.component";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { Button, FormControl, TextField } from "@mui/material";
// import CustomButton from "../../components/customButton/customButton.component";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import useItems from "../../hooks/useItems";
import { Navigate } from "react-router-dom";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1Ijoic2hpdmFtMjU2IiwiYSI6ImNrb3N1MnJnZDA0emoycHJ4anBoNWJ4NjQifQ.mObap8E6MFXkAta7s4MMOw",
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Electronic",
  "Expensive",
  "Cheap",
  "Wooden",
  "Money",
  "Wallet",
  "Clothes",
  "Footwear",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const AliveMap = () => {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [userLocation, setUserLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [data, setData] = useState({
    title: "",
    description: "",
    address: "",
  });
  const [itemImages, setItemImages] = useState([]);

  const { postFoundItem } = useItems();

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
  }, []);

  // const mapContainer = useRef(null);
  // const map = useRef(null);
  // const [lng, setLng] = useState(-70.9);
  // const [lat, setLat] = useState(42.35);
  // const [zoom, setZoom] = useState(9);

  // useEffect(() => {
  //   if (map.current) return; // initialize map only once
  //   map.current = new mapboxgl.Map({
  //     container: mapContainer.current,
  //     style: "mapbox://styles/mapbox/streets-v11",
  //     center: [lng, lat],
  //     zoom: zoom,
  //   });
  // });

  const fileHandler = () => {
    let widget = window.cloudinary.createUploadWidget(
      {
        cloudName: `dx1ye2bro`,
        uploadPreset: `kp2gvmnk`,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          // setData({ ...data, thumbnail: result.info.url });
          console.log(result.info.url);
          setItemImages((images) => [...images, result.info.url]);
        }
      }
    );
    widget.open();
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handlePost = () => {
    // console.log(data);
    // console.log(itemImages);
    // console.log(personName);

    const locationData = {
      name: data.address,
      coordinates: [userLocation.latitude, userLocation.longitude],
    };

    const newData = {
      title: data.title,
      description: data.description,
      location: locationData,
      images: [...itemImages],
      tage: [...personName],
    };

    console.log(newData);
    postFoundItem(newData);
    Navigate();
  };

  const handleTextChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    console.log(userLocation);
  }, [userLocation]);

  return (
    <div className="w-full flex flex-col mb-24">
      <h1 className="text-3xl text-[#2F2E41] font-bold mb-3">
        Found Something?
      </h1>
      <div className="w-full flex flex-col gap-5">
        <TextField
          label="Item name"
          name="title"
          fullWidth
          onChange={handleTextChange}
        />
        <TextField
          label="Item description"
          multiline
          rows={4}
          fullWidth
          name="description"
          onChange={handleTextChange}
        />
      </div>
      <div className="mt-5">
        <h1 className="text-2xl text-[#2F2E41] font-bold mb-2">
          Upload images
        </h1>
        <Button
          sx={{
            backgroundColor: "#6C63FF",
            color: "#fff",
            padding: "5px 20px",
            "&:hover": { backgroundColor: "#6C63FF", color: "#fff" },
          }}
          onClick={fileHandler}
        >
          UPLOAD
        </Button>
      </div>
      <div className="mt-5 w-full">
        <h1 className="text-2xl text-[#2F2E41] font-bold mb-5">Add tags</h1>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-chip-label">Tags</InputLabel>

          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={personName}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            sx={{ width: "100%" }}
            MenuProps={MenuProps}
          >
            {names.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, personName, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="mt-5">
        <h1 className="text-2xl text-[#2F2E41] font-bold mb-5">
          Pick location where you find the item
        </h1>
        <TextField
          label="Type Address"
          multiline
          rows={4}
          fullWidth
          name="address"
          onChange={handleTextChange}
          sx={{ marginBottom: "20px" }}
        />
        <Map
          style="mapbox://styles/mapbox/streets-v9"
          containerStyle={{
            height: "30vh",
            width: "90vw",
          }}
          center={[userLocation.longitude, userLocation.latitude]}
        >
          <Layer
            type="symbol"
            id="marker"
            layout={{ "icon-image": "marker-15" }}
          >
            <Feature
              coordinates={[userLocation.longitude, userLocation.latitude]}
            />
          </Layer>
        </Map>
        {/* <img
          src="https://media.wired.com/photos/59269cd37034dc5f91bec0f1/191:100/w_1280,c_limit/GoogleMapTA.jpg"
          alt=""
          className="full h-2/3 object-cover"
        /> */}
      </div>
      <div className="w-full flex flex-col items-center mt-5">
        <Button onClick={handlePost}>POST</Button>
      </div>
    </div>
  );
};

export default AliveMap;
