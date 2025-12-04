const apiKey = process.env.REACT_APP_API_KEY;

export const geocodeAddress = async (address) => {
  const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${address}`);
  const data = await response.json();
  return data[0] ? [data[0].lat, data[0].lon] : null;
};

export const getRoute = async (start, end) => {
  try {
    const response = await fetch(`https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${start[1]},${start[0]}&end=${end[1]},${end[0]}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Full API Response:', data);
    console.log("API Response:", response);
    return data.features[0].geometry.coordinates;
  } catch (error) {
    console.error('Failed to fetch route:', error);
  }
};
