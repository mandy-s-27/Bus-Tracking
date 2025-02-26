import React from "react";

const BusTrackingSystem = () => {
  return (
    <>
      <style>
        {`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body, html {
            width: 50%;
            height: 100%;
            font-family: 'Poppins', sans-serif;
            background: #f4f4f4;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .container {
            width: 400%;
            height: 100vh;
            background: #fff;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            
          }

          .header {
            width: 100%;
            background: rgb(50, 121, 197);
            color: #fff;
            padding: 20px;
          }

          .content {
            width: 100%;
            max-width: 1200px;
            display: flex;
            flex-direction: column;
            gap: 20px;
            flex-grow: 1;
            padding-bottom: 20px;
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
          }

          .schedules table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
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
          }
        `}
      </style>
      <div className="container">
        <header className="header">
          <h1>Bus Tracking System</h1>
        </header>
        <div className="content">
          <section className="routes">
            <h2>Available Routes</h2>
            <ul>
              <li><strong>Route 1:</strong> Station A → Station B → Station C</li>
              <li><strong>Route 2:</strong> Station X → Station Y → Station Z</li>
              <li><strong>Route 3:</strong> Station P → Station Q → Station R</li>
            </ul>
          </section>
          <section className="schedules">
            <h2>Bus Schedules</h2>
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
                <tr>
                  <td>Route 1</td>
                  <td>08:00 AM</td>
                  <td>09:30 AM</td>
                  <td className="on-time">On Time</td>
                </tr>
                <tr>
                  <td>Route 2</td>
                  <td>09:15 AM</td>
                  <td>10:45 AM</td>
                  <td className="delayed">Delayed</td>
                </tr>
                <tr>
                  <td>Route 3</td>
                  <td>10:30 AM</td>
                  <td>12:00 PM</td>
                  <td className="on-time">On Time</td>
                </tr>
              </tbody>
            </table>
          </section>
          <section className="map">
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
      </div>
    </>
  );
};

export default BusTrackingSystem;