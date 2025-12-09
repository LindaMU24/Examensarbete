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
    return data.features[0].geometry.coordinates;
  } catch (error) {
    console.error('Failed to fetch segment:', error);
    return []; // Returnera en tom array vid fel
  }
};

export const getFullRoute = async (waypoints) => {
  let fullRoute = [];

  for (let i = 0; i < waypoints.length - 1; i++) {
    const segment = await getRouteSegment(waypoints[i], waypoints[i + 1]);
    fullRoute = fullRoute.concat(segment);
  }

  return fullRoute;
};