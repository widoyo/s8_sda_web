import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Custom marker icon
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const MapComponent: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <MapContainer
      center={[-2.94327, 104.69943]}
      zoom={16}
      scrollWheelZoom={false}
      className={`w-full h-full ${className || ""}`}
      style={{ zIndex: 1 }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[-2.94327, 104.69943]} icon={markerIcon}>
        <Popup>Balai Besar Wilayah Sungai Sumatera VIII</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
