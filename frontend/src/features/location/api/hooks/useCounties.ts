import { useQuery } from "@tanstack/react-query";
import { fetchCounties } from "../location.service";
import { toast } from "react-toastify";
import { useEffect } from "react";

export function useCounties(stateCode: string) {
  const query = useQuery({
    queryKey: ["counties", stateCode],
    queryFn: () => fetchCounties(stateCode),
    enabled: !!stateCode,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (query.isError && query.error) {
      toast.error("Integration Error: Failed to fetch counties");
    }
  }, [query.isError, query.error]);

  return query;
}
