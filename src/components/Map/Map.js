import React, { Component } from 'react';
import {
  MapContainer, TileLayer,
} from 'react-leaflet';
import MarkerComponent from './Marker/Marker';
import '../../scss/base/_map.scss';

class MapComponent extends Component {
  state = {
    lat: 51.765,
    lng: 19.47,
    zoom: 13,
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <>
        <MapContainer className="map" center={position} zoom={12} scrollWheelZoom>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MarkerComponent />
        </MapContainer>
      </>
    );
  }
}

export default MapComponent;
