import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";
import MarkerSchool from "./MarkerSchool";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Map extends Component {
  static defaultProps = {
    center: {
      lat: 23.5880,
      lng: 58.3829,
    },
    zoom: 8,
  };

  render() {
    return (
      <div style={{ height: "100%", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAB19cc3h73Ea8OIaZ7k7sR14SitSsWM1M" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {this.props.busesLocationArray && this.props.busesLocationArray.map((busLoc, index) => {
            return (
                <Marker key={index} lat={busLoc.location.coords.latitude} lng={busLoc.location.coords.longitude} busNo={busLoc.busNo}/>
            );
          })}
          {this.props.school && this.props.school.location && <MarkerSchool lat={this.props.school.location.latitude} lng={this.props.school.location.longitude}/>}
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;
