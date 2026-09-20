import { useState, useEffect } from "react";
import LocationModal from "../components/LocationModal";
import { fetchWeatherData } from "../components/weatherService";

const Home = () => {
  // State to track whether the location modal is open or closed
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State to store and display weather data
  const [weatherData, setWeatherData] = useState(null);

  // State to store real-time current date and time
  const [currentDateTime, setCurrentDateTime] = useState("");

  // Update real-time clock and date based on searched location's timezone or system time
  useEffect(() => {
    const updateDateTime = () => {
      let now;
      // Check if weatherData has timezone offset (in seconds)
      if (weatherData && typeof weatherData.timezone === "number") {
        const localUtc =
          new Date().getTime() + new Date().getTimezoneOffset() * 60000;
        now = new Date(localUtc + weatherData.timezone * 1000);
      } else {
        // Fallback to user's local system time if no city selected yet
        now = new Date();
      }

      const options = {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      };
      setCurrentDateTime(now.toLocaleDateString("en-US", options));
    };

    updateDateTime();
    const timer = setInterval(updateDateTime, 1000); // Update every second

    return () => clearInterval(timer);
  }, [weatherData]);

  // Function to handle weather data fetch based on user input
  const handleGetWeather = async (query) => {
    const data = await fetchWeatherData(query);

    // Check in browser console whether data is arriving properly
    console.log("Received Data from API:", data);

    if (data) {
      setWeatherData(data);
    } else {
      alert(
        "Could not retrieve weather data. Please check city name or API key.",
      );
    }
  };

  return (
    <div className="text-center">
      {/* Website title and description section */}
      <div>
        <h1 className="text-6xl text-green-200 font-extrabold">
          Sky-Pulse <span className="text-green-500">Weather</span>
        </h1>
        <p className="py-4 text-xl text-blue-500">
          Check the weather in your city instantly ...
        </p>

        {/* Real-time date and time display */}
        <p className="text-sm text-gray-300 font-medium mb-4">
          {currentDateTime}
        </p>
      </div>

      {/* Button to open the location modal */}
      <div className="flex justify-center mt-2">
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="text-lg font-medium hover:scale-105 transition-all bg-blue-500 px-6 cursor-pointer py-2 rounded-4xl text-gray-100"
        >
          Check Weather
        </button>
      </div>

      {/* Display weather results in separate individual boxes */}
      {weatherData && (
        <div className="flex justify-center gap-4 mt-6 flex-wrap">
          {/* Box 1: Location Box */}
          <div className="p-4 bg-gray-800 text-white rounded-2xl shadow-lg w-[160px]">
            <h4 className="text-sm text-gray-400 font-medium">Location</h4>
            <p className="text-xl font-bold text-blue-300 mt-2">
              {weatherData.location}
            </p>
          </div>

          {/* Box 2: Temperature Box */}
          <div className="p-4 bg-gray-800 text-white rounded-2xl shadow-lg w-[160px]">
            <h4 className="text-sm text-gray-400 font-medium">Temperature</h4>
            <p className="text-3xl font-extrabold text-white mt-2">
              {weatherData.temp}
            </p>
          </div>

          {/* Box 3: Condition Box */}
          <div className="p-4 bg-gray-800 text-white rounded-2xl shadow-lg w-[160px]">
            <h4 className="text-sm text-gray-400 font-medium">Condition</h4>
            <p className="text-xl font-bold text-yellow-300 mt-2">
              {weatherData.condition}
            </p>
          </div>
        </div>
      )}

      {/* Conditionally render LocationModal and pass data handler */}
      {isModalOpen && (
        <LocationModal
          onClose={() => setIsModalOpen(false)}
          onWeatherData={(query) => handleGetWeather(query)}
        />
      )}
    </div>
  );
};

export default Home;
