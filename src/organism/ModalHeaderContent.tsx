import React, { useEffect, useRef, useState } from "react";
import { Input, Button, Form, Popover } from "antd";
import { useNavigate } from "react-router-dom";
import { MapContainer as LeafletMap, TileLayer, Marker, useMapEvents, MapContainer } from "react-leaflet";
import "../assets/styles/main.scss";

const ClickableMap = ({ onClick, coordinates }) => {
  const mapRef = useRef();

  const MapEvents = () => {
    const mapRef = useRef();

    useMapEvents({
      click(e) {
        onClick([e.latlng.lat, e.latlng.lng]);
      },
    });
    return null;
  };

  // useEffect to ensure the map recalculates its size after rendering
  useEffect(() => {
    if (mapRef.current) {
      const mapInstance = mapRef.current;
      setTimeout(() => {
        mapInstance.invalidateSize(); // Recalculate map size after initial render
      }, 100); // Small delay to ensure the map container is fully rendered before recalculating
    }
  }, []);
  useEffect(() => {
    if (mapRef.current) {
      const mapInstance = mapRef.current;

      // Function to handle resizing
      const handleResize = () => {
        mapInstance.invalidateSize(); // Force recalculation of map size on window resize
      };

      window.addEventListener("resize", handleResize); // Add event listener

      return () => {
        window.removeEventListener("resize", handleResize); // Cleanup event listener
      };
    }
  }, []);
  function LocationMarker() {
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
      click() {
        map.locate();
      },
      locationfound(e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      },
    });

    return position === null ? null : (
      <Marker position={position}>
        <Popover title="You are here" />
      </Marker>
    );
  }
  return (
    <MapContainer
      center={{ lat: 51.505, lng: -0.09 }}
      zoom={13}
      scrollWheelZoom={false}
      minZoom={10}
      maxZoom={18}
      ref={mapRef}
      // scrollWheelZoom={false}
      // maxZoom={18} // Limit max zoom level
      // minZoom={10}
      // dragging={true}
      // inertia={true} // Enable inertia for smoother panning
      // inertiaDeceleration={2000}
      updateWhenIdle={true} // Aktualizuj kafelki, gdy mapa nie jest przeciągana
      keepBuffer={2} // Zwiększa liczbę kafelków trzymanych wokół obszaru widocznego
      tileSize={256}
      preferCanvas={true} // Użyj canvas do renderowania mapy
      style={{ height: "400px", width: "100%", marginLeft: "auto", marginRight: "auto" }} // Add margin to center the map

      // style={{ height: "400px", width: "100%" }}
    >
      {/* // Optionally set a minimum zoom level */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        updateWhenIdle={true}
        updateWhenZooming={false}
        keepBuffer={4}
        // updateWhenIdle={true} /* Aktualizuj kafelki tylko, gdy mapa jest statyczna */
        // keepBuffer={1} /* Utrzymuj bufory dla kafelków wokół widocznego obszaru */
        // noWrap={true} /* Zapobiega powtarzaniu kafelków poza granicami */
        // tileSize={256} /* Upewnij się, że rozmiar kafelków jest poprawny */
        // zoomOffset={0} /* Ustawienia dla przeskalowania */
        // zIndex={1} /* Ustawienie z-indexu dla warstw kafelków */
        // opacity={1} /* Ustawienie widoczności kafelków */
        // // boundsPadding={1} /* Zapobiegaj nadmiernemu przesuwaniu się mapy */
        // zoom={13}
        // // boundsPadding={[50, 50]}
        // maxZoom={18} /* Ogranicz maksymalny zoom */
        // minZoom={10}
        // scrollWheelZoom={false}
        // preferCanvas={true} // Użyj canvas do renderowania, co może poprawić wydajność
      />
      {/* <LocationMarker /> */}
      {coordinates && <Marker position={coordinates} />}

      <MapEvents />
    </MapContainer>
    // className="map-margin"
    // <LeafletMap center={coordinates || [51.505, -0.09]} zoom={10} style={{ height: "400px", width: "100%" }}>
    //   <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    //   {/* <TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
    //   {/* {coordinates && <Marker position={coordinates} />} */}
    //   <MapEvents />
    // </LeafletMap>
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
      {/* // <div> */}
      <h2>Map Coordinates</h2>
      {/* className="wrapper-content" */}
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
        <div className="map-container">
          <ClickableMap onClick={handleMapClick} coordinates={lat && lng ? [parseFloat(lat), parseFloat(lng)] : null} />
        </div>
        <div className="button-wrapper">
          <Button onClick={handleSetCoordinates}>Set Coordinates</Button>
        </div>
      </section>
      <div>Click on map to mark location and get coordinates</div>
    </div>
  );
};

export default MapCoordinates;
