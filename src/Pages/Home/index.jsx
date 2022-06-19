import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { Layout } from "../../components";
import TransitionsModal from "../../components/ReUsable/Modal";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
/**
 *@function Home.jsx
 *@author Azim
 *
 **/

const Home = (props) => {
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
  const [clockUpdateDetails, setclockUpdateDetails] = useState({});
  const handleSetTime = (e) => {
    return setCurrentTime(e.target.value);
  };
  const handleCreateTimeZone = () => {
    setOpen(true);
  };
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
  const updateCurrentTimeZone = (item) => {
    setUpdateOpen(true);
    setclockUpdateDetails(item);
  };
  const renderUpdateModal = () => {
    return (
      <TransitionsModal open={updateopen} handleClose={handleUpdateModalClose}>
        {console.log(clockUpdateDetails)}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            name="name"
            value={clockUpdateDetails?.name}
            onChange={handleSetCreatedTimeZone}
            type="text"
          />
          <TextField
            fullWidth
            name="timeZone"
            value={clockUpdateDetails?.timeZone}
            onChange={handleSetCreatedTimeZone}
            type="datetime-local"
          />
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
    <Layout title="Time-track-zone" noNeed>
      <Box>
        <h1>
          User can set their own time and timezone, this clock can’t be deleted
          only be edited
        </h1>
        <TextField
          value={currentTime}
          onChange={handleSetTime}
          type="datetime-local"
        />
      </Box>
      <Box>
        <h1>User can create as many clock as they want</h1>- Each clock has
        their own title or name - Own Timezone - Simple Events with time - Time
        difference between users timezone and clock timezone in hour and minute
        <br />
        <Button variant="contained" color="info" onClick={handleCreateTimeZone}>
          Create your timeZone
        </Button>
        {updateopen && renderUpdateModal()}
        <TransitionsModal open={open} handleClose={handleModalClose}>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              name="name"
              value={clockDetails?.name}
              onChange={handleSetCreatedTimeZone}
              type="text"
            />
            <TextField
              fullWidth
              name="timeZone"
              value={clockDetails?.timeZone}
              onChange={handleSetCreatedTimeZone}
              type="datetime-local"
            />
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
      </Box>
      <Box>
        {clockWithDetails &&
          clockWithDetails.map((item) => (
            <Box
              style={{ display: "flex", justifyContent: "space-around" }}
              key={item?.id}
            >
              <h1>{item?.name}</h1>
              {format(
                new Date(item?.timeZone),
                "MMMM dd, yyyy, hh:mm:ss aaaaa'm'"
              )}
              <Button
                variant="contained"
                onClick={() => updateCurrentTimeZone(item)}
                color="primary"
              >
                Edit
              </Button>
              <Button
                onClick={() =>
                  setClockWithDetails(
                    clockWithDetails.filter((items) => items?.id !== item?.id)
                  )
                }
                variant="contained"
                color="primary"
              >
                Delete
              </Button>
            </Box>
          ))}
      </Box>
    </Layout>
  );
};

export default Home;
