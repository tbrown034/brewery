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
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 text-center text-yellow-200">
          <h1 className="text-4xl font-bold">
            Brewery Spotlight: {brewery.name}
          </h1>
          <h2 className="text-lg ">
            {brewery.city}, {brewery.state}
          </h2>
          <p>Brewery Type: {brewery.brewery_type}</p>
          <p>Brewery address: {brewery.address_1}</p>
          <p>Brewery phone: {brewery.phone}</p>
          <p>
            Brewery Website:{" "}
            <Link href={brewery.website_url}> {brewery.website_url} </Link>
          </p>
        </div>
      </div>
    );
  }
}
