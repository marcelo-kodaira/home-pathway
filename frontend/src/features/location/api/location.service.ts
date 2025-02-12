import { axiosClient } from "@/config/api/axios";
import { censusRoutes, fccRoutes } from "@/config/api/routes";
import { GetFccFipsResponse } from "./response/getFccFipsResponse";
import { GetCountiesResponse } from "./response/getCountiesResponse";

export async function fetchFipsFromCoordinates(lat: number, lon: number) {
  const url = fccRoutes.fipsFromCoordinates(lat, lon);
  const { data } = await axiosClient.get<GetFccFipsResponse>(url);
  return data;
}

export async function fetchCounties(stateCode: string) {
  const url = censusRoutes.counties(stateCode);
  const { data } = await axiosClient.get<GetCountiesResponse>(url);
  return data;
}
