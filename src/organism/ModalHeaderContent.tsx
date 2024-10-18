import React, { useState } from "react";
import { Input, Button, Form } from "antd";
import { useNavigate } from "react-router-dom";
import { MapContainer as LeafletMap, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "../assets/styles/main.scss";

const ClickableMap = ({ onClick, coordinates }) => {
  const MapEvents = () => {
    useMapEvents({
      click(e) {
        onClick([e.latlng.lat, e.latlng.lng]);
      },
    });
    return null;
  };

  return (
    // className="map-margin"
    <LeafletMap center={coordinates || [51.505, -0.09]} zoom={10} style={{ height: "400px", width: "100%" }}>
      <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {/* <TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
      {/* {coordinates && <Marker position={coordinates} />} */}
      <MapEvents />
    </LeafletMap>
  );
};

const MapCoordinates = ({ setCoordinates, setModal }) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const navigate = useNavigate();

  const handleSetCoordinates = () => {
    if (lat && lng) {
      setCoordinates({ lat: parseFloat(lat), lng: parseFloat(lng) });
      if (setModal) {
        setModal(false);
      }
      // Navigate to another route if needed
      // navigate('/desired-route');
    } else {
      alert("Please select coordinates.");
    }
  };

  const handleMapClick = (coordinates) => {
    setLat(coordinates[0]);
    setLng(coordinates[1]);
  };

  return (
    <div className="wrapper-coordinates">
      <h2>Map Coordinates</h2>
      <section className="wrapper-content">
        <div className="border">
          <Form layout="vertical">
            <Form.Item label="Latitude">
              <Input value={lat} onChange={(e) => setLat(e.target.value)} placeholder="Select state." type="number" />
            </Form.Item>
            <Form.Item label="Longitude">
              <Input value={lng} onChange={(e) => setLng(e.target.value)} placeholder="Select country." type="number" />
            </Form.Item>
          </Form>
        </div>
        <ClickableMap onClick={handleMapClick} coordinates={lat && lng ? [parseFloat(lat), parseFloat(lng)] : null} />
        <div className="button-wrapper">
          <Button onClick={handleSetCoordinates}>Set Coordinates</Button>
        </div>
      </section>
      <div>Click on map to mark location and get coordinates</div>
    </div>
  );
};

export default MapCoordinates;
