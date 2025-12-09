const apiKey = process.env.REACT_APP_API_KEY;

export const geocodeAddress = async (address) => {
  const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${address}`);
  if (!response.ok) {
  throw new Error(`HTTP error! Status: ${response.status}`);
}
  const data = await response.json();
  return data[0] ? [data[0].lat, data[0].lon] : null;
};

export const getRouteSegment = async (start, end) => {
  try {
    const coordinatesString = `${start[1]},${start[0]}|${end[1]},${end[0]}`;
    const response = await fetch(`https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${start[1]},${start[0]}&end=${end[1]},${end[0]}&coordinates=${coordinatesString}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("Full API response: ", data);
    
    if (data.features && data.features.length > 0) {
      const coordinates = data.features[0].geometry.coordinates;
      const distanceInMeters = data.features[0].properties.segments[0].distance;
      const durationInSeconds = data.features[0].properties.segments[0].duration;

      // Konvertera avstånd till kilometer
      const distanceInKm = distanceInMeters / 1000;

      // Konvertera tid till timmar och minuter
      const hours = Math.floor(durationInSeconds / 3600);
      const minutes = Math.floor((durationInSeconds % 3600) / 60);

      console.log("Extracted coordinates: ", coordinates);
      return { coordinates, distance: distanceInKm, time: { hours, minutes } };
    } else {
      console.error("No route found in response.");
      return { coordinates: [], distance: 0, time: { hours: 0, minutes: 0 } };
    }
  } catch (error) {
    console.error('Failed to fetch segment:', error);
    return { coordinates: [], distance: 0, time: { hours: 0, minutes: 0 } };
  }
};

export const getFullRoute = async (waypoints) => {
  let fullRoute = [];
  let totalDistance = 0;
  let totalTimeInSeconds = 0; // Ändra till sekunder

  for (let i = 0; i < waypoints.length - 1; i++) {
    const segment = await getRouteSegment(waypoints[i], waypoints[i + 1]);
    if (segment) {
      fullRoute = fullRoute.concat(segment.coordinates);
      totalDistance += segment.distance;
      totalTimeInSeconds += (segment.time.hours * 3600) + (segment.time.minutes * 60); // Lägg till tid i sekunder
    }
  }

  // Konvertera total tid till timmar och minuter
  const totalHours = Math.floor(totalTimeInSeconds / 3600);
  const totalMinutes = Math.floor((totalTimeInSeconds % 3600) / 60);

  return { routeCoords: fullRoute, distance: totalDistance, time: { hours: totalHours, minutes: totalMinutes } };
};