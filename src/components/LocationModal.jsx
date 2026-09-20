
import { X } from "lucide-react";
import { useState } from "react";

const LocationModal = ({ onClose, onWeatherData }) => {
  // State to store the typed city name input
  const [city, setCity] = useState("");

  // Function to handle form submission and pass city name
  const handleSubmit = (e) => {
    e.preventDefault();
    const value = city.trim();

    if (value === "") {
      alert("Please enter a city name!");
      return;
    }

    // Pass only the city name string to Home component
    onWeatherData(value);
    setCity("");
    onClose(); // Close the modal
  };

  // Function to get current latitude and longitude and pass to Home component
  const handleGeoLocations = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // Pass latitude and longitude object to parent
        onWeatherData({ lat: latitude, lon: longitude });
        onClose();
      },
      (error) => {
        console.log("Geolocation error:", error.message);
        alert(
          "Unable to access your location. Please check browser permissions.",
        );
      },
      { timeout: 10000 },
    );
  };

  return (
    // Modal background overlay
    <div className="fixed inset-0 flex justify-center items-center bg-gray-950/60">
      {/* Modal content box */}
      <div className="h-[300px] p-5 rounded-2xl w-[400px] bg-gray-100 shadow-2xl">
        {/* Modal header with title and close button */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-medium">Where are you today?</h2>
          <button onClick={onClose} className="cursor-pointer">
            <X />
          </button>
        </div>

        {/* City search form section */}
        <div className="pt-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              placeholder="Please enter a city name ! e.g: Dhaka, BD"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full border p-2 rounded-xl outline-none"
            />
            <div>
              <button
                type="submit"
                className="text-lg w-full font-medium hover:scale-105 transition-all bg-blue-500 px-5 cursor-pointer py-1 rounded-4xl text-gray-100"
              >
                Get Weather
              </button>
            </div>
          </form>
        </div>

        <div className="py-2 text-center text-gray-500">Or</div>

        {/* Geolocation button section */}
        <div>
          <button
            type="button"
            onClick={handleGeoLocations}
            className="text-lg w-full font-medium hover:scale-105 transition-all bg-blue-500 px-5 cursor-pointer py-1 rounded-4xl text-gray-100"
          >
            Use My Location
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;
