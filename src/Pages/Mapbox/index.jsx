// import * as React from "react";
// import ReactMapboxGl, { Marker } from "../../../";
// import styled from "@emotion/styled"
// import Dropdown from "../dropdown";

// // tslint:disable-next-line:no-var-requires
// const { token, styles } = require("./config.json");
// const geocodingUrl = "https://api.mapbox.com/geocoding/v5";
// // tslint:disable-next-line:max-line-length
// const mapboxGeocoding = (query) =>
//   `${geocodingUrl}/mapbox.places/${query}.json?access_token=${token}`;

// const Container = styled.div`
//   position: relative;
//   height: 100%;
//   flex: 1;
// `;

// const Mark = styled.div`
//   background-color: #e74c3c;
//   border-radius: 50%;
//   width: 20px;
//   height: 20px;
//   border: 4px solid #eaa29b;
// `;

// const Map = ReactMapboxGl({ accessToken: token });

// const mapStyle = {
//   width: "100%",
//   height: "100%",
// };

// const req = (url, body, method = "GET") =>
//   new Request(url, {
//     method,
//     headers: new Headers({
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       "Accept-Charset": "utf-8",
//     }),
//     body,
//   });

// class HtmlFeatures extends React.Component {
//   state = {
//     query: "",
//     options: [],
//     selected: undefined,
//     center: [-0.1148677, 51.5139573],
//   };

//   fetch = (query) => {
//     fetch(req(mapboxGeocoding(query)))
//       .then((res) => res.json())
//       .then((data) => {
//         this.setState({
//           options: data.features
//             .filter((place) => place.place_type.includes("poi"))
//             .map((poi) => ({
//               id: poi.id,
//               center: poi.center,
//               name: poi.text,
//             })),
//         });
//       });
//   };

//   onSelectItem = (index) => {
//     const selected = this.state.options[index];
//     this.setState({
//       selected,
//       center: selected.center,
//     });
//   };

//   onSearch = (query) => {
//     this.setState({ query });
//     this.fetch(query);
//   };

//   onStyleLoad = (map) => {
//     const { onStyleLoad } = this.props;
//     return onStyleLoad && onStyleLoad(map);
//   };

//   render() {
//     const { options, selected, center } = this.state;
//     return (
//       <Container>
//         <Dropdown
//           onSearch={this.onSearch}
//           onSelectItem={this.onSelectItem}
//           options={options}
//         />
//         <Map
//           style={styles.light}
//           containerStyle={mapStyle}
//           center={center}
//           onStyleLoad={this.onStyleLoad}
//         >
//           {selected && (
//             <Marker coordinates={selected.center}>
//               <Mark />
//             </Marker>
//           )}
//         </Map>
//       </Container>
//     );
//   }
// }

// export default HtmlFeatures;
