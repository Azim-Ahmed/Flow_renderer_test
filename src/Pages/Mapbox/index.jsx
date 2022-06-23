import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { Layout } from "../../components";
import TransitionsModal from "../../components/ReUsable/Modal";
import { v4 as uuidv4 } from "uuid";
/**
 *@function MapBox.jsx
 *@author Azim
 *
 **/

const MapBox = (props) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [updateopen, setUpdateOpen] = useState(false);
  const [clockWithDetails, setClockWithDetails] = useState([]);
  const [clockDetails, setclockDetails] = useState({
    name: "",
    timeZone: "",
    event: "",
    events: [],
    timeDifference: "",
  });

  const handleModalClose = () => {
    setOpen(false);
  };
  const handleUpdateModalClose = () => {
    setUpdateOpen(false);
  };
  const handleSetCreatedTimeZone = (e) => {
    const newUserInfo = { ...clockDetails };
    newUserInfo[e.target.name] = e.target.value;
    setclockDetails(newUserInfo);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    clockDetails.id = uuidv4();
    setClockWithDetails([...clockWithDetails, clockDetails]);
    setclockDetails({
      name: "",
      timeZone: "",
      event: "",
      events: [],
      timeDifference: "",
      id: "",
    });
    handleModalClose();
  };
  const renderUpdateModal = () => {
    return (
      <TransitionsModal open={updateopen} handleClose={handleUpdateModalClose}>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            name="event"
            value={currentTime}
            onChange={handleSetCreatedTimeZone}
            type="datetime-local"
          />
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </form>
      </TransitionsModal>
    );
  };

  return (
    <Layout title="Map-box-gl" noNeed>
      <Box>{updateopen && renderUpdateModal()}</Box>
    </Layout>
  );
};

export default MapBox;
