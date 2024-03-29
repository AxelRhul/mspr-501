'use client';

import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from "react";
import L from "leaflet";

const Map = () => {
  const [position, setPosition] = useState<[number, number] | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (location) {
        setPosition([location.coords.latitude, location.coords.longitude]);
      },
      function (error) {
        console.error("Une erreur est survenue lors de la géolocalisation", error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  }, []);

  const markerIcon = new L.Icon({
    iconUrl: '/img/logo_map.png',
    iconSize: [50, 45],
    iconAnchor: [12, 41],
    popupAnchor: [15, -35]
  });

  function LocationMarker() {
    const map = useMap();

    useEffect(() => {
      if (position !== null) {
        map.setView(position, map.getZoom());
      }
    }, [position, map]);

    return position === null ? null : (
      <Marker position={position} icon={markerIcon}>
        <Popup>
          <img src="/img/logo_map.png" alt="Image de la plante" />
          <p>Nom de la plante</p>
          <p>Adresse du propriétaire</p>
          <p>Ville</p>
        </Popup>
      </Marker>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <div className="mx-auto" style={{ height: '800px', width: '95vw' }}>
        <MapContainer center={position || [0, 0]} zoom={13} style={{ height: '100%', width: '100%' }} className="rounded-3xl">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <LocationMarker />
        </MapContainer>
      </div>
    </div>
  )
}

export default Map;