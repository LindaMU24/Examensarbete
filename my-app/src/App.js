import React from 'react';
import MapComponent from './MapComponent';
import RegistrationForm from './RegistrationForm';
import TripPlanner from './TripPlanner';
import './App.css';

function App() {
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
        <MapComponent />
      </div>
      <div className="App-sidebar">
          <TripPlanner />
        </div>
      </div>
    </div>
  );
}

export default App;