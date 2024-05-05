import { useEffect, useState } from "react";
import "./App.css";
import Forecast from "./components/Forecast";
import Inputs from "./components/Inputs";
import TemperatureAndDetails from "./components/TemperatureAndDetails";
import TimeandLocation from "./components/TimeandLocation";
import getFormattedWeatherData from "./services/weatherServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [query, setQuery] = useState({ q: "jaipur" });
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [units, setUnits] = useState("metric");

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      const message = query.q ? query.q : "current location.";
      toast.info("Fetching weather for " + message);
      const data = await getFormattedWeatherData({ ...query });
      toast.success(
        `Successfully fetched weather for ${data.name}, ${data.country}.`
      );
      setWeather(data);
      setLoading(false);
    };
    fetchWeather();
  }, [query]);

  console.log(weather);

  const formatBackground = () => {
    if (!weather) return "from-cyan-700 to-blue-700";
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp_c <= threshold) return "from-cyan-700 to-blue-700";

    return "from-yellow-700 to-orange-700";
  };

  return (
    <>
      <div
        className={`mx-auto max-w-screen-md py-5 md:px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}
      >
        <Inputs setUnits={setUnits} units={units} setQuery={setQuery} />

        {loading && (
          <div className="text-white text-2xl flex items-center justify-center">
            Loading...
          </div>
        )}

        {weather && !loading && (
          <>
            <TimeandLocation weather={weather} />
            <TemperatureAndDetails units={units} weather={weather} />
            <Forecast title="hourly forecast" units={units} weather={weather} />
            <Forecast title="daily forecast" units={units} weather={weather} />
          </>
        )}
        <ToastContainer autoClose={5000} theme="colored" newestOnTop={true} />
      </div>
    </>
  );
}

export default App;
