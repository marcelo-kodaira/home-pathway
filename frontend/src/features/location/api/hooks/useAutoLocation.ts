import { useEffect, useMemo, useState } from "react";
import { useFipsFromCoordinates } from "./useFipsFromCoordinates";
import { toast } from "react-toastify";

export const useAutoLocation = () => {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null
  );
  const [autoLocationAvailable, setAutoLocationAvailable] = useState(true);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          //setCoords({ lat: 29.7604, lon: -95.3698 });
          setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Geolocation error:", error);
          toast.info(
            "We couldn’t fetch your location. Please check your browser’s location settings and try again."
          );
          setAutoLocationAvailable(false);
        }
      );
    } else {
      setAutoLocationAvailable(false);
    }
  }, []);

  const { data: fccData, error: fccError } = useFipsFromCoordinates(
    coords ? coords.lat : 0,
    coords ? coords.lon : 0
  );

  useEffect(() => {
    if (fccError) {
      setAutoLocationAvailable(false);
    }
  }, [fccError]);

  const derived = useMemo(() => {
    let stateCode = "";
    let stateName = "";
    let countyCode = "";
    if (fccData) {
      const fccStateCode = fccData.State?.FIPS || "";
      stateCode = fccStateCode;
      stateName = fccData.State?.name || "";
      const fullCountyFips = fccData.County?.FIPS || "";
      if (fccStateCode && fullCountyFips.startsWith(fccStateCode)) {
        countyCode = fullCountyFips.slice(fccStateCode.length);
      } else {
        countyCode = fullCountyFips;
      }
    }
    return { stateCode, stateName, countyCode };
  }, [fccData]);

  return { autoLocationAvailable, coords, ...derived };
};
