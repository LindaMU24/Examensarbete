import React, {useEffect, useState, useRef} from 'react';
import { MapContainer, TileLayer, Polyline/*, Marker, Popup*/ } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { geocodeAddress, getRoute } from './apiService';


const MapComponent = ({ locations }) => {
  const [route, setRoute] = useState([]);
  const mapRef = useRef();

  useEffect(() => {
    const fetchRoute = async () => {
      if (locations.start && locations.end) {
        const startCoords = await geocodeAddress(locations.start);
        const endCoords = await geocodeAddress(locations.end);
        console.log('Startkoordinater:', startCoords);
        console.log('Slutkoordinater:', endCoords);
        if (startCoords && endCoords) {
          const routeCoords = await getRoute(startCoords, endCoords);
          console.log('Ruttkoordinater:', routeCoords);
          setRoute(routeCoords);

          // Fit map bounds to the route
          if (mapRef.current && routeCoords.length) {
            const bounds = routeCoords.map(coord => [coord[1], coord[0]]);
            mapRef.current.fitBounds(bounds);
          }
        }
      }
    };

    fetchRoute();
  }, [locations]);

  return (
    <MapContainer center={[63.0, 16.0]} zoom={4.5} style={{ height: "690px", width: "100%" }}
    whenCreated={mapInstance => { mapRef.current = mapInstance }}
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