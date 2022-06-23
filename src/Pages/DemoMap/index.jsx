import "mapbox-gl/dist/mapbox-gl.css";
import { useState } from "react";

import { Map as _ReactMapboxGl, Layer, Feature } from "react-mapbox-gl";

const GERMANY_BOUNDS = [
  [3, 40],
  [16, 56],
];

// const ReactMapboxGl = _ReactMapboxGl({
//   accessToken:
//     "pk.eyJ1IjoiZWNsZXZlciIsImEiOiJja3IzM3B3b24yMHNsMnBueGNya3I4eXExIn0.qNBd6dRRZLTTxKSJ0PUazg",
// });
const ReactMapboxGl = _ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiZmFicmljOCIsImEiOiJjaWc5aTV1ZzUwMDJwdzJrb2w0dXRmc2d0In0.p6GGlfyV-WksaDV_KdN27A",
  minZoom: 8,
  maxZoom: 15,
});
const flyToOptions = {
  speed: 0.8,
};

const Map = (children) => {
  const [initState, setInitState] = useState({
    fitBounds: undefined,
    center: [-0.109970527, 51.52916347],
    zoom: [11],
    station: undefined,
    stations: {},
  });

  return (
    <>
      <ReactMapboxGl
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: "100vh",
          width: "100vw",
          background: "#333",
          flex: 1,
        }}
        flyToOptions={flyToOptions}
        fitBounds={GERMANY_BOUNDS}
        // containerStyle={{ width: "100%", height: "100%" }}
      >
        {/* {children} */}
        <Layer
          type="symbol"
          id="marker"
          layout={{ "icon-image": "londonCycle" }}
        >
          <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
        </Layer>
      </ReactMapboxGl>
    </>
  );
};

export default Map;
