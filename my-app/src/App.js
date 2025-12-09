import React, { useState, useCallback } from 'react';
import MapComponent from './MapComponent';
import RegistrationForm from './RegistrationForm';
import TripPlanner from './TripPlanner';
import './App.css';

function App() {
  const [locations, setLocations] = useState({
    start: null,
    stops: [],
    end: null,
  });

  const [routeInfo, setRouteInfo] = useState({ distance: null, time: null });

  const handleLocationChange = (newLocations) => {
    setLocations(newLocations);
  };

  const handleRouteInfoUpdate = useCallback((distance, time) => {
    setRouteInfo({ distance, time });
  }, []); // useCallback för att memorera funktionen

  return (
    <div className="App">
      <header className="App-header">
        <h1>Book & Go</h1>
      </header>
      <div className="App-body">
        <div className="App-sidebar">
          <RegistrationForm />
        </div>
        <div className="map-container">
          <MapComponent locations={locations} onRouteInfoUpdate={handleRouteInfoUpdate} />
        </div>
        <div className="App-sidebar">
          <TripPlanner onLocationChange={handleLocationChange} distance={routeInfo.distance} time={routeInfo.time} />
        </div>
      </div>
    </div>
  );
}

export default App;