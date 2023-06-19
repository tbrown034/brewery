"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const url = "https://api.openbrewerydb.org/breweries/random";
  const [brewery, setBrewery] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  const handleReset = () => {
    setBrewery(null);
    setIsLoaded(false);
  };

  const fetchBrewery = async () => {
    try {
      const cacheBuster = new Date().getTime(); // Get the current timestamp
      const response = await fetch(`${url}?_=${cacheBuster}`);
      if (response.ok) {
        const data = await response.json();
        setBrewery(data[0]);
        setIsLoaded(true);
      } else {
        console.error("Failed to fetch brewery data");
        setError("Failed to fetch brewery data");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setError("An error occurred while fetching the data");
    }
  };

  return (
    <div className="relative min-h-screen">
      <Image
        src="/beer.jpg"
        alt="Background of beers"
        layout="fill"
        objectFit="cover"
        quality={100}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 text-center text-yellow-200">
        <h1 className="text-4xl font-bold">Brewing up Some Code</h1>
        <h2 className="text-2xl">
          Helping you discover new breweries across the country
        </h2>
        <button
          onClick={fetchBrewery}
          className="p-2 text-white bg-yellow-800 rounded-lg opacity-90 hover:bg-yellow-700 active:bg-yellow-600"
        >
          {isLoaded ? "Get Another Random Brewery" : "Get Random Brewery"}
        </button>
        {isLoaded && brewery && (
          <div className="p-4">
            <h3 className="text-xl font-bold">{brewery.name}</h3>
            <p>
              {brewery.city}, {brewery.state}
            </p>

            <div className="flex flex-col gap-2">
              <button
                onClick={handleReset}
                className="p-2 text-white bg-yellow-800 rounded-lg opacity-90 hover:bg-yellow-700 active:bg-yellow-600"
              >
                Reset
              </button>
              <button className="p-2 text-white bg-yellow-800 rounded-lg opacity-90 hover:bg-yellow-700 active:bg-yellow-600">
                Get More information
              </button>
            </div>
          </div>
        )}
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
}
