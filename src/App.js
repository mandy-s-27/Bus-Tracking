import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

const Home = ({ departure, destination, setDeparture, setDestination, handleSearch, handleClear }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (departure && destination) {
      loadMapWithRoute();
    }
  }, [departure, destination]);

  const loadMapWithRoute = () => {
    if (!window.google || !window.google.maps) {
      console.error("Google Maps API is not loaded.");
      return;
    }

    const map = new window.google.maps.Map(mapRef.current, {
      zoom: 7,
      center: { lat: 10.8505, lng: 76.2711 },
    });

    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    directionsService.route(
      {
        origin: departure,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        if (status === "OK") {
          directionsRenderer.setDirections(response);
        } else {
          console.error("Directions request failed: ", status);
        }
      }
    );
  };

  return (
    <div className="content">
      <div className="search-container">
        <input
          type="text"
          placeholder="Departure"
          value={departure}
          onChange={(e) => setDeparture(e.target.value)}
        />
        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleClear} style={{ background: "#ff4d4d" }}>Clear</button>
      </div>
      <div ref={mapRef} style={{ width: "100%", height: "400px", marginTop: "20px", borderRadius: "10px" }}></div>
    </div>
  );
};

const BusTrackingSystem = () => {
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");

  const handleSearch = () => {
    if (departure && destination) {
      console.log(`Searching for routes from ${departure} to ${destination}`);
    }
  };

  const handleClear = () => {
    setDeparture("");
    setDestination("");
  };

  return (
    <Router>
      <div className="container">
        <nav className="navbar">
          <Link to="/">Home</Link>
        </nav>
        <header className="header">
          <h1>Bus Tracking System</h1>
        </header>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                departure={departure}
                destination={destination}
                setDeparture={setDeparture}
                setDestination={setDestination}
                handleSearch={handleSearch}
                handleClear={handleClear}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default BusTrackingSystem;
