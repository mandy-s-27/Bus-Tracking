import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

const Home = ({ departure, destination, distance, filteredRoutes, filteredSchedules, handleSearch, handleClear, setDeparture, setDestination }) => {
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
        <button onClick={handleClear} style={{ background: "#ff4d4d" }}>
          Clear
        </button>
      </div>
      {distance && <div className="distance">Distance: {distance}</div>}
      {departure && destination && (
        <>
          <section className="routes" id="routes">
            <h2>Available Routes</h2>
            {filteredRoutes.length > 0 ? (
              <ul>
                {filteredRoutes.map((route) => (
                  <li key={route.id}>
                    <strong>{route.name}:</strong> {route.stations.join(" → ")}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-routes-message">There are no routes available for the selected departure and destination.</p>
            )}
          </section>
          <section className="schedules" id="schedules">
            <h2>Bus Schedules</h2>
            {filteredSchedules.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Route</th>
                    <th>Departure</th>
                    <th>Arrival</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSchedules.map((schedule) => (
                    <tr key={schedule.id}>
                      <td>Route {schedule.routeId}</td>
                      <td>{schedule.departure}</td>
                      <td>{schedule.arrival}</td>
                      <td className={schedule.status === "On Time" ? "on-time" : "delayed"}>
                        {schedule.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="no-routes-message">No schedules available for the selected routes.</p>
            )}
          </section>
        </>
      )}
      <section className="map" id="map">
        <h2>Station Map</h2>
        <p>Here is the map showing the locations of the bus stations:</p>
        <iframe
          className="map-frame"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093745!2d144.96315761550485!3d-37.816279742021885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d7d432c6e6d!2sMelbourne%20Central!5e0!3m2!1sen!2sau!4v1708114570667!5m2!1sen!2sau"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </div>
  );
};

const RoutesPage = ({ filteredRoutes }) => {
  return (
    <div className="content">
      <section className="routes" id="routes">
        <h2>Available Routes</h2>
        {filteredRoutes.length > 0 ? (
          <ul>
            {filteredRoutes.map((route) => (
              <li key={route.id}>
                <strong>{route.name}:</strong> {route.stations.join(" → ")}
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-routes-message">There are no routes available. Please try a different search.</p>
        )}
      </section>
    </div>
  );
};

const SchedulesPage = ({ filteredSchedules }) => {
  return (
    <div className="content">
      <section className="schedules" id="schedules">
        <h2>Bus Schedules</h2>
        {filteredSchedules.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Route</th>
                <th>Departure</th>
                <th>Arrival</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredSchedules.map((schedule) => (
                <tr key={schedule.id}>
                  <td>Route {schedule.routeId}</td>
                  <td>{schedule.departure}</td>
                  <td>{schedule.arrival}</td>
                  <td className={schedule.status === "On Time" ? "on-time" : "delayed"}>
                    {schedule.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-routes-message">No schedules available. Please try a different search.</p>
        )}
      </section>
    </div>
  );
};

const BusTrackingSystem = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [distance, setDistance] = useState("");
  const [filteredRoutes, setFilteredRoutes] = useState([]);
  const [filteredSchedules, setFilteredSchedules] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [users, setUsers] = useState([]);
  const [loginError, setLoginError] = useState("");
  const [signupError, setSignupError] = useState("");

  // Mock data for bus routes and schedules
  const busRoutes = [
    { id: 1, name: "Route 1", stations: ["Chennai","villupuram", "Madurai"] },
    { id: 2, name: "Route 2", stations: ["Coimbatore", "Trichy", "Karaikudi"] },
    { id: 3, name: "Route 3", stations: ["Trichy","karur", "Coimbatore"] },
    { id: 4, name: "Route 4", stations: ["Tirupattur", "Salem", "Tirupur", "Coimbatore"] },
    { id: 5, name: "Route 5", stations: ["chennai", "katpadi", "Jolarpettai"] },
  ];

  const busSchedules = [
    { id: 1, routeId: 1, departure: "08:00 AM", arrival: "05:30 PM", status: "On Time" },
    { id: 2, routeId: 2, departure: "09:15 AM", arrival: "03:45 PM", status: "Delayed" },
    { id: 3, routeId: 3, departure: "10:30 AM", arrival: "01:00 PM", status: "On Time" },
    { id: 4, routeId: 4, departure: "10:00 AM", arrival: "05:00 PM", status: "Delayed" },
    { id: 5, routeId: 5, departure: "11:30 AM", arrival: "07:00 PM", status: "On Time" },
  ];

  const handleSignUpSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newUser = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password')
    };

    // Check if user already exists
    const userExists = users.some(user => user.email === newUser.email);
    if (userExists) {
      setSignupError("User with this email already exists.");
      return;
    }

    setUsers([...users, newUser]);
    setIsLoggedIn(true);
    setSignupError("");
    setShowLogin(false);
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');

    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
      setIsLoggedIn(true);
      setLoginError("");
    } else {
      setLoginError("Invalid email or password.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setSidebarOpen(false);
  };

  const handleSearch = () => {
    const filtered = busRoutes.filter(
      (route) =>
        route.stations.includes(departure) && route.stations.includes(destination)
    );
    setFilteredRoutes(filtered);

    const routeIds = filtered.map((route) => route.id);
    const schedules = busSchedules.filter((schedule) =>
      routeIds.includes(schedule.routeId)
    );
    setFilteredSchedules(schedules);

    calculateDistance(departure, destination);
  };

  const handleClear = () => {
    setDeparture("");
    setDestination("");
    setDistance("");
    setFilteredRoutes([]);
    setFilteredSchedules([]);
  };

  const calculateDistance = (origin, destination) => {
    if (!window.google || !window.google.maps) {
      console.error("Google Maps API is not loaded.");
      return;
    }

    const service = new window.google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [destination],
        travelMode: "DRIVING",
        unitSystem: window.google.maps.UnitSystem.METRIC,
      },
      (response, status) => {
        if (status === "OK") {
          const distanceText = response.rows[0].elements[0].distance.text;
          setDistance(distanceText);
        } else {
          console.error("Error calculating distance:", status);
        }
      }
    );
  };

  return (
    <Router>
      <style>
        {`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body, html {
            width: 100%;
            height: 100%;
            font-family: 'Poppins', sans-serif;
            background: #f4f4f4;
          }
          .container {
            width: 100vw;
            min-height: 100vh;
            background: #fff;
            display: flex;
            flex-direction: column;
          }
          .header {
            width: 100%;
            background: rgb(50, 121, 197);
            color: #fff;
            padding: 20px;
            text-align: center;
          }
          .content {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            gap: 20px;
            padding: 20px;
          }
          .search-container {
            display: flex;
            padding: 25px;
            gap: 10px;
            justify-content: center;
            margin-bottom: 20px;
          }
          .search-container input {
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            width: 200px;
          }
          .search-container button {
            padding: 10px 20px;
            background: rgb(50, 121, 197);
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            padding: 10px;
            transition: background 0.3s ease, transform 0.3s ease;
          }
          .search-container button:hover {
            background: rgb(40, 100, 160);
            transform: scale(1.05);
          }
          .distance {
            font-size: 18px;
            font-weight: bold;
            margin-top: 10px;
            animation: fadeIn 1s ease-in-out;
          }
          .routes ul {
            list-style: none;
            padding: 0;
          }
          .routes li {
            background: #e2e8f0;
            margin: 10px 0;
            padding: 10px;
            border-radius: 5px;
            animation: fadeIn 1s ease-in-out;
          }
          .schedules table {
            padding: 10px;
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
            animation: fadeIn 1s ease-in-out;
          }
          .schedules th, .schedules td {
            padding: 12px;
            text-align: center;
            border: 1px solid #ccc;
          }
          .schedules th {
            background: rgb(50, 121, 197);
            color: #fff;
          }
          .on-time {
            color: green;
            font-weight: bold;
          }
          .delayed {
            color: red;
            font-weight: bold;
          }
          .map-frame {
            width: 100%;
            height: 400px;
            border: none;
            border-radius: 10px;
            margin-top: 10px;
            animation: fadeIn 1s ease-in-out;
          }
          .map h2 {
            text-align: center; 
            margin-bottom: 15px;
          }
          .map p {
            text-align: center;       
            margin-top: 0;
            margin-bottom: 15px;
          }
          .no-routes-message {
            text-align: center;
            padding: 20px;
            color: #666;
            font-style: italic;
            background: #f8f9fa;
            border-radius: 5px;
            margin: 20px 0;
          }
          .auth-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 300px;
            padding: 20px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            animation: slideIn 0.5s ease-in-out;
            margin: 50px auto;
          }
          .auth-container input, .auth-container button {
            width: 100%;
            margin: 10px 0;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
          }
          .auth-container button {
            background: rgb(50, 121, 197);
            color: white;
            font-size: 16px;
            cursor: pointer;
            transition: background 0.3s ease;
          }
          .auth-container button:hover {
            background: rgb(40, 100, 160);
          }
          .auth-toggle {
            background: none;
            border: none;
            color: rgb(50, 121, 197);
            cursor: pointer;
            margin-top: 10px;
            text-decoration: underline;
          }
          .error-message {
            color: red;
            font-size: 14px;
            margin-top: 5px;
          }
          .sidebar {
            height: 100%;
            width: 250px;
            position: fixed;
            top: 0;
            left: ${sidebarOpen ? '0' : '-250px'};
            background-color: #2c3e50;
            padding-top: 60px;
            transition: left 0.3s ease;
            z-index: 1000;
          }
          .sidebar a, .sidebar button {
            padding: 15px 25px;
            text-decoration: none;
            font-size: 18px;
            color: white;
            display: block;
            transition: 0.3s;
            background: none;
            border: none;
            width: 100%;
            text-align: left;
            cursor: pointer;
          }
          .sidebar a:hover, .sidebar button:hover {
            background-color: #1a252f;
            color: #ffdd57;
          }
          .sidebar-toggle {
            position: fixed;
            top: 20px;
            left: 20px;
            font-size: 24px;
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            z-index: 1001;
          }
          .overlay {
            display: ${sidebarOpen ? 'block' : 'none'};
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 999;
          }
          .main-content {
            margin-left: ${sidebarOpen ? '250px' : '0'};
            transition: margin-left 0.3s ease;
            width: ${sidebarOpen ? 'calc(100% - 250px)' : '100%'};
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          @keyframes slideIn {
            from {
              transform: translateX(100%);
            }
            to {
              transform: translateX(0);
            }
          }
        `}
      </style>

      {!isLoggedIn ? (
        <div className="auth-container">
          <h2>{showLogin ? "Login" : "Sign Up"}</h2>
          {showLogin ? (
            <form onSubmit={handleLoginSubmit}>
              <input type="email" name="email" placeholder="Email" required />
              <input type="password" name="password" placeholder="Password" required />
              {loginError && <div className="error-message">{loginError}</div>}
              <button type="submit">Login</button>
              <button 
                type="button" 
                className="auth-toggle" 
                onClick={() => setShowLogin(false)}
              >
                Don't have an account? Sign up
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignUpSubmit}>
              <input type="text" name="name" placeholder="Full Name" required />
              <input type="email" name="email" placeholder="Email" required />
              <input type="password" name="password" placeholder="Password" required />
              {signupError && <div className="error-message">{signupError}</div>}
              <button type="submit">Sign Up</button>
              <button 
                type="button" 
                className="auth-toggle" 
                onClick={() => setShowLogin(true)}
              >
                Already have an account? Login
              </button>
            </form>
          )}
        </div>
      ) : (
        <div className="container">
          <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
            ☰
          </button>
          
          <div className="sidebar">
            <Link to="/" onClick={() => setSidebarOpen(false)}>Home</Link>
            <Link to="/routes" onClick={() => setSidebarOpen(false)}>Routes</Link>
            <Link to="/schedules" onClick={() => setSidebarOpen(false)}>Bus Schedules</Link>
            <button onClick={handleLogout}>Logout</button>
          </div>
          
          {sidebarOpen && <div className="overlay" onClick={() => setSidebarOpen(false)} />}
          
          <div className="main-content">
            <header className="header" id="home">
              <h1>Bus Tracking System</h1>
            </header>
            
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    departure={departure}
                    destination={destination}
                    distance={distance}
                    filteredRoutes={filteredRoutes}
                    filteredSchedules={filteredSchedules}
                    handleSearch={handleSearch}
                    handleClear={handleClear}
                    setDeparture={setDeparture}
                    setDestination={setDestination}
                  />
                }
              />
              <Route
                path="/routes"
                element={<RoutesPage filteredRoutes={filteredRoutes} />}
              />
              <Route
                path="/schedules"
                element={<SchedulesPage filteredSchedules={filteredSchedules} />}
              />
            </Routes>
          </div>
        </div>
      )}
    </Router>
  );
};

export default BusTrackingSystem;