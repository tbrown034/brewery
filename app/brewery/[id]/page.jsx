// app/brewery/[id]/page.jsx
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function BreweryPage({ params }) {
  const breweryId = params.id;
  const [brewery, setBrewery] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const url = "https://api.openbrewerydb.org/v1/breweries";

  useEffect(() => {
    const fetchBrewery = async () => {
      try {
        const response = await fetch(`${url}/${breweryId}`);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setBrewery(data);
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

    fetchBrewery();
  }, [breweryId]);

  // Capitalize the brewery type if it exists
  const capitalizedType = brewery?.brewery_type
    ? brewery.brewery_type.charAt(0).toUpperCase() +
      brewery.brewery_type.slice(1)
    : "";

  // Format the phone number if it exists (assuming a 10-digit format)
  const formattedPhone = brewery?.phone
    ? `(${brewery.phone.slice(0, 3)}) ${brewery.phone.slice(
        3,
        6
      )}-${brewery.phone.slice(6)}`
    : "";

  if (error) {
    return <div>Error: {error}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="relative min-h-screen">
        <Image
          src="/beerBody.jpg"
          alt="Background of beers"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-4 text-center text-yellow-200">
          <h1 className="mb-4 text-4xl font-bold">
            Brewery Spotlight: {brewery.name}
          </h1>
          <h2 className="mb-2 text-2xl">
            <span className="font-bold">
              {brewery.city}, {brewery.state}
            </span>
          </h2>
          <div className="p-4 bg-yellow-800 rounded-lg">
            <p className="font-bold">Brewery Type:</p>
            <p>{capitalizedType}</p>
          </div>
          <div className="p-4 bg-yellow-800 rounded-lg">
            <p className="font-bold">Brewery Address:</p>
            <p>{brewery.address_1}</p>
          </div>
          <div className="p-4 bg-yellow-800 rounded-lg">
            <p className="font-bold">Brewery Phone:</p>
            <p>{formattedPhone}</p>
          </div>
          <div className="p-4 bg-yellow-800 rounded-lg">
            <p className="font-bold">Brewery Website:</p>
            <p>
              <a
                href={brewery.website_url}
                className="text-yellow-200 underline"
              >
                {brewery.website_url?.replace(/^(https?:\/\/)?(www\.)?/i, "")}
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
