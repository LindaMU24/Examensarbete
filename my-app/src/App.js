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

  //const [carModel, setCarModel] = useState('');
  const [selectedCarModel, setSelectedCarModel] = useState({ name: '', range: 0 });

  const handleLocationChange = (newLocations) => {
    setLocations(newLocations);
  };

  const handleRouteInfoUpdate = useCallback((distance, time) => {
    setRouteInfo({ distance, time });
  }, []); // useCallback för att memorera funktionen

  const handleRegistrationData = (registrationData) => {
  console.log('Received registration data:', registrationData);
  // Här kan du uppdatera state eller göra något annat med datan
  };

  const handleLoginData = (loginData) => {
     console.log('Received login data:', loginData);
     setSelectedCarModel({
       name: loginData.carModel,
       range: loginData.range,
     });
   };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Book & Go</h1>
      </header>
       <div className="App-body">
      <div className="App-sidebar">
     <RegistrationForm
       onRegister={handleRegistrationData}
       onLogin={handleLoginData}
       selectedCarModel={selectedCarModel} // Skicka det som en prop
       setSelectedCarModel={setSelectedCarModel}
     />
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