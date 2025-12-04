import React from 'react';
import { MapContainer, TileLayer/*, Marker, Popup*/ } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
   
   const MapComponent = () => {
  return (
    <MapContainer center={[63.0, 16.0]} zoom={5} style={{ height: "500px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {/* Jag ska lägga till markörer här för laddstationer i framtiden */}
    </MapContainer>
  );
}

   export default MapComponent;