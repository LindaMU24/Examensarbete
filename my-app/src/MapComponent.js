import React, {useEffect, useState, useRef} from 'react';
import { MapContainer, TileLayer, Polyline/*, Marker, Popup*/ } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { geocodeAddress, getFullRoute } from './apiService';


const MapComponent = ({ locations }) => {
  const [route, setRoute] = useState([]);
  const mapRef = useRef();

  useEffect(() => {
  const fetchRoute = async () => {
    if (locations.start && locations.end && locations.stops) {
      // Geokoda start-, stopp- och slutadresser
      const startCoords = await geocodeAddress(locations.start);
      const endCoords = await geocodeAddress(locations.end);
      const stopCoordsPromises = locations.stops.map(stop => geocodeAddress(stop));
      const stopCoords = await Promise.all(stopCoordsPromises);
      console.log('Startkoordinater:', startCoords);
      console.log('Slutkoordinater:', endCoords);
      console.log('Stoppkoordinater:', stopCoords);

      // Kontrollera att alla koordinater är tillgängliga
      if (startCoords && endCoords && stopCoords.every(coord => coord !== null)) {
        // Skapa en lista av alla waypoints
        const waypoints = [startCoords, ...stopCoords, endCoords];

        // Hämta rutten med hjälp av alla waypoints
        const routeCoords = await getFullRoute(waypoints);
        console.log('Ruttkoordinater:', routeCoords);
        setRoute(routeCoords);

        // Anpassa kartans vy till rutten
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