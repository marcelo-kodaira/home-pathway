import { useQuery } from "@tanstack/react-query";
import { fetchFipsFromCoordinates } from "../location.service";
import { useEffect } from "react";
import { toast } from "react-toastify";

export function useFipsFromCoordinates(lat: number, lon: number) {
  const roundedLat = Number(lat.toFixed(4));
  const roundedLon = Number(lon.toFixed(4));

  const query = useQuery({
    queryKey: ["fccFips", roundedLat, roundedLon],
    queryFn: () => fetchFipsFromCoordinates(roundedLat, roundedLon),
    enabled: roundedLat !== 0 && roundedLon !== 0,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (query.isError && query.error) {
      toast.error("Integration Error: Failed to fetch location data");
    }
  }, [query.isError, query.error]);

  return query;
}
