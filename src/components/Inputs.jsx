import React, { useState } from "react";
import { UilSearch } from "@iconscout/react-unicons";

const Inputs = ({ setQuery, setUnits, units }) => {
  const [city, setCity] = useState("");

  const handleSearchClick = () => {
    if (city !== "") setQuery({ q: city });

    setCity("");
  };

  return (
    <div className="flex flex-col justify-center items-center my-6 px-2">
      <div className="w-full flex items-center justify-center space-x-4 ">
        <input
          type="text"
          placeholder="Search for city..."
          className="ww-full text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase"
          onChange={(e) => setCity(e.target.value)}
          value={city}
          onKeyDown={(e) => e.key === "Enter" && handleSearchClick()}
        />
        <UilSearch
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
          onClick={handleSearchClick}
        />
      </div>
      <div className="flex items-center justify-center w-full mt-4 space-x-4">
        <button
          onClick={() => setUnits("metric")}
          className={`${
            units === "metric" ? "text-amber-600" : ""
          } text-xl text-white font-light`}
        >
          °C
        </button>
        <p className="text-xl text-white mx-1">|</p>
        <button
          onClick={() => setUnits("imperial")}
          className={`${
            units === "imperial" ? "text-amber-600" : ""
          } text-xl text-white font-light`}
        >
          °F
        </button>
      </div>
    </div>
  );
};

export default Inputs;
