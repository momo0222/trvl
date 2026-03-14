"use client";

import { useState } from "react";
import { FlightOffer } from "@/lib/types";
import { FlightCard } from "@/components/flights/FlightCard";

/*
  FlightSearchForm Component

  Responsibilities:
  1. Allow the user to enter flight search parameters
  2. Call the /api/flights endpoint
  3. Store results in local state
  4. Render FlightCard components for each result
*/

export function FlightSearchForm() {

  /*
    Form input state.

    These values track what the user types into the search fields.
  */
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departDate, setDepartDate] = useState("");

  /*
    Search result state.

    flights: list of returned flight offers
  */
  const [flights, setFlights] = useState<FlightOffer[]>([]);

  /*
    Loading + error states improve user experience.
  */
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /*
    Handles search button click.

    Steps:
    1. Validate inputs
    2. Call /api/flights
    3. Parse results
    4. Update flights state
  */
  async function handleSearch() {
    setError(null);

    if (!origin || !destination || !departDate) {
      setError("Please enter origin, destination, and departure date.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `/api/flights?origin=${origin}&destination=${destination}&depart=${departDate}`
      );

      if (!res.ok) {
        throw new Error("Flight search failed.");
      }

      const data = await res.json();

      /*
        data.flights should match FlightOffer[]
        because we typed our API correctly earlier.
      */
      setFlights(data.flights);

    } catch (err) {
      console.error(err);
      setError("Something went wrong while searching flights.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card p-6 mb-8">

      {/* Search Form Title */}
      <h2 className="font-display text-xl font-semibold text-sand-900 mb-4">
        Search Flights
      </h2>

      {/* Flight Search Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-4">

        {/* Origin Airport */}
        <input
          type="text"
          placeholder="Origin (JFK)"
          value={origin}
          onChange={(e) => setOrigin(e.target.value.toUpperCase())}
          className="input"
        />

        {/* Destination Airport */}
        <input
          type="text"
          placeholder="Destination (NRT)"
          value={destination}
          onChange={(e) => setDestination(e.target.value.toUpperCase())}
          className="input"
        />

        {/* Departure Date */}
        <input
          type="date"
          value={departDate}
          onChange={(e) => setDepartDate(e.target.value)}
          className="input"
        />

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="btn-primary"
        >
          Search
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-sm mb-4">
          {error}
        </p>
      )}

      {/* Loading State */}
      {loading && (
        <p className="text-sand-400 text-sm">
          Searching flights...
        </p>
      )}

      {/* Flight Results */}
      <div className="space-y-3">
        {/* Empty state before searching */}
        {flights.length === 0 && !loading && (
          <p className="text-sm text-sand-400 text-center py-6">
            🔎 Search flights to see results here
          </p>
        )}

        {/* Render flight results */}
        {flights.map((flight) => (
          <FlightCard key={flight.id} flight={flight} />
        ))}
      </div>

    </div>
  );
}