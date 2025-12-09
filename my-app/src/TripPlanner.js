import React, { useState } from 'react';

function TripPlanner({ onLocationChange, distance, time }) {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [stops, setStops] = useState([]);

  const handleAddStop = () => {
    setStops([...stops, '']);
  };

  const handleStopChange = (index, value) => {
    const newStops = [...stops];
    newStops[index] = value;
    setStops(newStops);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Start:', startLocation);
    console.log('End:', endLocation);
    console.log('Stops:', stops);

    // Anropa callback-funktionen med de insamlade platserna
    onLocationChange({
      start: startLocation,
      stops: stops,
      end: endLocation,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Startplats:
          <input
            type="text"
            value={startLocation}
            onChange={(e) => setStartLocation(e.target.value)}
          />
        </label>
      </div>
      {stops.map((stop, index) => (
        <div key={index}>
          <label>
            Stopp {index + 1}:
            <input
              type="text"
              value={stop}
              onChange={(e) => handleStopChange(index, e.target.value)}
            />
          </label>
        </div>
      ))}
      <div>
        <label>
          Slutdestination:
          <input
            type="text"
            value={endLocation}
            onChange={(e) => setEndLocation(e.target.value)}
          />
        </label>
      </div>
      <div className="button-group">
        <button type="button" onClick={handleAddStop}>
          Lägg till stopp
        </button>
        <button type="submit">Planera Resa</button>
      </div>
      <div>
  <label>Avstånd:
    <output id="distanceOutput">{distance !== null ? `${distance} km` : '-- km'}</output>
  </label>
</div>
<div>
  <label>Tid:
    <output id="timeOutput">
      {time !== null ? `${time.hours} timmar och ${time.minutes} minuter` : '-- timmar och -- minuter'}
    </output>
  </label>
</div>
    </form>
  );
}

export default TripPlanner;