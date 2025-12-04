import React, { useState } from 'react';
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

  const handleLocationChange = (newLocations) => {
    setLocations(newLocations);
  };

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
       <MapComponent locations={locations} />
        </div>
        <div className="App-sidebar">
          <TripPlanner onLocationChange={handleLocationChange} />
        </div>
      </div>
    </div>
  );
}

export default App;