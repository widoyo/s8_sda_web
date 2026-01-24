import "leaflet/dist/leaflet.css";

import * as shapefile from "shapefile";

import { GeoJSON, MapContainer, TileLayer } from "react-leaflet";
import React, { useEffect, useRef, useState } from "react";

import JSZip from "jszip";
import L from "leaflet";

const SpatialMap = ({
  zipData,
  height = "500px",
  width = "100%",
  dragging = true,
  scrollWheelZoom = true,
  doubleClickZoom = true,
  zoomControl = true,
}) => {
  const [geoJson, setGeoJson] = useState(null);
  const [center, setCenter] = useState([20, 0]); // Default center
  const [zoom, setZoom] = useState(2); // Default zoom
  const mapRef = useRef();

  const processZipData = async (data) => {
    try {
      const zip = await JSZip.loadAsync(data);
      const shpFile = zip.file(/\.shp$/i)[0];
      const dbfFile = zip.file(/\.dbf$/i)[0];

      if (shpFile && dbfFile) {
        const shpArrayBuffer = await shpFile.async("arraybuffer");
        const dbfArrayBuffer = await dbfFile.async("arraybuffer");
        convertShpToGeoJson(shpArrayBuffer, dbfArrayBuffer);
      } else {
        console.error("SHP or DBF file not found in ZIP.");
      }
    } catch (error) {
      console.error("Error processing ZIP data:", error);
    }
  };

  const convertShpToGeoJson = async (shpArrayBuffer, dbfArrayBuffer) => {
    try {
      const response = await shapefile.open(shpArrayBuffer, dbfArrayBuffer);
      const features = [];
      while (true) {
        const result = await response.read();
        if (result.done) break;
        features.push(result.value);
      }
      const geoJsonData = {
        type: "FeatureCollection",
        features,
      };
      setGeoJson(geoJsonData);

      // Create GeoJSON layer to get the bounds and zoom dynamically
      const geoJsonLayer = L.geoJSON(geoJsonData);
      const bounds = geoJsonLayer.getBounds();

      // Update center and zoom based on the bounds of the GeoJSON
      setCenter(bounds.getCenter()); // Set the center of the map to the center of the bounds
      setZoom(mapRef.current?.getZoom() || 10); // Dynamically adjust zoom to fit the bounds
    } catch (error) {
      console.error("Error converting SHP to GeoJSON:", error);
    }
  };

  useEffect(() => {
    if (zipData) {
      if (typeof zipData === "string") {
        // If zipData is a URL, fetch it
        fetch(zipData)
          .then((response) => response.arrayBuffer())
          .then((data) => processZipData(data))
          .catch((error) =>
            console.error("Error fetching ZIP from URL:", error)
          );
      } else {
        // If zipData is an ArrayBuffer, process it directly
        processZipData(zipData);
      }
    }
  }, [zipData]);

  // If GeoJSON is available, render the map
  return (
    geoJson && (
      <MapContainer
        center={center} // Dynamically set the center
        zoom={zoom} // Dynamically set the zoom level
        style={{ height, width }}
        ref={mapRef}
        className="z-0"
        dragging={dragging} // Disable dragging
        scrollWheelZoom={scrollWheelZoom} // Disable scroll wheel zoom
        doubleClickZoom={doubleClickZoom} // Disable double-click zoom
        zoomControl={zoomControl} // Hide zoom control buttons
        // whenReady={() => console.log("Map is ready")} // Debugging the map initialization
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <GeoJSON data={geoJson} />
      </MapContainer>
    )
  );
};

export default SpatialMap;
