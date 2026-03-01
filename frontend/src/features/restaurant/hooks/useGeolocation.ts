"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { DEFAULT_LAT, DEFAULT_LNG } from "@/constants/app";

export interface GeoPosition {
  lat: number;
  lng: number;
  accuracy: number;
}

interface UseGeolocationReturn {
  position: GeoPosition;
  loading: boolean;
  error: string | null;
  retry: () => void;
}

export function useGeolocation(): UseGeolocationReturn {
  const isMounted = useRef(false);
  const locateRef = useRef<() => void>(() => {});

  const [position, setPosition] = useState<GeoPosition>({
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
    accuracy: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    locateRef.current = () => {
      if (!navigator.geolocation) {
        setError("お使いのブラウザは位置情報に対応していません。");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            accuracy: pos.coords.accuracy,
          });
          setLoading(false);
        },
        (err) => {
          const messages: Record<number, string> = {
            [GeolocationPositionError.PERMISSION_DENIED]:
              "位置情報の取得が許可されていません。",
            [GeolocationPositionError.POSITION_UNAVAILABLE]:
              "位置情報を取得できませんでした。",
            [GeolocationPositionError.TIMEOUT]:
              "位置情報の取得がタイムアウトしました。",
          };
          setError(messages[err.code] ?? "位置情報の取得に失敗しました。");
          setLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10_000,
          maximumAge: 60_000,
        },
      );
    };
  });

  const locate = useCallback(() => {
    locateRef.current();
  }, []);

  useEffect(() => {
    isMounted.current = true;
    locateRef.current();
    return () => {
      isMounted.current = false;
    };
  }, []);

  return { position, loading, error, retry: locate };
}
