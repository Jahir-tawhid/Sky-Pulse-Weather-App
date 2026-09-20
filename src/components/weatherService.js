export const fetchWeatherData = async (locationQuery) => {
  try {
    const API_KEY = "1e3e4e4c6e47ffaca63d5cb122a969c6"; //  API key
    let url = "";

    // Check if query is a city name or coordinates (latitude & longitude)
    if (typeof locationQuery === "string") {
      // If user didn't specify country code, append ',bd' for better search results in Bangladesh
      const query = locationQuery.includes(",")
        ? locationQuery
        : `${locationQuery},bd`;
      url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${API_KEY}`;
    } else {
      const { lat, lon } = locationQuery;
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    // Check if API request was successful
    if (response.ok) {
      return {
        location: `${data.name}, ${data.sys.country}`,
        temp: `${Math.round(data.main.temp)}°C`,
        condition: data.weather[0].main,
        description: data.weather[0].description,
        timezone: data.timezone,
      };
    } else {
      console.log("API Error Message:", data.message);
      throw new Error(data.message || "Failed to fetch weather data");
    }
  } catch (error) {
    console.error("API Error:", error);
    return null;
  }
};
