import React from "react";
import ReactMapboxGl, { GeoJSONLayer } from "react-mapbox-gl";
import * as turf from "@turf/turf";
import geojsonStyles from "./geojsonStyles";
import 'mapbox-gl/dist/mapbox-gl.css';
import { Box, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled, alpha } from '@mui/material/styles';
// import EditIcon from '@mui/icons-material/Edit';
// import Divider from '@mui/material/Divider';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Layout from '../components/Layout';
import { useEffect } from 'react';
import axios from '../App/api';
import { useState } from 'react';

const Map = ReactMapboxGl({
    accessToken:
        "pk.eyJ1IjoiZmFrZXVzZXJnaXRodWIiLCJhIjoiY2pwOGlneGI4MDNnaDN1c2J0eW5zb2ZiNyJ9.mALv0tCpbYUPtzT7YysA2g"
});

const NewMap = () => {
    const onDragStart = (features) => {
        // console.log(features);
    };
    const [initCountry, setInitCountry] = useState("Berlin")
    const [countryData, setcountryData] = useState([])
    const centerPoint = [-73.975547, 40.691785];
    const radius = 0.1;
    const options = {
        steps: 50,
        units: "miles",
        properties: {
            text: "GeoLocation"
        }
    };
    const firstCircle = turf.circle(countryData?.latlng, radius, options);
    const secondCircle = turf.circle(countryData?.latlng, radius * 2, options);
    const thirdCircle = turf.circle(countryData?.latlng, radius * 4, options);
    const StyledMenu = styled((props) => (
        <Menu
            elevation={0}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            {...props}
        />
    ))(({ theme }) => ({
        '& .MuiPaper-root': {

            borderRadius: 6,
            marginTop: theme.spacing(1),
            minWidth: 180,
            color:
                theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
            boxShadow:
                'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
            '& .MuiMenu-list': {
                padding: '4px 0',
            },
            '& .MuiMenuItem-root': {
                '& .MuiSvgIcon-root': {
                    fontSize: 18,
                    color: theme.palette.text.secondary,
                    marginRight: theme.spacing(1.5),
                },
                '&:active': {
                    backgroundColor: alpha(
                        theme.palette.primary.main,
                        theme.palette.action.selectedOpacity,
                    ),
                },
            },
        },
    }));
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const getData = async () => {
        const dataaa = await axios.get(`/${initCountry}`)
        return dataaa;
    }
    useEffect(() => {
        getData().then(res => setcountryData(res.data[0]))
    }, [initCountry])
    console.log({ countryData })
    const renderCountries = () => {
        return (
            <Box mt="20px" textAlign="center">
                <Button
                    id="demo-customized-button"
                    aria-controls={open ? 'demo-customized-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    variant="contained"
                    disableElevation
                    onClick={handleClick}
                    endIcon={<KeyboardArrowDownIcon />}
                >
                    Select Country
                </Button>
                <StyledMenu
                    id="demo-customized-menu"
                    MenuListProps={{
                        'aria-labelledby': 'demo-customized-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem
                        onClick={() => {
                            setInitCountry("Berlin")
                            handleClose()
                        }}
                        disableRipple>
                        Berlin
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            setInitCountry("Paris")
                            handleClose()
                        }}
                        disableRipple>
                        Paris
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            setInitCountry("Paris")
                            handleClose()
                        }}
                        disableRipple>
                        Brussels
                    </MenuItem>
                </StyledMenu>
            </Box>
        )
    }
    if (!countryData) return null;
    return (
        <Layout title="Map-box" noNeed>
            <Grid container fluid="true">
                <Grid item sm={2} md={2} >
                    {renderCountries()}
                </Grid>
                <Grid item sm={8} md={8} >
                    <Map
                        onDragStart={onDragStart}
                        style="mapbox://styles/mapbox/streets-v9" // eslint-disable-line
                        containerStyle={{
                            height: `calc(100vh - 75px)`,
                            width: `calc(100vw - 280px)`
                        }}
                        zoom={[14]}
                        center={countryData?.latlng}
                    >
                        <GeoJSONLayer {...geojsonStyles} data={firstCircle} />
                        <GeoJSONLayer {...geojsonStyles} data={secondCircle} />
                        <GeoJSONLayer {...geojsonStyles} data={thirdCircle} />
                    </Map>
                </Grid>

            </Grid>
        </Layout>
    );
}


export default NewMap;