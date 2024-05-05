const Forecast = ({ title, weather, units }) => {
  const { daily, forecastday } = weather;

  const formatDateShort = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "short" };
    return date.toLocaleDateString("en-US", options);
  };

  const formatDate = (timeString) => {
    const date = new Date(timeString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  return (
    <div className="px-1">
      <div className="flex items-center justify-start mt-6">
        <p className="text-white font-medium uppercase">{title}</p>
      </div>
      <hr className="my-2" />
      <div className="hourly-forecast-container flex items-center justify-between text-white overflow-x-auto gap-3 ">
        {title === "hourly forecast"
          ? forecastday[0].hour.map((item, i) => (
              <div
                key={i}
                className="flex pt-4 pb-4 flex-col text-center justify-center "
              >
                <p className="font-light text-sm w-16">
                  {formatDate(item.time)}
                </p>
                <img src={item.condition} alt="" className="w-12 my-1" />
                <p className="font-medium">
                  {units === "metric" ? item.temp_c : item.temp_f}°
                </p>
              </div>
            ))
          : daily.map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center"
              >
                <p className="font-light text-sm">
                  {formatDateShort(item.title)}
                </p>
                <img src={item.icon} alt="" className="w-12 my-1" />
                <p className="font-medium">
                  {units === "metric" ? item.temp : item.temp_f}°
                </p>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Forecast;
