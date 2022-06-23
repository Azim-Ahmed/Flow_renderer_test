import React, { Component } from "react";
import ReactMapboxGl, { GeoJSONLayer } from "react-mapbox-gl";
import * as turf from "@turf/turf";
import geojsonStyles from "./geojsonStyles";
// import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

const Map = ReactMapboxGl({
    accessToken:
        "pk.eyJ1IjoiZmFrZXVzZXJnaXRodWIiLCJhIjoiY2pwOGlneGI4MDNnaDN1c2J0eW5zb2ZiNyJ9.mALv0tCpbYUPtzT7YysA2g"
});

class NewMap extends Component {
    onDrawCreate = ({ features }) => {
        console.log(features);
    };

    onDrawUpdate = ({ features }) => {
        console.log({ features });
    };

    render() {
        const centerPoint = [-73.975547, 40.691785];

        var radius = 0.1;

        var options = {
            steps: 50,
            units: "miles",
            properties: {
                text: "test"
            }
        };

        const firstCircle = turf.circle(centerPoint, radius, options);

        const secondCircle = turf.circle(centerPoint, radius * 2, options);

        const thirdCircle = turf.circle(centerPoint, radius * 4, options);

        return (
            <div className="App">
                <Map
                    style="mapbox://styles/mapbox/streets-v9" // eslint-disable-line
                    containerStyle={{
                        height: "100vh",
                        width: "100vw"
                    }}
                    zoom={[14]}
                    center={[-73.975547, 40.691785]}
                >
                    {/* <GeoJSONLayer {...geojsonStyles} data={firstCircle} />
                    <GeoJSONLayer {...geojsonStyles} data={secondCircle} />
                    <GeoJSONLayer {...geojsonStyles} data={thirdCircle} /> */}
                </Map>
            </div>
        );
    }
}

export default NewMap;