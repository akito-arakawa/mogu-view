"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Circle,
  useMap,
} from "react-leaflet";
import type { GeoPosition } from "@/features/restaurant/hooks/useGeolocation";
import "leaflet/dist/leaflet.css";

interface SearchMapProps {
  position: GeoPosition;
  radiusMeters: number;
}

const TILE_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';

function MapUpdater({
  position,
  radiusMeters,
}: {
  position: GeoPosition;
  radiusMeters: number;
}) {
  const map = useMap();
  const initializedRef = useRef(false);

  useEffect(() => {
    const center = L.latLng(position.lat, position.lng);
    const bounds = center.toBounds(radiusMeters * 2);

    if (!initializedRef.current && position.lat !== 0) {
      map.fitBounds(bounds, { padding: [30, 30], animate: true });
      initializedRef.current = true;
    }
  }, [map, position]);

  useEffect(() => {
    if (!initializedRef.current) return;
    const center = L.latLng(position.lat, position.lng);
    const bounds = center.toBounds(radiusMeters * 2);
    map.fitBounds(bounds, { padding: [30, 30], animate: true });
  }, [map, position, radiusMeters]);

  return null;
}

function TouchHandler() {
  const map = useMap();

  useEffect(() => {
    map.dragging.enable();
    const mapAny = map as unknown as Record<string, { enable: () => void }>;
    if (mapAny.tap) mapAny.tap.enable();
    map.touchZoom.enable();
    map.doubleClickZoom.enable();
    map.scrollWheelZoom.disable();
    map.boxZoom.enable();

    const enableScroll = () => map.scrollWheelZoom.enable();
    const disableScroll = () => map.scrollWheelZoom.disable();

    const container = map.getContainer();
    container.addEventListener("focus", enableScroll);
    container.addEventListener("blur", disableScroll);
    container.addEventListener("mouseenter", enableScroll);
    container.addEventListener("mouseleave", disableScroll);

    return () => {
      container.removeEventListener("focus", enableScroll);
      container.removeEventListener("blur", disableScroll);
      container.removeEventListener("mouseenter", enableScroll);
      container.removeEventListener("mouseleave", disableScroll);
    };
  }, [map]);

  return null;
}

export function SearchMap({ position, radiusMeters }: SearchMapProps) {
  return (
    <div className="relative z-0 overflow-hidden rounded-2xl shadow-sm ring-1 ring-gray-100">
      <MapContainer
        center={[position.lat, position.lng]}
        zoom={15}
        scrollWheelZoom={false}
        className="h-[280px] w-full sm:h-[340px]"
        attributionControl={true}
        zoomControl={true}
      >
        <TileLayer url={TILE_URL} attribution={TILE_ATTRIBUTION} />

        <Circle
          center={[position.lat, position.lng]}
          radius={radiusMeters}
          pathOptions={{
            color: "#3b82f6",
            fillColor: "#3b82f6",
            fillOpacity: 0.08,
            weight: 1.5,
          }}
        />

        <CircleMarker
          center={[position.lat, position.lng]}
          radius={8}
          pathOptions={{
            color: "#ffffff",
            fillColor: "#f97316",
            fillOpacity: 1,
            weight: 3,
          }}
        />

        <MapUpdater position={position} radiusMeters={radiusMeters} />
        <TouchHandler />
      </MapContainer>
    </div>
  );
}
