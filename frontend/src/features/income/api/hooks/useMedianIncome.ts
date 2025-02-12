import { useQuery } from "@tanstack/react-query";
import { fetchMedianIncome } from "../income.service";
import { useEffect } from "react";
import { toast } from "react-toastify";

export function useMedianIncome(stateCode: string, countyCode: string) {
  const query = useQuery({
    queryKey: ["medianIncome", stateCode, countyCode],
    queryFn: () => fetchMedianIncome(stateCode, countyCode),
    enabled: !!stateCode && !!countyCode,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (query.isError && query.error) {
      toast.error("Integration Error: Failed to fetch median income");
    }
  }, [query.isError, query.error]);

  return query;
}
