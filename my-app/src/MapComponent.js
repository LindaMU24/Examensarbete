import React, {useEffect, useState, useRef} from 'react';
import { MapContainer, TileLayer, Polyline/*, Marker, Popup*/ } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { geocodeAddress, getRoute } from './apiService';

const MapComponent = ({ locations }) => {
  const [route, setRoute] = useState([]);
  const mapRef = useRef();

  useEffect(() => {
  console.log('Updated locations in MapComponent:', locations);

  const fetchRoute = async () => {
    if (locations.start && locations.end) {
      const startCoords = await geocodeAddress(locations.start);
      const endCoords = await geocodeAddress(locations.end);

      if (startCoords && endCoords) {
        const routeCoords = await getRoute(startCoords, endCoords);
        console.log('Route coordinates:', routeCoords);

        if (routeCoords) {
          const transformedCoords = routeCoords.map(coord => [coord[1], coord[0]]);
          setRoute(transformedCoords);

          console.log('Route for Polyline:', transformedCoords);

          // Fit map bounds to the route
          if (mapRef.current && transformedCoords.length) {
            mapRef.current.setView([63.0, 16.0], 5); // Återställ till standardvy först
            mapRef.current.fitBounds(transformedCoords);
          }
        }
      }
    }
  };

  fetchRoute();
}, [locations]);

  return (
  <MapContainer
    center={[63.0, 16.0]}
    zoom={5}
    style={{ height: "500px", width: "100%" }}
    whenCreated={mapInstance => {
      mapRef.current = mapInstance;
      console.log('Map instance created:', mapRef.current);
    }}
  >
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    />
    {route.length > 0 && (
      <Polyline positions={route.map(coord => [coord[1], coord[0]])} color="blue" />
    )}
  </MapContainer>
);
};

export default MapComponent;