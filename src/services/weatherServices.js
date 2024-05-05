const API_Key = "b8846fdce3b34ce7826141955240205";
const BASE_URL = "https://api.weatherapi.com/v1/forecast.json";

const getWeatherData = async (searchParams) => {
  const url = new URL(BASE_URL);
  url.search = new URLSearchParams({ key: API_Key, ...searchParams, days: 6 });
  const res = await fetch(url);
  return res.json();
};

const formatCurrentWeather = (data) => {
  let {
    location: { name, localtime, country },
    current: {
      temp_c,
      temp_f,
      humidity,
      wind_kph,
      feelslike_c,
      feelslike_f,
      condition: { icon, text },
    },
    forecast: { forecastday },
  } = data;

  let daily = forecastday.slice(0);

  daily = daily.map((d) => {
    const date = new Date(d.date);
    const formattedDate = date.toLocaleString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    return {
      title: formattedDate,
      temp: d.day.avgtemp_c,
      temp_f: d.day.avgtemp_f,
      icon: d.day.condition?.icon,
    };
  });

  return {
    name,
    localtime,
    country,
    temp_c,
    temp_f,
    feelslike_c,
    feelslike_f,
    humidity,
    wind_kph,
    icon,
    text,
    forecastday,
    daily,
  };
};

function formatTime(timeString) {
  const [hours, minutes] = timeString.split(":");

  let hour = parseInt(hours);

  const amOrPm = hour >= 12 ? "PM" : "AM";

  hour = hour % 12 || 12;

  return `${hour}:${minutes} ${amOrPm}`;
}

const getFormattedWeatherData = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData(searchParams);
  const formattedData = formatCurrentWeather(formattedCurrentWeather);

  return formattedData;
};

export default getFormattedWeatherData;
