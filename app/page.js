"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

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
        fill={true}
        quality={100}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-20 px-4 text-center text-yellow-200">
        <div className="flex flex-col w-2/4 gap-4 p-4 text-yellow-500 rounded-lg ">
          <h1 className="text-4xl font-bold">Brewing up Some Code</h1>
          <h2 className="text-2xl font-semibold">
            Helping you discover new breweries across the country
          </h2>
          <button
            onClick={fetchBrewery}
            className="py-2 mt-12 text-yellow-200 bg-yellow-800 rounded-lg opacity-90 hover:bg-yellow-700 active:bg-yellow-600"
          >
            Select Random Brewery
          </button>
        </div>
        {isLoaded && brewery && (
          <>
            <div className="flex flex-col gap-2 p-8 bg-opacity-50 rounded-xl ">
              <h3 className="text-xl font-bold">{brewery.name}</h3>
              <p>
                {brewery.city}, {brewery.state}
              </p>

              <div className="flex flex-col gap-2">
                <Link href={`/brewery/${brewery.id}`}>
                  <button className="p-2 px-20 text-yellow-200 bg-yellow-800 rounded-lg opacity-90 hover:bg-yellow-700 active:bg-yellow-600">
                    Get More information on{" "}
                    <span className="font-bold">{brewery.name}</span>
                  </button>
                </Link>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="w-1/4 p-2 text-yellow-200 bg-yellow-800 rounded-lg opacity-90 hover:bg-yellow-700 active:bg-yellow-600"
            >
              Reset
            </button>
          </>
        )}
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
}
